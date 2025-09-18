import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, AlertCircle, CheckCircle, Globe, Calendar, Briefcase, FileText, Clock, DollarSign, Users } from 'lucide-react';

interface FormData {
  nomPrenom: string;
  email: string;
  telephone: string;
  reseauxSociaux: string;
  siteWeb: string;
  pays: string;
  ville: string;
  fuseauHoraire: string;
  langues: string;
  statutAdministratif: string;
  siren: string;
  adresseSiege: string;
  disponibilites: string;
  metierPrincipal: string;
  specialites: string;
  tarif: string;
  delaiLivraison: string;
  portfolio: string;
  souhaiterieEtreSalarie: string;
  dejaCollabore: string;
  projetsAnterieurs: string;
  typeMissionsPreferees: string;
  confirmationExactitude: boolean;
}

export default function FreelanceRecruitmentForm() {
  const [formData, setFormData] = useState<FormData>({
    nomPrenom: '',
    email: '',
    telephone: '',
    reseauxSociaux: '',
    siteWeb: '',
    pays: '',
    ville: '',
    fuseauHoraire: '',
    langues: '',
    statutAdministratif: '',
    siren: '',
    adresseSiege: '',
    disponibilites: '',
    metierPrincipal: '',
    specialites: '',
    tarif: '',
    delaiLivraison: '',
    portfolio: '',
    souhaiterieEtreSalarie: '',
    dejaCollabore: '',
    projetsAnterieurs: '',
    typeMissionsPreferees: '',
    confirmationExactitude: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const statutsAdministratifs = [
    'Auto-entrepreneur',
    'Micro-entreprise',
    'EI (Entreprise Individuelle)',
    'EIRL',
    'EURL/SARL',
    'SAS/SASU',
    'Portage salarial',
    'Autre'
  ];

  const fuseauxHoraires = [
    'UTC+4 (La Réunion, Maurice)',
    'UTC+3 (Madagascar, Mayotte)',
    'UTC+1 (France métropolitaine - Hiver)',
    'UTC+2 (France métropolitaine - Été)',
    'UTC+0 (Londres)',
    'UTC-5 (New York)',
    'Autre'
  ];

  const disponibiliteOptions = [
    'Immédiate',
    'Sous 1 semaine',
    'Sous 2 semaines',
    'Sous 1 mois',
    'Temps plein',
    'Temps partiel',
    'Missions ponctuelles uniquement',
    'Week-ends uniquement'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Préparer les données pour Airtable (noms exacts des champs)
      const airtableData: any = {
        'Nom & Prénom': formData.nomPrenom,
        'Email': formData.email,
        'Téléphone': formData.telephone,
        'Pays': formData.pays,
        'Ville': formData.ville,
        'Langues Parlées': formData.langues,
        'Métier Principal': formData.metierPrincipal,
        'Spécialités': formData.specialites,
        'Informations Confirmées': formData.confirmationExactitude, // Booléen pour checkbox
        'Date Candidature': new Date().toISOString()
      };

      // Champs optionnels
      if (formData.reseauxSociaux) airtableData['Réseaux Sociaux'] = formData.reseauxSociaux;
      if (formData.siteWeb) airtableData['Site Web'] = formData.siteWeb;
      if (formData.siren) airtableData['SIREN'] = formData.siren;
      if (formData.adresseSiege) airtableData['Adresse Siège Social'] = formData.adresseSiege;
      if (formData.tarif) airtableData['Tarif'] = formData.tarif;
      if (formData.delaiLivraison) airtableData['Délai Livraisons'] = formData.delaiLivraison;
      if (formData.portfolio) airtableData['Portfolio'] = formData.portfolio;
      if (formData.projetsAnterieurs) airtableData['Projets Antérieurs'] = formData.projetsAnterieurs;
      if (formData.typeMissionsPreferees) airtableData['Types Missions Préférées'] = formData.typeMissionsPreferees;

      // Mapper les valeurs du formulaire aux options Airtable pour les champs singleSelect
      // Fuseau Horaire
      const fuseauMapping: { [key: string]: string } = {
        'UTC+4 (La Réunion, Maurice)': 'GMT+4 (La Réunion)',
        'UTC+3 (Madagascar, Mayotte)': 'GMT+3',
        'UTC+1 (France métropolitaine - Hiver)': 'GMT+1',
        'UTC+2 (France métropolitaine - Été)': 'GMT+2',
        'UTC+0 (Londres)': 'GMT+0',
        'UTC-5 (New York)': 'GMT-5'
      };
      if (formData.fuseauHoraire && fuseauMapping[formData.fuseauHoraire]) {
        airtableData['Fuseau Horaire'] = fuseauMapping[formData.fuseauHoraire];
      } else if (formData.fuseauHoraire === 'Autre') {
        airtableData['Fuseau Horaire'] = 'GMT+0'; // Valeur par défaut
      }

      // Statut Administratif
      if (formData.statutAdministratif) {
        // Map des valeurs du formulaire vers les valeurs exactes d'Airtable
        const statutMapping: { [key: string]: string } = {
          'Auto-entrepreneur': 'Auto-entrepreneur',
          'Micro-entreprise': 'Auto-entrepreneur', // Assimiler à auto-entrepreneur
          'EI (Entreprise Individuelle)': 'SASU',
          'EIRL': 'SASU',
          'EURL/SARL': 'SASU',
          'SAS/SASU': 'SASU',
          'Portage salarial': 'Salarié',
          'Autre': 'En recherche'
        };
        airtableData['Statut Administratif'] = statutMapping[formData.statutAdministratif] || 'En recherche';
      }

      // Disponibilités
      if (formData.disponibilites) {
        const dispoMapping: { [key: string]: string } = {
          'Immédiate': 'Toujours disponible',
          'Sous 1 semaine': 'Toujours disponible',
          'Sous 2 semaines': 'En semaine',
          'Sous 1 mois': 'En semaine',
          'Temps plein': 'Toujours disponible',
          'Temps partiel': 'Certains jours',
          'Missions ponctuelles uniquement': 'De temps en temps',
          'Week-ends uniquement': 'Certains jours'
        };
        airtableData['Disponibilités'] = dispoMapping[formData.disponibilites] || 'De temps en temps';
      }

      // Champs Oui/Non/Peut-être
      if (formData.souhaiterieEtreSalarie) {
        airtableData['Souhaite Être Salarié'] = formData.souhaiterieEtreSalarie === 'Peut-être' ? 'Peut-être' : formData.souhaiterieEtreSalarie;
      }

      if (formData.dejaCollabore) {
        airtableData['Déjà Collaboré'] = formData.dejaCollabore;
      }

      // Envoyer à l'API Airtable
      const response = await fetch('/api/freelance-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(airtableData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du formulaire');
      }

      setSubmitStatus('success');
      // Reset form
      setFormData({
        nomPrenom: '',
        email: '',
        telephone: '',
        reseauxSociaux: '',
        siteWeb: '',
        pays: '',
        ville: '',
        fuseauHoraire: '',
        langues: '',
        statutAdministratif: '',
        siren: '',
        adresseSiege: '',
        disponibilites: '',
        metierPrincipal: '',
        specialites: '',
        tarif: '',
        delaiLivraison: '',
        portfolio: '',
        souhaiterieEtreSalarie: '',
        dejaCollabore: '',
        projetsAnterieurs: '',
        typeMissionsPreferees: '',
        confirmationExactitude: false
      });
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8B1431] to-[#DA6530] p-6 rounded-t-xl">
          <h2 className="text-3xl font-bold text-white mb-2">
            Fiche d'enregistrement Freelance
          </h2>
          <p className="text-white/90">
            Ce formulaire centralise toutes les informations nécessaires pour faciliter nos futures collaborations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Section 1: INFORMATIONS GÉNÉRALES */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-[#8B1431]" />
              INFORMATIONS GÉNÉRALES
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nom & Prénom */}
              <div className="md:col-span-2">
                <label htmlFor="nomPrenom" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom & Prénom *
                </label>
                <input
                  type="text"
                  id="nomPrenom"
                  name="nomPrenom"
                  required
                  value={formData.nomPrenom}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1431] focus:border-transparent transition-colors"
                  placeholder="Jean Dupont"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1431] focus:border-transparent transition-colors"
                  placeholder="jean.dupont@email.com"
                />
              </div>

              {/* Téléphone */}
              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  required
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1431] focus:border-transparent transition-colors"
                  placeholder="+262 692 00 00 00"
                />
              </div>

              {/* Réseaux Sociaux */}
              <div>
                <label htmlFor="reseauxSociaux" className="block text-sm font-medium text-gray-700 mb-2">
                  Réseaux Sociaux (Instagram, LinkedIn)
                </label>
                <input
                  type="text"
                  id="reseauxSociaux"
                  name="reseauxSociaux"
                  value={formData.reseauxSociaux}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1431] focus:border-transparent transition-colors"
                  placeholder="@username"
                />
              </div>

              {/* Site Web */}
              <div>
                <label htmlFor="siteWeb" className="block text-sm font-medium text-gray-700 mb-2">
                  Site Web
                </label>
                <input
                  type="url"
                  id="siteWeb"
                  name="siteWeb"
                  value={formData.siteWeb}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1431] focus:border-transparent transition-colors"
                  placeholder="https://..."
                />
              </div>

              {/* Pays */}
              <div>
                <label htmlFor="pays" className="block text-sm font-medium text-gray-700 mb-2">
                  Pays *
                </label>
                <input
                  type="text"
                  id="pays"
                  name="pays"
                  required
                  value={formData.pays}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1431] focus:border-transparent transition-colors"
                  placeholder="France"
                />
              </div>

              {/* Ville */}
              <div>
                <label htmlFor="ville" className="block text-sm font-medium text-gray-700 mb-2">
                  Ville *
                </label>
                <input
                  type="text"
                  id="ville"
                  name="ville"
                  required
                  value={formData.ville}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1431] focus:border-transparent transition-colors"
                  placeholder="Saint-Denis"
                />
              </div>

              {/* Fuseau Horaire */}
              <div>
                <label htmlFor="fuseauHoraire" className="block text-sm font-medium text-gray-700 mb-2">
                  Fuseau horaire habituel *
                </label>
                <select
                  id="fuseauHoraire"
                  name="fuseauHoraire"
                  required
                  value={formData.fuseauHoraire}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1431] focus:border-transparent transition-colors"
                >
                  <option value="">Sélectionnez votre fuseau horaire</option>
                  {fuseauxHoraires.map((fuseau) => (
                    <option key={fuseau} value={fuseau}>
                      {fuseau}
                    </option>
                  ))}
                </select>
              </div>

              {/* Langues parlées */}
              <div>
                <label htmlFor="langues" className="block text-sm font-medium text-gray-700 mb-2">
                  Langues parlées *
                </label>
                <input
                  type="text"
                  id="langues"
                  name="langues"
                  required
                  value={formData.langues}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1431] focus:border-transparent transition-colors"
                  placeholder="Français, Anglais, Créole"
                />
              </div>
            </div>
          </div>

          {/* Section 2: PROFIL PROFESSIONNEL */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-[#8B1431]" />
              PROFIL PROFESSIONNEL
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Statut administratif */}
              <div>
                <label htmlFor="statutAdministratif" className="block text-sm font-medium text-gray-700 mb-2">
                  Statut administratif *
                </label>
                <select
                  id="statutAdministratif"
                  name="statutAdministratif"
                  required
                  value={formData.statutAdministratif}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1431] focus:border-transparent transition-colors"
                >
                  <option value="">Sélectionnez votre statut</option>
                  {statutsAdministratifs.map((statut) => (
                    <option key={statut} value={statut}>
                      {statut}
                    </option>
                  ))}
                </select>
              </div>

              {/* SIREN */}
              <div>
                <label htmlFor="siren" className="block text-sm font-medium text-gray-700 mb-2">
                  SIREN
                </label>
                <input
                  type="text"
                  id="siren"
                  name="siren"
                  value={formData.siren}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1431] focus:border-transparent transition-colors"
                  placeholder="123 456 789"
                />
              </div>

              {/* Adresse siège social */}
              <div className="md:col-span-2">
                <label htmlFor="adresseSiege" className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse siège social
                </label>
                <input
                  type="text"
                  id="adresseSiege"
                  name="adresseSiege"
                  value={formData.adresseSiege}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1431] focus:border-transparent transition-colors"
                  placeholder="123 Rue de la République, 97400 Saint-Denis"
                />
              </div>

              {/* Disponibilités */}
              <div>
                <label htmlFor="disponibilites" className="block text-sm font-medium text-gray-700 mb-2">
                  Disponibilités *
                </label>
                <select
                  id="disponibilites"
                  name="disponibilites"
                  required
                  value={formData.disponibilites}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1431] focus:border-transparent transition-colors"
                >
                  <option value="">Sélectionnez vos disponibilités</option>
                  {disponibiliteOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Métier principal */}
              <div>
                <label htmlFor="metierPrincipal" className="block text-sm font-medium text-gray-700 mb-2">
                  Métier principal (graphiste, dev, closer, etc.) *
                </label>
                <input
                  type="text"
                  id="metierPrincipal"
                  name="metierPrincipal"
                  required
                  value={formData.metierPrincipal}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1431] focus:border-transparent transition-colors"
                  placeholder="Développeur web"
                />
              </div>

              {/* Spécialités / Logiciels maîtrisés */}
              <div className="md:col-span-2">
                <label htmlFor="specialites" className="block text-sm font-medium text-gray-700 mb-2">
                  Spécialités / Logiciels maîtrisés *
                </label>
                <textarea
                  id="specialites"
                  name="specialites"
                  required
                  rows={3}
                  value={formData.specialites}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1431] focus:border-transparent transition-colors resize-none"
                  placeholder="React, Next.js, Node.js, Figma, Photoshop..."
                />
              </div>
            </div>
          </div>

          {/* Section 3: MISSIONS */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-[#8B1431]" />
              MISSIONS
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tarif */}
              <div>
                <label htmlFor="tarif" className="block text-sm font-medium text-gray-700 mb-2">
                  Tarif /heure ou /jour (Pour les freelances Digiqo ou Automat-X)
                </label>
                <input
                  type="text"
                  id="tarif"
                  name="tarif"
                  value={formData.tarif}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1431] focus:border-transparent transition-colors"
                  placeholder="300-500€/jour"
                />
              </div>

              {/* Délai de livraisons */}
              <div>
                <label htmlFor="delaiLivraison" className="block text-sm font-medium text-gray-700 mb-2">
                  Délai de livraisons habituels (Pour les freelances Digiqo ou Automat-X)
                </label>
                <input
                  type="text"
                  id="delaiLivraison"
                  name="delaiLivraison"
                  value={formData.delaiLivraison}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1431] focus:border-transparent transition-colors"
                  placeholder="48h - 1 semaine"
                />
              </div>

              {/* Portfolio */}
              <div className="md:col-span-2">
                <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-2">
                  Lien vers votre portfolio (Pour les freelances Digiqo ou Automat-X) *
                </label>
                <input
                  type="url"
                  id="portfolio"
                  name="portfolio"
                  required
                  value={formData.portfolio}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1431] focus:border-transparent transition-colors"
                  placeholder="https://portfolio.com"
                />
              </div>

              {/* Souhaiteriez-vous être salarié */}
              <div className="md:col-span-2">
                <label htmlFor="souhaiterieEtreSalarie" className="block text-sm font-medium text-gray-700 mb-2">
                  Souhaiteriez-vous être salarié(e) d'une de nos filiales à terme ?
                </label>
                <select
                  id="souhaiterieEtreSalarie"
                  name="souhaiterieEtreSalarie"
                  value={formData.souhaiterieEtreSalarie}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1431] focus:border-transparent transition-colors"
                >
                  <option value="">Sélectionnez une option</option>
                  <option value="Oui">Oui</option>
                  <option value="Non">Non</option>
                  <option value="Peut-être">Peut-être</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: COLLABORATION */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2 text-[#8B1431]" />
              COLLABORATION
            </h3>

            <div className="space-y-6">
              {/* Déjà travaillé avec nous */}
              <div>
                <label htmlFor="dejaCollabore" className="block text-sm font-medium text-gray-700 mb-2">
                  Déjà travaillé avec nous ? *
                </label>
                <select
                  id="dejaCollabore"
                  name="dejaCollabore"
                  required
                  value={formData.dejaCollabore}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1431] focus:border-transparent transition-colors"
                >
                  <option value="">Sélectionnez une option</option>
                  <option value="Oui">Oui</option>
                  <option value="Non">Non</option>
                </select>
              </div>

              {/* Si oui, sur quels projets */}
              {formData.dejaCollabore === 'Oui' && (
                <div>
                  <label htmlFor="projetsAnterieurs" className="block text-sm font-medium text-gray-700 mb-2">
                    Si oui, sur quel(s) projet(s) ?
                  </label>
                  <textarea
                    id="projetsAnterieurs"
                    name="projetsAnterieurs"
                    rows={3}
                    value={formData.projetsAnterieurs}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1431] focus:border-transparent transition-colors resize-none"
                    placeholder="Décrivez les projets sur lesquels vous avez travaillé avec nous..."
                  />
                </div>
              )}

              {/* Types de missions préférées */}
              <div>
                <label htmlFor="typeMissionsPreferees" className="block text-sm font-medium text-gray-700 mb-2">
                  Types de missions que vous préférez
                </label>
                <textarea
                  id="typeMissionsPreferees"
                  name="typeMissionsPreferees"
                  rows={3}
                  value={formData.typeMissionsPreferees}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1431] focus:border-transparent transition-colors resize-none"
                  placeholder="Projets longs termes, missions courtes, développement de A à Z, maintenance..."
                />
              </div>

              {/* Confirmation exactitude */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    id="confirmationExactitude"
                    name="confirmationExactitude"
                    required
                    checked={formData.confirmationExactitude}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 text-[#8B1431] border-gray-300 rounded focus:ring-[#8B1431]"
                  />
                  <span className="text-sm text-gray-700">
                    Je confirme que les informations fournies sont exactes et à jour. *
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Messages de statut */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Votre candidature a été envoyée avec succès ! Nous vous contacterons prochainement.
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center"
            >
              <AlertCircle className="w-5 h-5 mr-2" />
              Une erreur est survenue. Veuillez réessayer ou nous contacter directement : recrutement@digiqo.fr
            </motion.div>
          )}

          {/* Bouton de soumission */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={isSubmitting || !formData.confirmationExactitude}
              className={`
                px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 flex items-center gap-2
                ${isSubmitting || !formData.confirmationExactitude
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#8B1431] hover:bg-[#6B0F25] hover:shadow-lg transform hover:-translate-y-0.5'
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Envoyer ma candidature
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer info */}
        <div className="bg-gray-50 px-8 py-6 rounded-b-xl border-t border-gray-200">
          <div className="text-center text-sm text-gray-600">
            <p>
              En soumettant ce formulaire, vous acceptez que vos données soient traitées
              conformément à notre politique de confidentialité.
            </p>
            <p className="mt-2">
              Problème avec le formulaire ? Contactez-nous :
              <a href="mailto:recrutement@digiqo.fr" className="text-[#8B1431] hover:underline ml-1">
                recrutement@digiqo.fr
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}