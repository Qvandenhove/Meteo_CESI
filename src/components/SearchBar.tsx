import React, {Fragment, useState} from 'react';
import './ExploreContainer.css';
import {IonSearchbar, IonButton} from "@ionic/react";

interface ContainerProps {
    name: string;
}
type SearchBarProps = {
    getCurrentWeather: (location) => void
    getForecastWeather : (location) => void
}
const SearchBar: React.FC<SearchBarProps> = ({getCurrentWeather, getForecastWeather}: SearchBarProps) => {
    const [city, setCity] = useState({});
    const updateCity = (e: {detail : {value: string}}) => {
        setCity(e.detail.value)
    };
    return <Fragment>
        <IonSearchbar onIonChange={(e) => updateCity(e)} placeholder="Rechercher"/>
        <IonButton onClick={() => {getCurrentWeather(city); getForecastWeather(city)}} expand="block">Rechercher</IonButton>
    </Fragment>;
};

export default SearchBar;
