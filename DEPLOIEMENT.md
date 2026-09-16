# Déploiement — GitHub Pages + domaine Namecheap `focusla.shop`

Ce guide se fait **une seule fois**. Ensuite, chaque `git push` sur `main` met le site en ligne
automatiquement en ~1 minute.

---

## Étape 1 — Créer le dépôt GitHub

Le dépôt peut s'appeler comme tu veux (`focusla` par exemple). Comme on utilise un domaine
personnalisé, **le nom du dépôt n'a aucune importance** pour l'URL finale.

```bash
gh repo create focusla --public --source=. --remote=origin --push
```

> Le dépôt doit être **public** pour que GitHub Pages soit gratuit.
> (Pages sur dépôt privé nécessite un abonnement GitHub Pro/Team.)

---

## Étape 2 — Activer GitHub Pages en mode « GitHub Actions »

Sur la page du dépôt : **Settings → Pages**

- **Source** : choisir **GitHub Actions** (⚠️ *pas* « Deploy from a branch »)

C'est tout. Le workflow `.github/workflows/deploy.yml` s'occupe du reste.

---

## Étape 3 — Configurer le DNS chez Namecheap

Va sur [namecheap.com](https://www.namecheap.com) → **Domain List** → bouton **Manage** en face de
`focusla.shop` → onglet **Advanced DNS**.

### 3a. Supprimer les enregistrements par défaut

Namecheap crée automatiquement deux enregistrements qui **empêchent le site de fonctionner**.
Supprime-les avec l'icône corbeille :

| À supprimer | Ressemble à |
|---|---|
| `CNAME Record` | `www` → `parkingpage.cash` |
| `URL Redirect Record` | `@` → `http://www.focusla.shop/` |

### 3b. Ajouter les 4 enregistrements A (domaine racine)

Clique **ADD NEW RECORD** → `A Record` pour chacun. Host = `@` à chaque fois.

| Type | Host | Value | TTL |
|---|---|---|---|
| A Record | `@` | `185.199.108.153` | Automatic |
| A Record | `@` | `185.199.109.153` | Automatic |
| A Record | `@` | `185.199.110.153` | Automatic |
| A Record | `@` | `185.199.111.153` | Automatic |

### 3c. Ajouter les 4 enregistrements AAAA (IPv6 — recommandé)

| Type | Host | Value | TTL |
|---|---|---|---|
| AAAA Record | `@` | `2606:50c0:8000::153` | Automatic |
| AAAA Record | `@` | `2606:50c0:8001::153` | Automatic |
| AAAA Record | `@` | `2606:50c0:8002::153` | Automatic |
| AAAA Record | `@` | `2606:50c0:8003::153` | Automatic |

### 3d. Ajouter le CNAME pour `www`

| Type | Host | Value | TTL |
|---|---|---|---|
| CNAME Record | `www` | `TON_PSEUDO_GITHUB.github.io.` | Automatic |

> ⚠️ Remplace `TON_PSEUDO_GITHUB` par ton identifiant GitHub, **en minuscules**.
> Garde bien le **point final**.

Clique sur **✓ SAVE ALL CHANGES** en haut de la liste.

> Les adresses IP ci-dessus sont celles de GitHub Pages. Référence officielle :
> [docs.github.com — Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

---

## Étape 4 — Déclarer le domaine côté GitHub

**Settings → Pages → Custom domain** : saisir `focusla.shop` puis **Save**.

GitHub vérifie le DNS (ça peut prendre de quelques minutes à quelques heures).
Une fois la coche verte affichée, coche **Enforce HTTPS**.

> Le fichier `public/CNAME` contient déjà `focusla.shop`, donc chaque déploiement conserve
> le domaine automatiquement. **Ne le supprime pas.**

---

## Étape 5 — Vérifier

```bash
# Le DNS pointe-t-il bien vers GitHub ?
nslookup focusla.shop

# Le site répond-il ?
curl -I https://focusla.shop
```

Attendu : les 4 IP `185.199.10x.153`, puis un `HTTP/2 200`.

---

## Délais à prévoir

| Étape | Délai typique |
|---|---|
| Propagation DNS Namecheap | 5 min – 2 h (jusqu'à 48 h au pire) |
| Vérification du domaine par GitHub | quelques minutes |
| Émission du certificat HTTPS | 15 min – 1 h après la vérification |
| Build + déploiement à chaque push | ~1 min |

---

## Dépannage

**`404` sur `focusla.shop`**
→ Vérifie que **Settings → Pages → Source** est bien sur **GitHub Actions**, et que le dernier
run dans l'onglet **Actions** est vert.

**« Domain does not resolve to the GitHub Pages server »**
→ Le DNS n'est pas encore propagé, ou les enregistrements par défaut de Namecheap
(étape 3a) n'ont pas été supprimés.

**HTTPS indisponible / certificat invalide**
→ Normal pendant la première heure. Si ça persiste : retire le domaine personnalisé dans
Settings → Pages, sauvegarde, puis remets-le pour relancer l'émission du certificat.

**Le CSS ne se charge pas**
→ Vérifie que `site` dans `astro.config.mjs` vaut bien `https://focusla.shop`.
