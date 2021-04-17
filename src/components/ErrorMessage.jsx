import React from 'react';
import {withTranslation} from "react-i18next";

const ErrorMessage = ({t, name, value}) => {
    return (
        <span className="text-danger">{t(`${name + "." + value}`)}</span>
    )
}

export default withTranslation("common")(ErrorMessage);