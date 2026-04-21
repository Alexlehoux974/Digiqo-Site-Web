import { formatPhoneForDisplay } from './phone-formatter'
import { servicesToHubSpot } from './hubspot-services-map'
import { formeJuridiqueToHubSpot } from './hubspot-forme-juridique-map'

const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID || '26596184'
const HUBSPOT_FORM_GUID = process.env.HUBSPOT_FORM_GUID_SITE_WEB || 'aa9580ee-87dc-4443-a51a-874277a99965'
const HUBSPOT_FORMS_API_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`

export type DigiqoFormSource =
  | 'contact'
  | 'audit'
  | 'devis-web'
  | 'devis-branding'
  | 'newsletter'
  | 'partenariats'

interface SubmitFormOptions {
  source: DigiqoFormSource
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  company?: string
  companyType?: string
  services?: string[]
  description?: string
  consent?: boolean
  pageUri?: string
  pageName?: string
  extraFields?: Array<{ name: string; value: string }>
}

/**
 * Soumet le formulaire via l'API HubSpot Forms Submissions.
 * - Crée ou met à jour le contact HubSpot
 * - Génère une activité "Soumission de formulaire" visible dans la timeline
 * - Populé les propriétés custom Digiqo
 *
 * @returns true si succès, false si échec (n'interrompt jamais le flux utilisateur)
 */
export async function submitDigiqoForm(opts: SubmitFormOptions): Promise<boolean> {
  if (!opts.email) return false

  const fields: Array<{ name: string; value: string }> = [
    { name: 'email', value: opts.email.toLowerCase().trim() },
    { name: 'digiqo_form_source', value: opts.source },
    { name: 'hs_lead_status', value: 'NEW' },
  ]

  if (opts.firstName) fields.push({ name: 'firstname', value: opts.firstName })
  if (opts.lastName) fields.push({ name: 'lastname', value: opts.lastName })

  const formattedPhone = formatPhoneForDisplay(opts.phone)
  if (formattedPhone) fields.push({ name: 'phone', value: formattedPhone })

  if (opts.company) fields.push({ name: 'company', value: opts.company })

  const formeJuridique = formeJuridiqueToHubSpot(opts.companyType)
  if (formeJuridique) fields.push({ name: 'forme_juridique_de_l_entreprise', value: formeJuridique })

  const servicesHubSpot = servicesToHubSpot(opts.services)
  if (servicesHubSpot) fields.push({ name: 'digiqo_services_souhaites', value: servicesHubSpot })

  if (typeof opts.consent === 'boolean') {
    fields.push({ name: 'digiqo_consent_marketing', value: opts.consent ? 'true' : 'false' })
  }

  if (opts.description) fields.push({ name: 'message', value: opts.description })

  if (opts.extraFields) fields.push(...opts.extraFields)

  const payload = {
    fields,
    context: {
      pageUri: opts.pageUri || 'https://digiqo.fr/',
      pageName: opts.pageName || `Digiqo - ${opts.source}`,
    },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text:
          "J'accepte que Digiqo traite les informations soumises pour être recontacté(e) au sujet de ma demande.",
      },
    },
  }

  try {
    const response = await fetch(HUBSPOT_FORMS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error(`[submitDigiqoForm ${opts.source}] HubSpot API error`, response.status, errText)
      return false
    }

    console.log(`[submitDigiqoForm ${opts.source}] HubSpot submission OK`)
    return true
  } catch (error) {
    console.error(`[submitDigiqoForm ${opts.source}] Network error`, error)
    return false
  }
}
