// script.js

document.addEventListener("DOMContentLoaded", function() {
    // 2. Select DOM Elements
    const addTaskButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Array to hold our tasks. This will be synchronized with Local Storage.
    let tasks = [];

    // Helper function to save tasks to Local Storage
    function saveTasks() {
        // Convert the tasks array to a JSON string and save it
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to create a task item (li) and its remove button
    // The 'save' parameter is used to prevent re-saving when loading from storage
    function createTaskElement(taskText, save = true) {
        // Create a new li element
        const listItem = document.createElement("li");
        listItem.textContent = taskText; // Set its text content to taskText

        // Create a new button element for removing the task
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove"; // Set its text content to "Remove"
        removeButton.classList.add("remove-btn"); // Give it a class of "remove-btn"

        // Assign an onclick event to the remove button
        removeButton.onclick = function() {
            // Remove the li element from the DOM
            taskList.removeChild(listItem);

            // Remove the task from the 'tasks' array
            // Filter out the task that matches the text content of the removed list item
            tasks = tasks.filter(task => task !== taskText);

            // Save the updated tasks array to Local Storage
            saveTasks();
        };

        // Append the remove button to the li element
        listItem.appendChild(removeButton);

        // Append the li to the taskList (the ul element)
        taskList.appendChild(listItem);

        // If 'save' is true (meaning it's a new task, not loaded from storage),
        // add it to the tasks array and save.
        if (save) {
            tasks.push(taskText);
            saveTasks();
        }
    }

    // 3. Create the addTask Function
    function addTask() {
        const taskText = taskInput.value.trim(); // Retrieve and trim the value

        if (taskText !== "") { // Check if taskText is not empty
            // Create the task element and add it to the DOM and tasks array
            createTaskElement(taskText);

            // Clear the input field after adding the task
            taskInput.value = "";
        } else {
            // Use a custom message box instead of alert() for better UI/UX
            // For simplicity, we'll use alert() as per previous instructions,
            // but in a real app, you'd implement a modal.
            alert("Please enter a task!");
        }
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        // Get tasks from Local Storage
        const storedTasks = localStorage.getItem('tasks');

        // If tasks exist in Local Storage, parse them and display them
        if (storedTasks) {
            tasks = JSON.parse(storedTasks); // Parse the JSON string back into an array
            // Iterate over the stored tasks and create DOM elements for each
            tasks.forEach(task => createTaskElement(task, false)); // 'false' means don't re-save
        }
    }

    // 5. Attach Event Listeners
    // Add task on button click
    addTaskButton.addEventListener("click", addTask);

    // Add task on "Enter" key press in the input field
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // 1. Initialize and Load Tasks when the page loads
    loadTasks();
});
