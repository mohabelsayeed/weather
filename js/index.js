const searchLocationInput=document.getElementById('searchLocation')
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){
        const lat=pos.coords.latitude ;
        const long=pos.coords.longitude; 
        getWeatherData(`${lat} , ${long}` ) 
      
    })
}else{
    console.log('not allowed');
}

async function getWeatherData(query) {
   let res= await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=ec8c60813cb54b53a3a111814242506`);
   let data= await res.json()
   console.log(data);
   displayTodayWeather (data)
   displayTom(data)
   displayAFFTom(data)
    
}

searchLocationInput.addEventListener('input' ,function(e){
    getWeatherData(e.target.value);
}) 

function displayTodayWeather (data){
    console.log(data , 'from displayTodayWeather');
    console.log(data.current.last_updated , 'date');
    const TodayDate = data.current.last_updated 
    let date = new Date(TodayDate)
    const TodayWeekDay = date.toLocaleDateString('en-us' ,{weekday: 'long' })
    const TodayDay = date.getDate()
    const TodayDayMonth =date.toLocaleDateString('en-us' ,{month: 'long' })
    const CityToday = data.location.name;
    const temp = data.current.temp_c;
    const todayCondition = data.current.condition.text;
    const Todayhumidity =data.current.humidity
    const Todaywind =data.current.wind_kph
    const Direction =data.current.wind_dir
    dir.innerHTML=Direction
    wind.innerHTML=Todaywind
    humidity.innerHTML=Todayhumidity
    conditon.innerHTML=todayCondition
    degree.innerHTML=temp
    city.innerHTML=CityToday
    TodayWeek.innerHTML=TodayWeekDay
    Day.innerHTML=`${TodayDay} , ${TodayDayMonth}`
    todayimage.setAttribute('src', data.current.condition.icon)
}

function displayTom({forecast}){
    tomorrow.innerHTML=new Date(forecast.forecastday[1].date).toLocaleDateString('en-us' ,{weekday: 'long' });
    tomicon.setAttribute('src', forecast.forecastday[1].day.condition.icon);
    tomConditon=forecast.forecastday[1].day.condition.text
    max.innerHTML=(forecast.forecastday[1].day).maxtemp_c
    min.innerHTML=(forecast.forecastday[1].day).mintemp_c

   
}
function displayAFFTom({forecast}){
    aft.innerHTML=new Date(forecast.forecastday[2].date).toLocaleDateString('en-us' ,{weekday: 'long' });
    aftIcon.setAttribute('src',forecast.forecastday[2].day.condition.icon);
    aftConditon=forecast.forecastday[1].day.condition.text
    maxaft.innerHTML=forecast.forecastday[2].day.maxtemp_c
    minaft.innerHTML=forecast.forecastday[2].day.mintemp_c
}

