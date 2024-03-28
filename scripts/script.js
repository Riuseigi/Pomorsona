let userTime = localStorage.getItem('workDuration');
let userBreakTime = localStorage.getItem('breakDuration');


const doneTone = new Audio('./music/done.wav');
const focusTone = new Audio('./music/focus.mp3');


let workTime = userTime * 60;
let breakTime = userBreakTime * 60; 
let isWorking = true; // Indicates if it's currently work time
let intervalId;


const timerTitle = document.querySelector('.timer__title');

/**
 * Updates the timer display with the current work or break time.
 *
 * @return {void}
 */
function updateTimer() {
  // Determine which timer to display and set the time variable accordingly.
  let time;
  if (isWorking) {
    // Display "Focus" and set time to work time.
    timerTitle.textContent = 'Focus';
    time = workTime;
  } else {
    // Display "Breaktime" and set time to break time.
    timerTitle.textContent = 'Breaktime';
    time = breakTime;
  }

  // Convert the time to minutes and seconds and format it with leading zeros.
  const minutes = Math.floor(time / 60).toString().padStart(2, '0');
  const seconds = (time % 60).toString().padStart(2, '0');
  
  // Update the timer display with the formatted time.
  const timerMinutesElement = document.querySelector('.timer__minutes');
  timerMinutesElement.textContent = `${minutes}:${seconds}`;
}





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




// Get the modal element
var modal = document.getElementById('settingsModal');
// Get the button that opens the modal
var settingsBtn = document.getElementById('settingsBtn');

// Get the <span> element that closes the modal
var closeBtn = document.querySelectorAll('.close');
closeBtn.forEach(btn => {
  btn.onclick = function(event) {
    event.stopPropagation(); // Prevent the click event from bubbling up
    console.log("close");
    modal.style.display = 'none';
  };
});

// When the user clicks the button, open the modal
settingsBtn.onclick = function() {
  modal.style.display = 'block';
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

  // Add event listener to update local storage when checkbox is checked
  checkbox.addEventListener("change", function() {
    const updatedTasks = tasks.map(t => {
      if (t.id === checkbox.id) {
        t.completed = checkbox.checked;
      }
      return t;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  });

  addTaskModal.style.display = "none";
  taskInput.value = "";
})

function loadTasks() {
  const taskList = document.getElementById("taskContainer");
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  storedTasks.forEach(({ id, task, completed }) => {
    const taskElement = document.createElement("li");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");

    checkbox.type = "checkbox";
    checkbox.id = id;
    checkbox.checked = completed;
    label.htmlFor = id;
    label.textContent = task;

    if (checkbox.checked) {
      label.style.textDecoration = "line-through";
      label.style.color = "gray";
    } else {
      label.style.textDecoration = "none";
      label.style.color = "white";
    }
    // Attach event listener to update local storage when checkbox is checked
    checkbox.addEventListener("change", function() {
      const updatedTasks = storedTasks.map(t => {
        if (t.id === id) {
          t.completed = checkbox.checked;
        }
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    });

    taskElement.appendChild(checkbox);
    taskElement.appendChild(label);
    taskList.appendChild(taskElement);
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



















