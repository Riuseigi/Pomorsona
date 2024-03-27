const buttons = document.querySelectorAll('button')
/**
 * Plays a click sound.
 *
 * @param {none} - No parameters
 * @return {void} No return value
 */
function playClickSound() {
  const audio = new Audio('./music/select.mp3'); // Path to your click sound file
  audio.play();
  audio.volume = 0.1;
}

// Add click event listener to all buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    playClickSound();
  });
});
