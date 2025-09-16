import { GetStaticPaths, GetStaticProps } from 'next';
import { services, getServiceBySlug, ServiceSlug } from '@/lib/services';
import { SEO } from '@/components/SEO';
import { seoConfig } from '@/lib/seo-config';

// Import service components
import PublicitePage from '@/components/ServicePages/publicite';
import PubliciteGooglePage from '@/components/ServicePages/publicite-google';
import DevWebPage from '@/components/ServicePages/dev-web';
import CommunityPage from '@/components/ServicePages/community';
import SEOPage from '@/components/ServicePages/seo';
import VideoPage from '@/components/ServicePages/video';
import IdentitePage from '@/components/ServicePages/identite';
import AuditPage from '@/components/ServicePages/audit';
import SitekeeperPage from '@/components/ServicePages/sitekeeper';

interface ServicePageProps {
  slug: ServiceSlug;
}

// Map slugs to components
const serviceComponents: Record<ServiceSlug, React.ComponentType> = {
  'publicite-meta': PublicitePage,
  'publicite-google': PubliciteGooglePage,
  'sites-web': DevWebPage,
  'community-management': CommunityPage,
  'seo': SEOPage,
  'creatifs': VideoPage,
  'identite-de-marque': IdentitePage,
  'audit': AuditPage,
  'sitekeeper': SitekeeperPage
};

export default function ServicePage({ slug }: ServicePageProps) {
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
      <Component />
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

  return {
    props: {
      slug: slug as ServiceSlug
    },
    revalidate: false // Static generation, no revalidation needed
  };
};