const questions = [
  {
    question: "O que aparece no escuro?",
    options: ["Nada", "Sombras", "Monstros", "Luz", "Sonhos"],
    answer: 2
  },
  {
    question: "Você ouviu um som atrás de você",
    options: ["Ignorar", "Correr", "Olhar", "Gritar", "Dormir"],
    answer: 2
  }
];

let current = 0;

const questionEl = document.getElementById("question");
const buttons = document.querySelectorAll(".btn");

function loadQuestion() {
  const q = questions[current];
  questionEl.innerText = q.question;

  buttons.forEach((btn, i) => {
    btn.innerText = q.options[i];
  });
}

function checkAnswer(index) {
  if (index === questions[current].answer) {
    current++;
    if (current < questions.length) {
      loadQuestion();
    } else {
      questionEl.innerText = "Você sobreviveu...";
    }
  } else {
    jumpscare();
  }
}

function jumpscare() {
  const scare = document.getElementById("jumpscare");
  const sound = document.getElementById("scare-sound");

  scare.style.display = "flex";
  sound.play();

  document.body.classList.add("flash");

  setTimeout(() => {
    scare.style.display = "none";
    document.body.classList.remove("flash");
  }, 1500);
}

loadQuestion();