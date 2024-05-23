
let eventCount = 1;

function addEvent() {
    const eventInputs = document.getElementById('eventInputs');
    const newEvent = document.createElement('div');
    newEvent.className = 'eventInput';
    newEvent.id = `eventInput${eventCount}`;
    newEvent.innerHTML = `
        <label for="eventName${eventCount}">Event Name:</label>
        <input type="text" id="eventName${eventCount}" placeholder="Event Name">
        <label for="eventDay${eventCount}">Day of the Event:</label>
        <select id="eventDay${eventCount}">
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
        </select>
        <label for="eventTimeStart${eventCount}">Event Start Time:</label>
        <input type="time" id="eventTimeStart${eventCount}">
        <label for="eventTimeEnd${eventCount}">Event End Time:</label>
        <input type="time" id="eventTimeEnd${eventCount}">
        <button type="button" onclick="removeEvent(${eventCount})">Remove Event</button>
    `;
    eventInputs.appendChild(newEvent);
    eventCount++;
}

function removeEvent(id) {
    const event = document.getElementById(`eventInput${id}`);
    if (event) {
        event.remove();
    }
}

async function adjustSchedule() {
    let events = [];
    for (let i = 0; i < eventCount; i++) {
        const eventName = document.getElementById(`eventName${i}`)?.value;
        const eventDay = document.getElementById(`eventDay${i}`)?.value;
        const eventTimeStart = document.getElementById(`eventTimeStart${i}`)?.value;
        const eventTimeEnd = document.getElementById(`eventTimeEnd${i}`)?.value;

        if (eventName && eventDay && eventTimeStart && eventTimeEnd) {
            events.push({
                name: eventName,
                day: eventDay,
                startTime: eventTimeStart,
                endTime: eventTimeEnd
            });
        }
    }

    // Define your original schedule and meal plan here
    let schedule = {
        "Monday": ["7:00 AM - Morning Walk", "10:00 AM - Mid-Morning Walk", "12:30 PM - Lunch Break Walk", "3:00 PM - Afternoon Walk", "5:30 PM - Late Afternoon Walk", "7:30 PM - Evening Walk"],
        "Tuesday": ["7:00 AM - Morning Walk", "10:00 AM - Mid-Morning Walk", "12:30 PM - Lunch Break Walk", "3:00 PM - Afternoon Walk", "5:30 PM - Late Afternoon Walk", "7:30 PM - Evening Walk"],
        "Wednesday": ["7:00 AM - Morning Walk", "10:00 AM - Mid-Morning Walk", "12:30 PM - Lunch Break Walk", "3:00 PM - Afternoon Walk", "5:30 PM - Late Afternoon Walk", "7:30 PM - Evening Walk"],
        "Thursday": ["7:00 AM - Morning Walk", "10:00 AM - Mid-Morning Walk", "12:30 PM - Lunch Break Walk", "3:00 PM - Afternoon Walk", "5:30 PM - Late Afternoon Walk", "7:30 PM - Evening Walk"],
        "Friday": ["7:00 AM - Morning Walk", "10:00 AM - Mid-Morning Walk", "12:30 PM - Lunch Break Walk", "3:00 PM - Afternoon Walk", "5:30 PM - Late Afternoon Walk", "7:30 PM - Evening Walk"],
        "Saturday": ["7:00 AM - Morning Walk", "10:00 AM - Mid-Morning Walk", "12:30 PM - Lunch Break Walk", "3:00 PM - Afternoon Walk", "5:30 PM - Late Afternoon Walk", "7:30 PM - Evening Walk"],
        "Sunday": ["7:00 AM - Morning Walk", "10:00 AM - Mid-Morning Walk", "12:30 PM - Lunch Break Walk", "3:00 PM - Afternoon Walk", "5:30 PM - Late Afternoon Walk", "7:30 PM - Evening Walk"]
    };

    let mealPlan = {
        "Monday": ["8:00 AM - Breakfast", "11:00 AM - Snack", "1:00 PM - Lunch", "4:00 PM - Snack", "7:00 PM - Dinner"],
        "Tuesday": ["8:00 AM - Breakfast", "11:00 AM - Snack", "1:00 PM - Lunch", "4:00 PM - Snack", "7:00 PM - Dinner"],
        "Wednesday": ["8:00 AM - Breakfast", "11:00 AM - Snack", "1:00 PM - Lunch", "4:00 PM - Snack", "7:00 PM - Dinner"],
        "Thursday": ["8:00 AM - Breakfast", "11:00 AM - Snack", "1:00 PM - Lunch", "4:00 PM - Snack", "7:00 PM - Dinner"],
        "Friday": ["8:00 AM - Breakfast", "11:00 AM - Snack", "1:00 PM - Lunch", "4:00 PM - Snack", "7:00 PM - Dinner"],
        "Saturday": ["8:00 AM - Breakfast", "11:00 AM - Snack", "1:00 PM - Lunch", "4:00 PM - Snack", "7:00 PM - Dinner"],
        "Sunday": ["8:00 AM - Breakfast", "11:00 AM - Snack", "1:00 PM - Lunch", "4:00 PM - Snack", "7:00 PM - Dinner"]
    };

    // Mock API response for testing
    const mockApiResponse = {
        choices: [
            {
                text: `Monday: 7:00 AM - Morning Walk\nMonday: 10:00 AM - Mid-Morning Walk\nMonday: 12:30 PM - Lunch Break Walk\nMonday: 3:00 PM - Afternoon Walk\nMonday: 5:30 PM - Late Afternoon Walk\nMonday: 7:30 PM - Evening Walk\nTuesday: 7:00 AM - Morning Walk\nTuesday: 10:00 AM - Mid-Morning Walk\nTuesday: 12:30 PM - Lunch Break Walk\nTuesday: 3:00 PM - Afternoon Walk\nTuesday: 5:30 PM - Late Afternoon Walk\nTuesday: 7:30 PM - Evening Walk\nWednesday: 7:00 AM - Morning Walk\nWednesday: 10:00 AM - Mid-Morning Walk\nWednesday: 12:30 PM - Lunch Break Walk\nWednesday: 3:00 PM - Afternoon Walk\nWednesday: 5:30 PM - Late Afternoon Walk\nWednesday: 7:30 PM - Evening Walk\nThursday: 7:00 AM - Morning Walk\nThursday: 10:00 AM - Mid-Morning Walk\nThursday: 12:30 PM - Lunch Break Walk\nThursday: 3:00 PM - Afternoon Walk\nThursday: 5:30 PM - Late Afternoon Walk\nThursday: 7:30 PM - Evening Walk\nFriday: 7:00 AM - Morning Walk\nFriday: 10:00 AM - Mid-Morning Walk\nFriday: 12:30 PM - Lunch Break Walk\nFriday: 3:00 PM - Afternoon Walk\nFriday: 5:30 PM - Late Afternoon Walk\nFriday: 7:30 PM - Evening Walk\nSaturday: 7:00 AM - Morning Walk\nSaturday: 10:00 AM - Mid-Morning Walk\nSaturday: 12:30 PM - Lunch Break Walk\nSaturday: 3:00 PM - Afternoon Walk\nSaturday: 5:30 PM - Late Afternoon Walk\nSaturday: 7:30 PM - Evening Walk\nSunday: 7:00 AM - Morning Walk\nSunday: 10:00 AM - Mid-Morning Walk\nSunday: 12:30 PM - Lunch Break Walk\nSunday: 3:00 PM - Afternoon Walk\nSunday: 5:30 PM - Late Afternoon Walk\nSunday: 7:30 PM - Evening Walk\nMonday: 8:00 AM - Breakfast\nMonday: 11:00 AM - Snack\nMonday: 1:00 PM - Lunch\nMonday: 4:00 PM - Snack\nMonday: 7:00 PM - Dinner\nTuesday: 8:00 AM - Breakfast\nTuesday: 11:00 AM - Snack\nTuesday: 1:00 PM - Lunch\nTuesday: 4:00 PM - Snack\nTuesday: 7:00 PM - Dinner\nWednesday: 8:00 AM - Breakfast\nWednesday: 11:00 AM - Snack\nWednesday: 1:00 PM - Lunch\nWednesday: 4:00 PM - Snack\nWednesday: 7:00 PM - Dinner\nThursday: 8:00 AM - Breakfast\nThursday: 11:00 AM - Snack\nThursday: 1:00 PM - Lunch\nThursday: 4:00 PM - Snack\nThursday: 7:00 PM - Dinner\nFriday: 8:00 AM - Breakfast\nFriday: 11:00 AM - Snack\nFriday: 1:00 PM - Lunch\nFriday: 4:00 PM - Snack\nFriday: 7:00 PM - Dinner\nSaturday: 8:00 AM - Breakfast\nSaturday: 11:00 AM - Snack\nSaturday: 1:00 PM - Lunch\nSaturday: 4:00 PM - Snack\nSaturday: 7:00 PM - Dinner\nSunday: 8:00 AM - Breakfast\nSunday: 11:00 AM - Snack\nSunday: 1:00 PM - Lunch\nSunday: 4:00 PM - Snack\nSunday: 7:00 PM - Dinner`
            }
        ]
    };

    const data = mockApiResponse; // Use this line for mock response

    // Uncomment below lines and remove mockApiResponse for actual API call
    // const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer YOUR_OPENAI_API_KEY`
    //     },
    //     body: JSON.stringify({
    //         prompt: prompt,
    //         max_tokens: 150,
    //         n: 1,
    //         stop: null,
    //         temperature: 0.7
    //     })
    // });
    // const data = await response.json();

    const adjustedSchedules = data.choices[0].text.trim().split('\n');

    let adjustedSchedule = {};
    let adjustedMealPlan = {};

    for (let day in schedule) {
        adjustedSchedule[day] = [];
        adjustedMealPlan[day] = [];
    }

    // Parse the API response to separate the adjusted schedule and meal plan
    for (let line of adjustedSchedules) {
        const day = line.split(': ')[0];
        if (schedule[day]) {
            if (line.includes(' - ')) {
                adjustedSchedule[day].push(line.split(': ')[1]);
            } else {
                adjustedMealPlan[day].push(line.split(': ')[1]);
            }
        }
    }

    for (let day in adjustedSchedule) {
        localStorage.setItem(day + "_schedule", JSON.stringify(adjustedSchedule[day]));
        localStorage.setItem(day + "_mealPlan", JSON.stringify(adjustedMealPlan[day]));
    }

    // Display the adjusted schedules and meal plans
    const dayNames = Object.keys(adjustedSchedule);
    document.getElementById('adjustedSchedule').innerHTML = dayNames.map(day => `<h3>${day}</h3><p>${adjustedSchedule[day].join('<br>')}</p>`).join('');
    document.getElementById('mealPlan').innerHTML = dayNames.map(day => `<h3>${day}</h3><p>${adjustedMealPlan[day].join('<br>')}</p>`).join('');
}

// Load the saved schedule and meal plan on page load
window.onload = function() {
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    dayNames.forEach(day => {
        const savedSchedule = localStorage.getItem(day + "_schedule");
        const savedMealPlan = localStorage.getItem(day + "_mealPlan");
        if (savedSchedule) {
            document.getElementById('adjustedSchedule').innerHTML += `<h3>${day}</h3><p>${JSON.parse(savedSchedule).join('<br>')}</p>`;
        }
        if (savedMealPlan) {
            document.getElementById('mealPlan').innerHTML += `<h3>${day}</h3><p>${JSON.parse(savedMealPlan).join('<br>')}</p>`;
        }
    });
};
