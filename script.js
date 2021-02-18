const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownElBtn = document.getElementById("countdown-button");
const timeElement = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;
let saveCountdown;

const secund = 1000;
const minute = secund * 60;
const hour = minute * 60;
const day = hour * 24;

// Set date input to minimum Today's Date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Populate countdown / complete UI
const updateDOM = () => {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const secunds = Math.floor((distance % minute) / secund);

    //   Hide Input
    inputContainer.hidden = true;

    // If the countdown has ended, show complete
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownElTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      // Else, show the countdown in progress
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElement[0].textContent = `${days}`;
      timeElement[1].textContent = `${hours}`;
      timeElement[2].textContent = `${minutes}`;
      timeElement[3].textContent = `${secunds}`;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, secund);
};

// Take values from Form input
const updateCountdown = (e) => {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  saveCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem("countdown", JSON.stringify(saveCountdown));
  // Check for valid date
  if (countdownDate === "") {
    alert("Please select a date for the countdown.");
  } else {
    //   Get number version of current Date, update DOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
};

// Reset all values
const reset = () => {
  // Hide countdown and show input
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  // Stop the countdown
  clearInterval(countdownActive);
  // Reset values
  countdownTitle = "";
  countdownDate = "";
  localStorage.removeItem("countdown");
};

const restorePreviousCountdown = () => {
  // Get countdown from localStorage if avalible
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    saveCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = saveCountdown.title;
    countdownDate = saveCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
};

// Event Listener
countdownForm.addEventListener("submit", updateCountdown);
countdownElBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

// On load, check localStorage
restorePreviousCountdown();
