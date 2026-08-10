import { GetStaticPaths, GetStaticProps } from 'next';
import { services, getServiceBySlug, ServiceSlug } from '@/lib/services';
import { getCreatifImages, type CreatifImage } from '@/lib/drive-creatifs';
import { SEO } from '@/components/SEO';
import { seoConfig } from '@/lib/seo-config';

// Import service components
import PubliciteEnLignePage from '@/components/ServicePages/publicite-en-ligne';
import DevWebPage from '@/components/ServicePages/dev-web';
import CommunityPage from '@/components/ServicePages/community';
import SEOPage from '@/components/ServicePages/seo';
import VideoPage from '@/components/ServicePages/video';
import IdentitePage from '@/components/ServicePages/identite';
import AuditPage from '@/components/ServicePages/audit';
import SitekeeperPage from '@/components/ServicePages/sitekeeper';

interface ServicePageProps {
  slug: ServiceSlug;
  /** Créatifs Drive du carrousel — uniquement pour le slug `creatifs`. */
  creatifImages?: CreatifImage[];
}

// Props transmises au composant de service (seul `creatifs` en consomme).
type ServiceComponentProps = Pick<ServicePageProps, 'creatifImages'>;

// Map slugs to components
const serviceComponents: Record<ServiceSlug, React.ComponentType<ServiceComponentProps>> = {
  'publicite-en-ligne': PubliciteEnLignePage,
  'sites-web': DevWebPage,
  'community-management': CommunityPage,
  'seo': SEOPage,
  'creatifs': VideoPage,
  'identite-de-marque': IdentitePage,
  'audit': AuditPage,
  'sitekeeper': SitekeeperPage
};

export default function ServicePage({ slug, creatifImages }: ServicePageProps) {
  const Component = serviceComponents[slug];
  const serviceSEO = seoConfig.pages.services[slug];
  
  if (!Component) {
    return <div>Service not found</div>;
  }

  return (
    <>
      <SEO
        title={serviceSEO.title}
        description={serviceSEO.description}
        keywords={serviceSEO.keywords}
        url={`${seoConfig.default.siteUrl}/services/${slug}`}
      />
      <Component creatifImages={creatifImages} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = services.map(service => ({
    params: { slug: service.slug }
  }));

  return {
    paths,
    fallback: false // No fallback, all paths are known at build time
  };
};

export const getStaticProps: GetStaticProps<ServicePageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      notFound: true
    };
  }

  // Le carrousel de /services/creatifs est alimenté par le dossier Drive
  // « CRÉATIFS CLIENTS DIGIQO » : ISR 24 h pour prendre les nouveaux visuels
  // sans redéploiement. Les autres services restent purement statiques.
  if (slug === 'creatifs') {
    return {
      props: {
        slug: slug as ServiceSlug,
        creatifImages: await getCreatifImages()
      },
      revalidate: 86400
    };
  }

  return {
    props: {
      slug: slug as ServiceSlug
    },
    revalidate: false // Static generation, no revalidation needed
  };
};