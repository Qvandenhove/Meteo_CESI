import React, {Fragment, useState} from 'react';
import {IonCard} from "@ionic/react";

const Error: React.FC = () => {
    return <Fragment>
        <IonCard color={'danger'}>
            L'application à rencotré un problème.
        </IonCard>
    </Fragment>
}

export default Error