let hearts = 3;
let correctAnswers = 0;

function showLogin() {
  document.getElementById('intro').style.display = 'none';
  document.getElementById('login').style.display = 'block';
}

function verifyPassword() {
  const input = document.getElementById('password').value;
  const error = document.getElementById('login-error');
  if (input === 'secret') {
    document.getElementById('login').style.display = 'none';
    document.getElementById('instructions').style.display = 'block';
  } else {
    error.style.display = 'block';
  }
}

function startQuiz() {
  document.getElementById('instructions').style.display = 'none';
  document.getElementById('quiz').style.display = 'block';
}

function nextQuestion(currentId, nextId, correct) {
  if (correct) {
    correctAnswers++;
  } else {
    removeHeart();
    if (hearts === 0) {
      endGame();
      return;
    }
  }

  document.getElementById(currentId).classList.remove('active');

  if (nextId === 'loading') {
    document.getElementById('loading').style.display = 'block';

    setTimeout(() => {
      document.getElementById('loading').style.display = 'none';

      if (correctAnswers === 3) {
        document.getElementById('result').style.display = 'block';
        startCountdown();
        startFireworks();
      } else {
        endGame("Seems like you had your eyes closed or something. Try again ");
      } 
    }, 4000);
  } else {
    document.getElementById(nextId).classList.add('active');
  }
}

function removeHeart() {
  const heartsList = document.querySelectorAll('#health-bar .heart');
  if (hearts > 0) {
    heartsList[hearts - 1].style.visibility = 'hidden';
    hearts--;
  }
}

function endGame(message) {
  document.getElementById('quiz').style.display = 'none';
  document.getElementById('loading').style.display = 'none';
  document.getElementById('game-over').style.display = 'block';

  const msg = document.getElementById('game-over-message');
  if (correctAnswers === 1) {
    msg.textContent = "Seems like you had your eyes closed or something. Try again 😅";
  } else if (message) {
    msg.textContent = message;
  }
}

function startCountdown() {
  const countdownElement = document.getElementById("countdown");
  const targetDate = new Date("June 20, 2025 20:30:00").getTime();

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      clearInterval(interval);
      countdownElement.innerHTML = "🎉 It’s date time! 🎉";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `⏳ ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}
