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
        let symbol = true;
        document.querySelector('.temperature__degree-content').textContent = convertToDegToggle(temp, symbol);
        document.querySelector('.temperature__description').textContent = desc;
        document.querySelector('.location__timezone').textContent = zone;
        document.querySelector('.temperature__degree-type').textContent = 'C';
        const tempClickable = document.querySelector('.temperature__drgree');
        tempClickable.addEventListener('click', () => {
            document.querySelector('.temperature__degree-content').textContent = convertToDegToggle(temp, !symbol);
            symbol = !symbol;
            document.querySelector('.temperature__degree-type').textContent = symbol ? 'C' : 'F';

        })
        setIconWeather(icon, document.querySelector('.location__icon'));
    }
    //SET ICONS 
    function setIconWeather(icon, iconID) {
        const skycons = new Skycons({ color: "  white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play()
        return skycons.set(iconID, Skycons[currentIcon])
    }
    //HELPERS
    function convertToDegToggle(temp, symbol) {
        if (symbol) return Math.floor(5 / 9 * (temp - 32));
        else return Math.floor(9 / 5 * (temp + 32));
    }


})
