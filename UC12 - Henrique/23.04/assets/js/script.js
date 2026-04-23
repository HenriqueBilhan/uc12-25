// ===== PERGUNTAS DO QUIZ =====
const questions = [
  {
    question: "Qual é o maior planeta do Sistema Solar?",
    options: ["Saturno", "Netuno", "Júpiter", "Urano", "Marte"],
    answer: 2
  },
  {
    question: "Em que ano o Brasil foi colonizado pelos portugueses?",
    options: ["1488", "1492", "1500", "1510", "1522"],
    answer: 2
  },
  {
    question: "Qual é o elemento químico mais abundante no universo?",
    options: ["Hélio", "Oxigênio", "Carbono", "Nitrogênio", "Hidrogênio"],
    answer: 4
  },
  {
    question: "Quem escreveu 'Dom Casmurro'?",
    options: ["José de Alencar", "Clarice Lispector", "Machado de Assis", "Graciliano Ramos", "Euclides da Cunha"],
    answer: 2
  },
  {
    question: "Qual país possui a maior área territorial do mundo?",
    options: ["China", "Canadá", "Estados Unidos", "Brasil", "Rússia"],
    answer: 4
  },
  {
    question: "Quantos ossos tem o corpo humano adulto?",
    options: ["186", "206", "216", "226", "246"],
    answer: 1
  },
  {
    question: "Qual é a capital da Austrália?",
    options: ["Sydney", "Melbourne", "Brisbane", "Canberra", "Perth"],
    answer: 3
  },
  {
    question: "Em que ano foi lançado o primeiro iPhone?",
    options: ["2004", "2005", "2006", "2007", "2008"],
    answer: 3
  },
  {
    question: "Qual é o oceano mais profundo do mundo?",
    options: ["Atlântico", "Índico", "Ártico", "Antártico", "Pacífico"],
    answer: 4
  },
  {
    question: "Qual linguagem de programação foi criada por Guido van Rossum?",
    options: ["Ruby", "Perl", "Java", "Python", "Go"],
    answer: 3
  }
];

// ===== ESTADO DO JOGO =====
let currentIndex = 0;
let score = 0;
let answered = false;

// ===== ELEMENTOS =====
const screenStart   = document.getElementById('screen-start');
const screenQuiz    = document.getElementById('screen-quiz');
const screenResult  = document.getElementById('screen-result');
const btnStart      = document.getElementById('btn-start');
const btnNext       = document.getElementById('btn-next');
const btnRestart    = document.getElementById('btn-restart');
const progressFill  = document.getElementById('progress-fill');
const progressText  = document.getElementById('progress-text');
const scoreDisplay  = document.getElementById('score-display');
const questionNum   = document.getElementById('question-num');
const questionText  = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const finalScore    = document.getElementById('final-score');
const resultTitle   = document.getElementById('result-title');
const resultSubtitle= document.getElementById('result-subtitle');
const resultEmoji   = document.getElementById('result-emoji');
const resultBar     = document.getElementById('result-bar');

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

function showScreen(screen) {
  [screenStart, screenQuiz, screenResult].forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

function loadQuestion() {
  answered = false;
  const q = questions[currentIndex];

 
  const card = document.getElementById('question-card');
  card.style.animation = 'none';
  void card.offsetWidth;
  card.style.animation = 'slideUp 0.4s cubic-bezier(.4,0,.2,1)';

  
  questionNum.textContent = `Pergunta ${String(currentIndex + 1).padStart(2, '0')}`;
  questionText.textContent = q.question;

  
  const pct = ((currentIndex) / questions.length) * 100;
  progressFill.style.width = `${pct}%`;
  progressText.textContent = `${currentIndex + 1} / ${questions.length}`;

  
  optionsContainer.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `
      <span class="option-letter">${LETTERS[i]}</span>
      <span class="option-label">${opt}</span>
    `;
    btn.addEventListener('click', () => selectAnswer(i, btn));
    optionsContainer.appendChild(btn);
  });

  btnNext.classList.add('hidden');
}

function selectAnswer(index, btn) {
  if (answered) return;
  answered = true;

  const correct = questions[currentIndex].answer;
  const allBtns = optionsContainer.querySelectorAll('.option-btn');

  allBtns.forEach(b => b.disabled = true);

  if (index === correct) {
    btn.classList.add('correct');
    score++;
    scoreDisplay.textContent = `⭐ ${score}`;
    scoreDisplay.classList.add('bump');
    setTimeout(() => scoreDisplay.classList.remove('bump'), 400);
  } else {
    btn.classList.add('wrong');
    allBtns[correct].classList.add('correct');
  }

  btnNext.classList.remove('hidden');
  btnNext.textContent = currentIndex < questions.length - 1 ? 'Próxima →' : 'Ver Resultado →';
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  showScreen(screenResult);

  finalScore.textContent = score;
  progressFill.style.width = '100%';

  const pct = (score / questions.length) * 100;

  setTimeout(() => {
    resultBar.style.width = `${pct}%`;
  }, 100);

  
  if (score === 10) {
    resultEmoji.textContent = '🏆';
    resultTitle.textContent = 'Perfeito!';
    resultSubtitle.textContent = 'Você acertou tudo! Conhecimento de mestre.';
  } else if (score >= 8) {
    resultEmoji.textContent = '🌟';
    resultTitle.textContent = 'Excelente!';
    resultSubtitle.textContent = 'Quase perfeito! Você mandou muito bem.';
  } else if (score >= 6) {
    resultEmoji.textContent = '👏';
    resultTitle.textContent = 'Muito Bem!';
    resultSubtitle.textContent = 'Bom desempenho! Continue estudando.';
  } else if (score >= 4) {
    resultEmoji.textContent = '💪';
    resultTitle.textContent = 'Razoável!';
    resultSubtitle.textContent = 'Você passou da metade. Dá pra melhorar!';
  } else {
    resultEmoji.textContent = '📚';
    resultTitle.textContent = 'Ops...';
    resultSubtitle.textContent = 'Não desanime! Tente novamente e melhore.';
  }
}

function restartGame() {
  currentIndex = 0;
  score = 0;
  answered = false;
  scoreDisplay.textContent = '⭐ 0';
  resultBar.style.width = '0%';
  showScreen(screenQuiz);
  loadQuestion();
}


btnStart.addEventListener('click', () => {
  showScreen(screenQuiz);
  loadQuestion();
});

btnNext.addEventListener('click', nextQuestion);
btnRestart.addEventListener('click', restartGame);
