export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Samuel Moulinet',
    url: 'https://samuel-moulinet.fr',
    jobTitle: 'Développeur Web Full Stack',
    sameAs: [
      'https://github.com/moulinetsamuel',
      'https://www.linkedin.com/in/samuel-moulinet/',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
