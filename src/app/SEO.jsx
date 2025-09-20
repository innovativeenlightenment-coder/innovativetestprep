"use client";

import Head from "next/head";

export default function SEO() {
  return (
    <Head>
      {/* Title & Description */}
      <title>
        Innovative Education Test Series App | FOUNDATION JEE NEET CET Mock Tests Miraj
      </title>
      <meta
        name="description"
        content="Join Innovative Education’s Test Series App by Shayanali, son of Shoukatali from Miraj. Practice JEE, NEET & CET with expert-designed mock tests. Call 9421567466."
      />

      {/* Keywords */}
      <meta
        name="keywords"
        content="test series app, online mock tests,FOUNDATION JEE NEET CET preparation, Innovative Education Miraj, Shayanali son of Shoukatali, foundation 8th 9th 10th test, best coaching Miraj just at MKCL Learning Center"
      />

      {/* Canonical */}
      <link rel="canonical" href="https://innovativetestprep.vercel.app//" />

      {/* Open Graph (Facebook/LinkedIn) */}
      <meta property="og:title" content="Innovative Education Test Series App" />
      <meta
        property="og:description"
        content="Best JEE, NEET & CET Test Series App in Miraj by Shayanali, son of Shoukatali."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://innovativetestprep.vercel.app//" />
      <meta property="og:image" content="https://innovativetestprep.vercel.app//og-image.jpg" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Innovative Education Test Series App" />
      <meta
        name="twitter:description"
        content="Practice FOUNDATION, JEE, NEET & CET Mock Tests. Call +91 9421567466."
      />
      <meta name="twitter:image" content="https://innovativetestprep.vercel.app//og-image.jpg" />

      {/* Local SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "Innovative Education Test Series",
            url: "https://innovativetestprep.vercel.app/",
            logo: "https://innovativetestprep.vercel.app/logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91 9421567466",
              contactType: "customer support",
              areaServed: "IN",
              availableLanguage: ["English", "Hindi", "Marathi"],
            },
            founder: {
              "@type": "Person",
              name: "Shayanali son of Shoukatali",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Miraj",
                addressRegion: "Maharashtra",
                addressCountry: "India",
              },
            },
            sameAs: [
              "https://facebook.com/yourpage",
              "https://instagram.com/yourpage",
              "https://linkedin.com/company/yourpage",
              "https://youtube.com/@yourchannel",
            ],
          }),
        }}
      />
    </Head>
  );
}
