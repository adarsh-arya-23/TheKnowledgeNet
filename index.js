// 🔊 Sounds
const correctSound = new Audio("Correct.mp3");
const wrongSound = new Audio("Wrong.mp3");
const nextSound = new Audio("next.mp3");
const completeSound = new Audio("complete.mp3");

// 🎉 Confetti Animation
function launchConfetti() {
  const duration = 2 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// 🔇 Sound Mute Toggle
let soundMuted = false;
const muteBtn = document.querySelector(".mute-button");
muteBtn.addEventListener("click", () => {
  soundMuted = !soundMuted;
  muteBtn.innerText = soundMuted ? "🔇 Sound Off" : "🔊 Sound On";
});

// 🤔 Questions
const questions = [
  {
    question: "Which one does not belong to the group?",
    options: ["Dog", "Cat", "Tiger", "Apple"],
    answer: "Apple"
  },
  {
    question: "Find the missing number: 3, 6, 11, 18, ?",
    options: ["25", "27", "29", "30"],
    answer: "27"
  },
  {
    question: "Which word is the odd one out?",
    options: ["Triangle", "Square", "Circle", "Cube"],
    answer: "Cube"
  },
  {
    question: "What comes next? A, C, F, J, O, ?",
    options: ["S", "T", "U", "V"],
    answer: "U"
  },
  {
    question: "Which one is the odd one out?",
    options: ["Iron", "Copper", "Plastic", "Silver"],
    answer: "Plastic"
  },
  {
    question: "Find the odd one out.",
    options: ["Pen", "Pencil", "Eraser", "Notebook", "Mouse"],
    answer: "Mouse"
  },
  {
    question: "What comes next in the sequence? 121, 144, 169, ?",
    options: ["196", "186", "199", "176"],
    answer: "196"
  },
  {
    question: "Which number completes the series? 2, 6, 12, 20, ?",
    options: ["28", "30", "36", "40"],
    answer: "30"
  },
  {
    question: "Find the missing letter: Z, X, U, Q, ?",
    options: ["L", "M", "N", "O"],
    answer: "L"
  },
  {
    question: "Which shape is different?",
    options: ["Sphere", "Cone", "Cylinder", "Circle"],
    answer: "Circle"
  },
  {
    question: "What comes next? 1, 4, 9, 16, ?",
    options: ["20", "24", "25", "30"],
    answer: "25"
  },
  {
    question: "Choose the odd one out.",
    options: ["Red", "Blue", "Yellow", "Circle"],
    answer: "Circle"
  },
  {
    question: "Which of the following does not belong?",
    options: ["Oxygen", "Hydrogen", "Carbon", "Salt"],
    answer: "Salt"
  },
  {
    question: "Find the missing number: 2, 3, 5, 8, 12, ?",
    options: ["17", "18", "19", "20"],
    answer: "17"
  },
  {
    question: "Which is the odd one?",
    options: ["Train", "Bus", "Cycle", "Rocket"],
    answer: "Cycle"
  },
  {
    question: "What comes next? 100, 96, 88, 76, ?",
    options: ["60", "62", "64", "66"],
    answer: "60"
  },
  {
    question: "Which one is the odd one?",
    options: ["Keyboard", "Mouse", "Monitor", "Speaker", "Book"],
    answer: "Book"
  },
  {
    question: "Which number completes the series? 5, 11, 23, 47, ?",
    options: ["94", "95", "96", "97"],
    answer: "95"
  },
  {
    question: "Which one is different?",
    options: ["Earth", "Mars", "Venus", "Sun"],
    answer: "Sun"
  },
  {
    question: "Find the missing term: 1, 4, 10, 20, ?",
    options: ["35", "36", "37", "38"],
    answer: "35"
  }
];


// 🔀 State Variables
let currentQuestionIndex = 0;
let correctScore = 0;
let timerInterval;
let timeLeft = 10;

// 🧱 DOM Elements
const questionBox = document.querySelector(".question-box p");
const optionsContainer = document.querySelector(".options-container");
const levelIndicator = document.querySelector(".level-indicator");
const nextBtn = document.querySelector(".next-button");
const restartBtn = document.querySelector(".restart-button");
const timeDisplay = document.getElementById("time");
const progressFill = document.querySelector(".progress-fill");
const introScreen = document.querySelector(".intro-screen");
const startBtn = document.querySelector(".start-button");
const typingText = document.querySelector(".typing-text");
const gameTitle = document.querySelector(".game-title");
const gameMeta = document.querySelector(".game-meta");
const progressBar = document.querySelector(".progress-bar");
const questionContainer = document.querySelector(".question-box");
const buttonGroup = document.querySelector(".button-group");
const utilityButtons = document.querySelector(".utility-buttons");

// ✍️ Typing Effect
function typeWriter(text, element, speed = 100) {
  let i = 0;
  element.innerHTML = "";
  element.style.borderRight = "3px solid var(--primary-btn)";
  
  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else {
      element.style.borderRight = "none";
    }
  }
  
  typing();
}

