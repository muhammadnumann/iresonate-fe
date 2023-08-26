import React, { FC } from "react"
import  Spin , { SpinProps } from "antd/lib/spin";
import { LoadingOutlined } from "@ant-design/icons"

import './WSLoader.module.less';

const WSLoader:FC <SpinProps> =  ({children,...props}) => {
   const antIcon = <LoadingOutlined className="spin" spin />

   return <Spin indicator={antIcon} {...props}/>
}

export default WSLoader
