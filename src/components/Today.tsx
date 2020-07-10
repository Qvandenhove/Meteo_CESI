import React, {Fragment} from 'react';
import './ExploreContainer.css';
import {IonCardContent, IonButton} from "@ionic/react";

type TodayProps = {
    forecastWeather: any
    city: string
}

const Today: React.FC<TodayProps> = ({forecastWeather, city}) => {
    let testDate = new Date();
    let firstAvailableForecasts = 24 - testDate.getHours();
    let availableHours = [];
    for (let hour = testDate.getHours(); hour < 24; hour++){
        availableHours.push(hour)
    }
    return <Fragment>
        <IonCardContent>
            <table>
                <tbody>
                <tr>
                    <td>Heure</td>
                    {availableHours.map(hour => <td>{hour}</td>)}
                </tr>
                <tr>
                    <td>Temperature</td>
                    {forecastWeather.hourly.slice(0, firstAvailableForecasts).map(i => <td>{i.temp}</td>)}
                </tr>
                <tr>
                    <td>Prévision</td>
                    {forecastWeather.hourly.slice(0, firstAvailableForecasts).map(i => <td><img src={"https://openweathermap.org/img/wn/" + i.weather[0].icon + ".png"}/></td>)}
                </tr>
                </tbody>
            </table>
        </IonCardContent>
    </Fragment>;
};

export default Today