let userTime = localStorage.getItem('workDuration');
let userBreakTime = localStorage.getItem('breakDuration');


const doneTone = new Audio('./music/done.wav');
const focusTone = new Audio('./music/focus.mp3');
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
      doneTone.play()
      clearInterval(intervalId);
      isWorking = false;
      updateTimer();
      startTimer();
    } else if (breakTime === 0 && !isWorking) {
 
        focusTone.play()
    
     
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
  workTime = userTime * 60;
  breakTime = userBreakTime * 60;
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
var closeBtn = document.querySelectorAll('.close');

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
  location.reload();
};
workDuration.value = userTime;
breakDuration.value = userBreakTime;



//Get the date
const date = new Date();
const month = date.getMonth() +1; // to 
const day = date.getDate()

const dayOfWeek = date.getDay()

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weekdayName = weekdays[dayOfWeek];
console.log(month, day, weekdayName)

const dateElement = document.querySelector(".date");
const weekdaysElement = document.querySelector(".weekdays");

dateElement.textContent = `${month}/${day}`
weekdaysElement.textContent = `${weekdayName}`



// to do list function
const addTaskModal = document.getElementById("add-task-modal");
const addTaskBtn = document.querySelector(".addtask-btn");
const closeAddTaskBtn = document.getElementsByClassName("close")[0];

const taskInput = document.getElementById("task-input");
const clearBtn = document.querySelector(".clear-btn");
const submitTask = document.getElementById("submitTask");
addTaskBtn.onclick = function () {
  addTaskModal.style.display = "block";
};

closeAddTaskBtn.onclick = function () {
  addTaskModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === addTaskModal) {
    addTaskModal.style.display = "none";
  }
};

submitTask.addEventListener("click", function () {
  console.log(taskInput.value);
  const task = taskInput.value;

  const taskLi = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `task`+ Date.now() // Use a unique ID for each checkbox
  const label = document.createElement("label");
  label.textContent = task;
  label.htmlFor = checkbox.id;// Associate the label with the checkbox

  taskLi.appendChild(checkbox);
  taskLi.appendChild(label);

  document.getElementById("taskContainer").appendChild(taskLi);

// Save the task in localStorage
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.push({ id: checkbox.id, task: task, completed: false });
localStorage.setItem("tasks", JSON.stringify(tasks));

  addTaskModal.style.display = "none";
  taskInput.value = "";
})

// function to load task from localStorage and display them

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const taskLi = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = task.id;
    checkbox.checked = task.completed;
    const label = document.createElement("label");
    label.textContent = task.task;
    label.htmlFor = checkbox.id;
    taskLi.appendChild(checkbox);
    taskLi.appendChild(label);
    document.getElementById("taskContainer").appendChild(taskLi);
  });
}
document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
});

// Function to toggle label style when checkbox is checked
function toggleLabelStyle(checkbox) {
  const label = checkbox.nextElementSibling;
  if (checkbox.checked) {
    label.style.textDecoration = "line-through";
    label.style.color = "gray";
  } else {
    label.style.textDecoration = "none";
    label.style.color = "white";
  }
}

// Event listener for checkbox change
document.addEventListener("change", function(event) {
  if (event.target && event.target.type === "checkbox") {
    toggleLabelStyle(event.target);
  }
});


// Clear all tasks
clearBtn.addEventListener("click", function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const checkbox = document.getElementById(task.id);
    if (checkbox) {
      checkbox.checked = false;
      toggleLabelStyle(checkbox);
    }
  });
  localStorage.removeItem("tasks");
  while (taskContainer.firstChild) {
    taskContainer.removeChild(taskContainer.firstChild);
  }
})



















