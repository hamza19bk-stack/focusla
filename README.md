# Focusla — site de coaching sportif

Site vitrine pour **focusla.shop**, construit avec [Astro](https://astro.build),
hébergé gratuitement sur **GitHub Pages**.

---

## Démarrage rapide

```bash
npm install      # une seule fois
npm run dev      # ouvre http://localhost:4321
```

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement avec rechargement à chaud |
| `npm run build` | Génère le site statique dans `dist/` |
| `npm run preview` | Prévisualise le build de production en local |

---

## ✏️ Personnaliser le site

### 1. Tes informations — `src/data/site.ts`

**C'est le seul fichier à modifier pour la plupart des changements.** Nom, email, téléphone,
ville, réseaux sociaux, lien de réservation : tout est centralisé là et se propage sur toutes
les pages.

Cherche les `TODO` :

```bash
grep -rn "TODO" src/data/site.ts
```

À remplir en priorité :

| Champ | Ce qu'il faut mettre |
|---|---|
| `brand.coachName` | Ton nom, affiché sur la page À propos |
| `contact.email` | Ton adresse email professionnelle |
| `contact.phone` / `phoneHref` | Ton numéro (affiché / brut pour les liens `tel:`) |
| `contact.city` | Ta ville ou zone d'intervention |
| `social.*` | Tes réseaux — **laisse vide pour masquer le lien** |
| `booking.calendlyUrl` | Ton lien Calendly (voir ci-dessous) |

### 2. Activer la réservation en ligne

1. Crée un compte gratuit sur [calendly.com](https://calendly.com)
2. Crée un type d'événement (ex. « Séance découverte — 30 min »)
3. Copie l'URL publique (ex. `https://calendly.com/focusla/seance-decouverte`)
4. Colle-la dans `booking.calendlyUrl` dans `src/data/site.ts`

Tant que ce champ est vide, la page `/reservation` affiche un encart de repli
avec tes coordonnées — le site reste donc parfaitement fonctionnel sans Calendly.

### 3. Les textes des pages

Chaque page est un fichier dans `src/pages/`. Le texte est directement dans le HTML,
lisible et modifiable sans connaissance technique particulière.

### 4. Les couleurs et polices

Tout est dans les variables CSS en haut de `src/styles/global.css`.
Change une variable, elle s'applique partout.

---

## Structure du projet

```
focusla/
├── src/
│   ├── data/site.ts        ← TES INFOS (le fichier à modifier en premier)
│   ├── pages/              ← une page = un fichier
│   │   ├── index.astro         → focusla.shop/
│   │   ├── a-propos.astro      → focusla.shop/a-propos
│   │   ├── services.astro      → focusla.shop/services
│   │   ├── reservation.astro   → focusla.shop/reservation
│   │   └── contact.astro       → focusla.shop/contact
│   ├── layouts/Base.astro  ← structure HTML commune, SEO, métadonnées
│   ├── components/         ← Header, Footer, Section
│   └── styles/global.css   ← design system (couleurs, typo, espacements)
├── public/
│   └── CNAME               ← le domaine personnalisé — NE PAS SUPPRIMER
├── .github/workflows/
│   └── deploy.yml          ← déploiement automatique à chaque push
├── CONTRACT.md             ← documentation du design system
└── DEPLOIEMENT.md          ← configuration GitHub Pages + DNS Namecheap
```

---

## Mettre le site à jour

```bash
npm run build          # vérifie que tout compile avant de publier
git add -A
git commit -m "Mise à jour du contenu"
git push
```

Le déploiement est automatique : suis-le dans l'onglet **Actions** du dépôt GitHub.
Le site est en ligne ~1 minute plus tard.

---

## Première mise en ligne

Voir **[DEPLOIEMENT.md](DEPLOIEMENT.md)** — création du dépôt, activation de GitHub Pages
et configuration du DNS chez Namecheap, étape par étape.

---

## À ajouter plus tard si besoin

- **Images** : dépose-les dans `public/` et référence-les avec `/nom-du-fichier.jpg`
- **Image de partage social** : `public/og-image.jpg` en 1200×630 px
- **Formulaire de contact** : [Formspree](https://formspree.io) ou [Web3Forms](https://web3forms.com), gratuits et sans backend
- **Statistiques de visite** : [Plausible](https://plausible.io) ou [Umami](https://umami.is)
- **Section tarifs** : non incluse pour l'instant (choix volontaire)
- **Blog** : Astro gère nativement le Markdown via les *content collections*
