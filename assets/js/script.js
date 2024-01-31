$(document).ready(function initializeScheduler() {
    // Display the current date in the header
    function displayCurrentDate() {
        const currentDate = dayjs().format('dddd, MMMM D');
        $('#currentDay').text(currentDate);
    }

    // Generate time blocks for standard business hours
    function generateTimeBlocks() {
        const timeBlocksContainer = $('#timeBlocks');
        for (let i = 9; i <= 17; i++) { // Loop from hour 9 to hour 17
            const currentTime = dayjs().hour(i).minute(0).second(0).millisecond(0);
            const timeBlock = $('<div>').addClass('row time-block').attr('id', `hour-${i}`);
            const hourDiv = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(currentTime.format('hA'));
            const textArea = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', 3);
            const saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save').html('<i class="fas fa-save" aria-hidden="true"></i>');

            // Apply color coding to time blocks based on past, present, or future
            colorCodeTimeBlock(timeBlock, currentTime);

            // Load saved event for each time block from local storage
            loadSavedEvent(textArea, i);

            // Save event to local storage when save button is clicked
            saveBtn.on('click', function saveEvent() {
                const eventText = $(this).siblings('.description').val();
                localStorage.setItem(`event-${i}`, eventText);
            });

            // Append elements to time block
            timeBlock.append(hourDiv, textArea, saveBtn);
            timeBlocksContainer.append(timeBlock);
        }
    }

    // Applies color coding to time blocks based on past, present, or future
    function colorCodeTimeBlock(timeBlock, currentTime) {
        if (currentTime.isBefore(dayjs(), 'hour')) {
            timeBlock.addClass('past');
        } else if (currentTime.isSame(dayjs(), 'hour')) {
            timeBlock.addClass('present');
        } else {
            timeBlock.addClass('future');
        }
    }

    // Load saved event for each time block from local storage
    function loadSavedEvent(textArea, hour) {
        const savedEvent = localStorage.getItem(`event-${hour}`);
        if (savedEvent) {
            textArea.val(savedEvent);
        }
    }

    // Calls the displayCurrentDate function to initialize the scheduler
    displayCurrentDate();

    // Calls the generateTimeBlocks function to generate time blocks for the scheduler
    generateTimeBlocks();
});
