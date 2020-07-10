import React, {useEffect, useState} from 'react';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import weather from '../repository/meteo_data'
import './Tab3.css';
import firebase from "firebase";
import FavoriteWeather from "../components/FavoriteWeather";
import helpers from "../helpers/helpers";

const firebaseConfig = {
    apiKey: "AIzaSyCwl3rvc_1ysFGhWSVN-kz991m_8eC6J-s",
    authDomain: "cesi-meteo-4feea.firebaseapp.com",
    databaseURL: "https://cesi-meteo-4feea.firebaseio.com",
    projectId: "cesi-meteo-4feea",
    storageBucket: "cesi-meteo-4feea.appspot.com",
    messagingSenderId: "919394823834",
    appId: "1:919394823834:web:f265bb3ab7a2c754553923"
};


let data_found = false;

const Tab3:React.FC= () => {
    const [forecasts, setForecasts] = useState(null);
    useEffect(() => {
        helpers.getWeatherFromList().then(value => {
            if (!data_found){
                data_found = true;
                setForecasts(value)
            }
        });
        return
    });
    if (forecasts){
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Mes Favoris</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Tab 3</IonTitle>

                        </IonToolbar>
                    </IonHeader>
                    {forecasts.map(city => <FavoriteWeather key={city + "favorite"} forecastWeather={city.weather} city={city.city} card={city.city} docId={city.id}/>)}
                </IonContent>
            </IonPage>
        );
    }else{
        return(
            <IonPage>
                <IonContent>Loading</IonContent>
            </IonPage>
        )
    }

};

export default Tab3;
