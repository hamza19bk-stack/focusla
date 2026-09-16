# CONTRAT DE FONDATION — Focusla

> Document de référence pour tous les agents qui écrivent des pages.
> Tu ne dois **rien** inventer en dehors de ce contrat : la fondation
> (`src/styles/global.css`, `src/layouts/Base.astro`, `src/components/*.astro`) existe déjà.
> Ne modifie pas ces fichiers ; compose avec eux.

---

## 1. Règles non négociables

1. **Langue** : tout le texte visible est en français, accents corrects (les fichiers sont en UTF‑8,
   c'est vérifié au build). Typographie française :
   - guillemets « … » (avec espaces insécables à l'intérieur : `«&nbsp;texte&nbsp;»`),
   - apostrophes typographiques `’` (pas `'`) dans les textes rédigés,
   - **espace insécable avant `:` `;` `!` `?` `%`** → écris `&nbsp;` :
     `Objectif&nbsp;: progresser.` / `Prêt&nbsp;?`
   - tiret cadratin `—` pour les incises.
2. **Aucune coordonnée en dur.** Email, téléphone, ville, réseaux, lien Calendly, navigation,
   nom de marque : **toujours** depuis `src/data/site.ts`.
3. **Périmètre** : 5 pages (`/`, `/a-propos`, `/services`, `/reservation`, `/contact`).
   **Pas** de formulaire de contact, **pas** de prix ni de tarifs, **pas** de blog.
4. **Mobile‑first** : écris le style de base pour le mobile, puis élargis avec
   `@media (min-width: …em)`. Points de bascule utilisés par la fondation :
   `40em` (640px), `48em` (768px), `62em` (992px).
5. **Hiérarchie des titres** : **un seul `<h1>` par page** (dans la page, jamais dans un composant),
   puis `<h2>` par section, `<h3>` dans les cartes. Jamais de saut de niveau.
6. **Zéro dépendance externe** hors Google Fonts (déjà chargées par `Base.astro`) et, sur
   `/reservation` uniquement, le script Calendly. Pas d'images binaires : dégradés CSS, formes,
   SVG inline.
7. **Accessibilité WCAG AA** : contrastes respectés (voir §3), `alt=""` sur les SVG décoratifs
   (`aria-hidden="true" focusable="false"`), libellés explicites, cibles tactiles ≥ 44px,
   ordre de tabulation naturel.
8. **Pas de `<style>` global** dans une page : utilise les classes utilitaires. Si une page a
   vraiment besoin de style spécifique, mets‑le dans un `<style>` **scoped** de cette page,
   en réutilisant les variables `--…` existantes (jamais de couleur en dur).

---

## 2. Squelette d'une page

```astro
---
import Base from '../layouts/Base.astro';
import Section from '../components/Section.astro';
import { site } from '../data/site';
---

<Base
  title="Services"
  description="Coaching individuel, préparation physique et suivi à distance : des accompagnements sur mesure pour progresser durablement."
>
  <!-- Hero : un seul <h1> sur la page -->
  <section class="section section--tight">
    <div class="container">
      <p class="eyebrow">Nos accompagnements</p>
      <h1>Un cadre clair,<br /><span class="mark">des résultats</span></h1>
      <p class="lead">…</p>
      <div class="cluster">
        <a class="btn btn--primary btn--lg" href="/reservation">{site.booking.ctaLabel}</a>
        <a class="btn btn--ghost btn--lg" href="/contact">Poser une question</a>
      </div>
    </div>
  </section>

  <Section id="offres" eyebrow="Le programme" title="Trois formules" subtitle="…">
    <div class="grid grid--3">…</div>
  </Section>
</Base>
```

- `Base.astro` fournit déjà `<html lang="fr">`, le `<head>` complet (SEO, Open Graph, Twitter,
  canonique, favicon, JSON‑LD), le skip link, le `Header`, le `<main id="contenu">` et le `Footer`.
- **N'importe jamais `Header` ni `Footer` dans une page.**
- N'importe pas `global.css` : `Base.astro` s'en charge.
- Chemin des imports depuis `src/pages/*.astro` : `../layouts/Base.astro`,
  `../components/Section.astro`, `../data/site`.

---

## 3. Variables CSS (`:root` dans `src/styles/global.css`)

### 3.1 Couleurs

| Variable | Valeur | Usage |
| --- | --- | --- |
| `--c-bg` | `#0B0D10` | fond principal (encre) |
| `--c-bg-deep` | `#06080A` | pied de page, zones profondes |
| `--c-surface` | `#13161B` | cartes, panneaux |
| `--c-surface-2` | `#1B2027` | survol, puces, champs |
| `--c-surface-3` | `#242B34` | séparateur marqué |
| `--c-border` | `rgba(255,255,255,.10)` | bordure standard |
| `--c-border-strong` | `rgba(255,255,255,.20)` | bordure appuyée |
| `--c-text` | `#F2F4F7` | texte principal (17,1:1 sur `--c-bg`) |
| `--c-text-soft` | `#C3CBD6` | paragraphes secondaires (12,0:1) |
| `--c-text-muted` | `#A7B0BD` | légendes, méta (8,9:1) — **min. 14px** |
| `--c-text-faint` | `#7C8696` | **décor uniquement**, jamais de texte courant |
| `--c-text-on-accent` | `#0B0D10` | texte posé sur `--c-accent` (15,0:1) |
| `--c-accent` | `#C6F24E` | VOLT, accent principal (15,0:1 sur fond) |
| `--c-accent-bright` | `#D9FF6E` | survol / focus |
| `--c-accent-dim` | `#9CC431` | traits fins, bordures |
| `--c-accent-soft` | `rgba(198,242,78,.12)` | fond de pastille accent |
| `--c-accent-2` | `#FF6A2B` | EMBER, accent secondaire (6,8:1) |
| `--c-accent-2-soft` | `rgba(255,106,43,.14)` | fond de pastille secondaire |
| `--c-success` / `--c-warning` / `--c-danger` | `#5BD98A` / `#FFC857` / `#FF6B6B` | états |
| `--grad-accent` | dégradé volt → ember | filets, traits d'accent |
| `--grad-surface` | voile blanc très léger | relief des cartes |
| `--grad-line` | filet lumineux horizontal | séparateurs |

**Règle de contraste** : texte clair sur fond sombre uniquement. Sur un fond `--c-accent`,
le texte doit être `--c-text-on-accent`. N'écris jamais de texte en `--c-accent-2` sous 14px.

### 3.2 Typographie

- `--font-display` : **Oswald** (condensée, percutante) → titres, boutons, sur‑titres, chiffres.
- `--font-body` : **Inter** → corps de texte. Appliquée par défaut sur `<body>`.
- `--font-mono` : monospace système.
- Échelle fluide `clamp()` : `--step--2`, `--step--1`, `--step-0` (base ≈16→18px), `--step-1`,
  `--step-2`, `--step-3`, `--step-4`, `--step-5`, `--step-6` (≈45→73px).
- Interlignes : `--leading-tight` (1.05), `--leading-snug` (1.2), `--leading-normal` (1.65),
  `--leading-loose` (1.8).
- Interlettrage : `--tracking-tight`, `--tracking-normal`, `--tracking-wide`, `--tracking-widest`.
- Largeur de ligne : `--measure` (68ch), `--measure-tight` (54ch).

Tailles appliquées automatiquement : `h1` = `--step-5` (majuscules), `h2` = `--step-4`
(majuscules), `h3` = `--step-2`, `h4` = `--step-1`, `h5`/`h6` = petites capitales.
Les classes `.h1` … `.h4` donnent le même rendu sans changer le niveau sémantique
(utile si tu as besoin d'un `<h3>` qui **ressemble** à un `<h2>`).

### 3.3 Espacements, conteneurs, formes

- Espaces fluides : `--space-3xs`, `--space-2xs`, `--space-xs`, `--space-s`, `--space-m`,
  `--space-l`, `--space-xl`, `--space-2xl`, `--space-3xl` ; `--gutter` (marge latérale).
- Conteneurs : `--container` (74rem), `--container-wide` (84rem), `--container-narrow` (54rem),
  `--container-xs` (40rem).
- Rayons : `--radius-xs|s|m|l|xl|pill`.
- Ombres : `--shadow-xs|s|m|l`, `--shadow-accent`, `--ring`.
- Mouvement : `--ease`, `--ease-out`, `--dur-fast` (140ms), `--dur` (240ms), `--dur-slow` (480ms),
  raccourci `--transition`.
- Divers : `--header-h` (hauteur de l'en‑tête collant), `--border-1`, `--z-header`, `--z-menu`,
  `--z-top`.

---

## 4. Classes utilitaires

### 4.1 Mise en page

| Classe | Effet |
| --- | --- |
| `.container` | largeur max 74rem, centré, gouttières latérales |
| `.container--wide` / `--narrow` / `--xs` | 84rem / 54rem / 40rem |
| `.section` | rythme vertical standard (`--space-3xl`) + `position: relative` |
| `.section--tight` | rythme réduit (`--space-2xl`) |
| `.section--flush-top` / `--flush-bottom` | supprime le padding haut / bas |
| `.section--alt` | fond légèrement éclairci (alternance de sections) |
| `.section--panel` | bloc plein `--c-surface` avec filets haut/bas |
| `.section--rule` | filet lumineux en haut de section |
| `.section__head` / `--center` | bloc d'en‑tête de section (géré par `Section.astro`) |
| `.section__title`, `.section__subtitle` | titre / accroche de l'en‑tête |

```html
<section class="section section--alt">
  <div class="container">…</div>
</section>
```

### 4.2 Flux et grilles

| Classe | Effet |
| --- | --- |
| `.stack` | colonne flex, espace uniforme (`--stack-space`, défaut `--space-s`) |
| `.stack--2xs .stack--xs .stack--s .stack--m .stack--l .stack--xl` | règle l'espace |
| `.cluster` | ligne flex qui passe à la ligne (boutons, puces) |
| `.cluster--center`, `.cluster--between`, `.cluster--xs` | alignement / espace |
| `.flow > * + *` | marge haute entre enfants (`--flow-space`) |
| `.grid` | grille 1 colonne par défaut, gap `--space-m` |
| `.grid--2` | 2 colonnes à partir de 40em |
| `.grid--3` | 2 colonnes à 40em, 3 colonnes à 62em |
| `.grid--4` | 2 colonnes à 40em, 4 colonnes à 62em |
| `.grid--auto` | colonnes automatiques ; règle `--grid-min` (défaut 17rem) |
| `.grid--sidebar` / `--sidebar-left` | 2 colonnes asymétriques (≥62em) |
| `.grid--gap-s` / `--gap-l` | gap resserré / élargi |
| `.items-center`, `.items-start` | alignement vertical dans une grille |

```html
<div class="grid grid--3">
  <article class="card">…</article>
  <article class="card">…</article>
  <article class="card">…</article>
</div>

<div class="grid grid--auto" style="--grid-min: 22rem">…</div>

<div class="stack stack--m">
  <h2>Titre</h2>
  <p class="lead">…</p>
</div>
```

### 4.3 Texte

| Classe | Effet |
| --- | --- |
| `.eyebrow` | sur‑titre majuscules accent, précédé d'un trait (`.eyebrow--plain` = sans trait) |
| `.lead` | paragraphe d'accroche (`--step-1`, `--c-text-soft`, largeur limitée) |
| `.prose` | bloc de texte long : largeur de ligne + rythme vertical automatiques |
| `.display` | titre XXL (`--step-6`), pour le hero de l'accueil |
| `.h1 .h2 .h3 .h4` | rendu visuel d'un niveau sans en changer la sémantique |
| `.mark` | mot en couleur accent dans un titre |
| `.mark--box` | mot surligné (pavé accent, texte sombre) |
| `.text-accent`, `.text-accent-2`, `.text-muted`, `.text-soft` | couleurs de texte |
| `.text-center`, `.text-balance`, `.mx-auto` | alignement / équilibre |
| `.measure`, `.measure--tight` | limite la longueur de ligne |
| `.sr-only` | visible uniquement pour les lecteurs d'écran |

```html
<h1>Deviens <span class="mark">plus fort</span> chaque semaine</h1>
<p class="lead">Un programme construit autour de ton quotidien, pas l’inverse.</p>

<div class="prose">
  <p>…</p>
  <h3>Comment&nbsp;?</h3>
  <p>…</p>
</div>
```

### 4.4 Boutons

| Classe | Effet |
| --- | --- |
| `.btn` | base obligatoire (Oswald, majuscules, pilule, hauteur ≥48px) |
| `.btn--primary` | fond volt, texte sombre — **une seule action principale par vue** |
| `.btn--ghost` | contour, fond transparent — action secondaire |
| `.btn--solid` | fond clair, texte sombre — sur fond coloré |
| `.btn--quiet` | sans bordure, façon lien |
| `.btn--lg` / `.btn--sm` | plus grand / plus petit |
| `.btn--block` | pleine largeur (utile en mobile) |

```html
<div class="cluster">
  <a class="btn btn--primary btn--lg" href="/reservation">Réserver une séance</a>
  <a class="btn btn--ghost btn--lg" href="/services">Voir les accompagnements</a>
</div>
```

Un SVG inline placé dans un `.btn` est automatiquement dimensionné (1.15em).
Pour un bouton désactivé visuellement : `aria-disabled="true"`.

### 4.5 Cartes et blocs

| Classe | Effet |
| --- | --- |
| `.card` | carte surface + bordure + ombre, colonne flex, gap `--space-xs` |
| `.card--pad-l` | padding généreux |
| `.card--flat` / `.card--bare` | sans ombre / totalement dépouillée |
| `.card--hover` | effet de survol (ajoute-le, ou utilise `<a class="card">`) |
| `.card--accent` | bordure accent + filet dégradé en haut |
| `.card--featured` | fond teinté accent, pour l'offre mise en avant |
| `.card__title`, `.card__text`, `.card__meta`, `.card__foot` | éléments internes |
| `.icon-badge` (`--2`, `--round`) | pastille d'icône 3rem, SVG 24px à l'intérieur |
| `.step-number` | pastille numérotée (étapes de la méthode) |
| `.chip` (`--accent`, `--dot`) | étiquette pilule |
| `.list-check` | liste à coches accent (`<ul class="list-check"><li>…`) |
| `.stat`, `.stat__value`, `.stat__label` | chiffre clé |
| `.divider`, `.divider--glow` | séparateurs |
| `.visual` (`--grid`, `--ratio`, `--square`) | bloc décoratif qui remplace une photo |
| `.callout` | bandeau d'appel à l'action (fond dégradé, bordure accent) |

```html
<article class="card card--hover">
  <span class="icon-badge" aria-hidden="true">
    <svg viewBox="0 0 24 24" focusable="false"><path d="…" /></svg>
  </span>
  <h3 class="card__title">Coaching individuel</h3>
  <p class="card__text">Séances en tête‑à‑tête, progression suivie semaine après semaine.</p>
  <ul class="list-check">
    <li>Bilan de départ complet</li>
    <li>Programme ajusté chaque mois</li>
  </ul>
  <p class="card__foot"><a class="btn btn--ghost btn--sm" href="/reservation">Réserver</a></p>
</article>

<div class="callout">
  <div class="stack stack--m">
    <h2>Prêt à commencer&nbsp;?</h2>
    <p class="lead">…</p>
    <div class="cluster"><a class="btn btn--primary" href="/reservation">…</a></div>
  </div>
</div>

<div class="visual visual--grid visual--ratio" role="img"
     aria-label="Illustration abstraite d’un mouvement d’entraînement"></div>
```

> `.visual` purement décoratif : laisse-le sans `role` ni `aria-label`.
> S'il porte du sens, donne-lui `role="img"` + `aria-label` en français.

### 4.6 Animations

- `.reveal` : apparition au défilement. `Base.astro` ajoute `.is-visible` via
  `IntersectionObserver`. **Sans JavaScript, le contenu reste visible** — ne cache jamais rien
  autrement. Décalage : `style="--reveal-delay: 120ms"`.
- `.animate-fade-up`, `.animate-fade` + `.delay-1` … `.delay-4` : animation immédiate
  (réservée au hero, au-dessus de la ligne de flottaison).
- Tout est neutralisé sous `@media (prefers-reduced-motion: reduce)`. N'ajoute pas d'animation
  sans prévoir la même neutralisation.

```html
<article class="card reveal" style="--reveal-delay: 90ms">…</article>
```

---

## 5. Composants

### 5.1 `Base.astro` — `src/layouts/Base.astro`

| Prop | Type | Défaut | Rôle |
| --- | --- | --- | --- |
| `title` | `string` | **requis** | titre de page **sans** la marque ; le layout produit `« Titre — Focusla »` (il n'ajoute rien si le titre contient déjà « Focusla ») |
| `description` | `string` | `site.brand.shortDescription` | meta description (vise 140–160 caractères, unique par page) |
| `canonical` | `string` | URL courante | chemin absolu (`/services`) ou URL complète ; la barre oblique finale est normalisée |
| `ogImage` | `string` | `site.seo.ogImage` | image sociale |
| `ogType` | `'website' \| 'article'` | `'website'` | type Open Graph |
| `noindex` | `boolean` | `false` | ajoute `robots: noindex, nofollow` |
| `bodyClass` | `string` | `''` | classe supplémentaire sur `<body>` |

Slots : slot **par défaut** (le contenu de `<main>`) et slot nommé **`head`**
(balises additionnelles dans le `<head>` — par exemple le script Calendly de `/reservation`).

```astro
<Base title="Réservation" description="…">
  <link slot="head" rel="preconnect" href="https://assets.calendly.com" />
  …
</Base>
```

Le layout génère aussi le JSON‑LD `HealthAndBeautyBusiness` à partir de `site.ts` :
**n'ajoute pas de second bloc `LocalBusiness`** dans une page (un `FAQPage` ou un `BreadcrumbList`
via le slot `head` reste possible).

### 5.2 `Section.astro` — `src/components/Section.astro`

Rend `<section class="section"><div class="container">` + en‑tête optionnel + slot.

| Prop | Type | Défaut | Rôle |
| --- | --- | --- | --- |
| `id` | `string` | — | ancre posée sur `<section>` |
| `eyebrow` | `string` | — | sur‑titre (`.eyebrow`) |
| `title` | `string` | — | titre de section |
| `subtitle` | `string` | — | accroche sous le titre |
| `as` | `'section' \| 'div' \| 'article' \| 'aside'` | `'section'` | balise racine |
| `headingLevel` | `2 \| 3 \| 4` | `2` | niveau du titre rendu |
| `variant` | `'default' \| 'alt' \| 'panel'` | `'default'` | fond |
| `align` | `'left' \| 'center'` | `'left'` | alignement de l'en‑tête |
| `width` | `'default' \| 'wide' \| 'narrow' \| 'xs'` | `'default'` | largeur du conteneur |
| `spacing` | `'default' \| 'tight' \| 'none'` | `'default'` | rythme vertical |
| `reveal` | `boolean` | `true` | anime l'en‑tête à l'apparition |
| `class` | `string` | `''` | classes ajoutées sur `<section>` |

Slots : **par défaut** (contenu) et **`actions`** (boutons placés sous l'en‑tête).
Si `id` **et** `title` sont fournis, la section reçoit `aria-labelledby` automatiquement.
Sans `title`/`eyebrow`/`subtitle`/`actions`, aucun en‑tête n'est rendu.

```astro
<Section id="methode" eyebrow="La méthode" title="Trois piliers" subtitle="…" variant="alt">
  <a slot="actions" class="btn btn--ghost" href="/services">Voir les accompagnements</a>
  <div class="grid grid--3">…</div>
</Section>
```

Utilise `Section` pour les sections courantes ; écris une `<section class="section">` à la main
uniquement pour le hero (qui contient le `<h1>` et une mise en page particulière).

### 5.3 `Header.astro` et `Footer.astro`

Aucune prop, insérés par `Base.astro`. **Ne les importe pas.**

- `Header` : logo « Focusla », navigation issue de `site.nav`, état actif via `aria-current="page"`
  (comparaison de `Astro.url.pathname` insensible à la barre oblique finale), bouton
  « Réserver » vers `/reservation`, menu burger mobile (aria-expanded / aria-controls, fermeture
  à l'Échap et au clic sur un lien, blocage du défilement) sous 62em.
- `Footer` : marque, réseaux sociaux (**seuls ceux renseignés apparaissent**), navigation
  secondaire, contact (`mailto:`, `tel:`), modalités, CTA, année calculée au build, mentions.

---

## 6. Utiliser `site.ts`

```astro
---
import { site } from '../data/site';
---
<a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
<a href={`tel:${site.contact.phoneHref}`}>{site.contact.phone}</a>
```

Forme de l'objet (extrait) :

- `site.brand` : `name`, `tagline`, `shortDescription`, `coachName`, `domain`, `url`
- `site.contact` : `email`, `phone` (affichage), `phoneHref` (pour `tel:`), `city`, `country`,
  `modes` (tableau)
- `site.social` : `instagram`, `facebook`, `tiktok`, `youtube`, `whatsapp` — **chaînes vides**
- `site.booking` : `calendlyUrl` (peut être vide), `ctaLabel`, `ctaNote`
- `site.nav` : `[{ label, href }]`
- `site.seo` : `locale`, `lang`, `ogImage`, `keywords`

### Gestion des valeurs manquantes — **obligatoire**

L'objet est `as const` : les champs sont en lecture seule et typés littéralement.
Si TypeScript se plaint d'un `.filter()` ou d'un `.join()` sur un tableau `readonly`,
copie-le d'abord : `[...site.contact.modes]`.

```astro
---
// 1. Réseau social vide -> aucun lien rendu
const instagram = site.social.instagram;
// 2. Valeur de remplissage « TODO_… » -> on ne l'affiche pas
const affichable = (v: string) => v.trim() !== '' && !v.trim().startsWith('TODO_');
const ville = affichable(site.contact.city) ? site.contact.city : '';
---
{instagram && <a class="btn btn--ghost btn--sm" href={instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
{ville && <p class="text-muted">Séances en présentiel à {ville}.</p>}
```

Convention retenue par la fondation :

- `email` et `phone` sont **toujours affichés** (ce sont des gabarits prêts à être remplacés,
  et une page contact sans contact serait pire) ;
- les jetons `TODO_…` (`city`, `coachName`) ne sont **jamais** rendus tels quels — prévois une
  formulation de repli (« en présentiel et à distance », « ton coach ») ;
- rien qui commence par `TODO` n'entre dans le JSON‑LD ni dans les métadonnées (déjà géré par
  `Base.astro`).

### Réservation (`/reservation`)

```astro
{site.booking.calendlyUrl
  ? <!-- widget Calendly -->
  : <!-- encart de repli : « Réservation en ligne bientôt disponible »
         + lien mailto: et tel: depuis site.contact -->}
```

Le script Calendly n'est chargé **que** si `site.booking.calendlyUrl` est renseigné.
`site.booking.ctaNote` est la mention à afficher sous le bouton de réservation.

---

## 7. Check‑list avant de rendre une page

- [ ] Un seul `<h1>`, hiérarchie `h2`/`h3` continue.
- [ ] `title` et `description` uniques, en français, sans le nom de marque dans `title`.
- [ ] Aucune coordonnée, aucun lien social, aucun libellé de nav écrit en dur.
- [ ] Aucun prix, aucun montant, aucun formulaire, aucun lien vers un blog.
- [ ] Espaces insécables (`&nbsp;`) avant `: ; ! ?` et dans les guillemets.
- [ ] Contrastes conformes : pas de `--c-text-faint` en texte, pas de petit texte accent.
- [ ] SVG décoratifs en `aria-hidden="true" focusable="false"`.
- [ ] Testé en 360px de large : pas de débordement horizontal, boutons empilés lisibles.
- [ ] Animations uniquement via `.reveal` / `.animate-*`.
- [ ] Le site compile : `npm run build`.
