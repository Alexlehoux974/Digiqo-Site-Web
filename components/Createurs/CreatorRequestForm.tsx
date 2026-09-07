import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { m as motion } from 'framer-motion'
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, Send, Sparkles, X } from 'lucide-react'
import { CREATORS } from '@/lib/createurs/data'
import {
  BRIEF_MAX_LENGTH,
  BUDGETS,
  CRITERE_NICHES,
  CRITERE_ZONES,
  DIFFUSIONS,
  ECHEANCES,
  EMPTY_REQUEST,
  FORMATS_COLLABORATION,
  OBJECTIFS,
  SECTEURS,
  STEP_TITLES,
  STEP_VALIDATORS,
  TAILLES_AUDIENCE,
  TYPES_CONTENU,
  VOLUMES,
  normalizeHandle,
  validateRequest,
  type CreatorRequestPayload,
} from '@/lib/createurs/demande'

type Variant = 'panel' | 'page'

interface Props {
  /** Handles pré-remplis depuis l'URL. Peut arriver après le montage (router.isReady). */
  initialHandles: string[]
  variant?: Variant
  /** Rendu après l'envoi, sous la confirmation (ex. « Fermer » dans le panneau). */
  onDone?: () => void
  doneLabel?: string
}

// Nom lisible derrière un handle, quand la créatrice est sur la page.
const CREATOR_NAMES: Record<string, string> = Object.fromEntries(
  CREATORS.filter((c) => !c.pending)
    .map((c) => [normalizeHandle(c.handle), c.name])
    .filter((entry): entry is [string, string] => entry[0] !== null),
)

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#111111]'

const labelClass = 'mb-1.5 block text-sm font-medium text-gray-700'

const primaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-[#111111] px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-black hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none'

const secondaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-[#111111] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]'

// Libellés enrichis pour un select dont les valeurs stockées restent celles d'Airtable.
const FORMAT_LABELS: Record<(typeof FORMATS_COLLABORATION)[number], string> = {
  Ponctuelle: 'Ponctuelle (1 opération)',
  Régulière: 'Régulière (mensuelle)',
  'Je ne sais pas encore': 'Je ne sais pas encore',
}

// Pastille multi-sélection : noir plein quand active, contour sinon.
const ChipToggle = ({
  label,
  active,
  onToggle,
}: {
  label: string
  active: boolean
  onToggle: () => void
}) => (
  <button
    type="button"
    onClick={onToggle}
    aria-pressed={active}
    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] ${
      active
        ? 'border-[#111111] bg-[#111111] text-white'
        : 'border-gray-300 bg-white text-gray-600 hover:border-gray-900 hover:text-gray-900'
    }`}
  >
    {label}
  </button>
)

export const CreatorRequestForm = ({ initialHandles, variant = 'page', onDone, doneLabel }: Props) => {
  const [data, setData] = useState<CreatorRequestPayload>({ ...EMPTY_REQUEST })
  const [step, setStep] = useState(0)
  const [showErrors, setShowErrors] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [handlesTouched, setHandlesTouched] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  const initialKey = initialHandles.join(',')

  // Les handles arrivent de l'URL, parfois après le premier rendu (router.isReady).
  // On ne les réinjecte plus dès que l'utilisateur a touché à sa présélection.
  useEffect(() => {
    if (handlesTouched) return
    setData((prev) => (prev.handles.join(',') === initialKey ? prev : { ...prev, handles: initialHandles }))
    // initialKey suffit à détecter un changement de contenu du tableau.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialKey, handlesTouched])

  const set = useCallback(<K extends keyof CreatorRequestPayload>(key: K, value: CreatorRequestPayload[K]) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }, [])

  const toggleIn = useCallback(
    (key: 'typesContenu' | 'diffusion' | 'criteresNiches' | 'criteresZones', value: string) => {
      setData((prev) => {
        const current = prev[key]
        return {
          ...prev,
          [key]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
        }
      })
    },
    [],
  )

  const stepErrors = useMemo(() => STEP_VALIDATORS[step](data), [step, data])
  const stepValid = stepErrors.length === 0

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const goNext = () => {
    if (!stepValid) {
      setShowErrors(true)
      return
    }
    setShowErrors(false)
    setStep((s) => Math.min(s + 1, STEP_TITLES.length - 1))
    scrollToTop()
  }

  const goBack = () => {
    setShowErrors(false)
    setStep((s) => Math.max(s - 1, 0))
    scrollToTop()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validateRequest(data)
    if (errors.length > 0) {
      setShowErrors(true)
      return
    }

    setStatus('sending')
    setErrorMessage('')
    try {
      const response = await fetch('/api/creator-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        setErrorMessage(body.error || "L'envoi a échoué. Réessayez dans un instant.")
        setStatus('error')
        return
      }
      setStatus('done')
      scrollToTop()
    } catch {
      setErrorMessage("L'envoi a échoué. Vérifiez votre connexion et réessayez.")
      setStatus('error')
    }
  }

  const removeHandle = (handle: string) => {
    setHandlesTouched(true)
    setData((prev) => ({ ...prev, handles: prev.handles.filter((h) => h !== handle) }))
  }

  const clearHandles = () => {
    setHandlesTouched(true)
    setData((prev) => ({ ...prev, handles: [] }))
  }

  // Deux colonnes seulement en page pleine : le panneau latéral est trop étroit.
  const twoCols = variant === 'page' ? 'grid grid-cols-1 gap-5 sm:grid-cols-2' : 'grid grid-cols-1 gap-5'

  if (status === 'done') {
    return (
      <div ref={topRef} className="flex scroll-mt-40 flex-col items-center px-1 py-10 text-center">
        <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-7 w-7 text-emerald-600" aria-hidden="true" />
        </span>
        <h3 className="text-xl font-bold text-gray-900">Demande reçue</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-600">
          On revient vers vous sous 48 h ouvrées avec une proposition de créateurs.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {onDone ? (
            <button type="button" onClick={onDone} className={primaryButtonClass}>
              {doneLabel || 'Fermer'}
            </button>
          ) : (
            <Link href="/createurs" className={primaryButtonClass}>
              Revenir aux créateurs
            </Link>
          )}
        </div>
      </div>
    )
  }

  return (
    <div ref={topRef} className="scroll-mt-40">
      {/* ── Barre de progression ── */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Étape {step + 1} sur {STEP_TITLES.length}
          </span>
          <span className="text-xs font-semibold text-gray-900">{STEP_TITLES[step]}</span>
        </div>
        <div className="flex gap-1.5" role="presentation">
          {STEP_TITLES.map((title, i) => (
            <span
              key={title}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i <= step ? 'bg-[#111111]' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot : hors flux visuel et hors tabulation, jamais rempli par un humain. */}
        <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="website-createur">Ne pas remplir</label>
          <input
            id="website-createur"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={data.website}
            onChange={(e) => set('website', e.target.value)}
          />
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* ── ÉTAPE 1 — VOTRE ENTREPRISE ── */}
          {step === 0 && (
            <div className={twoCols}>
              <div className={variant === 'page' ? 'sm:col-span-2' : ''}>
                <label htmlFor="entreprise" className={labelClass}>
                  Entreprise <span className="text-gray-400">*</span>
                </label>
                <input
                  id="entreprise"
                  type="text"
                  required
                  maxLength={120}
                  value={data.entreprise}
                  onChange={(e) => set('entreprise', e.target.value)}
                  className={inputClass}
                  placeholder="Ma Boutique 974"
                />
              </div>

              <div>
                <label htmlFor="secteur" className={labelClass}>
                  Secteur d&apos;activité <span className="text-gray-400">*</span>
                </label>
                <select
                  id="secteur"
                  required
                  value={data.secteur}
                  onChange={(e) => set('secteur', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Sélectionnez</option>
                  {SECTEURS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="contact" className={labelClass}>
                  Nom et prénom du contact <span className="text-gray-400">*</span>
                </label>
                <input
                  id="contact"
                  type="text"
                  required
                  maxLength={120}
                  autoComplete="name"
                  value={data.contact}
                  onChange={(e) => set('contact', e.target.value)}
                  className={inputClass}
                  placeholder="Marie Payet"
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email professionnel <span className="text-gray-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => set('email', e.target.value)}
                  className={inputClass}
                  placeholder="marie@maboutique.re"
                />
              </div>

              <div>
                <label htmlFor="telephone" className={labelClass}>
                  Téléphone <span className="text-gray-400">*</span>
                </label>
                <input
                  id="telephone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={data.telephone}
                  onChange={(e) => set('telephone', e.target.value)}
                  className={inputClass}
                  placeholder="0692 00 00 00"
                />
                <p className="mt-1.5 text-xs text-gray-400">Le matchmaking se fait par téléphone.</p>
              </div>

              <div className={variant === 'page' ? 'sm:col-span-2' : ''}>
                <label htmlFor="siteEntreprise" className={labelClass}>
                  Site web ou Instagram de l&apos;entreprise
                </label>
                <input
                  id="siteEntreprise"
                  type="text"
                  maxLength={200}
                  value={data.siteEntreprise}
                  onChange={(e) => set('siteEntreprise', e.target.value)}
                  className={inputClass}
                  placeholder="maboutique.re ou @maboutique974"
                />
              </div>
            </div>
          )}

          {/* ── ÉTAPE 2 — VOTRE BESOIN ── */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              {/* Créateurs présélectionnés */}
              <div>
                <span className={labelClass}>Créateurs présélectionnés</span>
                {data.handles.length > 0 ? (
                  <>
                    <ul className="flex flex-wrap gap-2">
                      {data.handles.map((handle) => (
                        <li key={handle}>
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-gray-50 py-1 pl-3 pr-1 text-xs font-semibold text-gray-800">
                            {CREATOR_NAMES[normalizeHandle(handle) || ''] || handle}
                            <button
                              type="button"
                              onClick={() => removeHandle(handle)}
                              aria-label={`Retirer ${handle} de la présélection`}
                              className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-900"
                            >
                              <X className="h-3 w-3" aria-hidden="true" />
                            </button>
                          </span>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={clearHandles}
                      className="mt-2 text-xs font-semibold text-gray-500 underline underline-offset-2 transition-colors hover:text-gray-900"
                    >
                      Laisser Digiqo choisir
                    </button>
                  </>
                ) : (
                  <p className="rounded-lg border border-dashed border-gray-300 px-4 py-3 text-xs text-gray-500">
                    Aucun créateur présélectionné — Digiqo vous proposera les profils les plus adaptés.
                  </p>
                )}
              </div>

              <div className={twoCols}>
                <div>
                  <label htmlFor="objectif" className={labelClass}>
                    Objectif principal <span className="text-gray-400">*</span>
                  </label>
                  <select
                    id="objectif"
                    required
                    value={data.objectif}
                    onChange={(e) => set('objectif', e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Sélectionnez</option>
                    {OBJECTIFS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="formatCollaboration" className={labelClass}>
                    Format de collaboration <span className="text-gray-400">*</span>
                  </label>
                  <select
                    id="formatCollaboration"
                    required
                    value={data.formatCollaboration}
                    onChange={(e) => set('formatCollaboration', e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Sélectionnez</option>
                    {FORMATS_COLLABORATION.map((f) => (
                      <option key={f} value={f}>
                        {FORMAT_LABELS[f]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="volume" className={labelClass}>
                    Volume estimé
                  </label>
                  <select
                    id="volume"
                    value={data.volume}
                    onChange={(e) => set('volume', e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Sélectionnez</option>
                    {VOLUMES.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className={labelClass}>
                    Budget indicatif <span className="text-gray-400">*</span>
                  </label>
                  <select
                    id="budget"
                    required
                    value={data.budget}
                    onChange={(e) => set('budget', e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Sélectionnez</option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="echeance" className={labelClass}>
                    Échéance <span className="text-gray-400">*</span>
                  </label>
                  <select
                    id="echeance"
                    required
                    value={data.echeance}
                    onChange={(e) => set('echeance', e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Sélectionnez</option>
                    {ECHEANCES.map((e2) => (
                      <option key={e2} value={e2}>
                        {e2}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="tailleAudience" className={labelClass}>
                    Taille d&apos;audience souhaitée
                  </label>
                  <select
                    id="tailleAudience"
                    value={data.tailleAudience}
                    onChange={(e) => set('tailleAudience', e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Sélectionnez</option>
                    {TAILLES_AUDIENCE.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <fieldset>
                <legend className={labelClass}>
                  Types de contenu souhaités <span className="text-gray-400">*</span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {TYPES_CONTENU.map((t) => (
                    <ChipToggle
                      key={t}
                      label={t}
                      active={data.typesContenu.includes(t)}
                      onToggle={() => toggleIn('typesContenu', t)}
                    />
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className={labelClass}>
                  Diffusion prévue <span className="text-gray-400">*</span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {DIFFUSIONS.map((d) => (
                    <ChipToggle
                      key={d}
                      label={d}
                      active={data.diffusion.includes(d)}
                      onToggle={() => toggleIn('diffusion', d)}
                    />
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className={labelClass}>Critères créateur</legend>
                <p className="mb-2 text-xs text-gray-400">
                  Utile surtout si vous n&apos;avez pas de présélection.
                </p>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">Niches</p>
                <div className="flex flex-wrap gap-2">
                  {CRITERE_NICHES.map((n) => (
                    <ChipToggle
                      key={n}
                      label={n}
                      active={data.criteresNiches.includes(n)}
                      onToggle={() => toggleIn('criteresNiches', n)}
                    />
                  ))}
                </div>
                <p className="mb-1.5 mt-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Zone</p>
                <div className="flex flex-wrap gap-2">
                  {CRITERE_ZONES.map((z) => (
                    <ChipToggle
                      key={z}
                      label={z}
                      active={data.criteresZones.includes(z)}
                      onToggle={() => toggleIn('criteresZones', z)}
                    />
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="brief" className={labelClass}>
                  Brief libre
                </label>
                <textarea
                  id="brief"
                  rows={4}
                  maxLength={BRIEF_MAX_LENGTH}
                  value={data.brief}
                  onChange={(e) => set('brief', e.target.value)}
                  className={`${inputClass} resize-y`}
                  placeholder="Décrivez le produit / lieu / message à faire passer"
                />
                <p className="mt-1.5 text-right text-xs text-gray-400">
                  {data.brief.length} / {BRIEF_MAX_LENGTH}
                </p>
              </div>
            </div>
          )}

          {/* ── ÉTAPE 3 — ENVOI ── */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              <div className="rounded-xl bg-gray-50 p-4">
                <h3 className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Récapitulatif
                </h3>
                <dl className="flex flex-col gap-1.5 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500">Entreprise</dt>
                    <dd className="text-right font-semibold text-gray-900">{data.entreprise}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500">Objectif</dt>
                    <dd className="text-right font-semibold text-gray-900">{data.objectif}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500">Budget</dt>
                    <dd className="text-right font-semibold text-gray-900">{data.budget}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500">Échéance</dt>
                    <dd className="text-right font-semibold text-gray-900">{data.echeance}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500">Créateurs</dt>
                    <dd className="text-right font-semibold text-gray-900">
                      {data.handles.length > 0 ? data.handles.join(', ') : 'Au choix de Digiqo'}
                    </dd>
                  </div>
                </dl>
              </div>

              <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  required
                  checked={data.consentement}
                  onChange={(e) => set('consentement', e.target.checked)}
                  className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-gray-300 text-[#111111] focus:ring-2 focus:ring-[#111111]"
                />
                <span>
                  J&apos;accepte que Digiqo me contacte au sujet de ma demande. <span className="text-gray-400">*</span>
                </span>
              </label>

              <p className="text-xs leading-relaxed text-gray-500">
                Aucune mise en relation automatique : votre demande arrive chez Digiqo, et c&apos;est
                l&apos;équipe qui vous rappelle avec une proposition de créateurs.
              </p>
            </div>
          )}
        </motion.div>

        {/* ── Erreurs ── */}
        {showErrors && stepErrors.length > 0 && (
          <div
            role="alert"
            className="mt-5 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <ul className="flex flex-col gap-1">
              {stepErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {status === 'error' && (
          <div
            role="alert"
            className="mt-5 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* ── Navigation ── */}
        <div className="mt-7 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button type="button" onClick={goBack} className={secondaryButtonClass}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Retour
            </button>
          ) : (
            <span />
          )}

          {step < STEP_TITLES.length - 1 ? (
            <button type="button" onClick={goNext} disabled={!stepValid} className={primaryButtonClass}>
              Continuer
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button type="submit" disabled={!stepValid || status === 'sending'} className={primaryButtonClass}>
              <Send className="h-4 w-4" aria-hidden="true" />
              {status === 'sending' ? 'Envoi…' : 'Envoyer ma demande'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
