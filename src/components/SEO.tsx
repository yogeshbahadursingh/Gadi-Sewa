import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  nofollow?: boolean;
  structuredData?: object | object[];
}

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  noindex = false,
  nofollow = false,
  structuredData,
}: SEOProps) {
  const siteName = 'GadiBazar';
  const siteUrl = 'https://gadibazar.com';
  const defaultTitle = 'GadiBazar - Nepal\'s Trusted Vehicle Marketplace';
  const defaultDescription = 'Buy, sell, and inspect vehicles with verified Vehicle Passports. Nepal\'s most trusted automotive platform with professional inspections and complete ownership history.';
  const defaultImage = `${siteUrl}/og-image.jpg`;

  const robotsContent = `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`;

  return (
    <Helmet>
      {/* Title */}
      <title>{title ? `${title} | ${siteName}` : defaultTitle}</title>

      {/* Meta Description */}
      <meta name="description" content={description || defaultDescription} />

      {/* Keywords */}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Robots */}
      <meta name="robots" content={robotsContent} />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      {!canonical && <link rel="canonical" href={siteUrl} />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title ? `${title} | ${siteName}` : defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:url" content={canonical || siteUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_NP" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ? `${title} | ${siteName}` : defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={ogImage || defaultImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

// Helper function to generate vehicle structured data
export function generateVehicleSchema(vehicle: any, listing: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant}`,
    description: listing.description,
    image: listing.images[0],
    brand: {
      '@type': 'Brand',
      name: vehicle.make,
    },
    model: vehicle.model,
    vehicleModelDate: vehicle.year.toString(),
    vehicleConfiguration: vehicle.variant,
    fuelType: vehicle.fuelType,
    vehicleTransmission: vehicle.transmission,
    color: vehicle.color,
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: vehicle.mileage,
      unitCode: 'KMT',
    },
    offers: {
      '@type': 'Offer',
      price: listing.price,
      priceCurrency: 'NPR',
      availability: listing.status === 'ACTIVE' ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
      url: `https://gadibazar.com/listing/${listing.id}`,
      seller: {
        '@type': 'Person',
        name: 'GadiBazar Seller',
      },
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Registration Number',
        value: vehicle.registrationNumber,
      },
      {
        '@type': 'PropertyValue',
        name: 'Location',
        value: listing.location,
      },
      {
        '@type': 'PropertyValue',
        name: 'Inspected',
        value: listing.isInspected ? 'Yes' : 'No',
      },
      {
        '@type': 'PropertyValue',
        name: 'Vehicle Passport',
        value: listing.hasPassport ? 'Yes' : 'No',
      },
    ],
  };
}

// Helper function to generate breadcrumb schema
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://gadibazar.com${item.url}`,
    })),
  };
}

// Helper function to generate organization schema
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GadiBazar',
    url: 'https://gadibazar.com',
    logo: 'https://gadibazar.com/favicon.svg',
    description: 'Nepal\'s trusted vehicle marketplace with verified Vehicle Passports and professional inspections.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NP',
      addressLocality: 'Kathmandu',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Nepali'],
    },
    sameAs: [],
  };
}
