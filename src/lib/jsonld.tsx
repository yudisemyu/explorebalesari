const BASE_URL = "https://explorebalesari.online";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// =============================================
// Pre-built schema generators
// =============================================

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Desa Balesari",
    url: BASE_URL,
    description:
      "Website resmi Desa Balesari — desa wisata dengan pesona alam pegunungan di lereng Gunung Sumbing, Kabupaten Magelang, Jawa Tengah.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/berita?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: "Pemerintah Desa Balesari",
    url: BASE_URL,
    description:
      "Desa Balesari, Kecamatan Windusari, Kabupaten Magelang, Jawa Tengah — desa wisata dengan pesona alam pegunungan.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Windusari",
      addressRegion: "Jawa Tengah",
      addressCountry: "ID",
    },
  };
}

export function articleJsonLd(article: {
  title: string;
  slug: string;
  excerpt?: string | null;
  imageUrl?: string | null;
  author?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt || undefined,
    url: `${BASE_URL}/berita/${article.slug}`,
    image: article.imageUrl || undefined,
    datePublished: article.publishedAt || undefined,
    dateModified: article.updatedAt || article.publishedAt || undefined,
    author: {
      "@type": "Organization",
      name: article.author || "Desa Balesari",
    },
    publisher: {
      "@type": "Organization",
      name: "Desa Balesari",
      url: BASE_URL,
    },
  };
}

export function localBusinessJsonLd(business: {
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  phone?: string | null;
  address?: string | null;
  category?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description || undefined,
    url: `${BASE_URL}/umkm/${business.slug}`,
    image: business.imageUrl || undefined,
    telephone: business.phone || undefined,
    address: business.address
      ? {
          "@type": "PostalAddress",
          streetAddress: business.address,
          addressLocality: "Windusari",
          addressRegion: "Jawa Tengah",
          addressCountry: "ID",
        }
      : undefined,
  };
}

export function touristAttractionJsonLd(attraction: {
  title: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  location?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: attraction.title,
    description: attraction.description || undefined,
    url: `${BASE_URL}/wisata/${attraction.slug}`,
    image: attraction.imageUrl || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: attraction.location || "Desa Balesari",
      addressLocality: "Windusari",
      addressRegion: "Jawa Tengah",
      addressCountry: "ID",
    },
    isAccessibleForFree: true,
    touristType: "Wisatawan",
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}
