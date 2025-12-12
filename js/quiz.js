let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const quizData = [
  {
    question: "Gas rumah kaca apa yang menjadi penyebab utama pemanasan global?",
    options: ["A. Oksigen", "B. Karbon Dioksida", "C. Nitrogen", "D. Hidrogen"],
    correct: 1
  },
  {
    question: "Sumber energi terbarukan manakah yang menggunakan energi matahari?",
    options: ["A. Tenaga Surya", "B. Tenaga Angin", "C. Pembangkit Listrik Tenaga Air", "D. Tenaga Panas Bumi"],
    correct: 0
  },
  {
    question: "Apa penyebab utama naiknya permukaan air laut?",
    options: ["A. Arus Laut", "B. Pencairan Lapisan Es", "C. Gunung berapi bawah air", "D. Kehidupan laut"],
    correct: 1
  },
  {
    question: "Gas apakah yang membentuk sebagian besar atmosfer Bumi?",
    options: ["A. Oksigen", "B. Carbon Dioksida", "C. Nitrogen", "D. Argon"],
    correct: 2
  },
  {
    question: "Berapa persentase permukaan Bumi yang tertutupi oleh air?",
    options: ["A. 60%", "B. 63%", "C. 85%", "D. 71%"],
    correct: 2
  },
  {
    question: "Apa salah satu solusi perubahan iklim?",
    options: ["A. Migrasi", "B. Mitigasi", "C. Imigrasi", "D. Membakar lebih banyak fosil"],
    correct: 1
  },
  {
    question: "Dari mana datangnya emisi karbondioksida?",
    options: ["A. Sumber Alami dan Sumber Angkasa ", "B. Sumber Alami dan Sumber Hewan", "C. Sumber Alami dan Sumber Buatan Manusia", "D. Sumber Buatan Manusia dan Sumber Hewan"],
    correct: 2
  },
  {
    question: "Berapa persentase kenaikan suhu global sejak era pra-industri?",
    options: ["A. 1.4°C", "B. 1.5°C", "C. 1.6°C", "D. 2.0°C"],
    correct: 0
  }
];

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
    messageEl.textContent = "🌟 Mantap! Pahlawan Iklim beneran nih!";
  } else if (percentage >= 60) {
    messageEl.textContent = "💚 Bagus! Kamu tau tentang fakta-fakta iklim!";
  } else if (percentage >= 40) {
    messageEl.textContent = "🌱 Lumayan! Ayo, belajar lebih banyak tentang planet kita!";
  } else {
    messageEl.textContent = "🌍 Teruslah bereksplorasi! Kegagalan diperlukan untuk mencapai kehebatan! setiap langkah pembelajaran membantu melindungi planet kita!";
  }
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  currentQuestion < quizData.length ? loadQuestion() : showResults();
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
