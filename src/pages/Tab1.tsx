import React, {useState} from 'react';
import {IonButton, IonContent, IonHeader, IonModal, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import SearchBar from '../components/SearchBar';
import WeatherDetail from '../components/WeatherDetails'
import './Tab1.css';
import helpers from "../helpers/helpers";

const Tab1: React.FC = ({}) => {

    const [showModal, setShowModal] = useState(false);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecastWeather, setForecastWeather] = useState(null);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Rechercher une ville</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonContent>
        <IonHeader collapse="condense">
            <IonToolbar>
            <IonTitle size="large">Lieu actuel</IonTitle>
            </IonToolbar>
            </IonHeader>
            <SearchBar getForecastWeather={async (location:string) => setForecastWeather(await helpers.getForecastWeather(location))} getCurrentWeather={async (location: string) => setCurrentWeather(await helpers.getCurrentWeather(location))}/>
            {forecastWeather && currentWeather &&
            <WeatherDetail forecastWeather={forecastWeather} currentWeather={currentWeather}/>
            }
                <IonModal isOpen={showModal} cssClass='my-custom-class'>
                    <p>This city doesn't exists</p>
                    <IonButton onClick={() => setShowModal(false) }>Close</IonButton>
                </IonModal>
            </IonContent>
    </IonPage>
  );

};

export default Tab1;
