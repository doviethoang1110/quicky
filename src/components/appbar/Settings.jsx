import React, {useEffect, useState} from 'react';
import CookieService from "../../utils/cookieService";
import {withTranslation} from "react-i18next";
import {closeAppBar} from "../../utils/closeAppBar";
import AppBarHeader from "./AppBarHeader";

const languages = [
    {
        name: "English",
        code: "en"
    },
    {
        name: "Vietnamese",
        code: "vi"
    }
]

const Settings = ({t, i18n, title}) => {

    const [selected, setSelected] = useState("");

    useEffect(() => {
        const lang = CookieService.get("i18next") || 'en';
        setSelected(languages.find(l => l.code === lang).name)
    }, []);

    const changeLanguage = async (e, lang) => {
        e.preventDefault();
        await i18n.changeLanguage(lang);
        setSelected(languages.find(l => l.code === lang).name);
    }

    return (
        <div className="tab-pane h-100 active" id="quick-settings" role="tabpanel" aria-labelledby="quick-settings-tab">
            <div className="appnavbar-content-wrapper">
                <div className="appnavbar-scrollable-wrapper">
                    <AppBarHeader title={title}/>
                    <div className="appnavbar-body">
                        <div className="settings-container">
                            <ul className="list-group border list-group-flush">
                                <li className="list-group-item py-2">
                                    <div className="dropdown w-100">
                                        <button className="btn btn-outline-default btn-block dropdown-toggle"
                                                type="button"
                                                data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">{selected}
                                        </button>
                                        <div className="dropdown-menu">
                                            {languages.length > 0 && languages.map((l, index) => (
                                                <button key={index} className="dropdown-item"
                                                        onClick={(e) => changeLanguage(e, l.code)}>
                                                    {l.name}</button>
                                            ))}
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item py-2">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="mb-0">Last seen</p>
                                        </div>
                                        <div className="custom-control custom-switch ml-2">
                                            <input type="checkbox" className="custom-control-input"
                                                   id="quickSettingSwitch1"
                                                   checked=""/>
                                            <label className="custom-control-label"
                                                   htmlFor="quickSettingSwitch1">&nbsp;</label>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item py-2">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="mb-0">Read receipts</p>
                                        </div>
                                        <div className="custom-control custom-switch ml-2">
                                            <input type="checkbox" className="custom-control-input"
                                                   id="quickSettingSwitch2"
                                                   checked=""/>
                                            <label className="custom-control-label"
                                                   htmlFor="quickSettingSwitch2">&nbsp;</label>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item py-2">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="mb-0">Media auto download</p>
                                        </div>
                                        <div className="custom-control custom-switch ml-2">
                                            <input type="checkbox" className="custom-control-input"
                                                   id="quickSettingSwitch3"
                                                   checked=""/>
                                            <label className="custom-control-label"
                                                   htmlFor="quickSettingSwitch3">&nbsp;</label>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item py-2">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="mb-0">Notifications</p>
                                        </div>
                                        <div className="custom-control custom-switch ml-2">
                                            <input type="checkbox" className="custom-control-input"
                                                   id="quickSettingSwitch4"
                                                   checked=""/>
                                            <label className="custom-control-label"
                                                   htmlFor="quickSettingSwitch4">&nbsp;</label>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item py-2">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="mb-0">Auto backup</p>
                                        </div>
                                        <div className="custom-control custom-switch ml-2">
                                            <input type="checkbox" className="custom-control-input"
                                                   id="quickSettingSwitch5"
                                                   checked=""/>
                                            <label className="custom-control-label"
                                                   htmlFor="quickSettingSwitch5">&nbsp;</label>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item py-2">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <p className="mb-0">Screen Lock</p>
                                        </div>
                                        <div className="custom-control custom-switch ml-2">
                                            <input type="checkbox" className="custom-control-input"
                                                   id="quickSettingSwitch6"/>
                                            <label className="custom-control-label"
                                                   htmlFor="quickSettingSwitch6">&nbsp;</label>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="appnavbar-footer">
                        <div className="btn btn-primary btn-block">Save settings</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withTranslation('common')(Settings);