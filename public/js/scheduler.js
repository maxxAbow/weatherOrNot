// !=====================================================================================================
// querySelectors - selection of elements to then use other DOM methods to manipulate or interact with it
const calendar = document.querySelector(".calendar"); // class
const date = document.querySelector(".date"); // class
const daysContainer = document.querySelector(".days"); // class
const prev = document.querySelector(".prev"); // class
const next = document.querySelector(".next"); // class
const todayBtn = document.querySelector(".today-btn"); // class
const gotoBtn = document.querySelector(".goto-btn"); // class
const dateInput = document.querySelector(".date-input"); // class
const eventDay = document.querySelector(".event-day"); // class
const eventDate = document.querySelector(".event-date"); // class
const eventsContainer = document.querySelector(".events"); // class
const addEventBtn = document.querySelector(".add-event"); // class
const addEventWrapper = document.querySelector(".add-event-wrapper "); // class
const addEventCloseBtn = document.querySelector(".close "); // class
const addEventTitle = document.querySelector(".event-name "); // class
const addEventDate = document.querySelector(".add-event-date "); // class
const addEventTime = document.querySelector(".add-event-time "); // class
const addEventLocation = document.querySelector(".event-location"); // class
const addEventDescription = document.querySelector(".event-description"); // class
const addEventSubmit = document.querySelector(".add-event-btn "); // class
const weatherBox = document.querySelector('#weather-box'); // id
// !==================================================================================================================
// retrieves data from local storage and parsing it into a JS object
const activeUserStorage = localStorage.getItem('activeUser'); // retrieves value associated with the key -> activeUser
const activeUser = JSON.parse(activeUserStorage); // parses the string into a JS object
// extracts the values of two properties from the activeUser object: 'displayName' and 'userId'
const displayName = activeUser.displayName;
const userId = activeUser.userId;
// !===========================================================================================================================
// date objects
let today = new Date(); // creates a new Date object & assigns to the variable today
let activeDay; // new var called activeDay but does not assign it a value
let month = today.getMonth(); // retrieves month component (zero-based index from 0-11) & assigns to variable month
let year = today.getFullYear(); // built-in method of the Date object, returns a four-digit integer value representing the year
const todayDay = today.getDate(); // retrieves the day of the month for the current date
// variable declarations w/o initializing value
let lat; // latitude
let lon; // longitude
// !=====================================================================
// defining an array named Months that contains all 12 months of the year
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// !============================================================================================
// let eventsArr = [{day: 15, month: 02, year: 2023, events: [{title: "Hello", time: "05:00"}]}]
let eventsArr = []; // declaring var eventsArr, initializes it to an empty array
// getEvents();
console.log(eventsArr); // logging the eventsArr to the console
// !=========================================================================================================================
// function add days in days with class day and prev-date next-date on previous month and next month days and active on today
// intializes and displays the calendar for the current month and year
// creates date objects for first day, last day, and prev and next days displayed on the calendar
// creates a string 'days' that contains HTML for each day of the month
// the loop checks if there is an event on each day, and adds appropriate CSS class to the day's HTML if event
// after the HTML string is constructed it is set as the 'innerHTML' of the 'daysContainer' element, and 'addListener' is called to add event listeners to each day element in the calendar
function initCalendar() {
  // initializing several variables used to generate the calendar display
  const firstDay = new Date(year, month, 1); // Date object representing the first day of current month
  const lastDay = new Date(year, month + 1, 0); // Date object representing the last day of the current month, 
  const prevLastDay = new Date(year, month, 0); // Date object representing the last day of the prev month
  const prevDays = prevLastDay.getDate(); // # of days in the prev month
  const lastDate = lastDay.getDate(); // # of days in the current month
  const day = firstDay.getDay(); // day of the week which the first day of the current month falls (zero-based index, 0-Sun to 6-Sat)
  const nextDays = 7 - lastDay.getDay() - 1; // # of days from the end of the current month to the end of the week
  date.innerHTML = months[month] + " " + year; // set to display the current month and year
  let days = ""; // initialized as an empty string, used to build the HTML for calendar days
  // creating the days in the prev month
  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }
  // loops through each day of the current month and generates the corresponding HTML for each day...
  for (let i = 1; i <= lastDate; i++) {
    // check if event is present on that day
    let event = false;
    eventsArr.forEach((eventObj) => {
      console.log(eventObj);
      console.log(typeof eventObj.day);
      console.log(typeof i);
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }
  // adding HTML elements for the days of the next month that fall in the last week of the current month
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  // days variable is built up by prev code, inserted as the innerHTML of the daysContainer element
  daysContainer.innerHTML = days;
  addListener(); // function called, adds event listeners to the newly created day elements
}
// !=====================================================
// function to sub/add month & year on prev & next button
// prev month function
function prevMonth() {
  month--; // decrements value of month var
  if (month < 0) { // if number becomes negative ↓
    month = 11; // changes month to Dec
    year--; // changes year to prev year
  }
  initCalendar(); // updates calendar display
}
// next month function
function nextMonth() {
  month++; // increments value
  if (month > 11) { // if number greater than Dec ↓
    month = 0; // changes month to Jan
    year++; // changes year to next year
  }
  initCalendar();
}
// adding event listeners
prev.addEventListener("click", prevMonth); // id="prev"
next.addEventListener("click", nextMonth); // id="next"
// !===================================================
const refreshCal = () => {
  getEvents() // function retrieves list of events
    .then(() => { // chained onto getEvents() function call. takes function as arg, executed once function has completed its work
      console.log(eventsArr); // logs value to console
      initCalendar(); // updates calendar display
    });
};
// !============================
refreshCal();
// function to add active on day
function addListener() {

  const days = document.querySelectorAll(".day"); // selects all elements with the day class and stores them in the days var
  // iterates through each element in the days collection and adds an event listener to it
  days.forEach((day) => {
    // adds a click event listener to the current date cell
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML); // function that sets the currently active day based on the date cell that was clicked
      updateEvents(Number(e.target.innerHTML)); // a function that updates the list of events displayed on the calendar based on the selected day
      activeDay = Number(e.target.innerHTML); // sets the 'activeDay' var to the selected day
      const daysOut = activeDay - todayDay; // calculates the # of days between the selected day and the current day
      if (daysOut >= 0 && daysOut <= 5) { // displays a weather box if the selected day is within the next 5 days
        getWeather(lat, lon, daysOut); // represent user's current latitude and longitude, used to retrieve the weather forecast from an API
        weatherBox.style.display = "block"; // shows weather box
      } else { // hides weather box if selected day is more than 5 days in the future
        //Hide the weather Box
        weatherBox.style.display = "none"; // hides weather box
      }
      // remove active
      days.forEach((day) => { // removes the active class from all date cells in the calendar
        day.classList.remove("active"); // removes active class
      });
      // if clicked prev-date or next-date switch to that month
      if (e.target.classList.contains("prev-date")) { // updates the calendar to show the previous month if user clicks on a date cell that represents a day in the prev month.
        prevMonth(); // updates the calendar, then a new event listener is added to clicked date cell to ensure that it becomes active
        // add active to clicked day afte month is change
        setTimeout(() => { // timeout
          // add active where no prev-date or next-date
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) { // updates calendar to show next month if user clicks on date cell that represents a day in the next month
        nextMonth(); // called to update the calendar, then new event listener is added to the clicked date to ensure that it becomes active
        // add active to clicked day afte month is changed
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}
// !=====================================================
// adds a click event listener to the today button. 
// when clicked, 
// it sets date to the current date, 
// updates the calendar to show the current month, 
// and retrieves the weather forecast for the current day
todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
  getWeather(lat, lon);
  weatherBox.style.display = "block";
});
// !========================================================
// adds input event listener to date input field
// when user types or deletes text in the input field,
// the listener function performs several actions to format the date input
dateInput.addEventListener("input", (e) => { // adds input event listener to 'dateInput' field
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, ""); // replaces any non-numeric or non-slash characters in the input value with an empty string
  if (dateInput.value.length === 2) { // adds slash character after second digit of input value. enforces a 'MM/DD/YYYY' format
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) { // limits length of input value to 7 chars
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") { // checks if the user has deleted text using the backspace or delete key
    if (dateInput.value.length === 3) { // if so this removes the slash char if the user deletes the day digit before the slash, ensures the same format
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});
// adds an event listener to a button element with id gotoBtn, when clicked gotoDate function is called
gotoBtn.addEventListener("click", gotoDate);
// !===================================================================================================
// function called when the button gotoBtn is clicked
function gotoDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/"); // splits dateInput field by the / char and assigns the resulting array to 'dateArr'
  if (dateArr.length === 2) { // checks if length is strictly equal to 2
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) { // checks if first element of 'dateArr' is a number between 1 & 12, and if second element has a length of 4
      month = dateArr[0] - 1; // sets month var to value of first element minus 1 (since getMonth() returns a zero-indexed month)
      year = dateArr[1]; // sets year variable to the value of the second element of 'dateArr'
      initCalendar(); // updates the calendar display with the new month and year
      return;
    }
  }
  alert("Invalid Date"); // if any previous condition is not met, it displays an alert w/ message
}
// !===============================================================================================================================
// function get active day day name and date and update eventday eventdate
// takes the date arg and updates the content of the HTML elements with IDs 'eventDay' and 'eventDate' to reflect the selected date
function getActiveDay(date) {
  const day = new Date(year, month, date); // new 'Date' object using year, month, and date vars
  // calls the 'toString' method on 'day' object to get a string representation of the day, which includes the day of the week
  // splits the resulting string on the space character to get an array of words
  const dayName = day.toString().split(" ")[0]; // accesses 1st element of the resulting array and assigns to 'dayName' var
  eventDay.innerHTML = dayName; // sets innerHTML of element to 'dayName' var
  eventDate.innerHTML = date + " " + months[month] + " " + year; // sets innerHTML of element to string that concatenates 'date', name of the month, and the 'year' variable
}
// !========================================================================================================================================================================
// function update events when a day is active
// function takes the date as input and updates the events displayed on the calendar for that date
function updateEvents(date) {
  // debugger
  let events = "";
  eventsArr.forEach((event) => { // loops through array to find events that match the given date
    if ( // if any found, it generates HTML markup for each event and adds it to a string called 'events'
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event" id="${event.id}">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}: ${event.description}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });
  if (events === "") { // if no events found, it displays message "No Events"
    events = `<div class="no-event">
            <h3>No Events</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events; // generates eventsContainer element with the generated HTML markup
  // saveEvents(); // calls the saveEvents function to save the events to local storage
}
// !=====================================================================================================

// function to add event
addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});

// allow 50 chars in eventtitle
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});

// function to add event to eventsArr
addEventSubmit.addEventListener("click", async (e) => {
  e.preventDefault();
  const eventTitleValue = addEventTitle.value;
  const eventDateValue = addEventDate.value;
  const eventTimeValue = addEventTime.value;
  const eventLocationValue = addEventLocation.value;
  const eventDescriptionValue = addEventDescription.value;
  console.log([eventTitleValue, eventDateValue, eventTimeValue, eventLocationValue, eventDescriptionValue, userId]);

  // checks for if there are any empty fields being submitted
  if (eventTitleValue === "" || eventDateValue === "" || eventTimeValue === "" || eventLocationValue === "" || eventDescriptionValue === "") {
    alert("Please fill all the fields");
    return;
  }

  // check correct time format 24 hour
  const timeArr = eventTimeValue.split(":");
  if (
    timeArr.length !== 2 ||
    timeArr[0] > 23 ||
    timeArr[1] > 59
  ) {
    alert("Invalid Time Format");
    return;
  }

  // check if event is already added
  let eventExist = false;
  eventsArr.forEach((event) => {
    if (
      event.day === activeDay &&
      event.month === month + 1 &&
      event.year === year
    ) {
      event.events.forEach((event) => {
        if (event.title === eventTitleValue) {
          eventExist = true;
        }
      });
    }
  });
  if (eventExist) {
    alert("Event already added");
    return;
  }

  const response = await fetch('/api/events/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // INSERT VALUES FROM FORM BELOW
      eventName: eventTitleValue,
      eventDate: eventDateValue,
      eventTime: eventTimeValue,
      eventLocation: eventLocationValue,
      eventDescription: eventDescriptionValue,
      userId: userId
    })
  });
  //Closes addEvent Form when button is clicked
  const closeAddEventForm = await addEventWrapper.classList.remove("active");

  //Refreshes calendar to show newly created events in calendar
  refreshCal();
});

// function to delete event when clicked on event
eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {
    if (confirm("Are you sure you want to delete this event?")) {
      const eventTitle = e.target.children[0].children[1].innerHTML;
      const eventId = parseInt(e.target.id);
      eventsArr.forEach((event) => {
        if (
          event.day === activeDay &&
          event.month === month + 1 &&
          event.year === year
        ) {
          event.events.forEach((item, index) => {
            console.log('Inside event loop');
            if (item.id === eventId) {
              event.events.splice(index, 1);
              console.log(event.events);
            }
          });
          fetch(`/api/events/${eventId}`, {
            method: "DELETE"
          });

          //if no events left in a day then remove that day from eventsArr
          if (event.events.length === 0) {
            eventsArr.splice(eventsArr.indexOf(event), 1);
            //remove event class from day
            const activeDayEl = document.querySelector(".day.active");
            if (activeDayEl.classList.contains("event")) {
              activeDayEl.classList.remove("event");
            }
          }
        }
      });
      updateEvents(activeDay);
    }
  }
});

// function to save events in local storage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

// function to get events from local storage
// THIS EVENT SHOULD RETRIEVE EVENTS FROM EVENTS.JS MODEL

async function getEvents() {
  //check if events are already saved in local storage then return event else nothing
  //TODO: Get events from database instead of local storage

  const response = await fetch(`/api/events/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const parsedArray = await response.json();

  //Instead of pushing the local storage events, push the response from the events api call
  eventsArr = parsedArray;

}

function convertTime(time) {
  // convert time to 24 hour format
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}


// API KEY
const apiKey = `d08a795d9cdd7f108bc04f749cd0193c`;

// Retrieves text for city's name
const cityName = document.querySelector(".city-name").textContent;
const weatherImg = document.querySelector("#weather-img");
const weatherInfoEl = document.querySelector(".weather-info");
const childrenElements = weatherInfoEl.querySelectorAll("*");

// Function calls API to retrieve cordinates (longitude and latitude) based of the input/argument of location parameter, then invokes getWeather function
function generateWeather(location) {
  let geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}&limit=1`;

  fetch(geocodeUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      lat = data[0].lat; // retrieves latitude
      lon = data[0].lon; // retrieves longitude
      location = data[0].name; // retrieves location's name

      // Inserts created variables as arguments for function
      getWeather(lat, lon);
    });
}

// Sets initial weather forecast location to be Atlanta WOHOO!!
generateWeather(cityName);

// Function invoked to fetch weather for 5 days
function getWeather(lat, lon, daysOut = 0) {
  // URL used to fetch weather for current date and time
  let weatherUrl = (daysOut > 0 && daysOut <= 5) ? `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d08a795d9cdd7f108bc04f749cd0193c&units=imperial&units=imperial`
    : `https://api.openweathermap.org/data/2.5/weather?lat=33.7489924&lon=-84.3902644&units=imperial&appid=${apiKey}`;

  if (daysOut > 0 && daysOut <= 5) {
    fetch(weatherUrl).then(response => response.json()).then(data => {
      let firstDayWeahterIndex;
      let desiredDaysWeatherIndex;
      const firstDayWeather = data.list.find((weather, i) => {
        if (weather.dt_txt.split(' ')[1] === '12:00:00') {
          firstDayWeahterIndex = i;
          return true;
        }
      });
      if (daysOut === 1) {
        //Populate with the firstDayWeather
        //Captures Data for weather
        let weather = firstDayWeather.weather[0];
        let main = firstDayWeather.main;
        console.log(weather);
        console.log(main);
        let icon = weather.icon;
        let weatherDescription = weather.description;

        // Grabs icon of the weather for the "Present Day" and places it in img tag 
        weatherImg.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);

        // Declares values from API to variables
        let temp = main.temp; // Tempature
        let wind = firstDayWeather.wind.speed; // Wind Speed
        let humid = main.humidity;// Humidity

        // Places values from API to DOM
        childrenElements[0].innerHTML = `Temperature: ${temp} °F | ${weatherDescription}`;
        childrenElements[1].innerHTML = `Wind: ${wind} MPH`;
        childrenElements[2].innerHTML = `Humidity: ${humid}%`;
      } else {
        desiredDaysWeatherIndex = firstDayWeahterIndex + ((daysOut - 1) * 8);
        const desiredDayWeather = data.list[desiredDaysWeatherIndex];
        let weather = desiredDayWeather.weather[0];
        let main = desiredDayWeather.main;
        console.log(weather);
        console.log(main);
        let icon = weather.icon;
        let weatherDescription = weather.description;

        // Grabs icon of the weather for the "Present Day" and places it in img tag 
        weatherImg.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);

        // Declares values from API to variables
        let temp = main.temp; // Tempature
        let wind = desiredDayWeather.wind.speed; // Wind Speed
        let humid = main.humidity;// Humidity

        // Places values from API to DOM
        childrenElements[0].innerHTML = `Temperature: ${temp} °F | ${weatherDescription}`;
        childrenElements[1].innerHTML = `Wind: ${wind} MPH`;
        childrenElements[2].innerHTML = `Humidity: ${humid}%`;

      }
    });
  } else {
    fetch(weatherUrl)
      .then(response => response.json())
      .then(data => {

        //Captures Data for weather
        let weather = data.weather[0];
        let main = data.main;
        console.log(weather);
        console.log(main);
        let icon = weather.icon;
        let weatherDescription = weather.description;

        // Grabs icon of the weather for the "Present Day" and places it in img tag 
        weatherImg.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);

        // Declares values from API to variables
        let temp = main.temp; // Tempature
        let wind = data.wind.speed; // Wind Speed
        let humid = main.humidity;// Humidity

        // Places values from API to DOM
        childrenElements[0].innerHTML = `Temperature: ${temp} °F | ${weatherDescription}`;
        childrenElements[1].innerHTML = `Wind: ${wind} MPH`;
        childrenElements[2].innerHTML = `Humidity: ${humid}%`;

      });
  }
}

// EVERYTHING UNDER HERE IS THE IMG GENERATORFUNCTION/API CALL
// CREATE API CALL FOR UNSPLASH WOHOOO =)
// const unsplashKey = "fDLyIwH2-_UptFzuYMbi8IE0EsrXOD7JWcfncpaoIq4";
// function generateImg() {
//   // Gets the value of the '.city' class element
//   var city = $(".city")[0].innerText;

//   // The url the api call, which inputs the 'city' variable as a value for the query key
//   var url = `https://api.unsplash.com/search/photos?query=${city}%20cityscape&per_page=1&order_by&client_id=${unsplashKey}`;

//   fetch(url)
//     .then(response => {return response.json();})
//     .then((data) => {
//       // Retrieves and stores the url from json image
//       var img = data.results[0].urls.full;

//       // Sets the style for the <main> element to have a background-image property of the url returned from the api call
//       // mainEl.css(`background-image`, `url(${img})`)
//     });
// }