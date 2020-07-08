import React, {useState} from 'react';
import {Geolocation} from '@ionic-native/geolocation/ngx'
import {IonButton, IonContent, IonHeader, IonModal, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import SearchBar from '../components/SearchBar';
import WeatherDetail from '../components/WeatherDetails'
import './Tab1.css';
import weather from "../repository/meteo_data";


const Tab1: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [currentWeather, setCurrentWeather] = useState(null);

    const getCurrentWeather = async (location: string) => {
        const currentData = await weather.getCurrentWeather(location);
        if (currentData === "City not found"){
            setShowModal(true)
        }else{
            setCurrentWeather(currentData);
        }

    };

    const [forecastWeather, setForecastWeather] = useState(null);

    const getForecastWeather = async (location: string) => {
        let cityCoord = await weather.getCurrentWeather(location);
        if (cityCoord === "City not found"){
            setShowModal(true)
        }else{
            const forecastData = await weather.getForecastWeather(cityCoord.coord.lat, cityCoord.coord.lon);
            setForecastWeather(forecastData);
        }

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
            {forecastWeather && currentWeather && <WeatherDetail forecastWeather={forecastWeather} currentWeather={currentWeather}/>
            }
            <IonContent>
                <IonModal isOpen={showModal} cssClass='my-custom-class'>
                    <p>This city doesn't exists</p>
                    <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
                </IonModal>
            </IonContent>
            </IonContent>
    </IonPage>
  );
};

export default Tab1;
