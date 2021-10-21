const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date-picker')

const countdownEl = document.getElementById('countdown')
const countdownElTitle = document.getElementById('countdown-title')
const countdownBtn = document.getElementById('countdown-button')
const timeElements = document.querySelectorAll('span')

let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date
let countdownActive

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

// Set input date min value with today's date.
const today = new Date().toISOString().split('T')[0]
dateEl.setAttribute('min', today)

// Populate Countdown / Complete UI
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime()
    const distance = countdownValue - now

    const days = Math.floor(distance / day)
    const hours = Math.floor((distance % day) / hour) //distance%day means whatever remains in days example 1.5days math.floor => 1 day. Now the .05days will be added in hours and so in minutes so on
    const minutes = Math.floor((distance % hour) / minute)
    const seconds = Math.floor((distance % minute) / second)

    //   Populating Countdown in countdownEl
    countdownElTitle.textContent = `${countdownTitle}`
    timeElements[0].textContent = `${days}`
    timeElements[1].textContent = `${hours}`
    timeElements[2].textContent = `${minutes}`
    timeElements[3].textContent = `${seconds}`

    //   Hide Input
    inputContainer.hidden = true
    // Show Countdown
    countdownEl.hidden = false
  }, second)
}

// Take values from Form Input
function updateCountdown(e) {
  e.preventDefault()
  countdownTitle = e.srcElement[0].value
  countdownDate = e.srcElement[1].value

  //  Check for valid date
  if (countdownDate === '') {
    alert('Select the date you moron')
  } else {
    //   Get number version of current date and call update DOM
    countdownValue = new Date(countdownDate).getTime()
    updateDOM()
  }
}

// reset All values
function reset() {
  // Hide Countdowns and show input again
  countdownEl.hidden = true
  inputContainer.hidden = false

  // Stop the countdown
  clearInterval(countdownActive)

  //   Reset values
  countdownTitle = ''
  countdownDate = ''
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown)
countdownBtn.addEventListener('click', reset)
