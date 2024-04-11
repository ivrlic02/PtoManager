let employee = "";
let employeeId = 0;

const list = document.getElementById("select_employee");
const submit = document.getElementById("select_button");
const employeeContainer = document.getElementById("employee_container");

//change in employee selection
list.addEventListener("change", () => {
    employee = list.value;
    const id = document.getElementsByClassName(employee);
    employeeId = id[0].getAttribute("id");
});

//submit PTO
submit.addEventListener("click", () => { 
    if(!employee){
        window.alert("Select employee!");
    } else if (!inputDatesArray[0] || !inputDatesArray[1]) {
        window.alert("Select PTO dates!");
    } else {
        const existingData = localStorage.getItem("Pto");
        const existingDataArray = existingData ? JSON.parse(existingData) : [];

        //object to store employee PTO data
        const employeePto = {
            id: employeeId,
            name: employee,
            startingDate: inputDatesArray[0],
            endingDate: inputDatesArray[1],
        };

        //check if existing PTO data exists
        let employeeData = existingDataArray.find(data => data.id === employeeId);
        if (!employeeData) {
            employeeData = { id: employeeId, past: [], future: [], current: [] };
            existingDataArray.push(employeeData);
        }

        //check if PTO is past, current, or future
        const today = new Date();
        const startDate = parseDateString(employeePto.startingDate);
        const endDate = parseDateString(employeePto.endingDate);

        if (endDate < today) {
            employeeData.past.push(employeePto);
        } else if (startDate > today) {
            employeeData.future.push(employeePto);
        } else {
            employeeData.current.push(employeePto);
        }

        localStorage.setItem("Pto", JSON.stringify(existingDataArray));
        window.alert("Pto successfully added!");
        location.reload();
    }
});

//function to fetch and add employee data 
async function getEmployees() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();

        if (list) {
            data.forEach((element) => {
                //add select options
                list.innerHTML += `<option value="${element.name}" id="${element.id}" class="${element.name}"> ${element.name}</option>`;

                //add employee cards
                employeeContainer.innerHTML +=
                    `<article class="card" id="${element.id}">
                        <div class="card_header">
                            <p class="name">${element.name}</p>
                        </div>
                        <div class="card_main_content_container" id="${element.id}">
                            ${addPto(element.id)}
                        </div>
                    </article>`;
            });

            //remove PTO
            const removeIcon = document.querySelectorAll(".bx-x");
            removeIcon.forEach((element) => {
                element.addEventListener("click", removePto);
            });
        }
    } catch (error) {
        console.error(error);
    }
}

//function to add PTO elements to the employee cards
function addPto(id) {
    const existingData = localStorage.getItem("Pto");
    const existingDataArray = JSON.parse(existingData);

    //if there is no existing PTO data return empty string
    if (!existingDataArray) return "";
    let elementArray = "";

    //connect PTO data to correct employee
    const employeeData = existingDataArray.find(data => data.id == id);
    if (employeeData) {
        if (employeeData.past.length > 0) {
            elementArray += `<label> Past PTO </label>`;
            employeeData.past.forEach((pto, i) => {
                const ptoId = `past_${pto.startingDate}_${pto.endingDate}_${i}`;
                elementArray += 
                `<div id="image_container">
                    <i class="bx bx-x" id="${ptoId}"></i>
                    <img src="${getSeasonImage(pto.startingDate)}"/>
                    <div class="image_text">${pto.startingDate} - ${pto.endingDate}</div>
                </div>`;
            });
        }
        if (employeeData.current.length > 0) {
            elementArray += `<label> Current PTO </label>`;
            employeeData.current.forEach((pto, i) => {
                const ptoId = `current_${pto.startingDate}_${pto.endingDate}_${i}`;
                elementArray += 
                `<div id="image_container">
                    <i class="bx bx-x" id="${ptoId}"></i>
                    <img src="${getSeasonImage(pto.startingDate)}"/>
                    <div class="image_text">${pto.startingDate} - ${pto.endingDate}</div>
                </div>`;
            });
        }
        if (employeeData.future.length > 0) {
            elementArray += `<label> Future PTO </label>`;
            employeeData.future.forEach((pto, i) => {
                const ptoId = `future_${pto.startingDate}_${pto.endingDate}_${i}`;
                elementArray += 
                `<div id="image_container">
                    <i class="bx bx-x" id="${ptoId}"></i>
                    <img src="${getSeasonImage(pto.startingDate)}"/>
                    <div class="image_text">${pto.startingDate} - ${pto.endingDate}</div>
                </div>`;
            });
        }
    }
    return elementArray;
}


//function to get season of the date
function getSeasonImage(dateString) {
    const date = parseDateString(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((day >= 20 && month == 3) || (month < 6 && month > 3) || (day < 20 && month == 6)) {
        return "https://wallpapers-clan.com/wp-content/uploads/2024/02/green-nature-landscape-desktop-wallpaper-preview.jpg";
    } else if ((day >= 20 && month == 6) || (month < 9 && month > 6) || (day <= 22 && month == 9)) {
        return "https://wallpapers-clan.com/wp-content/uploads/2023/11/blue-sea-beach-summer-desktop-wallpaper-preview.jpg";
    } else if ((day > 22 && month == 9) || (month < 12 && month > 9) || (day < 21 && month == 12)) {
        return "../images/autumn.jpg";
    } else {
        return "../images/winter.jpg";
    }
}

//remove PTO from local storage and reload the page
const removePto = function (event) {
    const existingData = localStorage.getItem("Pto");
    const existingDataArray = JSON.parse(existingData);

    const clickedIcon = event.currentTarget;
    const ptoId = clickedIcon.id;
    const [section, startDate, endDate, index] = ptoId.split('_');
    const cardId = clickedIcon.closest(".card").id;

    const employeeData = existingDataArray.find(data => data.id == cardId);

    if (employeeData) {
        let ptoList = [];
        if (section == "past") {
            ptoList = employeeData.past;
        } else if (section == "current") {
            ptoList = employeeData.current;
        } else if (section == "future") {
            ptoList = employeeData.future;
        }

        const ptoIndex = parseInt(index);
        if (!isNaN(ptoIndex) && ptoList.length > ptoIndex) {
            const ptoToRemove = ptoList[ptoIndex];
            if (ptoToRemove.startingDate == startDate && ptoToRemove.endingDate == endDate) {
                ptoList.splice(ptoIndex, 1);
            }
        }
    }

    localStorage.setItem("Pto", JSON.stringify(existingDataArray));
    location.reload();
};

//function to parse date strings into date objects
function parseDateString(dateString) {
    const parts = dateString.split(/\s+/);
    const day = parseInt(parts[0], 10);
    const month = isNaN(parts[1]) ? getMonthIndex(parts[1]) : parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    return new Date(year, month, day);
}

//function to get the index of a month from its name
function getMonthIndex(monthName) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return months.indexOf(monthName);
}

getEmployees();