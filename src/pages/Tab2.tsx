import React, {useEffect, useState} from 'react';
import geoloc from '../repository/geoloc'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import '../components/WeatherDetails'
import './Tab2.css';
import Error from '../components/Error'
import WeatherDetail from "../components/WeatherDetails";
import helpers from "../helpers/helpers";

const Tab2: React.FC = () => {
    const [forecastWeather, setForecastWeather] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [geolocDone, setGeolocDone] = useState(false);
    useEffect(() => {
        if("geolocation" in navigator && !geolocDone){
            navigator.geolocation.getCurrentPosition(async function(position){
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const city = await geoloc.getCity(latitude, longitude);
                const forecastData = await helpers.getForecastWeather(city.features[0].properties.city);
                if (typeof (forecastData) === 'string'){
                    console.log('error')
                }
                setForecastWeather(forecastData);
                const currentData = await helpers.getCurrentWeather(city.features[0].properties.city);
                setCurrentWeather(currentData);
                setGeolocDone(true);
            })
        }else{
            return
        }
    });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>La météo près de chez moi</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
          {typeof forecastWeather !== "string" && typeof currentWeather !== "string" &&
          <WeatherDetail forecastWeather={forecastWeather} currentWeather={currentWeather}/>
          }
          {(typeof forecastWeather === "string" || typeof currentWeather === "string") &&
          <Error/>
          }
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
