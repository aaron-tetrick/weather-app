// UI Class: Handle UI information
class WX {
    static getInfo() {
        const city = document.querySelector('#location-search').value;
        const temp = document.getElementById('temp');
        const location =  document.getElementById('location');
        const weather = document.getElementById('weather');
        const feel = document.getElementById('feel');
        const humidity =  document.getElementById('humidity');
        const pressure = document.getElementById('pressure');
        const high =  document.getElementById('high');
        const low = document.getElementById('low');
        const far = document.getElementById('far');
        const cel = document.getElementById('cel');

        if (city !== '') {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=fd750b4ded1cc447604504ec4b1324b7`, {mode: 'cors'})
        .then(res => {
            return res.json();
        })
        .then(res => {
            location.textContent = `${res.name}, ${res.sys.country}`;
            weather.textContent =  UI.capitalize(res.weather[0].description);
            humidity.textContent = res.main.humidity + '%';
            pressure.textContent = res.main.pressure + 'mb'
            if(far.className.includes('selected')) {
                temp.textContent = (((res.main.temp-273.15)*1.8)+32).toFixed(1) + String.fromCharCode(176);
                feel.textContent = (((res.main.feels_like-273.15)*1.8)+32).toFixed(1) + String.fromCharCode(176);
                high.textContent = (((res.main.temp_max-273.15)*1.8)+32).toFixed(1) + String.fromCharCode(176);
                low.textContent = (((res.main.temp_min-273.15)*1.8)+32).toFixed(1) + String.fromCharCode(176);
            } else if (cel.className.includes('selected')) {
                temp.textContent = (res.main.temp-273.15).toFixed(1) + String.fromCharCode(176);
                feel.textContent = (res.main.feels_like-273.15).toFixed(1) + String.fromCharCode(176);
                high.textContent = (res.main.temp_max-273.15).toFixed(1) + String.fromCharCode(176);
                low.textContent = (res.main.temp_min-273.15).toFixed(1) + String.fromCharCode(176);
            }
        })
        } else {
            UI.showAlert(); 
        console.log("NOTHING")
        };

          // Clear the search bar
          UI.clearFields();
    } ;

    static selectTemp() {
        let temp = document.getElementById('temp');
        let feel = document.getElementById('feel');
        let high =  document.getElementById('high');
        let low = document.getElementById('low');
        let far = document.getElementById('far');
        let cel = document.getElementById('cel');
        let newTemp = temp.textContent.slice(0, -1);
        let newFeel = feel.textContent.slice(0, -1);
        let newHigh = low.textContent.slice(0, -1);
        let newLow = temp.textContent.slice(0, -1);
        if(!temp.textContent.includes('--')) {
            if(cel.className.includes('selected')) {
                temp.textContent = ((newTemp-32)/1.8).toFixed(1) + String.fromCharCode(176);
                feel.textContent = ((newFeel-32)/1.8).toFixed(1) + String.fromCharCode(176);
                high.textContent = ((newHigh-32)/1.8).toFixed(1) + String.fromCharCode(176);
                low.textContent = ((newLow-32)/1.8).toFixed(1) + String.fromCharCode(176);
            } else if(far.className.includes('selected')) {
                temp.textContent = ((newTemp*1.8)+32).toFixed(1) + String.fromCharCode(176);
                feel.textContent = ((newFeel*1.8)+32).toFixed(1) + String.fromCharCode(176);
                high.textContent = ((newHigh*1.8)+32).toFixed(1) + String.fromCharCode(176);
                low.textContent = ((newLow*1.8)+32).toFixed(1) + String.fromCharCode(176);
            };
        };
    };
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
    };

    static boldText() {
        const far = document.getElementById('far');
        const cel = document.getElementById('cel');
        console.log(far.classList, cel);
        if(far.className.includes('selected')) {
            far.classList.remove('selected');
            cel.classList.add('selected');
        } else if (cel.className.includes('selected')) {
            cel.classList.remove('selected');
            far.classList.add('selected');
        };
    };

    static showAlert() {
        console.log('alert')
        const div = document.createElement('div');
        div.className = 'alert';
        div.appendChild(document.createTextNode('Please enter a city'));
        const container = document.querySelector('.alert-div');
        container.appendChild(div);

        // Vanish in 3 seconds
         setTimeout(() => document.querySelector('.alert').remove(), 1500);
    }

    static clearFields() {
        let search = document.querySelector('#location-search');
        console.log(search);
        search.value = '';

    }
};

document.querySelector('.search-btn').addEventListener('click', WX.getInfo);


document.querySelector('.temp-btn').addEventListener('click',  () => {
    UI.boldText();
    WX.selectTemp();
});