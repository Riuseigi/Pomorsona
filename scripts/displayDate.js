//Get the date
const date = new Date();
const month = date.getMonth() +1; 
const day = date.getDate()

const dayOfWeek = date.getDay()

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weekdayName = weekdays[dayOfWeek];
console.log(month, day, weekdayName)

const dateElement = document.querySelector(".date");
const weekdaysElement = document.querySelector(".weekdays");

dateElement.textContent = `${month}/${day}`
weekdaysElement.textContent = `${weekdayName}`
