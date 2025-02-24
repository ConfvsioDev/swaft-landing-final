'use client';

import React from 'react';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';

export default function ReserverPage() {
  const posthog = usePostHog();

  useEffect(() => {
    // Track page view
    posthog?.capture('page_view', {
      page: 'reserver'
    });
  }, [posthog]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center">
        Réserver un Appel
      </h1>
      <p className="text-lg text-center max-w-2xl mb-8">
        Remplissez le formulaire ci-dessous pour réserver un appel de consultation gratuit avec notre équipe.
      </p>
      
      {/* Add your booking form here */}
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <form className="space-y-4">
          {/* Form fields would go here */}
          <p className="text-center">Formulaire de réservation à implémenter</p>
        </form>
      </div>
    </div>
  );
} 