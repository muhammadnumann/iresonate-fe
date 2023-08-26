
import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { DownOutlined, MenuOutlined } from '@ant-design/icons';
import routPath from 'src/routes/routes';
// component
import { WSButton, WSDivider, WSDropdown, WSMenu, MenuItem, WSImage } from 'src/component/common';
// constant
import { formLabelName } from 'src/utils/enums';
import { loginMenuData,signUpMenuData } from 'src/utils/staticData';
import { images } from 'src/utils/image';
// Style
import "./navigation.less"

export const Navigation: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const router = useRouter();
  const loginMenu = (
    <WSMenu>
      {loginMenuData.map((item) => {
        return (
          <MenuItem key={item.key} className="dropdown-login-menu">
            <a target="_blank" rel="noreferrer" href={item.href}>
              {item.name}
            </a>
          </MenuItem>
        )}
      )}
    </WSMenu>
  );
  const signUpMenu = (
    <WSMenu>
      {signUpMenuData.map((item) => {
        return (
          <MenuItem key={item.key} className="dropdown-login-menu">
            <a target="_blank" rel="noreferrer" href={item.href}>
              {item.name}
            </a>
          </MenuItem>
        )}
      )}
    </WSMenu>
  );
  return (
    <div className="main-navigation">
      <section className="top-nav text-right">
        <div className="container">
          <WSDropdown overlay={loginMenu} className="login-dropdown" placement="bottomRight" overlayClassName="login-dropdown-overlay">
            <a onClick={e => e.preventDefault()}>
              {formLabelName.loginBtn} <DownOutlined />
            </a>
          </WSDropdown>
          <WSDropdown overlay={signUpMenu} className="sign-up-dropdown" placement="bottomRight" overlayClassName="login-dropdown-overlay">
            <a onClick={e => e.preventDefault()}>
              {formLabelName.SignUp} <DownOutlined />
            </a>
          </WSDropdown>
        </div>
      </section>
      <WSDivider className="top-nav-divider" />
      <section className="main-nav">
        <div className="container container-div">
              <WSImage src= {images.iResonate} className="img-fluid iresonate-logo" onClick={()=> router.push(routPath.rootRoute)}/>
          <nav className="navbar navbar-expand navbar-light">
            <WSButton type="default" className="navbar-toggler" icon={<MenuOutlined />} onClick={() => setCollapsed(!collapsed)} />
            <div className={`${collapsed ? "navbar-collapse" : "navbar-collapse-close"} `}>
              <div className="navbar-nav ml-auto">
                <a href={routPath.rootRoute} className="nav-item nav-link active">{formLabelName.home}</a>
                <a href="#bio_section" className="nav-item nav-link">{formLabelName.aboutUs}</a>
                <a href="#contact_section" className="nav-item nav-link disabled" >{formLabelName.contactUs}</a>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </div>
  )
}

Navigation.defaultProps = {
  loginLink: routPath?.rootRoute
}
