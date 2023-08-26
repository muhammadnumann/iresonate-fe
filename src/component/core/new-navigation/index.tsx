
import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { MenuOutlined } from '@ant-design/icons';
import routPath from 'src/routes/routes';
// component
import { WSButton, WSDropdown, WSMenu, MenuItem, WSImage } from 'src/component/common';
// constant
import { formLabelName } from 'src/utils/enums';
import { loginMenuData, signUpMenuData } from 'src/utils/staticData';
import { images } from 'src/utils/image';
// Style
import "./navigation.less"
import FancyButton from './button';

export const NewNavigation: React.FC = () => {
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
        )
      }
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
        )
      }
      )}
    </WSMenu>
  );
  return (
    <div className="main-navigation">
      <section className="main-nav">
        <div className="container container-div py-sm-4">
          <WSImage src={images.iResonate} className="img-fluid iresonate-logo" onClick={() => router.push(routPath.rootRoute)} />
          <nav className="navbar navbar-expand navbar-light py-0">
            <WSButton type="default" className="navbar-toggler" icon={<MenuOutlined />} onClick={() => setCollapsed(!collapsed)} />
            <section className="top-nav text-right">
              <div className="container d-flex align-items-center justify-content-end gap-3 ">
                <WSDropdown overlay={signUpMenu} className="mt-0" placement="bottomRight" overlayClassName="login-dropdown-overlay">
                  <button className='border-0 p-0 bg-transparent m-0'>
                    <FancyButton >
                      {formLabelName.SignUpToday}
                    </FancyButton>
                  </button>
                </WSDropdown>
                <WSDropdown overlay={loginMenu} className="login-dropdown" placement="bottomRight" overlayClassName="login-dropdown-overlay">
                  <a onClick={e => e.preventDefault()} >
                    {formLabelName.loginBtn}
                    <svg xmlns="http://www.w3.org/2000/svg" className='ms-2' width={16} height={9} viewBox="0 0 16 9" fill="none">
                      <path d="M1 1L8 8L15 1" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </WSDropdown>
              </div>
            </section>
          </nav>
        </div>
      </section>
    </div>
  )
}

NewNavigation.defaultProps = {
  loginLink: routPath?.rootRoute
}