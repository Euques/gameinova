const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");
const reiniciar = document.querySelector("#reiniciar");
const ganhou = document.querySelector("#ganhou");

ganhou.style.display = "none";

import questions from "./questions.js";

let currentIndex = 0;
let questionsCorrect = 0;

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";
  

  currentIndex = 0;
  questionsCorrect = 0;
  loadQuestion();
};

function nextQuestion(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    questionsCorrect++;
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
    
  }
}

function finish() {
  textFinish.innerHTML = `você acertou ${questionsCorrect} de ${questions.length}`;
  content.style.display = "none";
  contentFinish.style.display = "flex";

  if(textFinish.innerHTML == "você acertou 4 de 4"){

    console.log("Aê Caralho, foi saporra!")
    reiniciar.style.display="none"
    ganhou.style.display = "block";

    textFinish.innerHTML = `😀 você ganhou! 
    acertou ${questionsCorrect} de ${questions.length}`

    ganhou.onclick = () => {

      console.log("Pronto foi de boa pra ação!")
      window.location.href = "https://especial.inovabar.com.br/?p=promo/viptime17"
      
    };

  } else {
    textFinish.innerHTML = `😒 você acertou ${questionsCorrect} de ${questions.length}`
  }
}

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1} de ${questions.length}`;
  const item = questions[currentIndex];
  answers.innerHTML = "";
  question.innerHTML = item.question;

  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `;

    answers.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

loadQuestion();
