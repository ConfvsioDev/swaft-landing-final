'use client';

import React from 'react';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const posthog = usePostHog();
  // WhatsApp URL - remplacer par votre numéro
  const whatsappUrl = "https://wa.me/33600000000";

  useEffect(() => {
    // Track page view
    posthog?.capture('page_view', {
      page: 'contact'
    });
  }, [posthog]);

  const handleWhatsAppClick = () => {
    posthog?.capture('whatsapp_contact', {
      source: 'contact_page'
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center">
        Contactez-nous
      </h1>
      <p className="text-lg text-center max-w-2xl mb-8">
        Vous avez des questions ? N'hésitez pas à nous contacter.
      </p>
      
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <Link 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-700 hover:bg-green-800 transition-colors duration-300 text-white font-medium w-full justify-center"
        >
          <MessageCircle className="w-5 h-5" />
          Nous contacter sur WhatsApp
        </Link>
      </div>
    </div>
  );
} 