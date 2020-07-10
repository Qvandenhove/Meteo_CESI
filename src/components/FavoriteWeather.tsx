import React, {Fragment, useState} from 'react';
import './ExploreContainer.css';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonButton,
    IonModal,
    IonToast
} from "@ionic/react";
import Today from '../components/Today'
import Tommorow from "./Tomorrow";
import NextDays from "./NextDays";
import firebase from "firebase";
import helpers from "../helpers/helpers";

type WeatherDetailsProps = {
    forecastWeather: any
    city: string
    card: string
    docId: string
}

const FavoriteWeather: React.FC<WeatherDetailsProps> = ({forecastWeather, city, card, docId})=> {
    const [showToast2, setShowToast2] = useState(false)
    const [cityModal, setCityModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const handleClick = () => {
        setDeleteModal(true)
    };
    return <Fragment>
        <IonCard color="light" key={city}>
            <IonCardHeader key={city + "header"}>
                <IonCardTitle key={city+"title"}>
                    Météo à {city} aujourd'hui<br />
                    <IonButton onClick={() => {setCityModal(true)}} key={city + "button"}>Voir plus</IonButton>
                </IonCardTitle>
            </IonCardHeader>
            <Today forecastWeather={forecastWeather} city={city} key={city + "today's weather"}/>
            <IonButton onClick={handleClick} color={"danger"}>Supprimer</IonButton>
        </IonCard>
        <IonModal isOpen={cityModal}>
            <Tommorow forecastWeather={forecastWeather} city={city}/>
            <div className={"nextDaysContainer"}>
                {forecastWeather.daily.map(i => <NextDays key={i.dt} forecastWeather={i} city={city}/>)}
            </div>
            <IonButton color={"secondary"} onClick={() => setCityModal(false)}>Fermer</IonButton>
        </IonModal>
        <div className="delete">
            <IonModal isOpen={deleteModal} cssClass={"deleteFavorite"}>
                <p>Voulez-vous vraiment supprimer {city} de vos favoris?</p>
                <div className={"confirm"}>
                    <IonButton onClick={() => {helpers.removeFavorite(docId); setDeleteModal(false); setShowToast2(true)}} color={"danger"}>Supprimer</IonButton>
                    <IonButton onClick={() => setDeleteModal(false)} color={"success"}> Annuler</IonButton>
                </div>

            </IonModal>
        </div>
        <IonToast
            isOpen={showToast2}
            message="Favoris supprimé"
            position="bottom"
            color={"success"}
            duration={3000}
        />
    </Fragment>
};

export default FavoriteWeather