const API_KEY = '18e259821f1ce9bc85c7d8e22a091faf';

export default {
    async getCurrentWeather(location){
        const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`);
        const data = await request.json();
        if (data.cod === "404"){
            return "City not found"
        }else if(data.cod === 429){
            return "Too much request try later"
        }
        return data
    },

    async getForecastWeather(lat, lon){
        const request = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        const data = await request.json();
        return data
    }
}