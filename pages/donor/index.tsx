import React from 'react'
import DonorLogin from 'pages/donor/login'
import { HeadElement } from 'src/component/core'
import metaTitle from 'src/utils/metaTitle'

export default function index() {
  return (
    <div>
      <HeadElement title={metaTitle.donorLogin} />
      <DonorLogin />
    </div>
  )
}
