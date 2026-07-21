const QUESTIONS = [
    {
        question: "Comment perçois-tu la vie ?",
        options: [
            { text: "Comme un défi", points: 3, letter: "A" },
            { text: "Elle est difficile", points: 1, letter: "B" },
            { text: "Elle est parfaite", points: 5, letter: "C" },
            { text: "Elle est incertaine", points: 2, letter: "D" },
            { text: "Elle a du sens", points: 4, letter: "E" }
        ]
    },
    {
        question: "Comment vois-tu les difficultés ?",
        options: [
            { text: "Comme stressantes", points: 2, letter: "A" },
            { text: "Elles font partie de la vie", points: 5, letter: "B" },
            { text: "Elles m’apprennent quelque chose", points: 4, letter: "C" },
            { text: "Elles m’épuisent", points: 1, letter: "D" },
            { text: "Me poussent à me dépasser", points: 3, letter: "E" }
        ]
    },
    {
        question: "Comment perçois-tu les autres ?",
        options: [
            { text: "J’ai du mal à leur faire confiance", points: 1, letter: "A" },
            { text: "Je me compare souvent à eux", points: 2, letter: "B" },
            { text: "Chacun vit ses propres expériences", points: 3, letter: "C" },
            { text: "Je ressens une forte connexion avec les autres", points: 5, letter: "D" },
            { text: "Je me sens globalement proche d’eux", points: 4, letter: "E" }
        ]
    },
    {
        question: "Comment perçois-tu l’argent dans ta vie ?",
        options: [
            { text: "Une source de stress", points: 1, letter: "A" },
            { text: "Une sécurité importante", points: 2, letter: "B" },
            { text: "Un outil pour avancer", points: 3, letter: "C" },
            { text: "Utile mais pas central", points: 4, letter: "D" },
            { text: "Pas une source de préoccupation", points: 5, letter: "E" }
        ]
    },
    {
        question: "Comment perçois-tu l’échec ?",
        options: [
            { text: "Il me permet de comprendre ce qui n’a pas fonctionné", points: 4, letter: "A" },
            { text: "Il prouve que je ne suis pas assez bon", points: 1, letter: "B" },
            { text: "C’est une étape normale avant de réussir", points: 3, letter: "C" },
            { text: "Il ne change pas la façon dont je me vois", points: 5, letter: "D" },
            { text: "Je fais tout pour ne pas échouer", points: 2, letter: "E" }
        ]
    },
    {
        question: "Quand tu vois la vie des autres sur les réseaux, que ressens-tu le plus ?",
        options: [
            { text: "Je me sens moins bien", points: 1, letter: "A" },
            { text: "Je me compare", points: 2, letter: "B" },
            { text: "Ça me motive", points: 3, letter: "C" },
            { text: "Ça ne change pas grand-chose", points: 4, letter: "D" },
            { text: "Je suis heureux pour eux", points: 5, letter: "E" }
        ]
    },
    {
        question: "Quand tu penses à ton futur pro, que ressens-tu le plus ?",
        options: [
            { text: "Je me sens perdu", points: 1, letter: "A" },
            { text: "Je ressens de l’inquiétude", points: 2, letter: "B" },
            { text: "Je vois des possibilités", points: 3, letter: "C" },
            { text: "Je suis confiant", points: 4, letter: "D" },
            { text: "Je suis serein", points: 5, letter: "E" }
        ]
    },
    {
        question: "Comment perçois-tu l’amour ?",
        options: [
            { text: "Comme ce qu’il y a de plus vrai et essentiel dans la vie", points: 5, letter: "A" },
            { text: "Comme quelque chose qui peut faire souffrir", points: 1, letter: "B" },
            { text: "Comme un lien profond entre les personnes", points: 4, letter: "C" },
            { text: "Comme une expérience importante pour être heureux", points: 3, letter: "D" },
            { text: "Comme quelque chose d’instable et difficile à garder", points: 2, letter: "E" }
        ]
    },
    {
        question: "Comment perçois-tu tes émotions négatives ?",
        options: [
            { text: "Elles m’envahissent", points: 1, letter: "A" },
            { text: "Elles passent rapidement", points: 5, letter: "B" },
            { text: "Elles m’aident à avancer", points: 3, letter: "C" },
            { text: "Elles me donnent des informations", points: 4, letter: "D" },
            { text: "Elles sont difficiles à gérer", points: 2, letter: "E" }
        ]
    },
    {
        question: "Quand quelqu’un te rejette, tu interprètes ça comment ?",
        options: [
            { text: "Comme une preuve que je ne suis pas à la hauteur", points: 1, letter: "A" },
            { text: "Comme quelque chose qui arrive à tout le monde", points: 5, letter: "B" },
            { text: "Comme une situation à comprendre", points: 4, letter: "C" },
            { text: "Comme un signal que je dois faire mieux", points: 2, letter: "D" },
            { text: "Comme une étape pour avancer", points: 3, letter: "E" }
        ]
    }
];

