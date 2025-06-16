let currentMemeQuestion = null;
let totalCorrect = 0; // track correct answers
let totalQuestions = 3; // total number of questions
let hearts = 3; // initialize hearts

function showLogin() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("login").style.display = "block";
}

function verifyPassword() {
  const pass = document.getElementById("password").value.trim().toLowerCase();
  if (pass === "orange") {
    document.getElementById("login").style.display = "none";
    document.getElementById("instructions").style.display = "block";
  } else {
    document.getElementById("login-error").style.display = "block";
  }
}

function startQuiz() {
  document.getElementById("instructions").style.display = "none";
  document.getElementById("quiz").style.display = "block";
}




function nextQuestion(currentId, nextId, isCorrect) {
  document.getElementById(currentId).classList.remove("active");

  if (isCorrect) {
    totalCorrect++;
  } else {
    hearts--;
    const heartImages = document.querySelectorAll(".heart");
    if (heartImages[hearts]) {
      const heart = heartImages[hearts];
      heart.classList.add("pop");
      setTimeout(() => {
        heart.style.visibility = "hidden";
        heart.classList.remove("pop");
      }, 600); // Match animation duration
    }
  }

  const isLastQuestion = nextId === "loading";

  if (isLastQuestion) {
    if (totalCorrect === totalQuestions) {
      document.getElementById("quiz").style.display = "none";
      document.getElementById("loading").style.display = "block";

      setTimeout(() => {
        document.getElementById("loading").style.display = "none";
        document.getElementById("result").style.display = "block";
        startCountdown();
      }, 2000);
    } else {
      document.getElementById("quiz").style.display = "none";
      document.getElementById("game-over").style.display = "block";
      document.getElementById("game-over-message").textContent =
        "Seems like you had your eyes closed or something... try again ";
    }
  } else {
    document.getElementById(nextId).classList.add("active");
  }
}



function showMeme(currentId) {
  currentMemeQuestion = currentId;
  document.getElementById("quiz").style.display = "none";
  document.getElementById("meme-popup").style.display = "block";

  const sound = document.getElementById("meme-sound");
  if (sound) sound.play();
}

function closeMeme() {
  document.getElementById("meme-popup").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  if (currentMemeQuestion) {
    document.getElementById(currentMemeQuestion).classList.add("active");
  }
}

function startCountdown() {
  const targetDate = new Date("June 21, 2025 21:00:00").getTime();
  const countdownEl = document.getElementById("countdown");

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      clearInterval(interval);
      countdownEl.innerHTML = "It's time!";
    } else {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hrs = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((distance % (1000 * 60)) / 1000);
      countdownEl.innerHTML = `${days}d ${hrs}h ${mins}m ${secs}s`;
    }
  }, 1000);
}
if (distance <= 0) {
  clearInterval(interval);
  countdownEl.innerHTML = "It's time!";
  document.getElementById("after-date-button").disabled = false;
  document.getElementById("after-date-button").innerText = "💌 Click me when you're ready...";
}
function revealMessage() {
  document.getElementById("secret-message").style.display = "block";
}

function spawnFloatingHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart-float");
  heart.style.left = Math.random() * 100 + "vw";
  heart.textContent = "❤";
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

setInterval(spawnFloatingHeart, 800); // spawn every 0.8 seconds
