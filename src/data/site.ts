/**
 * SOURCE UNIQUE DE VÉRITÉ pour tout le contenu du site.
 * Modifie les valeurs ici : elles se propagent sur toutes les pages.
 *
 * Tout ce qui est marqué TODO doit être remplacé par tes vraies infos.
 */

export const site = {
  // ---------------------------------------------------------------- MARQUE
  brand: {
    name: 'Focusla',
    tagline: 'Coaching sportif personnalisé',
    shortDescription:
      'Coaching sportif personnalisé : programmes sur mesure, suivi nutritionnel et accompagnement pour atteindre tes objectifs durablement.',
    coachName: 'TODO_NOM_DU_COACH', // TODO : nom affiché sur la page À propos
    domain: 'focusla.shop',
    url: 'https://focusla.shop',
  },

  // --------------------------------------------------------------- CONTACT
  contact: {
    email: 'TODO@focusla.shop',   // TODO : ton adresse email pro
    phone: '+33 6 00 00 00 00',   // TODO : ton numéro (format affiché)
    phoneHref: '+33600000000',    // TODO : même numéro, format brut pour tel:
    city: 'TODO_VILLE',           // TODO : ta ville
    country: 'France',
    modes: ['En présentiel', 'En visio', 'Programmes à distance'],
  },

  // --------------------------------------------------------------- RÉSEAUX
  // Laisse une chaîne vide pour masquer le lien.
  social: {
    instagram: '', // TODO : https://instagram.com/ton_compte
    facebook: '',  // TODO : https://facebook.com/ta_page
    tiktok: '',    // TODO : https://tiktok.com/@ton_compte
    youtube: '',   // TODO : https://youtube.com/@ta_chaine
    whatsapp: '',  // TODO : https://wa.me/33600000000
  },

  // ------------------------------------------------------------ RÉSERVATION
  booking: {
    // TODO : colle ici ton lien Calendly
    // ex. https://calendly.com/focusla/seance-decouverte
    // Vide => un encart « bientôt disponible » s'affiche à la place du widget.
    calendlyUrl: '',
    ctaLabel: 'Réserver une séance',
    ctaNote: 'Première séance découverte offerte — 30 min, sans engagement',
  },

  // ------------------------------------------------------------- NAVIGATION
  nav: [
    { label: 'Accueil', href: '/' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Services', href: '/services' },
    { label: 'Réservation', href: '/reservation' },
    { label: 'Contact', href: '/contact' },
  ],

  // ------------------------------------------------------------------- SEO
  seo: {
    locale: 'fr_FR',
    lang: 'fr',
    ogImage: '/og-image.jpg', // image 1200x630 à déposer dans /public
    keywords: [
      'coach sportif',
      'coaching sportif',
      'préparation physique',
      'programme personnalisé',
      'suivi nutritionnel',
      'remise en forme',
    ],
  },
} as const;

export type Site = typeof site;