// ============================================================================
// ⚠️ À CONFIGURER : URL du tunnel de vente Systeme.io.
// Remplace cette valeur par l'URL réelle de ton tunnel (c'est là que se fait
// la capture email, la livraison du cadeau vidéo et la vente de l'ebook —
// avec les boutons de paiement Chariow connectés depuis Systeme.io).
// ============================================================================
const SYSTEMEIO_FUNNEL_URL = "https://toncompte.systeme.io/ton-tunnel";

const RANK_IMAGES = {
    "Bronze": "Light soft/carte6/bronze.png",
    "Argent": "Light soft/carte6/argent.png",
    "Or": "Light soft/carte6/or.png",
    "Platine": "Light soft/carte6/platine.png",
    "Diamant": "Light soft/carte6/diamant.png",
    "Maître": "Light soft/carte6/maitre.png"
};

// Contenu "avant-goût" des 18 niveaux (source : CDC section 8).
// On n'affiche qu'un extrait (émotion / perception / concrètement + chemin) —
// l'analyse complète est le produit vendu dans le tunnel.
const LEVELS = {
    10: { nom: "Honte", emotion: "Humiliation et rejet de soi.", perception: "Tu te vois comme mauvais ou indigne.", concretement: "Tu ressens que le problème, c'est toi.", evolution_vers: "Culpabilité (14)", chemin_evolution: ["Comprendre que tu n'attaches pas ta valeur à tes erreurs.", "Passer de 'je suis mauvais' à 'j'ai fait une erreur'."] },
    14: { nom: "Culpabilité", emotion: "Remords et auto-reproche.", perception: "Tu as l'impression d'avoir mal agi.", concretement: "Tu te reproches souvent tes erreurs.", evolution_vers: "Apathie (18)", chemin_evolution: ["Arrêter l'auto-punition et accepter le passé.", "Passer de 'je mérite de souffrir' à 'je peux lâcher'."] },
    16: { nom: "Apathie", emotion: "Vide et résignation.", perception: "La vie paraît sans espoir.", concretement: "Tu as l'impression que rien ne changera vraiment.", evolution_vers: "Tristesse (20)", chemin_evolution: ["Reconnecter à tes émotions au lieu de rester vide.", "Passer de la résignation au ressenti."] },
    18: { nom: "Apathie", emotion: "Vide et résignation.", perception: "La vie paraît sans espoir.", concretement: "Tu as l'impression que rien ne changera vraiment.", evolution_vers: "Tristesse (20)", chemin_evolution: ["Reconnecter à tes émotions au lieu de rester vide.", "Passer de la résignation au ressenti."] },
    20: { nom: "Tristesse", emotion: "Chagrin et nostalgie.", perception: "La vie semble marquée par la perte.", concretement: "Tu ressens souvent que quelque chose te manque.", evolution_vers: "Peur (22)", chemin_evolution: ["Retrouver un minimum d'espoir et d'énergie.", "Passer du retrait à l'anticipation."] },
    22: { nom: "Peur", emotion: "Anxiété et inquiétude.", perception: "La vie paraît incertaine ou risquée.", concretement: "Tu anticipes ce qui pourrait mal se passer.", evolution_vers: "Désir (24)", chemin_evolution: ["Faire une petite action malgré la peur.", "Passer de l'évitement au mouvement."] },
    24: { nom: "Désir", emotion: "Manque et insatisfaction.", perception: "Il manque quelque chose pour être heureux.", concretement: "Tu penses que le bonheur arrive quand tu auras quelque chose.", evolution_vers: "Colère (26)", chemin_evolution: ["Comprendre que le manque peut devenir une énergie d'action.", "Passer de vouloir à agir contre ce qui bloque."] },
    26: { nom: "Colère", emotion: "Frustration et irritation fréquentes.", perception: "La vie semble injuste ou frustrante.", concretement: "Tu ressens facilement que ce n'est pas normal.", evolution_vers: "Orgueil (28)", chemin_evolution: ["Canaliser la colère vers la construction personnelle.", "Passer de la lutte au besoin de te valoriser."] },
    28: { nom: "Orgueil", emotion: "Supériorité ou besoin de prouver ta valeur.", perception: "La vie est perçue comme une compétition d'image et de statut.", concretement: "Tu veux montrer que tu vaux quelque chose.", evolution_vers: "Courage (30)", chemin_evolution: ["Accepter ta vulnérabilité et arrêter de vouloir prouver ta valeur.", "Passer de l'image à l'action authentique."] },
    30: { nom: "Courage", emotion: "Détermination malgré la peur.", perception: "La vie est un défi à relever.", concretement: "Tu passes à l'action même sans confiance totale.", evolution_vers: "Neutralité (32)", chemin_evolution: ["Comprendre que tout n'est pas un combat.", "Passer de la lutte à la flexibilité."] },
    32: { nom: "Neutralité", emotion: "Détente et moins de drame intérieur.", perception: "La vie ne te paraît ni dramatique ni exceptionnelle.", concretement: "Tu prends les choses comme elles viennent sans trop dramatiser.", evolution_vers: "Volonté (34)", chemin_evolution: ["Sortir du confort et choisir une direction.", "Passer de 'je subis' à 'je m'engage'."] },
    34: { nom: "Volonté", emotion: "Motivation et engagement.", perception: "La vie est vue comme pleine d'opportunités possibles.", concretement: "Tu veux évoluer et tu fais des efforts pour y arriver.", evolution_vers: "Acceptation (36)", chemin_evolution: ["Accepter que tout ne dépend pas de l'effort.", "Passer de la force d'action à la confiance dans la réalité."] },
    36: { nom: "Acceptation", emotion: "Stabilité intérieure même face aux difficultés.", perception: "Tu vois que la vie a du sens même quand elle est imparfaite.", concretement: "Tu acceptes ce qui est sans abandonner l'envie d'avancer.", evolution_vers: "Raison (38)", chemin_evolution: ["Chercher à comprendre la vie et toi-même plus en profondeur.", "Passer de 'j'accepte' à 'je comprends'."] },
    38: { nom: "Raison", emotion: "Stabilité et clarté mentale.", perception: "Tu vois la vie comme compréhensible et logique.", concretement: "Tu cherches à comprendre avant de réagir émotionnellement.", evolution_vers: "Amour (40)", chemin_evolution: ["Passer de comprendre les autres à les ressentir.", "Ajouter empathie et bienveillance à la logique."] },
    40: { nom: "Amour", emotion: "Bienveillance et compassion envers les autres.", perception: "Tu vois les autres comme profondément humains et connectés à toi.", concretement: "Même quand quelqu'un agit mal, tu peux voir sa souffrance derrière.", evolution_vers: "Joie (42)", chemin_evolution: ["Laisser l'amour s'exprimer sans attente ni besoin de retour.", "Passer de la compassion à une gratitude naturelle pour la vie."] },
    42: { nom: "Joie", emotion: "Gratitude, enthousiasme et plaisir d'exister.", perception: "La vie te paraît belle et digne d'être appréciée.", concretement: "Tu ressens de la joie sans effort même quand les circonstances ne sont pas idéales.", evolution_vers: "Paix (46)", chemin_evolution: ["Apprendre à rester stable même quand la joie diminue.", "Passer du plaisir d'exister à une sérénité constante."] },
    46: { nom: "Paix", emotion: "Sérénité stable même quand la vie est imparfaite.", perception: "Tu vois la vie comme globalement sûre et harmonieuse.", concretement: "Tu ne fuis pas la vie. Tu es simplement moins réactif et plus stable.", evolution_vers: "Illumination (50)", chemin_evolution: ["Lâcher le besoin de comprendre ou de contrôler la vie.", "Passer de la sérénité à la confiance totale dans ce qui est."] },
    50: { nom: "Illumination", emotion: "Paix et plénitude qui ne dépendent plus de ce qui arrive autour de toi.", perception: "Tu vois la vie comme parfaite telle qu'elle est, sans manque ni conflit intérieur.", concretement: "Tu ressens toujours les émotions, mais elles ne te contrôlent plus. C'est la maîtrise absolue.", evolution_vers: null, chemin_evolution: ["Tu es déjà au niveau le plus haut.", "L'évolution consiste à rester présent sans chercher à contrôler la vie."] }
};

