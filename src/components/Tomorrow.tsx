import React, {Fragment} from 'react';
import './ExploreContainer.css';
import {IonCard, IonCardHeader, IonCardContent, IonCardTitle} from "@ionic/react";

type tommorowProps = {
    forecastWeather: any
    city: string
}


const Tommorow: React.FC<tommorowProps> = ({forecastWeather, city}) => {
    let testDate = new Date();
    let firstAvailableForecasts = 24 - testDate.getHours();
    let tomorrowHours = [];
    for (let j= 0;j<=23;j++){
        tomorrowHours.push(j)
    }
    return <Fragment>
    <IonCard color="light" key={forecastWeather.current.dt}>
        <IonCardHeader>
            <IonCardTitle>
                Météo à {city} Demain<br />
            </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
            <table>
                <tbody>
                <tr>
                    <td>Heure</td>
                    {tomorrowHours.map(hour => <td>{hour}</td>)}
                </tr>
                <tr>
                    <td>Temperature</td>
                    {forecastWeather.hourly.slice(firstAvailableForecasts, firstAvailableForecasts + 24).map(i => <td>{i.temp}</td>)}
                </tr>
                <tr>
                    <td>Prévision</td>
                    {forecastWeather.hourly.slice(firstAvailableForecasts, firstAvailableForecasts + 24).map(i => <td><img src={"https://openweathermap.org/img/wn/" + i.weather[0].icon + ".png"}/></td>)}
                </tr>
                </tbody>
            </table>
            <br />
        </IonCardContent>
    </IonCard>
    </Fragment>
};
export default Tommorow