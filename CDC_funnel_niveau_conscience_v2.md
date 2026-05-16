# Cahier des charges — Funnel "Test du niveau de conscience"
**Projet :** Quiz gamifié + tunnel de vente e-book — par Bigslaay
**Stack :** Next.js 14 (App Router) + CSS Modules
**Paiement / Email :** Systeme.io
**Audience :** Francophones, trafic TikTok — mobile-first absolu (390px)
**Statut :** v2.0 — contenu réel intégré

---

## 1. Contexte & Objectif

Page accessible via le lien en bio TikTok. Elle remplace un tunnel classique par une expérience interactive gamifiée basée sur l'échelle des niveaux de conscience du Dr. David Hawkins, adaptée en rangs gaming par Bigslaay.

**Objectif :** Convertir un visiteur TikTok en acheteur de l'e-book via 4 étapes :
1. Hero d'accroche → curiosité
2. Quiz interactif (10 questions) → engagement
3. Résultat personnalisé + capture email → lead qualifié
4. Page d'offre → vente directe sur Systeme.io

**Mentions légales obligatoires (footer + résultat) :**
> *Tableau créé par le Dr. David Hawkins. Non prouvé scientifiquement. Rangs ajoutés par Bigslaay. Non prouvé scientifiquement.*

---

## 2. Logique métier

### 2.1 Scoring
- 10 questions, 5 options chacune (A à E)
- Chaque option vaut **1 à 5 points**
- **Score brut** = somme des points (10 min, 50 max)
- **Règle d'arrondi Bigslaay :** *« Si tu obtiens un chiffre impair, tu prends le niveau au-dessus »* → si score impair, ajouter +1

### 2.2 Plafond / Plancher / Zone
- **Plafond** = score final ajusté
- **Plancher** = plafond - 10
- **Zone** = ensemble des niveaux entre plancher et plafond → représente les états les plus fréquents de l'utilisateur

### 2.3 Mapping rangs gaming ↔ niveaux Hawkins

**Mapping validé par Bigslaay (référence officielle) :**

| Rang | Couleur | Plage de score plafond | Niveaux Hawkins inclus |
|------|---------|------------------------|------------------------|
| 🥉 Bronze | `#8B5E3C` | 10 → 20 | Honte (10), Culpabilité (14), Apathie (16/18), Tristesse (20) |
| 🥈 Argent | `#7A8590` | 18 → 24 | Apathie (18), Tristesse (20), Peur (22), Désir (24) |
| 🥇 Or | `#C99417` | 26 → 28 | Colère (26), Orgueil (28) |
| 💠 Platine | `#5B98B5` | 30 → 34 | Courage (30), Neutralité (32), Volonté (34) |
| 💎 Diamant | `#7B6BC4` | 36 → 38 | Acceptation (36), Raison (38) |
| 👑 Maître | `#C39A2E` | 40 → 50 | Amour (40), Joie (42), Paix (46), Illumination (50) |

**⚠️ Note importante sur le chevauchement Bronze/Argent (18–20) :**
Les niveaux Apathie (18) et Tristesse (20) apparaissent dans les deux plages selon la formulation Bigslaay (Bronze : Honte→Tristesse, Argent : Apathie→Désir). **Règle de tie-breaking pour l'implémentation :**

```js
// Logique de résolution du rang à partir d'un score plafond
function getRankFromScore(score) {
  if (score <= 16) return "Bronze";
  if (score <= 24) return "Argent";  // 18, 20, 22, 24 → Argent (rang dominant)
  if (score <= 28) return "Or";
  if (score <= 34) return "Platine";
  if (score <= 38) return "Diamant";
  return "Maître"; // 40 et au-delà
}
```