let currentQuestionIndex = 0;
let totalScore = 0;
let selectedOption = null;

window.setActiveNav = function(step) {
    document.querySelectorAll('.glass-nav li[data-nav]').forEach(li => {
        li.classList.toggle('active', li.dataset.nav === step);
    });
};

function getRankFromScore(score) {
    if (score <= 16) return { nom: "Bronze", couleur: "#8B5E3C" };
    if (score <= 24) return { nom: "Argent", couleur: "#7A8590" };
    if (score <= 28) return { nom: "Or", couleur: "#C99417" };
    if (score <= 34) return { nom: "Platine", couleur: "#5B98B5" };
    if (score <= 38) return { nom: "Diamant", couleur: "#7B6BC4" };
    return { nom: "Maître", couleur: "#C39A2E" };
}

function getLevelData(score) {
    // Règle Bigslaay : si le score est impair, on arrondit au pair supérieur.
    const adjusted = score % 2 === 0 ? score : score + 1;
    const validScores = [10, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 46, 50];
    const closest = validScores.find(v => v >= adjusted) || 50;
    return {
        score: adjusted,
        plafond: closest,
        plancher: Math.max(10, closest - 10),
        level: LEVELS[closest],
        rank: getRankFromScore(closest)
    };
}

window.startQuiz = function() {
    const hero = document.querySelector('.hero');
    const cards = document.querySelector('.cards-container');
    if (hero) hero.style.display = 'none';
    if (cards) cards.style.display = 'none';
    
    let quizView = document.getElementById('quiz-view');
    if (quizView) quizView.remove();

    quizView = document.createElement('div');
    quizView.id = 'quiz-view';
    document.querySelector('main').appendChild(quizView);

    window.setActiveNav('quiz');
    window.renderQuestion();
};

