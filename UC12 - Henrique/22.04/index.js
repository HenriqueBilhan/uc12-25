  const questions = [
      {
        q: "Qual é o planeta mais próximo do Sol?",
        opts: ["Vênus", "Marte", "Mercúrio", "Terra", "Plutão"],
        answer: 2
      },
      {
        q: "Quantos planetas existem no Sistema Solar?",
        opts: ["7", "8", "9", "10", "11"],
        answer: 1
      },
      {
        q: "Como se chama a galáxia onde vivemos?",
        opts: ["Andrômeda", "Triângulo", "Sombrero", "Via Láctea", "Sirius"],
        answer: 3
      },
      {
        q: "O que é um buraco negro?",
        opts: [
          "Uma estrela fria",
          "Uma região de gravidade extrema que nada escapa",
          "Um planeta gigante",
          "Um asteroide destruído",
          "Um terremoto"

        ],
        answer: 1
      },
      {
        q: "Qual é o maior planeta do Sistema Solar?",
        opts: ["Saturno", "Urano", "Júpiter", "Netuno", "Terra"],
        answer: 2
      },
      {
        q: "Qual missão levou humanos à Lua pela primeira vez?",
        opts: ["Apollo 13", "Gemini 7", "Apollo 11", "Mercury 3", "Gemini 5"],
        answer: 2
      },
      {
        q: "Quanto tempo a luz do Sol leva para chegar à Terra?",
        opts: ["8 segundos", "8 minutos", "8 horas", "8 dias", "8 milésimos"],
        answer: 1
      },
      {
        q: "Qual é a estrela mais próxima do Sistema Solar (além do Sol)?",
        opts: ["Sirius", "Betelgeuse", "Proxima Centauri", "Vega", "Rígel"],
        answer: 2
      }
    ];

    let current = 0, score = 0;

    const bgImg      = document.getElementById('bg-img');
    const errorOverlay = document.getElementById('error-overlay');

    function startQuiz() {
      current = 0;
      score   = 0;
      bgImg.classList.remove('wrong-bg');
      errorOverlay.classList.remove('active');
      document.getElementById('result-screen').style.display = 'none';
      document.getElementById('quiz-screen').style.display  = 'block';
      renderQuestion();
    }

    function renderQuestion() {
      const q = questions[current];

      document.getElementById('question-num').textContent =
        `Pergunta ${current + 1} de ${questions.length}`;
      document.getElementById('question-text').textContent = q.q;
      document.getElementById('feedback').textContent = '';
      document.getElementById('feedback').style.color  = '#FFD700';
      document.getElementById('next-btn').style.display = 'none';

      // Reseta imagem de erro ao passar para a próxima
      bgImg.classList.remove('wrong-bg');
      errorOverlay.classList.remove('active');

      // Opções
      const grid = document.getElementById('options-grid');
      grid.innerHTML = '';
      q.opts.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className   = 'opt-btn';
        btn.textContent = opt;
        btn.onclick     = () => checkAnswer(i);
        grid.appendChild(btn);
      });

      // Progresso
      const pw = document.getElementById('progress-wrap');
      pw.innerHTML = '';
      questions.forEach((_, i) => {
        const d = document.createElement('div');
        d.className = 'dot' +
          (i < current ? ' done' : i === current ? ' active' : '');
        pw.appendChild(d);
      });
    }

    function checkAnswer(idx) {
      const q    = questions[current];
      const btns = document.querySelectorAll('.opt-btn');
      btns.forEach(b => b.disabled = true);
      btns[q.answer].classList.add('correct');

      const fb = document.getElementById('feedback');

      if (idx === q.answer) {
        score++;
        fb.textContent = '✓ Correto!';
        fb.style.color = '#00e676';
        bgImg.classList.remove('wrong-bg');
        errorOverlay.classList.remove('active');
      } else {
        btns[idx].classList.add('wrong');
        fb.textContent = '✗ Errado! A resposta certa está destacada.';
        fb.style.color = '#ff5252';
        // Troca imagem de fundo ao errar
        bgImg.classList.add('wrong-bg');
        errorOverlay.classList.add('active');
      }

      document.getElementById('next-btn').style.display = 'inline-block';
    }

    function nextQuestion() {
      current++;
      if (current < questions.length) {
        renderQuestion();
      } else {
        showResult();
      }
    }

    function showResult() {
      document.getElementById('quiz-screen').style.display  = 'none';
      document.getElementById('result-screen').style.display = 'block';
      bgImg.classList.remove('wrong-bg');
      errorOverlay.classList.remove('active');

      const pct = score / questions.length;
      let emoji, title;

      if      (pct === 1)    { emoji = '🏆'; title = 'Perfeito! Você é um gênio espacial!'; }
      else if (pct >= 0.7)   { emoji = '🚀'; title = 'Ótimo resultado! Quase lá!'; }
      else if (pct >= 0.4)   { emoji = '🌙'; title = 'Bom esforço! Continue aprendendo!'; }
      else                   { emoji = '🌍'; title = 'Não desanime! O espaço é fascinante!'; }

      document.getElementById('result-emoji').textContent = emoji;
      document.getElementById('result-title').textContent = title;
      document.getElementById('result-score').textContent =
        `Você acertou ${score} de ${questions.length} perguntas`;
    }

    startQuiz();