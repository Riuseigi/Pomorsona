let time = 25 * 60; // 25 minutes in seconds
let intervalId;

function updateTimer() {
  const minutes = Math.floor(time / 60).toString().padStart(2, '0');
  const seconds = (time % 60).toString().padStart(2, '0');
  document.querySelector('.timer__minutes').textContent = `${minutes}:${seconds}`;
}

document.querySelector('.start').addEventListener('click', () => {
  intervalId = setInterval(() => {
    if (time > 0) {
      time--;
      updateTimer();
    } else {
      clearInterval(intervalId);
      // Play sound or show visual cue
    }
  }, 1000);
});

document.querySelector('.pause').addEventListener('click', () => {
  clearInterval(intervalId);
});

document.querySelector('.reset').addEventListener('click', () => {
  clearInterval(intervalId);
  time = 25 * 60;
  updateTimer();
});

updateTimer();
