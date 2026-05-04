const page = document.body.dataset.page;

// Adds a small page-enter motion to keep navigation feeling continuous.
document.body.classList.add("ready");

if (page === "quiz") {
  startQuiz();
}

if (page === "game") {
  startMemoryGame();
}

if (page === "final") {
  startHearts();
  document.getElementById("replay-hearts").addEventListener("click", startHearts);
}

function startQuiz() {
  const questions = [
    {
      text: "Quando eu penso em você, qual palavra aparece primeiro?",
      answers: ["Casa", "Wi-fi", "Despertador"],
      correct: 0,
      feedback: "Sim. Você sempre foi meu lugar de segurança, Mãe."
    },
    {
      text: "Qual superpoder de mãe você usa melhor?",
      answers: ["Achar tudo", "Cuidar sem medir", "Saber voar"],
      correct: 1,
      feedback: "Acertou. Seu cuidado deixa marcas lindas na minha vida."
    },
    {
      text: "Qual cor combina com a alegria que você espalha?",
      answers: ["Cinza chuva", "Amarelo abraço", "Azul segunda-feira"],
      correct: 1,
      feedback: "Claro que é amarelo. Quentinho, vivo e com cara de você."
    },
    {
      text: "O que eu quero te dizer hoje?",
      answers: ["Só parabéns", "Que eu te amo muito", "Que acabou o quiz"],
      correct: 1,
      feedback: "Essa é a resposta principal do dia: eu te amo muito."
    }
  ];

  let currentQuestion = 0;
  const title = document.getElementById("question-title");
  const answers = document.getElementById("answers");
  const feedback = document.getElementById("feedback");
  const next = document.getElementById("next-question");
  const progress = document.getElementById("quiz-progress");

  showQuestion();

  next.addEventListener("click", () => {
    currentQuestion += 1;

    if (currentQuestion >= questions.length) {
      window.location.href = "game.html";
      return;
    }

    showQuestion();
  });

  function showQuestion() {
    const question = questions[currentQuestion];
    title.textContent = question.text;
    answers.innerHTML = "";
    feedback.textContent = "";
    next.classList.add("hidden");
    progress.style.width = `${(currentQuestion / questions.length) * 100}%`;

    question.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.className = "answer-button";
      button.type = "button";
      button.textContent = answer;
      button.addEventListener("click", () => chooseAnswer(button, index));
      answers.appendChild(button);
    });
  }

  function chooseAnswer(selectedButton, selectedIndex) {
    const question = questions[currentQuestion];
    const buttons = answers.querySelectorAll("button");

    buttons.forEach((button, index) => {
      button.disabled = true;
      if (index === question.correct) {
        button.classList.add("correct");
      }
    });

    if (selectedIndex !== question.correct) {
      selectedButton.classList.add("wrong");
      feedback.textContent = `Quase! Mas a resposta mais bonita é: ${question.answers[question.correct]}. ${question.feedback}`;
    } else {
      feedback.textContent = question.feedback;
    }

    progress.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    next.textContent = currentQuestion === questions.length - 1 ? "Ir para o jogo" : "Próxima";
    next.classList.remove("hidden");
  }
}

function startMemoryGame() {
  const board = document.getElementById("memory-board");
  const completeBox = document.getElementById("game-complete");
  const images = [
    "image/foto1.jpeg",
    "image/foto2.jpeg",
    "image/foto3.jpeg",
    "image/foto4.jpeg"
  ];
  const shuffledCards = [...images, ...images].sort(() => Math.random() - 0.5);
  let firstCard = null;
  let secondCard = null;
  let locked = false;
  let matches = 0;

  shuffledCards.forEach((img, index) => {
    const card = document.createElement("button");
    card.className = "memory-card";
    card.type = "button";
    card.dataset.image = img;
    card.setAttribute("aria-label", `Carta ${index + 1}`);
    card.innerHTML = `<img src="${img}" alt="memória especial" />`;
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  });

  function flipCard(card) {
    if (locked || card === firstCard || card.classList.contains("matched")) {
      return;
    }

    card.classList.add("flipped");

    if (!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;
    locked = true;

    if (firstCard.dataset.image === secondCard.dataset.image) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      matches += 1;
      resetTurn();

      if (matches === images.length) {
        completeBox.classList.remove("hidden");
      }
      return;
    }

    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, 750);
  }

  function resetTurn() {
    firstCard = null;
    secondCard = null;
    locked = false;
  }
}

function startHearts() {
  const layer = document.getElementById("hearts-layer");
  const symbols = ["💛", "💖", "✨", "🌻"];

  for (let index = 0; index < 28; index += 1) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${Math.random() * 18 + 18}px`;
    heart.style.animationDelay = `${Math.random() * 1.8}s`;
    heart.style.animationDuration = `${Math.random() * 2.5 + 4}s`;
    layer.appendChild(heart);

    setTimeout(() => heart.remove(), 7000);
  }
}
