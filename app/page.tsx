import React, { Suspense, lazy } from 'react';

// Lazy loading components
const Header = lazy(() => import('@/components/Header'));
const HomePage = lazy(() => import('@/components/Home'));
const Service = lazy(() => import('@/components/Service'));
const AiInterview = lazy(() => import('@/components/AiInterview'));
const AiSkill = lazy(() => import('@/components/AiSkill'));
const Application = lazy(() => import('@/components/Application'));
const Faq = lazy(() => import('@/components/Faq'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));

export default function Home() {
  return (
    <main>
      {/* Suspense with a fallback for loading state */}
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <HomePage />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Service />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <AiInterview />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <AiSkill />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Application />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Faq />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Contact />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </main>
  );
}
