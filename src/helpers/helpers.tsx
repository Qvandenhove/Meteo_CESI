import weather from "../repository/meteo_data";
import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyCwl3rvc_1ysFGhWSVN-kz991m_8eC6J-s",
    authDomain: "cesi-meteo-4feea.firebaseapp.com",
    databaseURL: "https://cesi-meteo-4feea.firebaseio.com",
    projectId: "cesi-meteo-4feea",
    storageBucket: "cesi-meteo-4feea.appspot.com",
    messagingSenderId: "919394823834",
    appId: "1:919394823834:web:f265bb3ab7a2c754553923"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export default {

    async getCurrentWeather(location){
        const currentData = await weather.getCurrentWeather(location);
        if(currentData.cod == 404){
            return "City not Found"
        }
        return currentData

    },

    async getForecastWeather(location: string){
        let cityCoord = await weather.getCurrentWeather(location);
        if (cityCoord === "City not found"){
            return "City not found"
        }else if(cityCoord === "Too much request try later"){
            return cityCoord
        }
        else{
            return await weather.getForecastWeather(cityCoord.coord.lat, cityCoord.coord.lon)
        }
    },

    async getWeatherFromList(){
        let documents = await db.collection("Weather").get();
        let cities = [];
        documents.forEach(doc => {
            cities.push({data: doc.data(), id: doc.ref.id})
        });

        const weathersList = await Promise.all(cities.map(async item => {
            return {
                city: item.data.city,
                weather: await this.getForecastWeather(item.data.city),
                id: item.id
            }
        }));
        return weathersList

    },

    async addFavorite(city){
        await db.collection("Weather").doc().set({
            city: city
        }).then(() =>
            {console.log('DONE successfully')}
        )
        return await this.getWeatherFromList()
    },

    async removeFavorite(docId){
        await db.collection("Weather").doc(docId).delete().then(() => {console.log("success")}).catch(() => {console.log('error')})
        await this.getWeatherFromList()
    },

}