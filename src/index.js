// UI Class: Handle UI information
class WX {
    static getInfo() {
        const city = document.querySelector('#location-search').value;
        const temp = document.getElementById('temp');
        const location =  document.getElementById('location');
        const weather = document.getElementById('weather');
        const feel = document.getElementById('feel');
        const humidity =  document.getElementById('humidity')
        const pressure = document.getElementById('pressure');
        const high =  document.getElementById('high');
        const low = document.getElementById('low');
        
        if (city !== '') {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=fd750b4ded1cc447604504ec4b1324b7`, {mode: 'cors'})
        .then(res => {
            return res.json();
        })
        .then(res => {
            temp.textContent = (((res.main.temp-273.15)*1.8)+32).toFixed(1) + String.fromCharCode(176);
            location.textContent = `${res.name}, ${res.sys.country}`
            weather.textContent =  UI.capitalize(res.weather[0].description);
            feel.textContent = (((res.main.feels_like-273.15)*1.8)+32).toFixed(1) + String.fromCharCode(176);
            humidity.textContent = res.main.humidity + '%'
            pressure.textContent = res.main.pressure + 'mb'
            high.textContent = (((res.main.temp_max-273.15)*1.8)+32).toFixed(1) + String.fromCharCode(176);
            low.textContent = (((res.main.temp_min-273.15)*1.8)+32).toFixed(1) + String.fromCharCode(176);
        })
        } else { 
        console.log("NOTHING ENTERED")
        }
    } 
};

class UI {
    static capitalize(desc) {
        const weather = document.getElementById('weather');
        if(desc.length > 15) {
            weather.style.fontSize = '3rem';
        } else {
            weather.style.fontSize = '4rem';
        }
        return desc.charAt(0).toUpperCase() + desc.slice(1);
    }
}

document.querySelector('.search-btn').addEventListener('click', WX.getInfo);


