const calendar = document.querySelector(".calendar");
const date = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const todayBtn = document.querySelector(".today-btn");
const gotoBtn = document.querySelector(".goto-btn");
const dateInput = document.querySelector(".date-input");
const eventDay = document.querySelector(".event-day");
const eventDate = document.querySelector(".event-date");
const eventsContainer = document.querySelector(".events");
const addEventBtn = document.querySelector(".add-event");
const addEventWrapper = document.querySelector(".add-event-wrapper ");
const addEventCloseBtn = document.querySelector(".close ");
const addEventTitle = document.querySelector(".event-name ");
const addEventDate = document.querySelector(".add-event-date ");
const addEventTime = document.querySelector(".add-event-time ");
const addEventLocation = document.querySelector(".event-location");
const addEventDescription = document.querySelector(".event-description");
const addEventSubmit = document.querySelector(".add-event-btn ");
const weatherBox = document.querySelector('#weather-box')

const activeUserStorage = localStorage.getItem('activeUser');
const activeUser = JSON.parse(activeUserStorage);
const displayName = activeUser.displayName;
const userId = activeUser.userId;

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();
const todayDay = today.getDate()
let lat
let lon

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

// let eventsArr = [{day: 15, month: 02, year: 2023, events: [{title: "Hello", time: "05:00"}]}]
let eventsArr = [];
// getEvents();
console.log(eventsArr);

// function add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    // check if event is present on that day
    let event = false;
    eventsArr.forEach((eventObj) => {
      console.log(eventObj)
      console.log(typeof eventObj.day)
      console.log(typeof i)
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

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

// function to add month and year on prev and next button
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

const refreshCal = () => {getEvents()
.then(() => { 
  console.log(eventsArr)
  initCalendar()
})
};

refreshCal();
// function to add active on day
function addListner() {
  
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));

      activeDay = Number(e.target.innerHTML);
      const daysOut = activeDay - todayDay
      if(daysOut >= 0 && daysOut <= 5) {
        getWeather(lat, lon, daysOut)
        weatherBox.style.display = "block";
      } else {
        //Hide the weather Box
        weatherBox.style.display = "none";
      }
      // remove active
      days.forEach((day) => {
        day.classList.remove("active");
      });
      // if clicked prev-date or next-date switch to that month
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        // add active to clicked day afte month is change
        setTimeout(() => {
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
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
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

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
  getWeather(lat, lon)
  weatherBox.style.display = "block";
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}

// function get active day day name and date and update eventday eventdate
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

// function update events when a day is active
function updateEvents(date) {
  // debugger

  let events = "";
  eventsArr.forEach((event) => {
    if (
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
  if (events === "") {
    events = `<div class="no-event">
            <h3>No Events</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events;
  // saveEvents();
}

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
  e.preventDefault()
  const eventTitleValue = addEventTitle.value;
  const eventDateValue = addEventDate.value;
  const eventTimeValue = addEventTime.value;
  const eventLocationValue = addEventLocation.value;
  const eventDescriptionValue = addEventDescription.value;
  console.log([eventTitleValue, eventDateValue, eventTimeValue, eventLocationValue,eventDescriptionValue, userId])
  
  // checks for if there are any empty fields being submitted
  if (eventTitleValue === "" || eventDateValue === "" || eventTimeValue === "" || eventLocationValue === "" ||eventDescriptionValue === "") {
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
      eventName:eventTitleValue,
      eventDate:eventDateValue,
      eventTime:eventTimeValue,
      eventLocation:eventLocationValue,
      eventDescription:eventDescriptionValue,
      userId: userId
    })
  })
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
            console.log('Inside event loop')
            if (item.id === eventId) {
              event.events.splice(index, 1);
              console.log(event.events)
            }
          });
          fetch(`/api/events/${eventId}`, {
            method: "DELETE"
          })
          
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
  })
  const parsedArray = await response.json()
  
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

  if(daysOut > 0 && daysOut <= 5) {
    fetch(weatherUrl).then(response => response.json()).then(data => {
      let firstDayWeahterIndex
      let desiredDaysWeatherIndex
        const firstDayWeather = data.list.find((weather,i ) => {
          if(weather.dt_txt.split(' ')[1] === '12:00:00'){
            firstDayWeahterIndex = i
            return true
          }
        })
        if(daysOut === 1){
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
          desiredDaysWeatherIndex = firstDayWeahterIndex + ((daysOut - 1) * 8)
          const desiredDayWeather = data.list[desiredDaysWeatherIndex]
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
    })
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