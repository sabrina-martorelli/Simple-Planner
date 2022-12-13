

   //Search hh on existingBlocks , get index and insert text into textarea 

  
existingBlocks= JSON.parse(localStorage.getItem('timeblock'));

//Gets current date
var today = moment().format("dddd, MMMM Do");
//Gets current date with 24hs format for timeblockColour comparison 
var currentHour = moment().format('HH');

//Display the current day at the top of the calender
$('#currentDay').text(today);


//Gets existing element from Local Storage
//existingBlocks= JSON.parse(localStorage.getItem('timeblock'));

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


   //console.log('existing'+);
   if (existingBlocks){
        var i = existingBlocks.findIndex(p => p.time === hh);  
        console.log(hh);
        console.log(i);   
        console.log(existingBlocks[0].text)  
            if(i !== -1){
                row.append(`<div class="p-3 w-100 ${timeblockColour} "><textarea>${existingBlocks[i].text}</textarea></div>`);
        
            }
        }
     else{

                row.append(`<div class="p-3 w-100 ${timeblockColour} "><textarea></textarea></div>`);
        

            }
    


    row.append(`<div class="p-3 saveBtn"><i class="fas fa-save"></i></div>`);


    businessHours.add(1, 'hour');
}



container.on('click','.saveBtn',saveOnLocal);



function saveOnLocal(){

    //Var definitions
    var timeBlocks =[
        {
        time:'',
        text:'',
            
        }
    ];
    var newBlock = {
        time:'',
        text:'',
    }

    //Gets current element from Local Storage
    timeBlocks= JSON.parse(localStorage.getItem('timeblock'));

    // Targets button and all the family
    var button= $(this);
    var sibling1= button.prev();
    var nephew= sibling1.children();
    var sibling2= button.prev().prev();
    var currentHour= sibling2.text();

   
 

    //Gets the index of the element to check if is already on the local storage
    
    if (timeBlocks) {

        var index = timeBlocks.findIndex(x => x.time === currentHour);
  
        if (index === -1) {
           
             //Sets new object for local storage
            newBlock.time= currentHour;
            newBlock.text= nephew.val();   

            //Push new element into the Array because it doesn't exist
            timeBlocks.push(newBlock);    
        }
        else
        {
            //Replace existing text on timeblock 
            timeBlocks[index].text= nephew.val();   
        }

        localStorage.setItem('timeblock', JSON.stringify(timeBlocks));

    }
    else{
        //Adds first element to Local Storage
        var timeBlocksFirst =[
            {
            time:'',
            text: '',         
            }
        ];
        
       timeBlocksFirst[0].time= currentHour;
       timeBlocksFirst[0].text= nephew.val(); 
       localStorage.setItem('timeblock', JSON.stringify(timeBlocksFirst));
    }

    

    showAppointmentNote();
    
    //Convert object into a JSON string and store in local storage
   
    
};



function showAppointmentNote(){
  // Adds jumbotron child
  var parent= $('.jumbotron');
  //Appends a child to show note
  parent.append('<p class="note">Appointment added to Local Storage <i class="fas fa-check"></i> </p>');
  //Show the note only for some time on screen
  setTimeout(function () {  $('.note').remove();}, 500);
}

