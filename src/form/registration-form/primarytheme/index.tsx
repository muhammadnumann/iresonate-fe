import React from 'react'
// component
import {MenuItem, WSCol, WSDropdown, WSMenu, WSRow, WSTitle} from 'src/component/common'
//constant
import {  stepFormDetails } from 'src/utils/enums';
// Style
import "./primaryTheme.less";

const options = [
    { label: "Art & Design", value: 'artanddesign' },
    { label: "Automotive", value: 'automotive' },
    { label: "Aviation", value: 'aviation' },
    { label: "Beauty", value: 'beauty' },
    { label: "Boating", value: 'boating' },
    { label: "Book & Writing", value: 'book&writing' },
    { label: "Business", value: 'business' },
    { label: "Craft", value: 'craft' },
    { label: "DIY", value: 'diy' },
    { label: "Fashion", value: 'fashion' },
    { label: "Fitness", value: 'fitness' },
    { label: "Food", value: 'food' },
    { label: "Gardening", value: 'gardening' },
    { label: "Health", value: 'health' },
    { label: "Hobby", value: 'hobby' },
    { label: "Interior Design", value: 'interiordesign' },
    { label: "Internatonal Events", value: 'internatonalevents' },
    { label: "Lifestyle", value: 'lifestyle' },
    { label: "Movie", value: 'Movie' },
    { label: "Fitness", value: 'fitness' },
    { label: "Music", value: 'music' },
    { label: "News", value: 'news' },
    { label: "Parenting", value: 'parenting' },
    { label: "Personal", value: 'personal' },
    { label: "Personal Finance", value: 'personalfinance' },
    { label: "Photography", value: 'photography' },
    { label: "Political", value: 'political' },
    { label: "Religion", value: 'religion' },
    { label: "Sports", value: 'sports' },
    { label: "Travel", value: 'travel' },
];

import { MultiSelect } from "react-multi-select-component";
import {webHostingData} from "src/utils/staticData";

const PrimaryTheme= ({cpForm=false,setHosting, hosting, setPrimaryFocus, primaryFocus }) => {
    const signUpMenu = (
        <WSMenu>
            {webHostingData.map((item) => {
                    return (
                        <MenuItem key={item.key} className="dropdown-login-menu">
                            <a onClick={(c) => {

                                setHosting(c.target['innerHTML'])
                            }} rel="noreferrer">
                                {item.name}
                            </a>
                        </MenuItem>
                    )
                }
            )}
        </WSMenu>
    );

    return (
        <div className="primary-theme-main-details">
            <div className="primary-theme-main-details-form">
                <WSTitle level={2} className="details-title">{stepFormDetails.step3primarydetail}</WSTitle>
                <p className="content">{stepFormDetails.primaryThemeContent}</p>
                <div className="primary-theme-main-form">
                    <WSRow>
                        <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <label className="form-label">Primary Theme</label>
                            <MultiSelect
                                options={options}
                                value={primaryFocus}
                                onChange={(selected) => {
                                    setPrimaryFocus (selected)
                                }}
                                labelledBy="Select Primary Theme"
                                className="primary-theme"
                            // isLoading ={true}
                            />
                        </WSCol>
                        {!cpForm &&

                            <WSCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                <label className="form-label"> Website Hosting</label>
                                <WSDropdown overlay={signUpMenu} className="ant-input form-control mb-3 mt-0"
                                            overlayClassName="login-dropdown-overlay">
                                    <button className='me-4'>
                                        {hosting || "Choose Hosting"}
                                    </button>
                                </WSDropdown>
                            </WSCol>
                        }

                    </WSRow>

                </div>
            </div>
        </div>
    )
}

export default PrimaryTheme
