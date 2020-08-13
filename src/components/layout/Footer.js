import React from 'react';

import {useTranslation} from 'react-i18next';
export default function Footer(props) {
    const [t] = useTranslation();
    return (
        <React.Fragment>

            <footer  className="page-footer font-small unique-color-dark">
                <div className="footer-legal text-center py-3">

                    <p>
                        {t('app_name')} 2020
                    </p>
                </div>
            </footer>
        </React.Fragment>
    );
}


