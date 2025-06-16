let hearts = 3;
let currentMemeQuestion = null;

function showLogin() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("login").style.display = "block";
}

function verifyPassword() {
  const pass = document.getElementById("password").value.trim().toLowerCase();
  if (pass === "wen") {
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
    document.getElementById(nextId).classList.add("active");
    if (nextId === "loading") {
      setTimeout(() => {
        document.getElementById("loading").style.display = "none";
        document.getElementById("result").style.display = "block";
        startCountdown();
      }, 2000);
      document.getElementById("loading").style.display = "block";
      document.getElementById("quiz").style.display = "none";
    }
  } else {
    hearts--;
    const heartImages = document.querySelectorAll(".heart");
    if (heartImages[hearts]) {
      heartImages[hearts].style.visibility = "hidden";
    }
    if (hearts === 0) {
      document.getElementById("quiz").style.display = "none";
      document.getElementById("game-over").style.display = "block";
    } else {
      document.getElementById(nextId).classList.add("active");
    }
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
  const targetDate = new Date("June 20, 2025 20:30:00").getTime();
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