window.exitQuiz = function() {
    currentQuestionIndex = 0;
    totalScore = 0;
    selectedOption = null;

    const quizView = document.getElementById('quiz-view');
    if (quizView) quizView.remove();

    const hero = document.querySelector('.hero');
    const cards = document.querySelector('.cards-container');
    if (hero) hero.style.display = '';
    if (cards) cards.style.display = '';

    window.setActiveNav('regles');
    window.scrollTo(0, 0);
};

window.renderQuestion = function() {
    const questionData = QUESTIONS[currentQuestionIndex];
    const quizContainer = document.getElementById('quiz-view');
    if (!quizContainer) return;

    const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;
    const shuffledOptions = [...questionData.options].sort(() => Math.random() - 0.5);
    
    quizContainer.className = 'quiz-container';
    quizContainer.innerHTML = `
        <button type="button" class="quiz-exit" onclick="exitQuiz()" aria-label="Quitter le quiz">&times;</button>
        <div class="quiz-header">
            <div class="quiz-nav">
                <span class="q-count">${(currentQuestionIndex + 1).toString().padStart(2, '0')} / ${QUESTIONS.length.toString().padStart(2, '0')}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
        </div>
        
        <div class="question-content">
            <h2 class="question-text">${questionData.question}</h2>
            <p class="question-hint">Choisis la réponse qui te correspond le mieux.</p>
        </div>
        
        <div class="options-list">
            ${shuffledOptions.map((opt) => `
                <div class="option-card" onclick="selectOption(this, ${opt.points})">
                    <span class="option-letter">${opt.letter}</span>
                    <span class="option-text">${opt.text}</span>
                </div>
            `).join('')}
        </div>
        
        <div class="quiz-footer">
            <button id="next-btn" class="btn-next" disabled onclick="nextQuestion()">
                ${currentQuestionIndex === QUESTIONS.length - 1 ? 'Voir mon rang' : 'Question suivante'}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
        </div>
    `;
    
    selectedOption = null;
    window.scrollTo(0, 0);
};

