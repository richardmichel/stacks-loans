import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {useHistory} from "react-router-dom";


function  RedirectBack( ) {
    const [t] = useTranslation();
    let history = useHistory();

    const redirect = (e) =>{
        history.push("/");
    };
    return(
        <button onClick={(e)=>redirect(e)}>
            {t('redirect_back')}
        </button>

    )
}

export default RedirectBack;