import React, {useState} from 'react';
import {Geolocation} from '@ionic-native/geolocation/ngx'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import SearchBar from '../components/SearchBar';
import WeatherDetail from '../components/WeatherDetails'
import './Tab1.css';
import weather from "../repository/meteo_data";


const Tab1: React.FC = () => {
    const [currentWeather, setCurrentWeather] = useState(null);

    const getCurrentWeather = async (location: string) => {
        const currentData = await weather.getCurrentWeather(location);
        setCurrentWeather(currentData);
    };

    const [forecastWeather, setForecastWeather] = useState(null);

    const getForecastWeather = async (location: string) => {
        const forecastData = await weather.getForecastWeather(location);
        setForecastWeather(forecastData);
    };
    console.log(forecastWeather);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lieu actuel</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonContent >
        <IonHeader collapse="condense">
            <IonToolbar>
            <IonTitle size="large">Lieu actuel</IonTitle>
            </IonToolbar>
            </IonHeader>
            <SearchBar getForecastWeather={(location:string) => getForecastWeather(location)} getCurrentWeather={(location: string) => getCurrentWeather(location)} defaultName={"Arras"}/>
            <WeatherDetail forecastWeather={forecastWeather} currentWeather={currentWeather}/>
            </IonContent>
    </IonPage>
  );
};

export default Tab1;
