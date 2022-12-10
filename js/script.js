
//Gets current date
var today = moment().format("dddd, MMMM Do");

//Display the current day at the top of the calender
$('#currentDay').text(today);



//Looping from 9 to 17 hs am/pm format
var businessHours=moment(09, 'HH');
while(businessHours.hour()< 18){

    console.log(businessHours.format('hha'));

    businessHours.add(1,'hour');
}




/*
      <div class="d-flex flex-column  ">  
        <div class="d-flex align-content-center ">
          <div class="p-3 hour  ">09 AM</div>
          <div class="p-3 w-100 past "><textarea></textarea></div>
          <div class="p-3  saveBtn text "><i class="fas fa-save"></i>
          </div>
        </div>

        <div class="d-flex align-content-center ">
          <div class="p-3 hour">10 PM</div>
          <div class="p-3 w-100  present"><textarea></textarea></div>
          <div class="p-3  saveBtn align-content-center"><i class="fas fa-save"></i>
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