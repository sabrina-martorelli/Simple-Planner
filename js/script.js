
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