window.selectOption = function(element, points) {
    document.querySelectorAll('.option-card').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    selectedOption = points;
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) nextBtn.disabled = false;
};

window.nextQuestion = function() {
    if (selectedOption === null) return;
    totalScore += selectedOption;
    
    if (currentQuestionIndex < QUESTIONS.length - 1) {
        currentQuestionIndex++;
        window.renderQuestion();
    } else {
        window.showResult();
    }
};

window.showResult = function() {
    const quizContainer = document.getElementById('quiz-view');
    if (!quizContainer) return;

    const { level, rank, plafond, plancher } = getLevelData(totalScore);
    const image = RANK_IMAGES[rank.nom];

    // Position de la "zone" (plancher → plafond) sur l'échelle 10–50.
    const zoneLeft = ((plancher - 10) / 40) * 100;
    const zoneWidth = ((plafond - plancher) / 40) * 100;

    const nextLevelBlock = level.evolution_vers
        ? `
                    <div class="next-level">
                        <h5>Pour atteindre ${level.evolution_vers}</h5>
                        <ul>${level.chemin_evolution.map(step => `<li>${step}</li>`).join('')}</ul>
                    </div>`
        : `
                    <div class="next-level">
                        <h5>Tu es au sommet de l'échelle</h5>
                        <p class="next-level-hook">${level.chemin_evolution[1] || level.chemin_evolution[0]}</p>
                    </div>`;

    window.setActiveNav('resultat');
    quizContainer.className = 'result-view';
    quizContainer.innerHTML = `
        <div class="result-split">
            <button type="button" class="quiz-exit" onclick="exitQuiz()" aria-label="Recommencer le test">&times;</button>

            <aside class="rank-panel">
                <span class="rank-eyebrow">Ton rang</span>
                <div class="rank-avatar"><img src="${image}" alt="${rank.nom}"></div>
                <h2 class="rank-name" style="color:${rank.couleur}">${rank.nom}</h2>
                <div class="rank-hawkins">${level.nom} · ${plafond} pts</div>
                <div class="zone-meter">
                    <div class="zone-track">
                        <div class="zone-fill" style="left:${zoneLeft}%; width:${zoneWidth}%; background:${rank.couleur}"></div>
                    </div>
                    <div class="zone-legend"><span>Plancher ${plancher}</span><span>Plafond ${plafond}</span></div>
                </div>
            </aside>

            <div class="content-panel">
                <h3 class="content-title">Ce que ton niveau révèle</h3>
                <div class="traits-grid">
                    <div class="trait"><span class="trait-label">Émotion</span><p>${level.emotion}</p></div>
                    <div class="trait"><span class="trait-label">Perception</span><p>${level.perception}</p></div>
                    <div class="trait"><span class="trait-label">Concrètement</span><p>${level.concretement}</p></div>
                </div>

                ${nextLevelBlock}

                <div class="offer-bar">
                    <div class="offer-copy">
                        <strong>Amorce ton passage au niveau supérieur</strong>
                        <span>Vidéo de 2 min offerte, puis le manuel complet des 18 niveaux.</span>
                    </div>
                    <a href="${SYSTEMEIO_FUNNEL_URL}" class="btn-cadeau">Recevoir mon cadeau →</a>
                </div>

                <button type="button" class="btn-restart" onclick="exitQuiz()">Recommencer le test</button>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const btns = document.querySelectorAll('.btn-primary, .btn-cta');
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.startQuiz();
        });
    });
});
