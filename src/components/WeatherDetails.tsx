import React, {Fragment} from 'react';
import './ExploreContainer.css';
import moment from 'moment'
import {IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle} from "@ionic/react";
interface ContainerProps {
    name: string;
}

type WeatherDetailsProps = {
    currentWeather: any
    forecastWeather: any
}

const WeatherDetail: React.FC<WeatherDetailsProps> = ({currentWeather, forecastWeather}) => {
    let forecastCards = [];
    let lastEuroDate;
    let testDate = new Date();
    let dayWeather = [];
    let firstAvailableForecasts = 24 - testDate.getHours();
    let availableHours = [];
    for (let hour = testDate.getHours(); hour < 24; hour++){
        availableHours.push(hour)
    }
    if (forecastWeather){

        for (let i = 2; i < forecastWeather.daily.length; i++){
            forecastCards.push(
            <IonCard color="light" key={i}>
                <IonCardHeader>
                    <IonCardTitle>
                        Météo à {currentWeather.name} {(testDate.getDate() + 1 + i).toString() + '/' + (testDate.getMonth() + 1).toString()}<br />
                        {currentWeather.weather[0].main}
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    Temperature {Math.round(forecastWeather.daily[i].temp.day)}<br />
                </IonCardContent>
            </IonCard>)
        }
    }
    return <Fragment>
        {currentWeather && forecastWeather &&
        <IonCard color="light" key={0}>
            <IonCardHeader>
                <IonCardTitle>
                    Météo à {currentWeather.name} aujourd'hui<br />
                    {currentWeather.weather[0].main}
                </IonCardTitle>
            </IonCardHeader>
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
                        {forecastWeather.hourly.slice(0, firstAvailableForecasts).map(i => <td><img src={"http://openweathermap.org/img/wn/" + i.weather[0].icon + ".png"}/></td>)}
                    </tr>
                </tbody>
                </table>
                <br />
                Temps: {currentWeather.weather[0].description}
            </IonCardContent>
        </IonCard>
        }
        {currentWeather && forecastWeather &&
        <IonCard color="light" key={1}>
            <IonCardHeader>
                <IonCardTitle>
                    Météo à {currentWeather.name} Demain<br />
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <table>
                    <tbody>
                    <tr>
                        <td>Temperature</td>
                        {forecastWeather.hourly.slice(24 - testDate.getHours(), testDate.getHours() + 24).map(i => <td>{i.temp}</td>)}
                    </tr>
                    <tr>
                        <td>Prévision</td>
                        {forecastWeather.hourly.slice(24 - testDate.getHours(), testDate.getHours() + 24).map(i => <td><img src={"http://openweathermap.org/img/wn/" + i.weather[0].icon + ".png"}/></td>)}
                    </tr>
                    </tbody>
                </table>
                <br />
            </IonCardContent>
        </IonCard>
        }
        {forecastCards.map(i => i)}

    </Fragment>;
};

export default WeatherDetail;
