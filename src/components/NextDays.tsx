import React, {Fragment} from 'react';
import './ExploreContainer.css';
import {IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle} from "@ionic/react";

type nextDaysProps = {
    forecastWeather: any
    city: string
}

const NextDays: React.FC<nextDaysProps> = ({forecastWeather, city}) =>{
    let testDate = new Date();
    return <Fragment>
        <IonCard color="light" key={forecastWeather.dt}>
            <IonCardHeader>
                <IonCardTitle>
                    Météo à {city} {(new Date(forecastWeather.dt * 1000).getDate()).toString() + "/" + (new Date(forecastWeather.dt * 1000).getMonth()).toString()}
                    <IonCardSubtitle>{forecastWeather.weather[0].main}</IonCardSubtitle>
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                Temperature {Math.round(forecastWeather.temp.day)}<br />
            </IonCardContent>
        </IonCard>
    </Fragment>
}

export default NextDays