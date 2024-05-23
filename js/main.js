

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
    event.remove();
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

    // Prepare the input for the OpenAI API
    const prompt = `Given the following events: ${JSON.stringify(events)}, adjust the following schedules intelligently:
    Schedule: ${JSON.stringify(schedule)}
    Meal Plan: ${JSON.stringify(mealPlan)}`;

    // Call the OpenAI API
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 150,
            n: 1,
            stop: null,
            temperature: 0.7
        })
    });

    const data = await response.json();
    const adjustedSchedules = data.choices[0].text.trim().split('\n');

    let adjustedSchedule = {};
    let adjustedMealPlan = {};

    for (let day in schedule) {
        adjustedSchedule[day] = [];
        adjustedMealPlan[day] = [];
    }

    //
