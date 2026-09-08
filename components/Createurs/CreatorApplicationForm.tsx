import { useCallback, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { m as motion } from 'framer-motion'
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, ImagePlus, Send, Trash2 } from 'lucide-react'
import {
  BIO_MAX_LENGTH,
  COLLABORATIONS,
  EMPTY_APPLICATION,
  NICHES,
  PHOTO_ACCEPT,
  PHOTO_MAX_BYTES,
  PHOTO_MIME_TYPES,
  STEP_TITLES,
  STEP_VALIDATORS,
  TYPES_CONTENU,
  validateApplication,
  type CreatorApplicationPayload,
} from '@/lib/createurs/inscription'

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#111111]'

const labelClass = 'mb-1.5 block text-sm font-medium text-gray-700'

const hintClass = 'mt-1.5 text-xs leading-relaxed text-gray-500'

const primaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-[#111111] px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-black hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none'

const secondaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-[#111111] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]'

const COLLABORATION_LABELS: Record<(typeof COLLABORATIONS)[number], string> = {
  Ponctuelle: 'Ponctuelle (au projet)',
  Régulière: 'Régulière (mensuelle)',
  'Les deux': 'Les deux, selon les marques',
}

// Pastille multi-sélection : noir plein quand active, contour sinon.
const ChipToggle = ({ label, active, onToggle }: { label: string; active: boolean; onToggle: () => void }) => (
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

/** Fichier → base64 sans le préfixe `data:` : la forme attendue par Airtable. */
const readFileAsBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : ''
      const comma = result.indexOf(',')
      if (comma === -1) reject(new Error('lecture impossible'))
      else resolve(result.slice(comma + 1))
    }
    reader.onerror = () => reject(reader.error || new Error('lecture impossible'))
    reader.readAsDataURL(file)
  })

