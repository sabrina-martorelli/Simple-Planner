
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

var timeblockColour = "";

//Looping from 9 to 17 hs am/pm format
var businessHours = moment(09, 'HH');
while (businessHours.hour() < 18) {

    var hh = (businessHours.format('hha'));
    //Gets hours as 24hours format for color comparison
    var HH24 = (businessHours.format('HH'));

    //Creates a row with 3 divs for each business hours

    container.append(`<div class="row-${hh} d-flex"></div>`)
    var row = $(`.row-${hh}`);

    row.append(`<div class="p-3 hour">${hh}</div>`);

    //Compares current time hour with planner to show correct colors
    //Use of variable to set the colour

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


    row.append(`<div class="p-3 w-100 ${timeblockColour} "><textarea></textarea></div>`);
    row.append(`<div class="p-3 saveBtn "><i class="fas fa-save"></i></div>`);


    businessHours.add(1, 'hour');
}




/*
      <div class="d-flex flex-column container  ">  

        <div class="row d-flex ">
          <div class="p-3 hour">09 AM</div>
          <div class="p-3 w-100 past "><textarea></textarea></div>
          <div class="p-3  saveBtn  "><i class="fas fa-save"></i></div>
        </div>

        <div class="d-flex  ">
          <div class="p-3 hour">10 PM</div>
          <div class="p-3 w-100  present"><textarea></textarea></div>
          <div class="p-3  saveBtn "><i class="fas fa-save"></i>
          </div>
        </div>

        <div class="d-flex align-content-center ">
          <div class="p-3 hour">11 AM</div>
          <div class="p-3  w-100 future"><textarea></textarea></div>
          <div class="p-3  saveBtn"><i class="fas fa-save"></i>
          </div>
        </div>    
      </div>


*/