// 🚀 Initialize Intro Screen
function initIntro() {
  typeWriter("Welcome to The Knowledge Net", typingText, 80);
}

// 🎮 Start Game
startBtn.addEventListener("click", () => {
  introScreen.style.display = "none";
  gameTitle.style.display = "block";
  progressBar.style.display = "block";
  gameMeta.style.display = "flex";
  questionContainer.style.display = "block";
  optionsContainer.style.display = "flex";
  buttonGroup.style.display = "flex";
  utilityButtons.style.display = "flex";
  loadQuestion();
});

// 🧠 Load a Question
function loadQuestion() {
  const current = questions[currentQuestionIndex];

  questionBox.classList.remove("fade-in");
  void questionBox.offsetWidth;
  questionBox.classList.add("fade-in");

  optionsContainer.classList.remove("fade-in");
  void optionsContainer.offsetWidth;
  optionsContainer.classList.add("fade-in");

  levelIndicator.innerText = `Level ${currentQuestionIndex + 1}`;
  questionBox.innerText = current.question;

  clearInterval(timerInterval);
  timeLeft = 10;
  timeDisplay.innerText = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      autoFail();
    }
  }, 1000);

  optionsContainer.innerHTML = "";
  current.options.forEach(optionText => {
    const btn = document.createElement("button");
    btn.classList.add("option");
    btn.innerText = optionText;
    btn.addEventListener("click", () => handleOptionClick(btn, current.answer));
    optionsContainer.appendChild(btn);
  });

  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressFill.style.width = `${progressPercent}%`;

  nextBtn.hidden = true;
}

// ✅ Handle Answer
function handleOptionClick(button, correctAnswer) {
  clearInterval(timerInterval);
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach(btn => btn.disabled = true);

  if (button.innerText === correctAnswer) {
    button.style.backgroundColor = "#c8e6c9";
    if (!soundMuted) correctSound.play();
    correctScore++;
  } else {
    button.style.backgroundColor = "#ffcdd2";
    if (!soundMuted) wrongSound.play();
    allOptions.forEach(btn => {
      if (btn.innerText === correctAnswer) {
        btn.style.backgroundColor = "#c8e6c9";
      }
    });
  }

  nextBtn.hidden = false;
}

// ⏰ Auto Fail
function autoFail() {
  const current = questions[currentQuestionIndex];
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === current.answer) {
      btn.style.backgroundColor = "#c8e6c9";
    }
  });

  if (!soundMuted) wrongSound.play();
  nextBtn.hidden = false;
}

// ➔ Next Question
nextBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  if (!soundMuted) nextSound.play();
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showEndScreen();
  }
});

// 🏁 Show Result
function showEndScreen() {
  let message = "";
  if (correctScore === questions.length) {
    message = "🔥 Perfect!";
  } else if (correctScore >= questions.length / 2) {
    message = "👍 Good Job!";
  } else {
    message = "🙅‍♂️ Try Again!";
  }

  questionBox.innerText = `🎉 Quiz Complete!\nCorrect Answers: ${correctScore} / ${questions.length}\n${message}`;
  optionsContainer.innerHTML = "";
  levelIndicator.innerText = "Game Complete";
  nextBtn.hidden = true;
  restartBtn.hidden = false;

  if (!soundMuted) completeSound.play();
  confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
  launchConfetti();
}

// 🔀 Restart
restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  correctScore = 0;
  restartBtn.hidden = true;
  loadQuestion();
});

// 🌗 Theme Switcher
const themeToggleBtn = document.querySelector(".theme-toggle-button");
const savedTheme = localStorage.getItem("theme") || "light";
document.body.classList.add(`${savedTheme}-theme`);
themeToggleBtn.innerText = savedTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";

themeToggleBtn.addEventListener("click", () => {
  const currentTheme = document.body.classList.contains("dark-theme") ? "dark" : "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.body.classList.remove(`${currentTheme}-theme`);
  document.body.classList.add(`${newTheme}-theme`);

  themeToggleBtn.innerText = newTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
  localStorage.setItem("theme", newTheme);
});

// Initialize the app
initIntro();