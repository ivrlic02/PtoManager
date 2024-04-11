//GENERATE - CALENDAR NO.1
const date1 = new Date();
let month1 = date1.getMonth();
let year1 = date1.getFullYear();

const day1 = document.querySelector("#dates1");
const currdate1 = document.querySelector("#current1");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//function to generate calendar for calendar no.1
const generateCalendar1 = () => {
    let lastDate = new Date(year1,month1 + 1, 0).getDate();
    let prevLastDate = new Date(year1, month1, 0).getDate();
    let firstDay = new Date(year1, month1, 1).getDay();
    let lastDay = new Date(year1, month1, lastDate).getDay();
    
    //store the generated calendar
    let store = "";

    //days of prevoius month for the first week of current month
    for (let i = firstDay; i > 0; i--) {
        store += `<li class="inactive day1">${prevLastDate - i + 1}</li>`;
    }
    
    //days for current month
    for (let i = 1; i <= lastDate; i++) {
        //check if current day is today
        let isToday = 
            i === new Date().getDate() && month1 === new Date().getMonth() && date1.getFullYear === new Date().getFullYear ? "active" : "";
        store += `<li class="${isToday} day1">${i}</li>`;
    }

    //days of prevoius month for the last week of current month
    for (let i = lastDay; i < 6; i++) {
        store += `<li class="inactive day1">${i - lastDay + 1}</li>`;
    }
    
    //display current month and year
    currdate1.innerText = `${months[month1]} ${year1}`;
    //implement generated calendar
    day1.innerHTML = store;
}

//GENERATE - CALENDAR NO.2 (same as for previous calendar)
const date2 = new Date();
let month2 = date2.getMonth();
let year2 = date2.getFullYear();

const day2 = document.querySelector("#dates2");
const currdate2 = document.querySelector("#current2");

const generateCalendar2 = () => {
    let lastDate = new Date(year2,month2 + 1, 0).getDate();
    let prevLastDate = new Date(year2, month2, 0).getDate();
    let firstDay = new Date(year2, month2, 1).getDay();
    let lastDay = new Date(year2, month2, lastDate).getDay();

    let store = "";

    for (let i = firstDay; i > 0; i--) {
        store += `<li class="inactive day2">${prevLastDate - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDate; i++) {
        let isToday = 
            i === new Date().getDate() && month2 === new Date().getMonth() && date1.getFullYear === new Date().getFullYear ? "active" : "";
            store += `<li class="${isToday} day2">${i}</li>`;
    }

    for (let i = lastDay; i < 6; i++) {
        store += `<li class="inactive day2">${i - lastDay + 1}</li>`;
    }
    
    currdate2.innerText = `${months[month2]} ${year2}`;
    day2.innerHTML = store;
}

//NAVIGATION AND SELECTION OF DATES
const navIcons1 = document.querySelectorAll("#top1 i");
const navIcons2 = document.querySelectorAll("#top2 i");

const select1 = document.querySelectorAll(".day1");
const select2 = document.querySelectorAll(".day2");

//array to store selected dates
let inputDatesArray = ["", ""];

//function for navigation and handling calendar no.1
const handleCalendar1 = () => {
    navIcons1.forEach(icon => {
        icon.addEventListener('click', () => {
            if (icon.id === "prev") {
                month1--;
                if (month1 < 0) {
                    month1 = 11;
                    year1--;
                }
            } else {
                month1++;
                if (month1 > 11) {
                    month1 = 0;
                    year1++;
                }
            }
            generateCalendar1();
            selectCalendar1();
        });
    });
};

const handleCalendar2 = () => {
    navIcons2.forEach(icon => {
        icon.addEventListener('click', () => {
            if (icon.id === "prev") {
                month2--;
                if (month2 < 0) {
                    month2 = 11;
                    year2--;
                }
            } else {
                month2++;
                if (month2 > 11) {
                    month2 = 0;
                    year2++;
                }
            }
            generateCalendar2();
            selectCalendar2();
        });
    });
};

//function for date selection on the calendar
const selectCalendar1 = () => {
    const select1 = document.querySelectorAll(".day1");
    select1.forEach(day => {
        day.addEventListener('click', () => {
            const monthAndYear = document.getElementById("current1");
            const selectedDate = `${day.innerText} ${monthAndYear.innerText}`;

            const dateOnCalendar1 = new Date(selectedDate);
            const dateOnCalendar2 = new Date(inputDatesArray[1]);

            //add selected date to array
            //check if another date on same calendar is selected
            //check if selected date on first calendar is earlier then the date on second calendar
            if (dateOnCalendar1 <= dateOnCalendar2 || !inputDatesArray[1]) {
                inputDatesArray[0] = selectedDate;
                select1.forEach(d => {
                    d.classList.remove("activeInput");
                });
                day.classList.add("activeInput");
            } else {
                window.alert("First date should not be later than the second date!");
            }
        });
    });
};

const selectCalendar2 = () => {
    const select2 = document.querySelectorAll(".day2");
    select2.forEach(day => {
        day.addEventListener('click', () => {
            const monthAndYear = document.getElementById("current2");
            const selectedDate = `${day.innerText} ${monthAndYear.innerText}`;

            const dateOnCalendar1 = new Date(inputDatesArray[0]);
            const dateOnCalendar2 = new Date(selectedDate);

            //same but check if selected date on second calendar is later then the date on first calendar
            if (dateOnCalendar2 >= dateOnCalendar1 || !inputDatesArray[0]) {
                inputDatesArray[1] = selectedDate;
                select2.forEach(d => {
                    d.classList.remove("activeInput");
                });
                day.classList.add("activeInput");
            } else {
                window.alert("Second date should not be earlier than the first date!");
            }
        });
    });
}

generateCalendar1();
generateCalendar2();
selectCalendar1();
selectCalendar2();
handleCalendar1();
handleCalendar2();