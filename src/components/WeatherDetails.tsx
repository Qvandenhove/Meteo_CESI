import React, {Fragment, useState} from 'react';
import './ExploreContainer.css';
import {IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonToast} from "@ionic/react";
import Today from "./Today";
import NextDays from "./NextDays"
import helpers from "../helpers/helpers";
import Tommorow from "./Tomorrow";

type WeatherDetailsProps = {
    currentWeather: any
    forecastWeather: any
}

const WeatherDetail: React.FC<WeatherDetailsProps> = ({currentWeather, forecastWeather}) => {
    const [showToast2, setShowToast2] = useState(false)

    if (forecastWeather !== null && currentWeather !== null){
        return <Fragment>
            {
            <IonCard color="light" key={currentWeather.dt}>
                <IonCardHeader>
                    <IonCardTitle>
                        Météo à {currentWeather.name} aujourd'hui<br />
                        <IonCardSubtitle>{forecastWeather.current.weather[0].main}</IonCardSubtitle>
                    </IonCardTitle>
                </IonCardHeader>
                <Today key={currentWeather.dt} forecastWeather={forecastWeather} city={currentWeather.name}/>
            </IonCard>
            }
            {currentWeather && forecastWeather &&
            <Tommorow forecastWeather={forecastWeather} city={currentWeather.name}/>
            }
            <div>
                {

                    forecastWeather.daily.map(i => <NextDays key={i.dt} forecastWeather={i} city={currentWeather.name}/>)}
            </div>
            <IonButton onClick={async () => {await helpers.addFavorite(currentWeather.name); setShowToast2(true)}}>Ajouter au Favoris</IonButton>
            <IonToast
                isOpen={showToast2}
                message="Favoris ajouté"
                position="bottom"
                color={"success"}
                duration={3000}
            />
        </Fragment>;
    }else {
        return <Fragment>
            Loading
        </Fragment>;
    }

};

export default WeatherDetail;
