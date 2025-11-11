const quizData = [
      {
        question: "What is the primary greenhouse gas responsible for global warming?",
        options: ["A. Oxygen", "B. Carbon Dioxide", "C. Nitrogen", "D. Hydrogen"],
        correct: 1
      },
      {
        question: "Which renewable energy source uses the sun's energy?",
        options: ["A. Wind Power", "B. Solar Power", "C. Hydroelectric Power", "D. Geothermal Power"],
        correct: 1
      },
      {
        question: "What is the main cause of rising sea levels?",
        options: ["A. Ocean currents", "B. Melting ice caps", "C. Underwater volcanoes", "D. Marine life"],
        correct: 1
      },
      {
        question: "Which gas makes up most of Earth's atmosphere?",
        options: ["A. Oxygen", "B. Carbon Dioxide", "C. Nitrogen", "D. Argon"],
        correct: 2
      },
      {
        question: "What percentage of Earth's surface is covered by water?",
        options: ["A. 50%", "B. 60%", "C. 71%", "D. 85%"],
        correct: 2
      }
    ];

    let currentQuestion = 0;
    let score = 0;
    let selectedAnswer = null;

    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const nextBtn = document.getElementById('next-btn');
    const quizContainer = document.getElementById('quiz-container');
    const resultEl = document.getElementById('result');
    const currentQuestionEl = document.getElementById('current-question');
    const totalQuestionsEl = document.getElementById('total-questions');
    const progressEl = document.getElementById('progress');
    const restartBtn = document.getElementById('restart-btn');

    totalQuestionsEl.textContent = quizData.length;

    function loadQuestion() {
      const current = quizData[currentQuestion];
      questionEl.textContent = current.question;
      optionsEl.innerHTML = '';
      selectedAnswer = null;
      nextBtn.disabled = true;

      current.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.setAttribute('data-option', String.fromCharCode(65 + index));
        btn.onclick = () => selectAnswer(index, btn);
        optionsEl.appendChild(btn);
      });

      currentQuestionEl.textContent = currentQuestion + 1;
      updateProgress();
    }

    function selectAnswer(index, btn) {
      if (selectedAnswer !== null) return;
      
      selectedAnswer = index;
      nextBtn.disabled = false;

      const buttons = optionsEl.querySelectorAll('.option-btn');
      buttons.forEach(b => b.disabled = true);

      if (index === quizData[currentQuestion].correct) {
        btn.classList.add('correct');
        score++;
      } else {
        btn.classList.add('incorrect');
        buttons[quizData[currentQuestion].correct].classList.add('correct');
      }
    }

    function updateProgress() {
      const progress = ((currentQuestion + 1) / quizData.length) * 100;
      progressEl.style.width = progress + '%';
    }

    function showResults() {
      quizContainer.style.display = 'none';
      resultEl.style.display = 'block';

      document.getElementById('score').textContent = score;
      document.getElementById('total').textContent = quizData.length;

      const percentage = (score / quizData.length) * 100;
      const messageEl = document.getElementById('result-message');

      if (percentage >= 80) {
        messageEl.textContent = "Outstanding! You're a climate champion! 🌟";
      } else if (percentage >= 60) {
        messageEl.textContent = "Great job! You have solid knowledge about climate change. 💚";
      } else if (percentage >= 40) {
        messageEl.textContent = "Good effort! Keep learning about our planet. 🌱";
      } else {
        messageEl.textContent = "Keep exploring! Every step counts in understanding climate change. 🌍";
      }
    }

    nextBtn.addEventListener('click', () => {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        loadQuestion();
      } else {
        showResults();
      }
    });

    restartBtn.addEventListener('click', () => {
      currentQuestion = 0;
      score = 0;
      selectedAnswer = null;
      quizContainer.style.display = 'block';
      resultEl.style.display = 'none';
      loadQuestion();
    });

    loadQuestion();