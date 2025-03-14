'use client';

import React, { useMemo } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Shield, Scale, FileText, Server } from 'lucide-react';
import { motion } from 'motion/react';

const Legal: React.FC = () => {
  const { theme } = useTheme();

  const themeStyles = useMemo(() => ({
    text: theme === 'dark' ? 'text-white' : 'text-gray-900',
    subtext: theme === 'dark' ? 'text-gray-300' : 'text-gray-700',
    sectionBg: theme === 'dark' ? 'bg-[#0A051E]/50' : 'bg-gray-50',
    border: theme === 'dark' ? 'border-gray-800' : 'border-gray-200',
    link: theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500',
    iconColor: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
  }), [theme]);

  const sections = [
    {
      title: "Protection des Données",
      icon: <Shield className={`w-6 h-6 ${themeStyles.iconColor}`} />,
      content: [
        "Chez Swaft, nous collectons des données... que vous nous donnez.",
        "Les numéros & e-mails sont gardés précieusement, et non transférés à quicquonque. Nous nous engageons pour votre sécurité et votre confidentialité.",
        "Vous ne serez contactés qu'après avoir donné votre accord ainsi que vos coordonnées (numéro & mail).",
        "On ne fait ni coldcall, ni séquence de mailing de masse.",
        "Nous utilisons ces données exclusivement pour vous contacter, afin que de vous aider dans vos éventuelles problématiques.",
        "Vous pouvez à tout moment nous contacter pour les effacer, ou résilier un éventuel accompagnement."
      ]
    },
    {
      title: "Conditions de Résiliation et Remboursement",
      icon: <FileText className={`w-6 h-6 ${themeStyles.iconColor}`} />,
      content: [
        "Vous pouvez résilier à tout moment.",
        "Le remboursement est intégral si vous avez résilié durant les 7 premiers jours.",
        "Si vous résiliez durant les 8 au dernier jour de l'accompagnement, le remboursement sera partiel, de 25 à 50% en fonction de l'avancée.",
        "Si vous n'êtes pas satisfaits après la livraison 'finale' du produit, sachant que les retours sont illimités dans la durée de l'accompagnement jusqu'à votre pleine satisfaction, vous ne serez pas remboursé."
      ]
    },
    {
      title: "Règlement des Litiges",
      icon: <Scale className={`w-6 h-6 ${themeStyles.iconColor}`} />,
      content: [
        "Nous privilégions un règlement amiable, à défaut, le litige sera soumis aux tribunaux compétents."
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className={`min-h-screen py-32 px-4 sm:px-6 lg:px-8 'bg-gradient-to-b from-[#0A051E] to-black'`}>
      <motion.div 
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className={`text-4xl sm:text-5xl font-bold mb-6 text-center ${themeStyles.text} tracking-tight`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Mentions Légales
        </motion.h1>
        <motion.p 
          className={`text-center ${themeStyles.subtext} text-lg mb-12 max-w-2xl mx-auto`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Découvrez nos engagements légaux et notre politique de protection des données
        </motion.p>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={sectionVariants}
              className={`${themeStyles.sectionBg} rounded-2xl p-8 backdrop-blur-sm
                border ${themeStyles.border} transition-all duration-300 hover:shadow-lg
                hover:border-opacity-50 group`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  {section.icon}
                </div>
                <h2 className={`text-2xl sm:text-3xl font-semibold ${themeStyles.text}`}>
                  {section.title}
                </h2>
              </div>
              <div className="space-y-4">
                {section.content.map((text, i) => (
                  <p key={i} className={`${themeStyles.subtext} text-base sm:text-lg leading-relaxed`}>
                    {text}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}

          <motion.div
            variants={sectionVariants}
            className={`${themeStyles.sectionBg} rounded-2xl p-8 backdrop-blur-sm
              border ${themeStyles.border} transition-all duration-300 hover:shadow-lg
              hover:border-opacity-50 group`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                <Server className={`w-6 h-6 ${themeStyles.iconColor}`} />
              </div>
              <h2 className={`text-2xl sm:text-3xl font-semibold ${themeStyles.text}`}>
                Contact et Hébergement
              </h2>
            </div>
            <div className="space-y-4">
              <p className={`${themeStyles.subtext} text-base sm:text-lg leading-relaxed`}>
                Pour nous contacter : <Link href="/contact" className={`${themeStyles.link} underline font-medium`}>Page Contact</Link>
              </p>
              <p className={`${themeStyles.subtext} text-base sm:text-lg leading-relaxed`}>
                Hébergeur du site : Vercel
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={sectionVariants}
            className={`mt-16 pt-8 border-t ${themeStyles.border}`}
          >
            <p className={`${themeStyles.subtext} text-sm text-center max-w-2xl mx-auto`}>
              © Toutes les données, images, textes et pages de Swaft sont soumises à des droits d'auteur.
              Toute copie/utilisation sera suivie d'une plainte.
            </p>
            <p className={`${themeStyles.subtext} text-sm text-center mt-4 font-medium`}>
              Swaft : Ylian.B Clarel.R Nathan.B Théophyl.L
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Legal;