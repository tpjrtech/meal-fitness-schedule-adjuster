
function adjustSchedule() {
    var day = document.getElementById('eventDay').value;
    var startTime = document.getElementById('eventTimeStart').value;
    var endTime = document.getElementById('eventTimeEnd').value;

    // Define your original schedule here
    var schedule = {
        "Monday": ["7:00 AM - Morning Walk", "10:00 AM - Mid-Morning Walk", "12:30 PM - Lunch Break Walk", "3:00 PM - Afternoon Walk", "5:30 PM - Late Afternoon Walk", "7:30 PM - Evening Walk"],
        "Tuesday": ["7:00 AM - Morning Walk", "10:00 AM - Mid-Morning Walk", "12:30 PM - Lunch Break Walk", "3:00 PM - Afternoon Walk", "5:30 PM - Late Afternoon Walk", "7:30 PM - Evening Walk"],
        "Wednesday": ["7:00 AM - Morning Walk", "10:00 AM - Mid-Morning Walk", "12:30 PM - Lunch Break Walk", "3:00 PM - Afternoon Walk", "5:30 PM - Late Afternoon Walk", "7:30 PM - Evening Walk"],
        "Thursday": ["7:00 AM - Morning Walk", "10:00 AM - Mid-Morning Walk", "12:30 PM - Lunch Break Walk", "3:00 PM - Afternoon Walk", "5:30 PM - Late Afternoon Walk", "7:30 PM - Evening Walk"],
        "Friday": ["7:00 AM - Morning Walk", "10:00 AM - Mid-Morning Walk", "12:30 PM - Lunch Break Walk", "3:00 PM - Afternoon Walk", "5:30 PM - Late Afternoon Walk", "7:30 PM - Evening Walk"],
        "Saturday": ["7:00 AM - Morning Walk", "10:00 AM - Mid-Morning Walk", "12:30 PM - Lunch Break Walk", "3:00 PM - Afternoon Walk", "5:30 PM - Late Afternoon Walk", "7:30 PM - Evening Walk"],
        "Sunday": ["7:00 AM - Morning Walk", "10:00 AM - Mid-Morning Walk", "12:30 PM - Lunch Break Walk", "3:00 PM - Afternoon Walk", "5:30 PM - Late Afternoon Walk", "7:30 PM - Evening Walk"]
    };

    // Define your original meal plan here
    var mealPlan = {
        "Monday": ["8:00 AM - Breakfast", "11:00 AM - Snack", "1:00 PM - Lunch", "4:00 PM - Snack", "7:00 PM - Dinner"],
        "Tuesday": ["8:00 AM - Breakfast", "11:00 AM - Snack", "1:00 PM - Lunch", "4:00 PM - Snack", "7:00 PM - Dinner"],
        "Wednesday": ["8:00 AM - Breakfast", "11:00 AM - Snack", "1:00 PM - Lunch", "4:00 PM - Snack", "7:00 PM - Dinner"],
        "Thursday": ["8:00 AM - Breakfast", "11:00 AM - Snack", "1:00 PM - Lunch", "4:00 PM - Snack", "7:00 PM - Dinner"],
        "Friday": ["8:00 AM - Breakfast", "11:00 AM - Snack", "1:00 PM - Lunch", "4:00 PM - Snack", "7:00 PM - Dinner"],
        "Saturday": ["8:00 AM - Breakfast", "11:00 AM - Snack", "1:00 PM - Lunch", "4:00 PM - Snack", "7:00 PM - Dinner"],
        "Sunday": ["8:00 AM - Breakfast", "11:00 AM - Snack", "1:00 PM - Lunch", "4:00 PM - Snack", "7:00 PM - Dinner"]
    };

    // Adjust schedule
    var adjustedSchedule = schedule[day].filter(function(time) {
        var [startHour, startMinutes] = time.split(" ")[0].split(":");
        var startPeriod = time.split(" ")[1];
        if (startPeriod === "PM" && startHour !== "12") startHour = parseInt(startHour) + 12;

        var eventStartHour = parseInt(startTime.split(":")[0]);
        var eventEndHour = parseInt(endTime.split(":")[0]);

        return !(startHour >= eventStartHour && startHour < eventEndHour);
    });

    // Adjust meal plan
    var adjustedMealPlan = mealPlan[day].filter(function(time) {
        var [mealHour, mealMinutes] = time.split(" ")[0].split(":");
        var mealPeriod = time.split(" ")[1];
        if (mealPeriod === "PM" && mealHour !== "12") mealHour = parseInt(mealHour) + 12;

        var eventStartHour = parseInt(startTime.split(":")[0]);
        var eventEndHour = parseInt(endTime.split(":")[0]);

        return !(mealHour >= eventStartHour && mealHour < eventEndHour);
    });

    localStorage.setItem(day + "_schedule", JSON.stringify(adjustedSchedule));
    localStorage.setItem(day + "_mealPlan", JSON.stringify(adjustedMealPlan));

    document.getElementById('adjustedSchedule').innerHTML = adjustedSchedule.join("<br>");
    document.getElementById('mealPlan').innerHTML = adjustedMealPlan.join("<br>");
}

// Load the saved schedule and meal plan on page load
window.onload = function() {
    var day = new Date().toLocaleString('en-us', { weekday: 'long' });
    var savedSchedule = localStorage.getItem(day + "_schedule");
    var savedMealPlan = localStorage.getItem(day + "_mealPlan");
    if (savedSchedule) {
        document.getElementById('adjustedSchedule').innerHTML = JSON.parse(savedSchedule).join("<br>");
    }
    if (savedMealPlan) {
        document.getElementById('mealPlan').innerHTML = JSON.parse(savedMealPlan).join("<br>");
    }
};
