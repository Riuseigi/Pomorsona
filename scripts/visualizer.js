// YouTube Music playlist ID
const audio = document.getElementById('audio');
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
const playButton = document.getElementById('playButton');

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

  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const barWidth = (WIDTH / bufferLength) * 2.5;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i] * 2;

    ctx.fillStyle = `rgba(${barHeight + 100}, 5, 50, 1)`;
    ctx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

    x += barWidth + 1;
  }

  requestAnimationFrame(draw);
}
const togglemusic = document.getElementById('toggleImage');
playButton.addEventListener('click', () => {
  if (audio.paused) {
    audioContext.resume().then(() => {
      togglemusic.src = './imgs/Music.png';
      console.log('Playback resumed successfully');
      audio.play();
      draw();
    });
  } else {
    audio.pause();
    togglemusic.src = './imgs/Music-off.png';
    console.log('Playback paused');
    
    cancelAnimationFrame(draw);
  }
});

