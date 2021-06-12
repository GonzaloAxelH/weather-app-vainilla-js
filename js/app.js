import { URL } from './api.js'

window.addEventListener('load', () => {
    //VERIFICANDO

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            loadCoordsInTheApiWeather(position.coords.longitude, position.coords.latitude);
        });
    } else alert('Geolocalizacion no disponible');

    //CALL THE API

    function loadCoordsInTheApiWeather(long, lat) {
        fetch(`${URL}/${lat},${long}`).
            then(response => response.json()).
            then(data => {
                const { temperature, summary, icon } = data.currently;
                setInDom(temperature, summary, icon, data.timezone);
            })
    }
    //SET IN DOM
    function setInDom(temp, desc, icon, zone) {
        document.querySelector('.temperature__degree-content').textContent = temp;
        document.querySelector('.temperature__description').textContent = desc;
        document.querySelector('.location__timezone').textContent = zone;
        setIconWeather(icon, document.querySelector('.location__icon'));
    }

    //SET ICONS 
    function setIconWeather(icon, iconID) {
        const skycons = new Skycons({ color: "  white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play()
        return skycons.set(iconID, Skycons[currentIcon])
    }

    function convertToCelsius(temp) {
        return new "";
    }


    //EVENTS 
})