**Justification :** un score plafond de 18 ou 20 indique que l'utilisateur peut atteindre Apathie/Tristesse comme meilleur état, ce qui correspond fonctionnellement à l'entrée du rang Argent (sortie progressive de l'involution). Le chevauchement visuel sur la carte reste néanmoins fidèle à l'image originale.

---

## 3. Architecture des écrans

```
[Vue 1 : Hero] → [Vue 2 : Quiz] → [Vue 3 : Résultat] → [Vue 4 : Offre]
```

SPA Next.js avec une seule route `/`. État global géré via `useReducer` dans un Client Component parent. Transitions fluides entre vues, sans rechargement.

---

## 4. Vue 1 — Hero

### Contenu
- **Headline :** "À quel niveau joues-tu dans le jeu de la vie ?"
- **Sous-titre :** "Test du niveau de conscience — découvre ton rang en 2 minutes"
- **Disclaimer doux :** "Ce test ne définit pas qui tu es. Il montre simplement la meilleure perception que tu as de la vie."
- **CTA principal :** "Commencer le test →"
- **Visuel des 6 rangs** : Bronze → Maître avec icônes
- **Microcopy :** "10 questions • 2 minutes • Basé sur l'échelle du Dr. David Hawkins"

### Règles affichées en accordéon "📜 Règles du test"
- Une seule réponse par question
- Choisir une réponse que tu comprends et peux expliquer
- Pas de retour en arrière possible
- Le résultat indique ton plafond, pas ton état permanent

---

## 5. Vue 2 — Quiz interactif

### Composants UI
- **Header sticky** : compteur "Question X / 10" + barre de progression animée
- **Question** : grande typographie display
- **5 options** sous forme de cards full-width avec lettre A/B/C/D/E en badge
- **Bouton "Suivant"** : caché tant qu'aucune option n'est sélectionnée

### Comportement
- Une seule réponse active à la fois (radio behavior)
- Clic manuel sur "Suivant" (pas d'auto-advance)
- Pas de retour en arrière
- À la Q10 → bouton devient "Voir mon rang →"

### État géré
```js
{
  currentQuestion: 0,        // index 0–9
  answers: Array(10).fill(null),  // points choisis
  selectedIndex: null        // option sélectionnée pour Q courante
}
```

### ⚠️ Règle critique sur le shuffle
Les options sont stockées dans l'ordre original (A→E) mais affichées dans un **ordre mélangé** au runtime. Le shuffle ne doit pas casser le scoring → chaque option garde son score associé indépendamment de sa position visuelle.

---

## 6. Données — Questions & Scoring

### Q1 — Comment perçois-tu la vie ?
- A. Comme un défi → **3 pts**
- B. Elle est difficile → **1 pt**
- C. Elle est parfaite → **5 pts**
- D. Elle est incertaine → **2 pts**
- E. Elle a du sens → **4 pts**

### Q2 — Comment vois-tu les difficultés ?
- A. Comme stressantes → **2 pts**
- B. Elles font partie de la vie → **5 pts**
- C. Elles m'apprennent quelque chose → **4 pts**
- D. Elles m'épuisent → **1 pt**
- E. Me poussent à me dépasser → **3 pts**

### Q3 — Comment perçois-tu les autres ?
- A. J'ai du mal à leur faire confiance → **1 pt**
- B. Je me compare souvent à eux → **2 pts**
- C. Chacun vit ses propres expériences → **3 pts**
- D. Je ressens une forte connexion avec les autres → **5 pts**
- E. Je me sens globalement proche d'eux → **4 pts**

### Q4 — Comment perçois-tu l'argent dans ta vie ?
- A. Une source de stress → **1 pt**
- B. Une sécurité importante → **2 pts**
- C. Un outil pour avancer → **3 pts**
- D. Utile mais pas central → **4 pts**
- E. Pas une source de préoccupation → **5 pts**

### Q5 — Comment perçois-tu l'échec ?
- A. Il me permet de comprendre ce qui n'a pas fonctionné → **4 pts**
- B. Il prouve que je ne suis pas assez bon → **1 pt**
- C. C'est une étape normale avant de réussir → **3 pts**
- D. Il ne change pas la façon dont je me vois → **5 pts**
- E. Je fais tout pour ne pas échouer → **2 pts**

### Q6 — Quand tu vois la vie des autres sur les réseaux, que ressens-tu ?
- A. Je me sens moins bien → **1 pt**
- B. Je me compare → **2 pts**
- C. Ça me motive → **3 pts**
- D. Ça ne change pas grand-chose → **4 pts**
- E. Je suis heureux pour eux → **5 pts**

### Q7 — Quand tu penses à ton futur pro, que ressens-tu ?
- A. Je me sens perdu → **1 pt**
- B. Je ressens de l'inquiétude → **2 pts**
- C. Je vois des possibilités → **3 pts**
- D. Je suis confiant → **4 pts**
- E. Je suis serein → **5 pts**

### Q8 — Comment perçois-tu l'amour (en général, pas seulement le couple) ?
- A. Comme ce qu'il y a de plus vrai et essentiel dans la vie → **5 pts**
- B. Comme quelque chose qui peut faire souffrir → **1 pt**
- C. Comme un lien profond entre les personnes → **4 pts**
- D. Comme une expérience importante pour être heureux → **3 pts**
- E. Comme quelque chose d'instable et difficile à garder → **2 pts**

### Q9 — Comment perçois-tu tes émotions négatives ?
- A. Elles m'envahissent → **1 pt**
- B. Elles passent rapidement → **5 pts**
- C. Elles m'aident à avancer → **3 pts**
- D. Elles me donnent des informations → **4 pts**
- E. Elles sont difficiles à gérer → **2 pts**

### Q10 — Quand quelqu'un te rejette, tu interprètes ça comment ?
- A. Comme une preuve que je ne suis pas à la hauteur → **1 pt**
- B. Comme quelque chose qui arrive à tout le monde → **5 pts**
- C. Comme une situation à comprendre → **4 pts**
- D. Comme un signal que je dois faire mieux → **2 pts**
- E. Comme une étape pour avancer → **3 pts**

---

## 7. Vue 3 — Résultat + Capture de lead

### Composants affichés (dans l'ordre)

#### A) Badge du rang (hero du résultat)
- Icône du rang
- Nom du rang en grand (couleur du rang)
- **Niveau Hawkins exact** : ex. "Volonté — 34 pts"
- **Plafond et plancher** : "Ton plafond : 34 — Ton plancher : 24"
- Visualisation graphique de la zone (barre ou échelle verticale)

#### B) Description complète du niveau plafond
Structure 6 blocs (contenu en section 8) :
- Émotion / Perception / Réaction / Moteur / Rumination / Concrètement

#### C) Pédagogie sur la zone
Texte fixe :
> "Ton plafond est ton meilleur état. Ton plancher (-10) est ton pire. La zone entre les deux représente tes états les plus fréquents. Ce n'est pas figé — tu peux monter ou descendre selon les situations."

#### D) Chemin de progression
Bloc visuel : "Pour passer à [niveau suivant], il te faudra :"
- Les 2 points clés du `chemin_evolution` du niveau plafond
- Phrase d'accroche : "C'est exactement ce que tu vas découvrir dans le manuel."

#### E) Formulaire de capture
- **Prénom** (text, requis)
- **Email** (email, requis, validation regex)
- **Bouton** : "Recevoir mon plan de progression complet →"
- **Note de confiance** : "Aucun spam. Tes données restent privées."

### Intégration Systeme.io

**Méthode : API Contacts via API Route Next.js**

```http
POST https://api.systeme.io/api/contacts
Headers:
  X-API-Key: ${SYSTEMEIO_API_KEY}
  Content-Type: application/json
Body:
{
  "email": "user@example.com",
  "fields": {
    "first_name": "Prénom",
    "rang": "Diamant",
    "niveau_hawkins": "Amour",
    "score_plafond": 40,
    "score_plancher": 30
  },
  "tags": ["quiz_conscience", "rang_diamant"]
}
```

**Stratégie de tags :**
- Tag fixe : `quiz_conscience` (tous les leads)
- Tag dynamique : `rang_bronze` / `rang_argent` / `rang_or` / `rang_platine` / `rang_diamant` / `rang_maitre`
- → Permet de déclencher 6 séquences email différentes par niveau

**Sécurité critique :**
- L'appel API passe par une **API Route Next.js** (`/app/api/lead/route.js`) côté serveur
- Variable d'environnement : `SYSTEMEIO_API_KEY` (PAS de préfixe `NEXT_PUBLIC_`)
- **Jamais** appeler l'API Systeme.io depuis le client

**Gestion d'erreur :**
- Champ vide ou email invalide → erreur inline (pas d'alert)
- Erreur réseau → message d'erreur + log serveur
- Succès → transition Vue 4

---

## 8. Contenu des 18 niveaux de conscience

À stocker dans `lib/levels.js`. Format JSON :

```js
export const LEVELS = {
  10: {
    nom: "Honte", rang: "Bronze", couleur: "#8B5E3C",
    emotion: "Humiliation et rejet de soi.",
    perception: "Tu te vois comme mauvais ou indigne.",
    reaction: "Retrait et évitement des autres.",
    moteur: "Faire disparaître la douleur intérieure.",
    rumination: "Pensées négatives extrêmes sur toi.",
    concretement: "Tu ressens que le problème, c'est toi.",
    evolution_vers: "Culpabilité (14)",
    chemin_evolution: [
      "Comprendre que tu n'attaches pas ta valeur à tes erreurs.",
      "Passer de 'je suis mauvais' à 'j'ai fait une erreur'."
    ]
  },
  14: {
    nom: "Culpabilité", rang: "Bronze", couleur: "#8B5E3C",
    emotion: "Remords et auto-reproche.",
    perception: "Tu as l'impression d'avoir mal agi.",
    reaction: "Auto-punition ou auto-critique.",
    moteur: "Réparer ou expier.",
    rumination: "Pensées de reproche fréquentes.",
    concretement: "Tu te reproches souvent tes erreurs.",
    evolution_vers: "Apathie (18)",
    chemin_evolution: [
      "Arrêter l'auto-punition et accepter le passé.",
      "Passer de 'je mérite de souffrir' à 'je peux lâcher'."
    ]
  },
  16: {
    // alias d'Apathie (score impair 15 → arrondi à 16)
    nom: "Apathie", rang: "Argent", couleur: "#7A8590",
    emotion: "Vide et résignation.",
    perception: "La vie paraît sans espoir.",
    reaction: "Passivité et manque d'énergie.",
    moteur: "Survie plus que progression.",
    rumination: "Pensées lourdes mais peu actives.",
    concretement: "Tu as l'impression que rien ne changera vraiment.",
    evolution_vers: "Tristesse (20)",
    chemin_evolution: [
      "Reconnecter à tes émotions au lieu de rester vide.",
      "Passer de la résignation au ressenti."
    ]
  },
  18: {
    nom: "Apathie", rang: "Argent", couleur: "#7A8590",
    emotion: "Vide et résignation.",
    perception: "La vie paraît sans espoir.",
    reaction: "Passivité et manque d'énergie.",
    moteur: "Survie plus que progression.",
    rumination: "Pensées lourdes mais peu actives.",
    concretement: "Tu as l'impression que rien ne changera vraiment.",
    evolution_vers: "Tristesse (20)",
    chemin_evolution: [
      "Reconnecter à tes émotions au lieu de rester vide.",
      "Passer de la résignation au ressenti."
    ]
  },
  20: {
    nom: "Tristesse", rang: "Argent", couleur: "#7A8590",
    emotion: "Chagrin et nostalgie.",
    perception: "La vie semble marquée par la perte.",
    reaction: "Tu peux te replier ou perdre motivation.",
    moteur: "Récupérer ce qui semble perdu.",
    rumination: "Pensées liées au regret.",
    concretement: "Tu ressens souvent que quelque chose te manque.",
    evolution_vers: "Peur (22)",
    chemin_evolution: [
      "Retrouver un minimum d'espoir et d'énergie.",
      "Passer du retrait à l'anticipation."
    ]
  },
  22: {
    nom: "Peur", rang: "Argent", couleur: "#7A8590",
    emotion: "Anxiété et inquiétude.",
    perception: "La vie paraît incertaine ou risquée.",
    reaction: "Tu évites les situations perçues comme dangereuses.",
    moteur: "Tu cherches la sécurité.",
    rumination: "Pensées anxieuses fréquentes.",
    concretement: "Tu anticipes ce qui pourrait mal se passer.",
    evolution_vers: "Désir (24)",
    chemin_evolution: [
      "Faire une petite action malgré la peur.",
      "Passer de l'évitement au mouvement."
    ]
  },
  24: {
    nom: "Désir", rang: "Argent", couleur: "#7A8590",
    emotion: "Manque et insatisfaction.",
    perception: "Il manque quelque chose pour être heureux.",
    reaction: "Tu poursuis ce qui pourrait combler ce manque.",
    moteur: "Tu es guidé par l'obtention et la satisfaction.",
    rumination: "Tu penses souvent à ce que tu veux avoir.",
    concretement: "Tu penses que le bonheur arrive quand tu auras quelque chose.",
    evolution_vers: "Colère (26)",
    chemin_evolution: [
      "Comprendre que le manque peut devenir une énergie d'action.",
      "Passer de vouloir à agir contre ce qui bloque."
    ]
  },
  26: {
    nom: "Colère", rang: "Or", couleur: "#C99417",
    emotion: "Frustration et irritation fréquentes.",
    perception: "La vie semble injuste ou frustrante.",
    reaction: "Tu luttes contre ce qui ne te convient pas.",
    moteur: "Tu veux contrôler et changer la situation.",
    rumination: "Tu repenses aux injustices.",
    concretement: "Tu ressens facilement que ce n'est pas normal.",
    evolution_vers: "Orgueil (28)",
    chemin_evolution: [
      "Canaliser la colère vers la construction personnelle.",
      "Passer de la lutte au besoin de te valoriser."
    ]
  },
  28: {
    nom: "Orgueil", rang: "Or", couleur: "#C99417",
    emotion: "Tu ressens parfois supériorité ou besoin de prouver ta valeur.",
    perception: "La vie est perçue comme une compétition d'image et de statut.",
    reaction: "Tu défends ton identité et ton image.",
    moteur: "Tu es guidé par la reconnaissance et la valorisation.",
    rumination: "Tu penses souvent au regard des autres.",
    concretement: "Tu veux montrer que tu vaux quelque chose.",
    evolution_vers: "Courage (30)",
    chemin_evolution: [
      "Accepter ta vulnérabilité et arrêter de vouloir prouver ta valeur.",
      "Passer de l'image à l'action authentique."
    ]
  },
  30: {
    nom: "Courage", rang: "Platine", couleur: "#5B98B5",
    emotion: "Tu ressens détermination malgré la peur.",
    perception: "La vie est un défi à relever.",
    reaction: "Tu agis même quand c'est inconfortable.",
    moteur: "Tu es guidé par la croissance personnelle.",
    rumination: "Les pensées existent mais n'empêchent pas l'action.",
    concretement: "Tu passes à l'action même sans confiance totale.",
    evolution_vers: "Neutralité (32)",
    chemin_evolution: [
      "Comprendre que tout n'est pas un combat.",
      "Passer de la lutte à la flexibilité."
    ]
  },
  32: {
    nom: "Neutralité", rang: "Platine", couleur: "#5B98B5",
    emotion: "Tu ressens une certaine détente et moins de drame intérieur.",
    perception: "La vie ne te paraît ni dramatique ni exceptionnelle.",
    reaction: "Tu restes flexible et adaptable.",
    moteur: "Tu es guidé par la simplicité et l'équilibre.",
    rumination: "Les pensées négatives diminuent.",
    concretement: "Tu prends les choses comme elles viennent sans trop dramatiser.",
    evolution_vers: "Volonté (34)",
    chemin_evolution: [
      "Sortir du confort et choisir une direction.",
      "Passer de 'je prends les choses comme elles viennent' à 'je m'engage'."
    ]
  },
  34: {
    nom: "Volonté", rang: "Platine", couleur: "#5B98B5",
    emotion: "Tu ressens motivation et engagement.",
    perception: "La vie est vue comme pleine d'opportunités possibles.",
    reaction: "Tu passes à l'action pour progresser.",
    moteur: "Tu es guidé par la progression et l'amélioration.",
    rumination: "Tu penses beaucoup à comment avancer.",
    concretement: "Tu veux évoluer et tu fais des efforts pour y arriver.",
    evolution_vers: "Acceptation (36)",
    chemin_evolution: [
      "Accepter que tout ne dépend pas de l'effort.",
      "Passer de la force d'action à la confiance dans la réalité."
    ]
  },
  36: {
    nom: "Acceptation", rang: "Diamant", couleur: "#7B6BC4",
    emotion: "Tu ressens une stabilité intérieure même face aux difficultés.",
    perception: "Tu vois que la vie a du sens même quand elle est imparfaite.",
    reaction: "Tu t'adaptes aux situations plutôt que de les combattre.",
    moteur: "Tu es motivé par la compréhension et l'évolution.",
    rumination: "Tu rumines moins les événements négatifs.",
    concretement: "Tu peux accepter ce qui est sans abandonner l'envie d'avancer.",
    evolution_vers: "Raison (38)",
    chemin_evolution: [
      "Chercher à comprendre la vie et toi-même plus en profondeur.",
      "Passer de 'j'accepte' à 'je comprends'."
    ]
  },
  38: {
    nom: "Raison", rang: "Diamant", couleur: "#7B6BC4",
    emotion: "Tu ressens stabilité et clarté mentale.",
    perception: "Tu vois la vie comme compréhensible et logique.",
    reaction: "Tu analyses les situations pour trouver du sens.",
    moteur: "Tu es guidé par la vérité et la cohérence.",
    rumination: "Tu réfléchis beaucoup mais de façon constructive.",
    concretement: "Tu cherches à comprendre avant de réagir émotionnellement.",
    evolution_vers: "Amour (40)",
    chemin_evolution: [
      "Passer de comprendre les autres à les ressentir.",
      "Ajouter empathie et bienveillance à la logique."
    ]
  },
  40: {
    nom: "Amour", rang: "Maître", couleur: "#C39A2E",
    emotion: "Tu ressens de la bienveillance et de la compassion envers les autres.",
    perception: "Tu vois les autres comme profondément humains et connectés à toi.",
    reaction: "Tu cherches à comprendre plutôt qu'à juger.",
    moteur: "Tu es motivé par l'envie d'aider, de soutenir et de créer du lien.",
    rumination: "Tu juges moins et rumines moins les conflits.",
    concretement: "Même quand quelqu'un agit mal, tu peux voir sa souffrance derrière.",
    evolution_vers: "Joie (42)",
    chemin_evolution: [
      "Laisser l'amour s'exprimer sans attente ni besoin de retour.",
      "Passer de la compassion à une gratitude naturelle pour la vie."
    ]
  },
  42: {
    nom: "Joie", rang: "Maître", couleur: "#C39A2E",
    emotion: "Tu ressens facilement gratitude, enthousiasme et plaisir d'exister.",
    perception: "La vie te paraît belle et digne d'être appréciée.",
    reaction: "Tu exprimes naturellement ton énergie et ta positivité.",
    moteur: "Tu es poussé par le plaisir de vivre et de partager.",
    rumination: "Les pensées négatives existent mais restent faibles.",
    concretement: "Tu peux ressentir de la joie sans effort même quand les circonstances ne sont pas idéales.",
    evolution_vers: "Paix (46)",
    chemin_evolution: [
      "Apprendre à rester stable même quand la joie diminue.",
      "Passer du plaisir d'exister à une sérénité constante."
    ]
  },
  46: {
    nom: "Paix", rang: "Maître", couleur: "#C39A2E",
    emotion: "Tu ressens une sérénité stable même quand la vie est imparfaite.",
    perception: "Tu vois la vie comme globalement sûre et harmonieuse.",
    reaction: "Tu accueilles les événements sans lutte intérieure.",
    moteur: "Tu es guidé par le calme et la présence plutôt que par la peur.",
    rumination: "Les pensées envahissantes sont très rares.",
    concretement: "Tu ne fuis pas la vie. Tu es simplement moins réactif et plus stable.",
    evolution_vers: "Illumination (50)",
    chemin_evolution: [
      "Lâcher le besoin de comprendre ou de contrôler la vie.",
      "Passer de la sérénité à la confiance totale dans ce qui est."
    ]
  },
  50: {
    nom: "Illumination", rang: "Maître", couleur: "#C39A2E",
    emotion: "Tu ressens un état de paix et de plénitude qui ne dépend plus de ce qui arrive autour de toi.",
    perception: "Tu vois la vie comme parfaite telle qu'elle est, sans ressentir de manque ou de conflit intérieur.",
    reaction: "Face aux situations, tu restes présent et calme, sans vouloir contrôler ou changer ce qui est.",
    moteur: "Tu agis par élan naturel d'être et non par peur, manque ou besoin de prouver quelque chose.",
    rumination: "Ton mental ne tourne presque plus en boucle, les pensées passent sans te bloquer.",
    concretement: "Tu ressens toujours les émotions, mais elles ne te contrôlent plus et tu ne luttes plus intérieurement contre ce qui est. C'est la maîtrise absolue.",
    evolution_vers: null,
    chemin_evolution: [
      "Tu es déjà au niveau le plus haut.",
      "L'évolution consiste à rester présent sans chercher à contrôler la vie."
    ]
  }
};
```

**Fonction de résolution du niveau exact :**

```js
export function getRankFromScore(score) {
  if (score <= 16) return { nom: "Bronze", couleur: "#8B5E3C" };
  if (score <= 24) return { nom: "Argent", couleur: "#7A8590" };
  if (score <= 28) return { nom: "Or", couleur: "#C99417" };
  if (score <= 34) return { nom: "Platine", couleur: "#5B98B5" };
  if (score <= 38) return { nom: "Diamant", couleur: "#7B6BC4" };
  return { nom: "Maître", couleur: "#C39A2E" };
}

export function getLevelData(score) {
  // Règle Bigslaay : si impair, arrondir au pair supérieur
  const adjusted = score % 2 === 0 ? score : score + 1;
  const validScores = [10, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 46, 50];
  // Trouve le niveau le plus proche (égal ou supérieur)
  const closest = validScores.find(v => v >= adjusted) || 50;
  const level = LEVELS[closest];
  const rank = getRankFromScore(closest);

  return {
    score: adjusted,
    plafond: closest,
    plancher: Math.max(10, closest - 10),
    level,
    rank
  };
}
```

---

## 9. Vue 4 — Page d'offre

### Structure

#### A) Headline personnalisée
"Tu es **[Rang] — [Niveau Hawkins]**. Voici exactement ce qu'il te faut pour passer à **[Niveau suivant]**."

#### B) Bloc e-book
- Mockup de couverture du manuel (image à fournir par Bigslaay)
- **Titre du produit :** à définir (placeholder : "Le Manuel du Jeu de la Vie")
- **Sous-titre :** "Les 18 niveaux de conscience expliqués — et le chemin exact pour progresser"

#### C) Bénéfices (5 max) — à adapter par Bigslaay
- Décodage complet des 18 niveaux de conscience Hawkins
- Pour chaque niveau : émotions, perceptions, blocages, sorties
- Plan d'action concret pour passer de ton niveau au suivant
- Exercices pratiques quotidiens
- Bonus : audio + workbook imprimable

#### D) Bloc prix
- Prix barré : **49€**
- Prix actuel : **17€**
- Badge : "Offre spéciale lancement"
- Mention : "Paiement 100% sécurisé via Systeme.io"

#### E) CTA principal
Bouton "Obtenir le manuel maintenant →" → redirige vers `process.env.NEXT_PUBLIC_PAYMENT_URL`

#### F) Garantie & rassurance
- "Satisfait ou remboursé 30 jours"
- "Accès immédiat après paiement"

#### G) Footer
- Mention légale : "Tableau créé par le Dr. David Hawkins. Non prouvé scientifiquement. Rangs ajoutés par Bigslaay."
- Liens : Mentions légales, CGV, Politique de confidentialité

---

## 10. Structure de fichiers Next.js 14 (App Router)

```
/
├── package.json
├── next.config.js
├── .env.local                            ← SYSTEMEIO_API_KEY, NEXT_PUBLIC_PAYMENT_URL
├── .env.example                          ← template à committer
├── public/
│   ├── favicon.ico
│   ├── og-image.png                      ← image Open Graph (1200x630)
│   └── ranks/                            ← icônes SVG des 6 rangs
│       ├── bronze.svg
│       ├── argent.svg
│       ├── or.svg
│       ├── platine.svg
│       ├── diamant.svg
│       └── maitre.svg
├── app/
│   ├── layout.jsx                        ← root layout + metadata SEO + fonts
│   ├── page.jsx                          ← Server Component qui importe FunnelClient
│   ├── globals.css                       ← reset + variables CSS globales
│   ├── api/
│   │   └── lead/
│   │       └── route.js                  ← POST handler vers Systeme.io
│   └── components/
│       ├── FunnelClient.jsx              ← "use client" — orchestrateur des 4 vues
│       ├── HeroView.jsx
│       ├── HeroView.module.css
│       ├── QuizView.jsx
│       ├── QuizView.module.css
│       ├── ResultView.jsx
│       ├── ResultView.module.css
│       ├── OfferView.jsx
│       ├── OfferView.module.css
│       └── shared/
│           ├── ProgressBar.jsx
│           ├── RankBadge.jsx
│           └── Button.jsx
├── lib/
│   ├── questions.js                      ← 10 questions + scoring (section 6)
│   ├── levels.js                         ← LEVELS et getLevelData() (section 8)
│   ├── ranks.js                          ← mapping rang ↔ niveaux + couleurs
│   └── utils.js                          ← shuffle, validateEmail
└── README.md
```

---

## 11. Design System

### Direction artistique (validée par Bigslaay)
**INTERDITS ABSOLUS :**
- Aucun design dark
- Aucun dégradé générique violet/rose (style IA générique)
- Aucun effet glassmorphism
- Aucune librairie UI externe

**Direction visée :** propre, professionnel, sobre mais distinctif. Inspirations : Linear, Stripe, Notion (pour la sobriété et la qualité typographique).

### Typographie
- **Display (headlines)** : `Syne` 700 — via `next/font/google`
- **Corps de texte** : `DM Sans` 400/500 — via `next/font/google`
- Pas d'Inter, pas de Roboto, pas de Poppins

### Palette de base
- **Fond principal** : `#FAFAF7` (blanc cassé chaud)
- **Fond carte** : `#FFFFFF`
- **Texte principal** : `#0F1419`
- **Texte secondaire** : `#5B6470`
- **Bordures** : `#E8E5DD`
- **Accent primaire** : `#1A3A52` (bleu nuit profond) — à appliquer aux liens, badges, accents
- **Accent CTA** : `#D97757` (terracotta) ou `#0F1419` (anthracite) — pour les boutons d'action principaux

### Couleurs des rangs
Utilisées en accent (badges, bordures, illustrations), **jamais en remplissage pleine page** :
- Bronze : `#8B5E3C`
- Argent : `#7A8590`
- Or : `#C99417`
- Platine : `#5B98B5`
- Diamant : `#7B6BC4`
- Maître : `#C39A2E`

### Principes UI
- **Mobile-first absolu** : design 390px en premier, élargi ensuite
- **Pas de shadow lourd** — séparation par `border` 1px et espacement
- **Border-radius** : 8 à 12px maximum
- **Boutons** : pleins en couleur d'accent, hover = légère baisse de luminosité
- **Animations** : transitions CSS sur `opacity`, `transform`, `width`, durées 200–400ms, easing `cubic-bezier(0.4, 0, 0.2, 1)`
- **Aucune librairie d'animation** (pas de Framer Motion, pas de GSAP)
- **CSS Modules vanilla** uniquement
- **Pas d'emoji** dans les CTA principaux

---

## 12. Variables d'environnement

```env
# .env.local (à NE PAS committer)
SYSTEMEIO_API_KEY=ta_cle_api_systeme_io
NEXT_PUBLIC_PAYMENT_URL=https://bigslaay.systeme.io/manuel-jeu-vie
```

```env
# .env.example (à committer comme template)
SYSTEMEIO_API_KEY=
NEXT_PUBLIC_PAYMENT_URL=
```

**Règle :** Toute variable destinée au client préfixée `NEXT_PUBLIC_`. La clé API Systeme.io **reste côté serveur uniquement**.

---

## 13. API Route — `/app/api/lead/route.js`

Comportement attendu :
1. Reçoit `POST` avec body : `{ prenom, email, score, plafond, plancher, rang, niveau_hawkins }`
2. Valide les champs (email regex, prenom non vide, score entre 10 et 50)
3. Appelle l'API Systeme.io avec la clé serveur
4. Tag le contact avec `quiz_conscience` et `rang_${rang.toLowerCase()}`
5. Retourne `{ success: true }` ou `{ success: false, error: "..." }` avec status code approprié

---

## 14. Déploiement & Workflow de validation

### Hébergeur
- **Vercel** (recommandé) : intégration native Next.js, deploy automatique depuis GitHub, env vars dans dashboard
- **Alternative** : VPS OVH avec Docker (compatible avec l'infra existante de Bigslaay)

### Workflow de validation (preview → production)

```
[Branch develop] ─push→ [Preview Vercel] ─review→ [Merge main] ─push→ [Production]
```

**Étapes concrètes :**
1. **Branch principale `main`** : connectée à la prod (`test.bigslaay.com`)
2. **Branch de travail `develop`** : connectée à une preview Vercel automatique
3. À chaque `git push origin develop` → Vercel génère automatiquement une URL preview unique (ex. `funnel-bigslaay-git-develop.vercel.app`)
4. Bigslaay valide visuellement sur l'URL preview
5. Une fois validé : `git checkout main && git merge develop && git push` → déclenche le déploiement prod
6. **Aucun push direct sur `main`** sans validation preview

### Environnements séparés Systeme.io (recommandé)

Pour ne pas polluer la liste réelle pendant les tests preview :

```env
# Preview (.env sur Vercel preview)
SYSTEMEIO_API_KEY=cle_systemeio_test
NEXT_PUBLIC_PAYMENT_URL=https://bigslaay.systeme.io/test-page

# Production (.env sur Vercel production)
SYSTEMEIO_API_KEY=cle_systemeio_prod
NEXT_PUBLIC_PAYMENT_URL=https://bigslaay.systeme.io/manuel-jeu-vie
```

→ Possibilité d'utiliser un tag spécifique `quiz_test` en preview pour filtrer les leads de test dans Systeme.io.

### Domaine & bio TikTok
- Sous-domaine type `test.bigslaay.com` ou `quiz.bigslaay.com`
- SSL automatique sur Vercel
- TikTok bloque certains domaines : utiliser un raccourcisseur (Bitly ou Linktr.ee) si nécessaire

### Checklist avant chaque passage en prod
- [ ] Preview validée visuellement sur mobile (390px)
- [ ] Lighthouse mobile > 90 sur l'URL preview
- [ ] Test complet du parcours : Hero → Quiz → Résultat (formulaire) → Offer → Lien paiement
- [ ] Vérification que le lead apparaît bien dans Systeme.io avec le bon tag
- [ ] Confirmation explicite de Bigslaay sur l'URL preview avant merge

---

## 15. SEO & Métadonnées

Dans `app/layout.jsx` :

```js
export const metadata = {
  title: "Test du niveau de conscience — À quel niveau joues-tu dans le jeu de la vie ?",
  description: "Découvre ton rang gaming en 2 minutes. Basé sur l'échelle du Dr. David Hawkins.",
  openGraph: {
    title: "À quel niveau joues-tu ?",
    description: "Test du niveau de conscience par Bigslaay",
    images: ["/og-image.png"],
    type: "website",
    locale: "fr_FR"
  },
  twitter: {
    card: "summary_large_image",
    title: "Test du niveau de conscience",
    description: "Découvre ton rang en 2 minutes"
  }
};
```

---

## 16. Prompt d'initialisation pour Claude Code

À coller dans Claude Code après avoir placé ce CDC à la racine du projet :

---

```
Tu vas construire un funnel web interactif en Next.js 14 (App Router).
Lis d'abord intégralement le fichier CDC_funnel_niveau_conscience.md avant d'écrire une seule ligne de code.

Contexte : page accessible via un lien TikTok bio.
Public cible : francophones, mobile-first absolu (390px).
Objectif : quiz gamifié sur les niveaux de conscience Hawkins → capture email (Systeme.io) → vente e-book.

Stack imposé :
- Next.js 14 avec App Router (JavaScript, pas TypeScript)
- CSS Modules uniquement (PAS de Tailwind, PAS de shadcn, PAS de MUI)
- Animations en CSS pur uniquement (PAS de Framer Motion)
- Polices via next/font/google (Syne + DM Sans)

Structure imposée :
- 1 seule route /
- Server Component dans app/page.jsx qui importe un Client Component FunnelClient
- FunnelClient orchestre 4 vues : Hero, Quiz, Result, Offer
- État global via useReducer dans FunnelClient
- API Route Next dans app/api/lead/route.js pour Systeme.io (clé API côté serveur uniquement)

Design : fond clair (#FAFAF7), typographie forte, palette sobre et professionnelle.

INTERDITS ABSOLUS :
- Aucun dark background
- Aucun dégradé générique violet/rose
- Aucun effet glassmorphism
- Aucune librairie UI externe
- Aucun emoji dans les CTA principaux

Inspire-toi de la sobriété de Linear, Stripe ou Notion, adaptée au contexte gamifié.

Ordre d'implémentation imposé :
1. Initialiser le projet : npx create-next-app@latest --js --no-tailwind --app
2. Configurer next/font (Syne + DM Sans) dans layout.jsx
3. Créer globals.css avec variables CSS et reset
4. Créer lib/questions.js avec les 10 questions de la section 6 du CDC
5. Créer lib/levels.js avec les 18 niveaux complets de la section 8 du CDC
6. Créer lib/ranks.js avec le mapping rangs ↔ couleurs (section 2.3)
7. Créer lib/utils.js (shuffle, validateEmail, getLevelData)
8. Implémenter FunnelClient.jsx avec useReducer
9. Implémenter HeroView, QuizView, ResultView, OfferView une par une
10. Implémenter app/api/lead/route.js avec validation + appel Systeme.io
11. Tester en local avec npm run dev
12. Finaliser metadata SEO + OG image

Priorité absolue : expérience mobile irréprochable sur 390px de largeur.

Règles métier critiques :
- Score brut : somme des 10 réponses (entre 10 et 50)
- Si score impair : arrondir au pair supérieur (règle Bigslaay)
- Plafond = score ajusté
- Plancher = max(10, plafond - 10)
- Les options de chaque question doivent être MÉLANGÉES (shuffle) à l'affichage
- Le shuffle ne doit PAS casser le scoring (score lié à l'option, pas à sa position)

Mapping des rangs (validé par Bigslaay) :
- Bronze (10-16) : Honte, Culpabilité, Apathie
- Argent (18-24) : Apathie, Tristesse, Peur, Désir
- Or (26-28) : Colère, Orgueil
- Platine (30-34) : Courage, Neutralité, Volonté
- Diamant (36-38) : Acceptation, Raison
- Maître (40-50) : Amour, Joie, Paix, Illumination

Workflow git imposé :
- Branch principale : main (= production)
- Branch de travail : develop (= preview Vercel automatique)
- Aucun push direct sur main sans validation Bigslaay sur l'URL preview

Commence par confirmer que tu as bien lu le CDC, puis demande-moi la clé API Systeme.io et l'URL de paiement avant de démarrer l'implémentation.
Initialise toujours le repo git AVANT le premier commit, avec deux branches (main + develop).
```

---

## 17. Checklist de validation finale

**Fonctionnel**
- [ ] Quiz fonctionne de bout en bout sur mobile (iOS Safari + Android Chrome)
- [ ] Règle d'arrondi des scores impairs appliquée correctement
- [ ] Mapping rang ↔ niveau Hawkins ↔ couleur cohérent partout
- [ ] Shuffle des options ne casse pas le scoring
- [ ] Pas de retour en arrière possible dans le quiz
- [ ] Soumission du formulaire envoie le contact dans Systeme.io avec le bon tag `rang_xxx`
- [ ] Bouton d'achat redirige vers la bonne URL de paiement

**Performance**
- [ ] Lighthouse mobile : Performance > 90, Accessibility > 95
- [ ] First Contentful Paint < 1.5s sur 3G
- [ ] Aucun layout shift visible
- [ ] Fonts chargées en `display: swap` via next/font

**Sécurité**
- [ ] Clé API Systeme.io jamais exposée côté client (vérifier l'onglet Network du navigateur)
- [ ] Validation côté serveur dans `/api/lead/route.js`

**SEO / Partage**
- [ ] Meta tags Open Graph définis
- [ ] Image OG 1200×630 présente
- [ ] Title et description spécifiques

**UX**
- [ ] Testé en mode avion (gestion erreur réseau)
- [ ] Mention légale Hawkins + Bigslaay présente
- [ ] Disclaimer doux visible sur le Hero
- [ ] Validation inline (pas d'alert)

---

## 18. Évolutions possibles v2 (hors scope v1)

- Sauvegarde du résultat avec slug partageable (`/resultat/[uuid]`)
- Système de comparaison avec ses amis (résultats publics anonymisés)
- Partage sur TikTok/Instagram avec image générée dynamiquement (résultat carré téléchargeable)
- Countdown timer sur la page d'offre
- A/B testing du prix et des accroches via Vercel Analytics
- Webhook bidirectionnel n8n pour orchestrer les séquences email post-achat
- Page admin pour visualiser les stats de conversion par rang
