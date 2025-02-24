'use client';

import React, { useMemo } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { motion } from 'motion/react';
import { MessageCircle, Clock, Star, Heart, Users, MapIcon as WhatsappIcon } from 'lucide-react';

const FAQ: React.FC = () => {
  const { theme } = useTheme();

  const themeStyles = useMemo(() => ({
    text: theme === 'dark' ? 'text-white' : 'text-gray-900',
    subtext: theme === 'dark' ? 'text-gray-300' : 'text-gray-700',
    sectionBg: theme === 'dark' ? 'bg-[#0A051E]/50' : 'bg-gray-50',
    border: theme === 'dark' ? 'border-gray-800' : 'border-gray-200',
    link: theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500',
    iconColor: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
    highlight: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
  }), [theme]);

  const sections = [
    {
      title: "Pourquoi travailler avec Swaft et pas un autre ?",
      icon: <Users className={`w-6 h-6 ${themeStyles.iconColor}`} />,
      content: [
        "Chez Swaft, on privilégie le contact humain à tout autre chose, durant ces deux semaines, ce ne sera pas qu'une simple prestation de services, mais bien un échange humain, avec des valeurs et de l'entraide.",
        "Nous développerons votre Landing Page, avec des Designers et Développeurs prêts à tout pour vous satisfaire et vous aider.",
        "Car oui, nous n'allons pas simplement prendre votre argent en échange d'une prestation, nous allons vous aider, afin de multiplier vos gains.",
        "En plus de la Landing Page, vous allez repartir avec de la valeur et des documents pour repartir de plus belle.",
        "On gardera votre contact pour de futurs éventuels projets si le feeling passe et en plus d'élargir nos réseaux, nous pourrons vous aider à tous moments."
      ]
    },
    {
      title: "Combien de retours/modifications possibles ?",
      icon: <MessageCircle className={`w-6 h-6 ${themeStyles.iconColor}`} />,
      content: [
        "∞.",
        "En plus de ce nombre de retours/modifications assez avantageux, nous construirons votre Landing Page main dans la main, en ayant des échanges régulièrement au téléphone si possible pour vous tenir au fait des avancées. Vous pourrez décrire ce qui vous plait moins, et ce qui vous enjoue le plus.",
        "Et ce, dès l'Audit."
      ]
    },
    {
      title: "La page est livrée en combien de temps ?",
      icon: <Clock className={`w-6 h-6 ${themeStyles.iconColor}`} />,
      content: [
        "14 jours ou moins.",
        "Nous ne sommes pas les plus rapides, mais comme dit ci dessus, nous avons à cœur de respecter l'humain derrière la transaction, nous prendrons le temps de fournir un travail de qualité, de la valeur, des conseils, et des échanges réguliers pour un résultat qui vous plaira, et un bon souvenir de nous."
      ]
    },
    {
      title: "La page sera-t-elle parfaite ?",
      icon: <Star className={`w-6 h-6 ${themeStyles.iconColor}`} />,
      content: [
        "\"La perfection n'est pas de ce monde\"",
        "Notre objectif est de satisfaire l'humain en face de nous.",
        "Nous vous écouterons jusqu'à ce que vous serez satisfait dans ce délai de 14 jours, nous vous fournirons plus que ce que vous désiriez et nous tâcherons de vous aider en boostant vos KPIS tout en créant un contact humain avec vous.",
        "Imparfait certes, mais Humain."
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className={`min-h-screen py-32 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gradient-to-b from-[#0A051E] to-black' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
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
          Questions Fréquentes
        </motion.h1>
        <motion.p 
          className={`text-center ${themeStyles.subtext} text-lg mb-12 max-w-2xl mx-auto`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Découvrez tout ce que vous devez savoir sur notre approche unique et personnalisée
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
                  <p key={i} className={`${themeStyles.subtext} text-base sm:text-lg leading-relaxed
                    ${text === '∞.' ? 'text-3xl font-bold ' + themeStyles.highlight : 
                    text.startsWith('"') ? 'font-medium ' + themeStyles.highlight : ''}`}>
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
                <Heart className={`w-6 h-6 ${themeStyles.iconColor}`} />
              </div>
              <h2 className={`text-2xl sm:text-3xl font-semibold ${themeStyles.text}`}>
                Contact
              </h2>
            </div>
            <div className="space-y-4">
              <p className={`${themeStyles.subtext} text-base sm:text-lg leading-relaxed`}>
                Pour toute question, n'hésitez pas à nous contacter sur WhatsApp :
              </p>
              <Link 
                href="https://wa.me/33600000000" 
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-700 hover:bg-green-800 transition-colors duration-300 text-white font-medium`}
              >
                <WhatsappIcon className="w-5 h-5" />
                Nous contacter sur WhatsApp
              </Link>
            </div>
          </motion.div>

          <motion.div 
            variants={sectionVariants}
            className={`mt-16 pt-8 border-t ${themeStyles.border}`}
          >
            <p className={`${themeStyles.subtext} text-sm text-center max-w-2xl mx-auto font-medium`}>
              Swaft — Une approche humaine du développement web
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQ;