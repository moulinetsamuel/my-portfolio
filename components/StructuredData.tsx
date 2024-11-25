export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Samuel Moulinet',
    url: 'https://samuel-moulinet.fr',
    jobTitle: 'Développeur Web Full Stack',
    sameAs: [
      'https://github.com/moulinetsamuel',
      'www.linkedin.com/in/samuel-moulinet-a48576305',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
