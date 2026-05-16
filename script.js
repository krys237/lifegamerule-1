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

const RANKS = [
    { max: 16, nom: "Bronze", image: "Light soft/carte6/bronze.png", couleur: "#8B5E3C" },
    { max: 24, nom: "Argent", image: "Light soft/carte6/argent.png", couleur: "#7A8590" },
    { max: 28, nom: "Or", image: "Light soft/carte6/or.png", couleur: "#C99417" },
    { max: 34, nom: "Platine", image: "Light soft/carte6/platine.png", couleur: "#5B98B5" },
    { max: 38, nom: "Diamant", image: "Light soft/carte6/diamant.png", couleur: "#7B6BC4" },
    { max: 50, nom: "Maître", image: "Light soft/carte6/maitre.png", couleur: "#C39A2E" }
];

let currentQuestionIndex = 0;
let totalScore = 0;
let selectedOption = null;

function getRank(score) {
    for (let r of RANKS) {
        if (score <= r.max) return r;
    }
    return RANKS[RANKS.length - 1];
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
    
    window.renderQuestion();
};

window.renderQuestion = function() {
    const questionData = QUESTIONS[currentQuestionIndex];
    const quizContainer = document.getElementById('quiz-view');
    if (!quizContainer) return;

    const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;
    const shuffledOptions = [...questionData.options].sort(() => Math.random() - 0.5);
    
    quizContainer.className = 'quiz-container';
    quizContainer.innerHTML = `
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
        window.showCaptureForm();
    }
};

window.showCaptureForm = function() {
    const quizContainer = document.getElementById('quiz-view');
    if (!quizContainer) return;

    quizContainer.className = 'capture-container';
    quizContainer.innerHTML = `
        <div class="capture-layout">
            <div class="capture-info">
                <span class="tagline">WE'RE HERE TO HELP YOU</span>
                <h2 class="capture-title">Découvre Ton Niveau de Conscience</h2>
                <p class="capture-text">Bravo d'être allé jusqu'au bout. Ton analyse est prête. Laisse-nous ton nom et ton email pour y accéder instantanément.</p>
                
                <div class="contact-mini">
                    <div class="contact-item">
                        <div class="icon-circle"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
                        <div class="contact-detail">
                            <span>E-mail</span>
                            <strong>contact@onepourcent.com</strong>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="icon-circle"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.81 12.81 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div>
                        <div class="contact-detail">
                            <span>Phone number</span>
                            <strong>+33 1 23 45 67 89</strong>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="capture-form-card">
                <form id="lead-form" onsubmit="handleCaptureSubmit(event)">
                    <div class="input-field">
                        <label>Nom</label>
                        <input type="text" id="prenom" placeholder="Ton nom" required>
                    </div>
                    <div class="input-field">
                        <label>Email</label>
                        <input type="email" id="email" placeholder="ton@email.com" required>
                    </div>
                    <button type="submit" class="btn-get-result">
                        <div class="btn-circle">→</div>
                        Obtenir mon résultat
                    </button>
                </form>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
};

window.handleCaptureSubmit = function(event) {
    event.preventDefault();
    const prenom = document.getElementById('prenom').value;
    window.showResult(prenom);
};

window.showResult = function(prenom) {
    const adjustedScore = totalScore % 2 === 0 ? totalScore : totalScore + 1;
    const rank = getRank(adjustedScore);
    
    const quizContainer = document.getElementById('quiz-view');
    if (!quizContainer) return;

    quizContainer.className = 'result-container-final';
    quizContainer.innerHTML = `
        <div class="result-card">
            <div class="result-badge-area">
                <div class="avatar-wrapper">
                    <img src="${rank.image}" alt="${rank.nom}">
                </div>
                <h2 class="user-name">${prenom}</h2>
                <span class="rank-title">Rank</span>
                <h3 class="rank-value">${rank.nom}</h3>
                <div class="score-badge">Score: ${adjustedScore}/50</div>
            </div>
            
            <div class="result-body">
                <h4 class="congrats-text">Congratulations, you've completed this quiz!</h4>
                <p class="result-desc">Let's keep testing your knowledge by playing more quizzes!</p>
                
                <button class="btn-explore" onclick="location.reload()">
                    Explore More
                </button>
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
