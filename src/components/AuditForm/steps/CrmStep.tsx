'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FormField from '../FormField';
import { AuditFormData } from '@/src/lib/audit-types';
import { Database, Users, Mail, Zap, BarChart3, Settings, ArrowRight, RefreshCw } from 'lucide-react';

interface CrmStepProps {
  data: Partial<AuditFormData>;
  updateData: (field: string, value: any) => void;
}

export default function CrmStep({ data, updateData }: CrmStepProps) {
  const crmSystems = [
    { value: 'hubspot', label: 'HubSpot' },
    { value: 'salesforce', label: 'Salesforce' },
    { value: 'pipedrive', label: 'Pipedrive' },
    { value: 'zoho', label: 'Zoho CRM' },
    { value: 'monday', label: 'Monday.com' },
    { value: 'airtable', label: 'Airtable' },
    { value: 'excel', label: 'Excel/Sheets' },
    { value: 'custom', label: 'Solution sur mesure' },
    { value: 'none', label: 'Aucun CRM' },
  ];

  const automationTools = [
    { value: 'email-automation', label: 'Email automation' },
    { value: 'chatbots', label: 'Chatbots' },
    { value: 'lead-scoring', label: 'Lead scoring' },
    { value: 'workflows', label: 'Workflows automatisés' },
    { value: 'nurturing', label: 'Lead nurturing' },
    { value: 'segmentation', label: 'Segmentation automatique' },
    { value: 'notifications', label: 'Notifications automatiques' },
    { value: 'reporting', label: 'Reporting automatisé' },
  ];

  const dataUsage = [
    { value: 'sales-tracking', label: 'Suivi des ventes' },
    { value: 'customer-support', label: 'Support client' },
    { value: 'marketing-campaigns', label: 'Campagnes marketing' },
    { value: 'lead-management', label: 'Gestion des leads' },
    { value: 'customer-insights', label: 'Insights clients' },
    { value: 'forecasting', label: 'Prévisions' },
    { value: 'retention', label: 'Rétention client' },
    { value: 'upselling', label: 'Upselling/Cross-selling' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          CRM & Automatisation
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Analysons votre gestion de la relation client et automatisation
        </p>
      </div>

      {/* Système CRM actuel */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Database className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Système CRM actuel</h3>
        </div>
        <FormField
          label="Quel CRM utilisez-vous ?"
          name="crmSystem"
          type="select"
          options={crmSystems}
          value={data.crm?.toolsUsed?.[0] || ''}
          onChange={(e) => {
            const tools = e.target.value ? [e.target.value] : [];
            updateData('crm.toolsUsed', tools);
          }}
        />
        {data.crm?.toolsUsed && data.crm.toolsUsed.length > 0 && data.crm.toolsUsed[0] !== 'none' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Depuis combien de temps ?"
              name="crmDuration"
              type="select"
              options={[
                { value: '<6months', label: 'Moins de 6 mois' },
                { value: '6-12months', label: '6 à 12 mois' },
                { value: '1-2years', label: '1 à 2 ans' },
                { value: '2-5years', label: '2 à 5 ans' },
                { value: '5years+', label: 'Plus de 5 ans' },
              ]}
              value={''}
              onChange={() => {}}
              helper="Durée d'utilisation - non encore intégrée"
            />
            <FormField
              label="Nombre de contacts dans le CRM"
              name="contactsCount"
              type="select"
              options={[
                { value: '<100', label: 'Moins de 100' },
                { value: '100-500', label: '100 à 500' },
                { value: '500-1000', label: '500 à 1 000' },
                { value: '1000-5000', label: '1 000 à 5 000' },
                { value: '5000-10000', label: '5 000 à 10 000' },
                { value: '10000+', label: 'Plus de 10 000' },
              ]}
              value={''}
              onChange={() => {}}
              helper="Nombre de contacts - non encore intégré"
            />
          </div>
        )}
      </div>

      {/* Base de données clients */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Users className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Base de données clients</h3>
        </div>
        <div className="space-y-3">
          <FormField
            label=""
            name="hasCleanDatabase"
            type="checkbox"
            placeholder="Notre base de données est propre et à jour"
            value={data.crm?.hasDatabase || false}
            onChange={(e) => updateData('crm.hasDatabase', (e.target as HTMLInputElement).checked)}
          />
          <FormField
            label=""
            name="hasSegmentation"
            type="checkbox"
            placeholder="Nous avons une segmentation clients"
            value={data.crm?.hasSegmentation || false}
            onChange={(e) => updateData('crm.hasSegmentation', (e.target as HTMLInputElement).checked)}
          />
          <FormField
            label=""
            name="hasDataEnrichment"
            type="checkbox"
            placeholder="Nous enrichissons nos données clients"
            value={false}
            onChange={() => {}}
            helper="Enrichissement des données - non encore intégré"
          />
        </div>
        <div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Qualité des données (0-10)</span>
          <FormField
            label=""
            name="dataQuality"
            type="range"
            value={5}
            onChange={() => {}}
          />
        </div>
      </div>

      {/* Email marketing */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Mail className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Email marketing</h3>
        </div>
        <FormField
          label=""
          name="hasEmailMarketing"
          type="checkbox"
          placeholder="Nous faisons de l'email marketing"
          value={false}
          onChange={() => {}}
          helper="Email marketing - non encore intégré"
        />
        {false && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Fréquence d'envoi"
                name="emailFrequency"
                type="select"
                options={[
                  { value: 'daily', label: 'Quotidienne' },
                  { value: 'weekly', label: 'Hebdomadaire' },
                  { value: 'biweekly', label: 'Bi-mensuelle' },
                  { value: 'monthly', label: 'Mensuelle' },
                  { value: 'quarterly', label: 'Trimestrielle' },
                  { value: 'occasional', label: 'Occasionnelle' },
                ]}
                value={''}
                onChange={() => {}}
              />
              <FormField
                label="Taille de la liste email"
                name="emailListSize"
                type="select"
                options={[
                  { value: '<500', label: 'Moins de 500' },
                  { value: '500-1000', label: '500 à 1 000' },
                  { value: '1000-5000', label: '1 000 à 5 000' },
                  { value: '5000-10000', label: '5 000 à 10 000' },
                  { value: '10000+', label: 'Plus de 10 000' },
                ]}
                value={''}
                onChange={() => {}}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Taux d'ouverture moyen"
                name="openRate"
                type="select"
                options={[
                  { value: '<10', label: 'Moins de 10%' },
                  { value: '10-20', label: '10% à 20%' },
                  { value: '20-30', label: '20% à 30%' },
                  { value: '30-40', label: '30% à 40%' },
                  { value: '40+', label: 'Plus de 40%' },
                  { value: 'unknown', label: 'Non mesuré' },
                ]}
                value={''}
                onChange={() => {}}
              />
              <FormField
                label="Taux de clic moyen"
                name="clickRate"
                type="select"
                options={[
                  { value: '<2', label: 'Moins de 2%' },
                  { value: '2-5', label: '2% à 5%' },
                  { value: '5-10', label: '5% à 10%' },
                  { value: '10-15', label: '10% à 15%' },
                  { value: '15+', label: 'Plus de 15%' },
                  { value: 'unknown', label: 'Non mesuré' },
                ]}
                value={''}
                onChange={() => {}}
              />
            </div>
          </>
        )}
      </div>

      {/* Automatisation */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Zap className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Automatisation marketing</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {automationTools.map(tool => (
            <label
              key={tool.value}
              className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                value={tool.value}
                checked={data.crm?.automations?.includes(tool.value) || false}
                onChange={(e) => {
                  const current = data.crm?.automations || [];
                  if (e.target.checked) {
                    updateData('crm.automations', [...current, tool.value]);
                  } else {
                    updateData('crm.automations', current.filter(v => v !== tool.value));
                  }
                }}
                className="w-4 h-4 text-accent"
              />
              <span className="text-sm">{tool.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Utilisation des données */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <BarChart3 className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Utilisation des données CRM</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dataUsage.map(usage => (
            <label
              key={usage.value}
              className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                value={usage.value}
                checked={false}
                onChange={() => {
                  // Utilisation des données - non encore intégrée
                }}
                className="w-4 h-4 text-accent"
              />
              <span className="text-sm">{usage.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Intégrations */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Settings className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Intégrations et connectivité</h3>
        </div>
        <FormField
          label="Intégrations actuelles"
          name="integrations"
          placeholder="Ex: Site web, réseaux sociaux, outils comptables, e-commerce..."
          value={''}
          onChange={() => {}}
          helper="Intégrations - non encore intégrées"
        />
      </div>

      {/* Processus de vente */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <ArrowRight className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Processus de vente</h3>
        </div>
        <div className="space-y-3">
          <FormField
            label=""
            name="hasSalesPipeline"
            type="checkbox"
            placeholder="Nous avons un pipeline de vente défini"
            value={false}
            onChange={() => {}}
            helper="Pipeline de vente - non encore intégré"
          />
          <FormField
            label=""
            name="hasLeadScoring"
            type="checkbox"
            placeholder="Nous qualifions nos leads (lead scoring)"
            value={false}
            onChange={() => {}}
            helper="Lead scoring - non encore intégré"
          />
          <FormField
            label=""
            name="hasAutomatedFollowUp"
            type="checkbox"
            placeholder="Nous avons des relances automatisées"
            value={false}
            onChange={() => {}}
            helper="Relances automatisées - non encore intégrées"
          />
        </div>
      </div>

      {/* Cycle de vie client */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <RefreshCw className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Cycle de vie client</h3>
        </div>
        <FormField
          label="Durée moyenne du cycle de vente"
          name="salesCycleDuration"
          type="select"
          options={[
            { value: '<1week', label: 'Moins d\'une semaine' },
            { value: '1-2weeks', label: '1 à 2 semaines' },
            { value: '2-4weeks', label: '2 à 4 semaines' },
            { value: '1-3months', label: '1 à 3 mois' },
            { value: '3-6months', label: '3 à 6 mois' },
            { value: '6months+', label: 'Plus de 6 mois' },
          ]}
          value={''}
          onChange={() => {}}
          helper="Cycle de vente - non encore intégré"
        />
        <FormField
          label="Valeur vie client moyenne (LTV)"
          name="customerLTV"
          placeholder="Ex: 500€, 5000€, 50000€..."
          value={''}
          onChange={() => {}}
          helper="LTV client - non encore intégrée"
        />
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-accent/20">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          💡 <strong>Info:</strong> Un CRM bien configuré et utilisé peut augmenter les ventes de 29%, 
          la productivité commerciale de 34% et la précision des prévisions de 42%.
        </p>
      </div>
    </motion.div>
  );
}