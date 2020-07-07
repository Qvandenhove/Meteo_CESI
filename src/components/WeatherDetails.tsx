import React, {Fragment} from 'react';
import './ExploreContainer.css';
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
    let dayWeather = [];
    if (forecastWeather){
        // console.log(forecastWeather.list[0].dt_txt);
        for (let i = 0; i < forecastWeather.list.length; i++){
            let weatherDate = forecastWeather.list[i].dt_txt;
            const european_date = (parseInt(weatherDate.slice(8,10)) - 1).toString() + '/' +   weatherDate.slice(5,7);
            console.log(european_date)
            if (european_date === lastEuroDate){
                dayWeather.push(forecastWeather.list[i])
            }else{
                console.log(dayWeather);
                if (dayWeather.length != 0){
                    forecastCards.push(
                        <IonCard color="light" key={european_date}>
                            <IonCardHeader>
                                <IonCardTitle>
                                    Météo à {currentWeather.name} {european_date}<br />
                                    {forecastWeather.list[i].weather[0].description}
                                </IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <table>
                                    <tbody>
                                    <tr>
                                        {dayWeather.map(j => <td>{j.dt_txt.slice(10,13)}H</td>)}
                                    </tr>
                                    <tr>
                                        {dayWeather.map(j => <td>{Math.round(j.main.temp - 273.15)}°C</td>)}
                                    </tr>
                                    <tr>
                                        {dayWeather.map(j => <td>{j.weather[0].main}</td>)}
                                    </tr>
                                    </tbody>
                                </table>
                            </IonCardContent>
                        </IonCard>
                    )
                }

                lastEuroDate = european_date;
                dayWeather = []
            }
        }
    }
    return <Fragment>
        {currentWeather && forecastWeather &&
        <IonCard color="light" key={0}>
            <IonCardHeader>
                <IonCardTitle>
                    Météo à {currentWeather.name} en ce moment<br />
                    {currentWeather.weather[0].main}
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                Temperature {Math.round((currentWeather.main.temp - 273.15) * 100) / 100}<br />
                Temps: {currentWeather.weather[0].description}
            </IonCardContent>
        </IonCard>
        }
        {forecastCards.map(i => i)}

    </Fragment>;
};

export default WeatherDetail;
