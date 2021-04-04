let APIKey="7c75a4557e4d48e6902832770764c3d7"
let date = new Date();
let now = moment(date).format('(M/D/YYYY)'); //used moment.js to get date
let lat;
let lon;
let cityNumber = 0;
let searchedCity = document.getElementById('searchedCity')
let typedCity;
let numberOfCity = 0;

//if city is in local storage then pull and append
let cityList = JSON.parse(localStorage.getItem('cityList')) || []
for (i=0; i < cityList.length; i++){
    $( ".sidebar" ).append ('<div\
    <button type="submit" class="btn btn-outline-secondary btn-lg" id='+cityList[i].name+'>'+cityList[i].name+'</button>\
    </div>'); 
}
//when user clicks button, it will grab the value of the iput box
// searchBar.addEventListener('click', () => {
//     cityName = $('#searchBar').value()
// })
//gets id searchBar and adds a click event 
$('#btnMain').on('click', function (){
    let cityName = $('#searchBar').val()
    let cityList = JSON.parse(localStorage.getItem('cityList')) || []
    const city = {
      name: cityName
    }
    let cityExist = false;
    for (i=0; i < cityList.length; i++){
      if (cityList[i].name.toLowerCase() === cityName.toLowerCase())
           cityExist = true
    }

    if (cityExist == false) { 
    cityList.push(city)
    localStorage.setItem('cityList', JSON.stringify(cityList))
    $( ".sidebar" ).append ('<div\
          <button type="submit" class="btn btn-outline-secondary btn-lg" id='+cityName+'>'+cityName+'</button>\
          </div>'); 
    }
    

   
//using ajax to pull data from weather API
$.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=imperial&appid=" + APIKey,
    method: "GET"
  }).done(function(data) {
    console.log(data)
    //pulling temp, humidity, windspeead from weather API using ID assigned in html and jquery display data
    $('#cityname').text(data.name + now)
    $('#temperature').text(data.main.temp + ' °F') 
    let iconId = data.weather[0].icon
    $('#icon').replaceWith ('<img src="https://openweathermap.org/img/wn/'+iconId+'@2x.png" alt=""></img>')
    $('#humidity').text(data.main.humidity)
    $('#windspeed').text(data.wind.speed)
    lat = data.coord.lat
    lon = data.coord.lon
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid=" + APIKey,
        context: document.body
      }).done(function(data) {
        console.log(data)
        $('#uvindex').text(data.value)
      });

  });

//Pulling 5 day forecast from api API. Using ID assigned in html and jquery to display data
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid=" + APIKey,
    context: document.body
  }).done(function(data) {
    console.log(data)
    $('#date1').text(data.list[0].dt_txt)
    $('#temp1').text(data.list[0].main.temp + ' °F') 
    let iconId = data.list[0].weather[0].icon
    $('#icon1').replaceWith ('<img src="https://openweathermap.org/img/wn/'+iconId+'@2x.png" alt=""></img>')
    $('#humidity1').text(data.list[0].main.humidity)
    $('#date2').text(data.list[8].dt_txt)
    $('#temp2').text(data.list[8].main.temp + ' °F') 
    iconId = data.list[8].weather[0].icon
    $('#icon2').replaceWith ('<img src="https://openweathermap.org/img/wn/'+iconId+'@2x.png" alt=""></img>')
    $('#humidity2').text(data.list[8].main.humidity)
    $('#date3').text(data.list[16].dt_txt)
    $('#temp3').text(data.list[16].main.temp + ' °F') 
    iconId = data.list[16].weather[0].icon
    $('#icon3').replaceWith ('<img src="https://openweathermap.org/img/wn/'+iconId+'@2x.png" alt=""></img>')
    $('#humidity3').text(data.list[16].main.humidity)
    $('#date4').text(data.list[24].dt_txt)
    $('#temp4').text(data.list[24].main.temp + ' °F') 
    iconId = data.list[24].weather[0].icon
    $('#icon4').replaceWith ('<img src="https://openweathermap.org/img/wn/'+iconId+'@2x.png" alt=""></img>')
    $('#humidity4').text(data.list[24].main.humidity)
    $('#date5').text(data.list[32].dt_txt)
    $('#temp5').text(data.list[32].main.temp + ' °F') 
    iconId = data.list[32].weather[0].icon
    $('#icon5').replaceWith ('<img src="https://openweathermap.org/img/wn/'+iconId+'@2x.png" alt=""></img>')
    $('#humidity5').text(data.list[32].main.humidity)
    
  });

})

$('.btn').on('click', function (){
  //let cityName = $('#clickedBtn').val()
  //let cityName = typedCity;
  //let cityName = $('#clickedBtn').text()
  let cityName = $(this).text();
//using ajax to pull data from weather API
$.ajax({
  url: "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=imperial&appid=" + APIKey,
  method: "GET"
}).done(function(data) {
  console.log(data)
  //pulling temp, humidity, windspeead from weather API using ID assigned in html sheet
  $('#cityname').text(data.name + now)
  $('#temperature').text(data.main.temp + ' °F') 
  let iconId = data.weather[0].icon
  $('#icon').replaceWith ('<img src="https://openweathermap.org/img/wn/'+iconId+'@2x.png" alt=""></img>')
  $('#humidity').text(data.main.humidity)
  $('#windspeed').text(data.wind.speed)
  //Pulling longitude and latitude from UVI api 
  lat = data.coord.lat
  lon = data.coord.lon
  $.ajax({//uvi api
      url: "http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid=" + APIKey,
      context: document.body
    }).done(function(data) {
      console.log(data)
      $('#uvindex').text(data.value)
    });

});

//using data to pull forecast API. 
$.ajax({
  url: "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&units=imperial&appid=" + APIKey,
  context: document.body
}).done(function(data) {
  console.log(data)
  $('#date1').text(data.list[0].dt_txt)
  $('#temp1').text(data.list[0].main.temp + ' °F') 
  let iconId = data.list[0].weather[0].icon
  $('#icon1').replaceWith ('<img src="https://openweathermap.org/img/wn/'+iconId+'@2x.png" alt=""></img>')
  $('#humidity1').text(data.list[0].main.humidity)
  $('#date2').text(data.list[8].dt_txt)
  $('#temp2').text(data.list[8].main.temp + ' °F') 
  iconId = data.list[8].weather[0].icon
  $('#icon2').replaceWith ('<img src="https://openweathermap.org/img/wn/'+iconId+'@2x.png" alt=""></img>')
  $('#humidity2').text(data.list[8].main.humidity)
  $('#date3').text(data.list[16].dt_txt)
  $('#temp3').text(data.list[16].main.temp + ' °F') 
  iconId = data.list[16].weather[0].icon
  $('#icon3').replaceWith ('<img src="https://openweathermap.org/img/wn/'+iconId+'@2x.png" alt=""></img>')
  $('#humidity3').text(data.list[16].main.humidity)
  $('#date4').text(data.list[24].dt_txt)
  $('#temp4').text(data.list[24].main.temp + ' °F') 
  iconId = data.list[24].weather[0].icon
  $('#icon4').replaceWith ('<img src="https://openweathermap.org/img/wn/'+iconId+'@2x.png" alt=""></img>')
  $('#humidity4').text(data.list[24].main.humidity)
  $('#date5').text(data.list[32].dt_txt)
  $('#temp5').text(data.list[32].main.temp + ' °F') 
  iconId = data.list[32].weather[0].icon
  $('#icon5').replaceWith ('<img src="https://openweathermap.org/img/wn/'+iconId+'@2x.png" alt=""></img>')
  $('#humidity5').text(data.list[32].main.humidity)
    
});

})








