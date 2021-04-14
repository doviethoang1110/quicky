import React from 'react';
import {closeAppBar} from "../../utils/closeAppBar";
import {withTranslation} from "react-i18next";

const AppBarHeader = ({t, title}) => {
    return (
        <div className="appnavbar-heading sticky-top">
            <ul className="nav justify-content-between align-items-center">
                <li className="text-center">
                    <h5 className="text-truncate mb-0">{t(`appBar.${title}`)}</h5>
                </li>
                <li className="nav-item list-inline-item">
                    <div onClick={closeAppBar} data-appcontent-close="">
                        <svg className="hw-22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default withTranslation("common")(AppBarHeader);