export const CreatorApplicationForm = () => {
  const [data, setData] = useState<CreatorApplicationPayload>({ ...EMPTY_APPLICATION })
  const [step, setStep] = useState(0)
  const [showErrors, setShowErrors] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [doneMessage, setDoneMessage] = useState('')
  const [photoError, setPhotoError] = useState('')
  const [photoPreview, setPhotoPreview] = useState('')
  const [photoName, setPhotoName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const topRef = useRef<HTMLDivElement>(null)

  const set = useCallback(<K extends keyof CreatorApplicationPayload>(key: K, value: CreatorApplicationPayload[K]) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }, [])

  const toggleIn = useCallback((key: 'niches' | 'typesContenu', value: string) => {
    setData((prev) => {
      const current = prev[key]
      return {
        ...prev,
        [key]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
      }
    })
  }, [])

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

  const handlePhoto = async (file: File | undefined) => {
    setPhotoError('')
    if (!file) return
    // Contrôle avant lecture : inutile de charger 20 Mo en mémoire pour les refuser.
    if (!(PHOTO_MIME_TYPES as readonly string[]).includes(file.type)) {
      setPhotoError('Format accepté : JPG, PNG ou WEBP.')
      return
    }
    if (file.size > PHOTO_MAX_BYTES) {
      setPhotoError('La photo ne doit pas dépasser 5 Mo.')
      return
    }
    try {
      const base64 = await readFileAsBase64(file)
      set('photo', { filename: file.name, contentType: file.type, data: base64 })
      setPhotoName(file.name)
      setPhotoPreview(`data:${file.type};base64,${base64}`)
    } catch {
      setPhotoError("La photo n'a pas pu être lue. Réessaie avec un autre fichier.")
    }
  }

  const clearPhoto = () => {
    set('photo', null)
    setPhotoName('')
    setPhotoPreview('')
    setPhotoError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validateApplication(data)
    if (errors.length > 0) {
      setShowErrors(true)
      return
    }

    setStatus('sending')
    setErrorMessage('')
    try {
      const response = await fetch('/api/creator-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const body = await response.json().catch(() => ({}))
      if (!response.ok) {
        setErrorMessage(body.error || "L'envoi a échoué. Réessaie dans un instant.")
        setStatus('error')
        return
      }
      // Doublon : la réponse reste un succès, seul le message change.
      setDoneMessage(body.duplicate ? body.message || 'Profil déjà enregistré, on revient vers vous' : '')
      setStatus('done')
      scrollToTop()
    } catch {
      setErrorMessage("L'envoi a échoué. Vérifie ta connexion et réessaie.")
      setStatus('error')
    }
  }

  const twoCols = 'grid grid-cols-1 gap-5 sm:grid-cols-2'

  if (status === 'done') {
    return (
      <div ref={topRef} className="flex scroll-mt-40 flex-col items-center px-1 py-10 text-center">
        <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-7 w-7 text-emerald-600" aria-hidden="true" />
        </span>
        <h3 className="text-xl font-bold text-gray-900">
          {doneMessage ? 'Tu es déjà dans le réseau' : 'Profil bien reçu'}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-600">
          {doneMessage ||
            'Merci ! Ton profil est bien enregistré. Chaque fiche est vérifiée par l’équipe Digiqo avant publication : tu recevras un email dès que c’est fait.'}
        </p>
        <div className="mt-7">
          <Link href="/createurs" className={primaryButtonClass}>
            Revenir aux créateurs
          </Link>
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
          <label htmlFor="website-inscription">Ne pas remplir</label>
          <input
            id="website-inscription"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={data.website}
            onChange={(e) => set('website', e.target.value)}
          />
        </div>

        <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {/* ── ÉTAPE 1 — TOI ── */}
          {step === 0 && (
            <div className={twoCols}>
              <div>
                <label htmlFor="prenom" className={labelClass}>
                  Prénom <span className="text-gray-400">*</span>
                </label>
                <input
                  id="prenom"
                  type="text"
                  required
                  maxLength={80}
                  value={data.prenom}
                  onChange={(e) => set('prenom', e.target.value)}
                  className={inputClass}
                  placeholder="Ophélie"
                />
              </div>

              <div>
                <label htmlFor="nom" className={labelClass}>
                  Nom complet <span className="text-gray-400">*</span>
                </label>
                <input
                  id="nom"
                  type="text"
                  required
                  maxLength={120}
                  value={data.nom}
                  onChange={(e) => set('nom', e.target.value)}
                  className={inputClass}
                  placeholder="Ophélie Le Houx"
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email <span className="text-gray-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  maxLength={200}
                  value={data.email}
                  onChange={(e) => set('email', e.target.value)}
                  className={inputClass}
                  placeholder="toi@exemple.re"
                />
              </div>

              <div>
                <label htmlFor="telephone" className={labelClass}>
                  Téléphone
                </label>
                <input
                  id="telephone"
                  type="tel"
                  maxLength={40}
                  value={data.telephone}
                  onChange={(e) => set('telephone', e.target.value)}
                  className={inputClass}
                  placeholder="0692 12 34 56"
                />
              </div>

              <div>
                <label htmlFor="ville" className={labelClass}>
                  Ville <span className="text-gray-400">*</span>
                </label>
                <input
                  id="ville"
                  type="text"
                  required
                  maxLength={80}
                  value={data.ville}
                  onChange={(e) => set('ville', e.target.value)}
                  className={inputClass}
                  placeholder="Saint-Denis"
                />
              </div>

              <div>
                <label htmlFor="zone" className={labelClass}>
                  Zone d&apos;intervention <span className="text-gray-400">*</span>
                </label>
                <input
                  id="zone"
                  type="text"
                  required
                  maxLength={120}
                  value={data.zone}
                  onChange={(e) => set('zone', e.target.value)}
                  className={inputClass}
                  placeholder="Nord et Ouest, ou toute l'île"
                />
                <p className={hintClass}>Où tu peux te déplacer pour un tournage.</p>
              </div>
            </div>
          )}

          {/* ── ÉTAPE 2 — TES RÉSEAUX ── */}
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <p className="text-sm leading-relaxed text-gray-500">
                Renseigne au moins un compte. Les taux d&apos;engagement sont facultatifs : si tu ne
                les connais pas, on les calcule de notre côté.
              </p>

              <div className={twoCols}>
                <div>
                  <label htmlFor="instagram" className={labelClass}>
                    Instagram (URL)
                  </label>
                  <input
                    id="instagram"
                    type="url"
                    inputMode="url"
                    maxLength={300}
                    value={data.instagram}
                    onChange={(e) => set('instagram', e.target.value)}
                    className={inputClass}
                    placeholder="https://www.instagram.com/ton_compte"
                  />
                </div>

                <div>
                  <label htmlFor="abonnesInstagram" className={labelClass}>
                    Abonnés Instagram
                  </label>
                  <input
                    id="abonnesInstagram"
                    type="text"
                    inputMode="numeric"
                    maxLength={20}
                    value={data.abonnesInstagram}
                    onChange={(e) => set('abonnesInstagram', e.target.value)}
                    className={inputClass}
                    placeholder="12 400"
                  />
                </div>

                <div>
                  <label htmlFor="tiktok" className={labelClass}>
                    TikTok (URL)
                  </label>
                  <input
                    id="tiktok"
                    type="url"
                    inputMode="url"
                    maxLength={300}
                    value={data.tiktok}
                    onChange={(e) => set('tiktok', e.target.value)}
                    className={inputClass}
                    placeholder="https://www.tiktok.com/@ton_compte"
                  />
                </div>

                <div>
                  <label htmlFor="abonnesTiktok" className={labelClass}>
                    Abonnés TikTok
                  </label>
                  <input
                    id="abonnesTiktok"
                    type="text"
                    inputMode="numeric"
                    maxLength={20}
                    value={data.abonnesTiktok}
                    onChange={(e) => set('abonnesTiktok', e.target.value)}
                    className={inputClass}
                    placeholder="8 200"
                  />
                </div>

                <div>
                  <label htmlFor="tauxInstagram" className={labelClass}>
                    Taux d&apos;engagement Instagram
                  </label>
                  <input
                    id="tauxInstagram"
                    type="text"
                    inputMode="decimal"
                    maxLength={20}
                    value={data.tauxInstagram}
                    onChange={(e) => set('tauxInstagram', e.target.value)}
                    className={inputClass}
                    placeholder="3,25"
                  />
                  <p className={hintClass}>En pourcentage, si tu le connais.</p>
                </div>

                <div>
                  <label htmlFor="tauxTiktok" className={labelClass}>
                    Taux d&apos;engagement TikTok
                  </label>
                  <input
                    id="tauxTiktok"
                    type="text"
                    inputMode="decimal"
                    maxLength={20}
                    value={data.tauxTiktok}
                    onChange={(e) => set('tauxTiktok', e.target.value)}
                    className={inputClass}
                    placeholder="8,7"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="autresReseaux" className={labelClass}>
                    Autres réseaux
                  </label>
                  <input
                    id="autresReseaux"
                    type="text"
                    maxLength={200}
                    value={data.autresReseaux}
                    onChange={(e) => set('autresReseaux', e.target.value)}
                    className={inputClass}
                    placeholder="YouTube, Facebook, Snapchat…"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── ÉTAPE 3 — TON PROFIL ── */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              <div>
                <span className={labelClass}>
                  Tes niches <span className="text-gray-400">*</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {NICHES.map((niche) => (
                    <ChipToggle
                      key={niche}
                      label={niche}
                      active={data.niches.includes(niche)}
                      onToggle={() => toggleIn('niches', niche)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className={labelClass}>
                  Ce que tu produis <span className="text-gray-400">*</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {TYPES_CONTENU.map((type) => (
                    <ChipToggle
                      key={type}
                      label={type}
                      active={data.typesContenu.includes(type)}
                      onToggle={() => toggleIn('typesContenu', type)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="bio" className={labelClass}>
                  Bio courte <span className="text-gray-400">*</span>
                </label>
                <textarea
                  id="bio"
                  required
                  rows={4}
                  maxLength={BIO_MAX_LENGTH}
                  value={data.bio}
                  onChange={(e) => set('bio', e.target.value)}
                  className={`${inputClass} resize-y`}
                  placeholder="Qui tu es, ce que tu aimes filmer, ton ton. C'est ce texte qui apparaîtra sur ta fiche."
                />
                <p className={hintClass}>
                  {data.bio.length} / {BIO_MAX_LENGTH} caractères.
                </p>
              </div>

              <div className={twoCols}>
                <div>
                  <label htmlFor="portfolio" className={labelClass}>
                    Portfolio / média kit
                  </label>
                  <input
                    id="portfolio"
                    type="url"
                    inputMode="url"
                    maxLength={300}
                    value={data.portfolio}
                    onChange={(e) => set('portfolio', e.target.value)}
                    className={inputClass}
                    placeholder="https://…"
                  />
                </div>

                <div>
                  <label htmlFor="tarifs" className={labelClass}>
                    Tarifs indicatifs
                  </label>
                  <input
                    id="tarifs"
                    type="text"
                    maxLength={200}
                    value={data.tarifs}
                    onChange={(e) => set('tarifs', e.target.value)}
                    className={inputClass}
                    placeholder="150 € la vidéo UGC"
                  />
                </div>

                <div>
                  <label htmlFor="collaboration" className={labelClass}>
                    Collaboration souhaitée
                  </label>
                  <select
                    id="collaboration"
                    value={data.collaboration}
                    onChange={(e) => set('collaboration', e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Sans préférence</option>
                    {COLLABORATIONS.map((c) => (
                      <option key={c} value={c}>
                        {COLLABORATION_LABELS[c]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="disponibilites" className={labelClass}>
                    Disponibilités
                  </label>
                  <textarea
                    id="disponibilites"
                    rows={3}
                    maxLength={500}
                    value={data.disponibilites}
                    onChange={(e) => set('disponibilites', e.target.value)}
                    className={`${inputClass} resize-y`}
                    placeholder="Soirs et week-ends, préavis d'une semaine…"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── ÉTAPE 4 — PHOTO & ACCORD ── */}
          {step === 3 && (
            <div className="flex flex-col gap-6">
              <div>
                <span className={labelClass}>
                  Photo de profil <span className="text-gray-400">*</span>
                </span>

                {photoPreview ? (
                  <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    {/* Aperçu local en base64 : next/image n'apporterait rien ici. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photoPreview}
                      alt="Aperçu de ta photo de profil"
                      className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-900">{photoName}</p>
                      <button
                        type="button"
                        onClick={clearPhoto}
                        className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 transition-colors hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        Changer de photo
                      </button>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor="photo"
                    className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-white px-6 py-8 text-center transition-colors hover:border-[#111111] focus-within:border-[#111111]"
                  >
                    <ImagePlus className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    <span className="text-sm font-semibold text-gray-900">Choisir une photo</span>
                    <span className="text-xs text-gray-500">JPG, PNG ou WEBP · 5 Mo maximum</span>
                  </label>
                )}

                <input
                  ref={fileInputRef}
                  id="photo"
                  type="file"
                  accept={PHOTO_ACCEPT}
                  className="sr-only"
                  onChange={(e) => handlePhoto(e.target.files?.[0])}
                />

                <p className={hintClass}>
                  Idéalement carrée, visage bien visible — c&apos;est elle qui s&apos;affichera sur ta fiche.
                </p>

                {photoError && (
                  <p role="alert" className="mt-2 text-xs font-semibold text-red-600">
                    {photoError}
                  </p>
                )}
              </div>

              {/* Récapitulatif : dernière relecture avant envoi. */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Récapitulatif</h4>
                <dl className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500">Nom</dt>
                    <dd className="text-right font-semibold text-gray-900">{data.nom}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500">Email</dt>
                    <dd className="text-right font-semibold text-gray-900">{data.email}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500">Ville</dt>
                    <dd className="text-right font-semibold text-gray-900">
                      {data.ville} · {data.zone}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500">Niches</dt>
                    <dd className="text-right font-semibold text-gray-900">{data.niches.join(', ')}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500">Contenus</dt>
                    <dd className="text-right font-semibold text-gray-900">{data.typesContenu.join(', ')}</dd>
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
                  J&apos;accepte que Digiqo me contacte et publie ma fiche (photo, bio, réseaux) sur la
                  page créateurs. <span className="text-gray-400">*</span>
                </span>
              </label>

              <p className="text-xs leading-relaxed text-gray-500">
                Chaque profil est vérifié par l&apos;équipe Digiqo avant publication. Rien n&apos;est mis
                en ligne automatiquement : tu reçois un email dès que ta fiche est validée.
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
              {status === 'sending' ? 'Envoi…' : 'Envoyer mon profil'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
