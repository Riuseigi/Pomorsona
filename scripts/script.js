let userTime = localStorage.getItem('workDuration');
let userBreakTime = localStorage.getItem('breakDuration');



let workTime = userTime * 60; // 25 minutes in seconds
let breakTime = userBreakTime * 60; // 5 minutes in seconds
let isWorking = true; // Indicates if it's currently work time
let intervalId;
const timerTitle = document.querySelector('.timer__title');
function updateTimer() {
  let time;
  if (isWorking) {
    timerTitle.textContent = 'Focus';
    time = workTime;
  } else {
    timerTitle.textContent = 'Breaktime';
    time = breakTime;
  }

  const minutes = Math.floor(time / 60).toString().padStart(2, '0');
  const seconds = (time % 60).toString().padStart(2, '0');
  document.querySelector('.timer__minutes').textContent = `${minutes}:${seconds}`;
}

/**
 * Starts a timer for work and break intervals, updating the timer display and resetting the timer as needed.
 *
 * @param None
 * @return None
 */
function startTimer() {
  intervalId = setInterval(() => {
    if (isWorking) {
      workTime--;
    } else {
      breakTime--;
    }

    updateTimer();

    if (workTime === 0 && isWorking) {
      clearInterval(intervalId);
      isWorking = false;
      updateTimer();
      startTimer();
    } else if (breakTime === 0 && !isWorking) {
      clearInterval(intervalId);
      isWorking = true;
      workTime = userTime * 60;
      breakTime = userTime * 60;
      updateTimer();
      startTimer();
    }
  }, 1000);
}

document.querySelector('.start').addEventListener('click', startTimer);

document.querySelector('.pause').addEventListener('click', () => {
  clearInterval(intervalId);
});

document.querySelector('.reset').addEventListener('click', () => {
  clearInterval(intervalId);
  isWorking = true;
  workTime = 25 * 60;
  breakTime = 5 * 60;
  updateTimer();
});

updateTimer();



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


//modal content

// Get the modal element
var modal = document.getElementById('settingsModal');

// Get the button that opens the modal
var settingsBtn = document.getElementById('settingsBtn');

// Get the <span> element that closes the modal
var closeBtn = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the modal
settingsBtn.onclick = function() {
  modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

// Save settings
var saveBtn = document.getElementById('saveSettings');
saveBtn.onclick = function() {
  var workDuration = document.getElementById('workDuration').value;
  var breakDuration = document.getElementById('breakDuration').value;

  // Save the settings to localStorage or wherever you store them
  // For example:
  localStorage.setItem('workDuration', workDuration);
  localStorage.setItem('breakDuration', breakDuration);
  
  // Close the modals
  modal.style.display = 'none';
  
  // Reload the page
  
};
workDuration.value = userTime;
breakDuration.value = userBreakTime;





















