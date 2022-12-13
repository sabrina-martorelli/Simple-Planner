
//Var definition for existing blocks
var existingBlocks = [
        {
            time: '',
            text: '',
        }  
];

//Gets existing timeblocks from local storage
existingBlocks = JSON.parse(localStorage.getItem('timeblock'));

//Gets current date
var today = moment().format("dddd, MMMM Do");
//Gets current date with 24hs format for timeblockColour comparison 
var currentHour = moment().format('HH');

//Display the current day at the top of the calender
$('#currentDay').text(today);


//Targets container to add rows
var container = $('.container');

//Adds Classes to become a flex box
container.addClass('d-flex flex-column');

var businessHours = moment(09, 'HH');

//Loos from 9 to 17 hs am/pm format to create planner
while (businessHours.hour() < 18) {

    //Gets hours as 12hours format 
    var hh = (businessHours.format('hha'));
    //Gets hours as 24hours format for color comparison
    var HH24 = (businessHours.format('HH'));

    //Creates a row with 3 divs for each business hours
    container.append(`<div class="row-${hh} d-flex"></div>`)
    var row = $(`.row-${hh}`);

    row.append(`<div class="p-3 hour">${hh}</div>`);

    //Compares current hour with planner to show correct colors
    var timeblockColour = "";
    if (HH24 > currentHour) {
        timeblockColour = 'future';
    }
    else {
        if (HH24 < currentHour) {
            timeblockColour = 'past'
        }
        else {
            timeblockColour = 'present';
        }
    }

    //Base on if there are existing timeblocks or not creates div for the text
    if (existingBlocks) {
        //Search for the index of the timeblock to target exact text
        var i = existingBlocks.findIndex(p => p.time === hh);

        //If there is a existing block for the current hour- Gets the text from Local storage and place on div text
        if (i !== -1) {
            row.append(`<div class="p-3 w-100 ${timeblockColour}"><textarea>${existingBlocks[i].text}</textarea></div>`);
        }
        else {
            row.append(`<div class="p-3 w-100 ${timeblockColour}"><textarea></textarea></div>`);
        }
    }
    //If there are no existing timeblocks on the Local storage creates all the divs for the first time
    else {
        row.append(`<div class="p-3 w-100 ${timeblockColour}"><textarea></textarea></div>`);
    }


    //Creats div for save the button
    row.append(`<div class="p-3 saveBtn"><i class="fas fa-save"></i></div>`);


    //Increase hour for next round
    businessHours.add(1, 'hour');
}


//Listener for Save button
container.on('click', '.saveBtn', saveOnLocal);


//Function to save on Local storage the timeblocks text
function saveOnLocal() {

    //Var definitions
    var timeBlocks = [
        {
            time: '',
            text: '',

        }
    ];

    var newBlock = {
        time: '',
        text: '',
    }

    //Gets current timeblocks from Local Storage
    timeBlocks = JSON.parse(localStorage.getItem('timeblock'));

    //Targets button and all the family members
    var button = $(this);
    var sibling1 = button.prev();
    var nephew = sibling1.children();
    var sibling2 = button.prev().prev();
    var currentHour = sibling2.text();
    var currentText = nephew.val();


    //Base on if there are existing timeblocks or not adds or replace text on timeblocks
    if (timeBlocks) {
        
        //Search for the index of the timeblock to target exact text
        var index = timeBlocks.findIndex(x => x.time === currentHour);

     
        if (index === -1) {


            //Sets new object for local storage
            newBlock.time = currentHour;
            newBlock.text = currentText;

            //Push new element into the Array because it doesn't exist
            timeBlocks.push(newBlock);
        }
        else {


            //Replace existing text on timeblock 
            timeBlocks[index].text = currentText;


        }

        localStorage.setItem('timeblock', JSON.stringify(timeBlocks));

    }
    else {
        //Case to add first element to Local Storage
        var timeBlocksFirst = [
            {
                time: '',
                text: '',
            }
        ];

        //Sets new object on array for local storage
        timeBlocksFirst[0].time = currentHour;
        timeBlocksFirst[0].text = currentText;
        localStorage.setItem('timeblock', JSON.stringify(timeBlocksFirst));
    }


    //Shows note at the top of the page when a new text is saved
    showAppointmentNote();

    //Removes all entries that are empty - Cover removed cases  (text ="")
    cleanLocalStorage();


};



function showAppointmentNote() {
    //Adds jumbotron child
    var parent = $('.jumbotron');
    //Appends a child to show note
    parent.append('<p class="note">Appointment Added to <span class="localStorage">localStorage</span> <i class="fas fa-check"></i> </p>');
    //Show the note only for some time on screen
    setTimeout(function () { $('.note').remove(); }, 500);
}


function cleanLocalStorage() {

    //Var definitions
    var cleanBlocks, newBlock = [];
    //Gets current timeblocks from Local Storage
    cleanBlocks = JSON.parse(localStorage.getItem('timeblock'));
    //Loops the array to removes timeblocks empty using an extra array
    for (var block= 0; block<cleanBlocks.length;  block++)
    {  
        if (cleanBlocks[block].text !=="")
        {
           newBlock.push(cleanBlocks[block]);
        }
    }
    //Saves clean data on Local Storage
    localStorage.setItem('timeblock', JSON.stringify(newBlock));
}