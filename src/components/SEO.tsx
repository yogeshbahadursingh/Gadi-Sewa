import { useEffect } from 'react';

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

  useEffect(() => {
    // Update title
    document.title = title ? `${title} | ${siteName}` : defaultTitle;

    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description || defaultDescription);

    // Update or create keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Update robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', robotsContent);

    // Update canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical || siteUrl);

    // Update Open Graph tags
    const ogTags = {
      'og:type': ogType,
      'og:title': title ? `${title} | ${siteName}` : defaultTitle,
      'og:description': description || defaultDescription,
      'og:image': ogImage || defaultImage,
      'og:url': canonical || siteUrl,
      'og:site_name': siteName,
      'og:locale': 'en_NP',
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Update Twitter Card tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': title ? `${title} | ${siteName}` : defaultTitle,
      'twitter:description': description || defaultDescription,
      'twitter:image': ogImage || defaultImage,
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Update structured data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, canonical, ogImage, ogType, noindex, nofollow, structuredData, siteName, siteUrl, defaultTitle, defaultDescription, defaultImage, robotsContent]);

  return null;
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
