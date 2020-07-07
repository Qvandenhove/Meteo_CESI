const API_KEY = '1fff53cd7cff7c43a749e294ccf25a21';

export default {
    async getCurrentWeather(location){
        const request = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`);
        const data = await request.json();
        return data
    },

    async getForecastWeather(location){
        const request = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}`);
        const data = await request.json();
        return data
    }
}