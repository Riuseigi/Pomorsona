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







// YouTube Music playlist ID
const audio = document.getElementById('audio');
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
const source = audioContext.createMediaElementSource(audio);

source.connect(analyser);
analyser.connect(audioContext.destination);

analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

ctx.clearRect(0, 0, canvas.width, canvas.height);

function draw() {
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  analyser.getByteFrequencyData(dataArray);

  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const barWidth = (WIDTH / bufferLength) * 2.5;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i] * 2;

    ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
    ctx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

    x += barWidth + 1;
  }

  requestAnimationFrame(draw);
}

audio.addEventListener('play', () => {
  audioContext.resume().then(() => {
    console.log('Playback resumed successfully');
  });
});

audio.addEventListener('pause', () => {
  console.log('Playback paused');
});

audio.addEventListener('ended', () => {
  console.log('Playback ended');
});

draw();







