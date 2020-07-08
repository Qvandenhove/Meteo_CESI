const API_KEY = '1fff53cd7cff7c43a749e294ccf25a21';

export default {
    async getCurrentWeather(location){
        const request = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`);
        const data = await request.json();
        if (data.cod === "404"){
            return "City not found"
        }
        return data
    },

    async getForecastWeather(lat, lon){
        const request = await fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        const data = await request.json();
        return data
    }
}