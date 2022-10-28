// UI Class: Handle UI information
class UI {
  static capitalize(desc) {
    const weather = document.getElementById('weather');
    if (desc.length > 15) {
      weather.style.fontSize = '3rem';
    } else {
      weather.style.fontSize = '4rem';
    }
    return desc.charAt(0).toUpperCase() + desc.slice(1);
  }

  static boldText() {
    const fahr = document.getElementById('fahr');

    const cel = document.getElementById('cel');
    if (fahr.className.includes('selected')) {
      fahr.classList.remove('selected');
      cel.classList.add('selected');
    } else if (cel.className.includes('selected')) {
      cel.classList.remove('selected');
      fahr.classList.add('selected');
    }
  }

  static changeBkgrd() {
    const fahr = document.getElementById('fahr');
    const cel = document.getElementById('cel');
    const tempBtn = document.querySelector('.temp-btn ');
    const container = document.querySelector('.container');
    if (fahr.className.includes('selected')) {
      tempBtn.style.backgroundColor = 'var(--secondary-color)';
      container.style.boxShadow = '0px 1px 80px -20px rgba(196, 87, 24, .8)';
    } else if (cel.className.includes('selected')) {
      tempBtn.style.backgroundColor = 'var(--main-color)';
      container.style.boxShadow = '0px 1px 80px -20px rgb(20 110 197)';
    }
  }

  static showAlert(msg) {
    const div = document.createElement('div');
    div.className = 'alert';
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector('.alert-div');
    container.appendChild(div);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 1500);
  }

  static clearFields() {
    const search = document.querySelector('#location-search');
    search.value = '';
  }

  static displayDate() {
    const date = document.querySelector('.date');
    date.textContent = new Date().toLocaleDateString();
  }

  static changeBkgrdImg(id) {
    const body = document.querySelector('body');
    if (id >= 200 && id <= 232) {
      body.style.backgroundImage = "url(/imgs/tstorms.jpg)";
    } else if (id >= 300 && id <= 321 || id >= 500 && id <= 531) {
      body.style.backgroundImage = "url(/imgs/rain.jpg)";
    } else if (id >= 600 && id <= 622) {
      body.style.backgroundImage = "url(/imgs/snow.jpg)";
    } else if (id >= 701 && id <= 771) { 
      body.style.backgroundImage = "url(/imgs/haze.jpg)";
    } else if (id === 781) { 
      body.style.backgroundImage = "url(/imgs/tornado.jpg)";
    }  else if (id === 800) { 
      body.style.backgroundImage = "url(/imgs/clear.jpg)";
    }  else if (id === 804) { 
      body.style.backgroundImage = "url(/imgs/overcast.jpg)";
    } else {
      body.style.backgroundImage = "url(/imgs/clouds.jpg)";
    }
  }
}
// WX Class: Retrieve weather data
class WX {
  static async getInfo() {
    const city = document.querySelector('#location-search').value;
    const temp = document.getElementById('temp');
    const location = document.getElementById('location');
    const weather = document.getElementById('weather');
    const feel = document.getElementById('feel');
    const humidity = document.getElementById('humidity');
    const pressure = document.getElementById('pressure');
    const high = document.getElementById('high');
    const low = document.getElementById('low');
    const fahr = document.getElementById('fahr');
    const cel = document.getElementById('cel');
    let msg;

    if (city !== '') {
      try {
        const res = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=fd750b4ded1cc447604504ec4b1324b7`,
          { mode: 'cors' },
        );
        const data = await res.json();
        location.textContent = `${data.name}, ${data.sys.country}`;
        weather.textContent = UI.capitalize(data.weather[0].description);
        humidity.textContent = `${data.main.humidity}%`;
        pressure.textContent = `${data.main.pressure}mb`;

        if (fahr.className.includes('selected')) {
          temp.textContent = ((data.main.temp - 273.15) * 1.8 + 32).toFixed(1)
            + String.fromCharCode(176);
          feel.textContent = ((data.main.feels_like - 273.15) * 1.8 + 32).toFixed(1)
            + String.fromCharCode(176);
          high.textContent = ((data.main.temp_max - 273.15) * 1.8 + 32).toFixed(1)
            + String.fromCharCode(176);
          low.textContent = ((data.main.temp_min - 273.15) * 1.8 + 32).toFixed(1)
            + String.fromCharCode(176);
        } else if (cel.className.includes('selected')) {
          temp.textContent = (data.main.temp - 273.15).toFixed(1) + String.fromCharCode(176);
          feel.textContent = (data.main.feels_like - 273.15).toFixed(1)
            + String.fromCharCode(176);
          high.textContent = (data.main.temp_max - 273.15).toFixed(1) + String.fromCharCode(176);
          low.textContent = (data.main.temp_min - 273.15).toFixed(1) + String.fromCharCode(176);
        }

        // Change website's background image
        UI.changeBkgrdImg(data.weather[0].id);
           
        // Clear the search bar
        UI.clearFields();

      } catch (err) {
        msg = 'City not found';
        UI.showAlert(msg);
      }
    } else {
      // Show alert if search bar is empty
      msg = 'Please enter a city';
      UI.showAlert(msg);
    }
  }

  static selectTemp() {
    const temp = document.getElementById('temp');
    const feel = document.getElementById('feel');
    const high = document.getElementById('high');
    const low = document.getElementById('low');
    const fahr = document.getElementById('fahr');
    const cel = document.getElementById('cel');
    const newTemp = temp.textContent.slice(0, -1);
    const newFeel = feel.textContent.slice(0, -1);
    const newHigh = low.textContent.slice(0, -1);
    const newLow = temp.textContent.slice(0, -1);
    if (!temp.textContent.includes('--')) {
      if (cel.className.includes('selected')) {
        temp.textContent = ((newTemp - 32) / 1.8).toFixed(1) + String.fromCharCode(176);
        feel.textContent = ((newFeel - 32) / 1.8).toFixed(1) + String.fromCharCode(176);
        high.textContent = ((newHigh - 32) / 1.8).toFixed(1) + String.fromCharCode(176);
        low.textContent = ((newLow - 32) / 1.8).toFixed(1) + String.fromCharCode(176);
      } else if (fahr.className.includes('selected')) {
        temp.textContent = (newTemp * 1.8 + 32).toFixed(1) + String.fromCharCode(176);
        feel.textContent = (newFeel * 1.8 + 32).toFixed(1) + String.fromCharCode(176);
        high.textContent = (newHigh * 1.8 + 32).toFixed(1) + String.fromCharCode(176);
        low.textContent = (newLow * 1.8 + 32).toFixed(1) + String.fromCharCode(176);
      }
    }
  }
}

// Display today's date
UI.displayDate();

// EVENT LISTENERS
document.querySelector('.search-btn').addEventListener('click', WX.getInfo);

document.querySelector('.temp-btn').addEventListener('click', () => {
  UI.boldText();
  UI.changeBkgrd();
  WX.selectTemp();
});
