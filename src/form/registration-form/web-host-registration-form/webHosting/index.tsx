import React from 'react'
// component
import { MenuItem, WSCol, WSDropdown, WSMenu, WSRow, WSTitle } from 'src/component/common'
//constant
import { webHostingData } from 'src/utils/staticData';
import { stepFormDetails } from 'src/utils/enums';
// Style 
import "./webHosting.less";


const WebHosting: React.FC = () => {
    const signUpMenu = (
        <WSMenu>
            {webHostingData.map((item) => {
                return (
                    <MenuItem key={item.key} className="dropdown-login-menu">
                        <a target="_blank" rel="noreferrer">
                            {item.name}
                        </a>
                    </MenuItem>
                )
            }
            )}
        </WSMenu>
    );

    return (
        <div className="web-hosting-main-details">
            <div className="web-hosting-main-details-form">
                <WSTitle level={2} className="details-title">{stepFormDetails.step4webHosting}</WSTitle>
                <p className="content">{stepFormDetails.webHostingContent}</p>
                <div className="web-hosting-main-form">
                    <WSRow>
                        <WSCol xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <WSDropdown overlay={signUpMenu} className="ant-input form-control mb-3 mt-0"  overlayClassName="login-dropdown-overlay">
                                <button className='me-4'>
                                    Website Hosting
                                </button>
                            </WSDropdown>
                        </WSCol>
                    </WSRow>
                </div>
            </div>
        </div>
    )
}

export default WebHosting