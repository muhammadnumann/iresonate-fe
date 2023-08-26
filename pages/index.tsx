import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import routPath from 'src/routes/routes';
// constant
import metaTitle from 'src/utils/metaTitle'
import { getLocalStorageItem, setSessionStorageItem } from 'src/utils/helper';
import Router  from 'next/router';

// component
import { HeadElement } from 'src/component/core/headElement'
import { WSLoader } from 'src/component/common';
import NewMainPage from 'src/component/NewMainPage';

export default function Home({ contentWriterId, webHostId, webHostUrl }) {
  // const router = useRouter()
  const [loading, setLoading] = useState((contentWriterId || webHostId) ? true : false);

  useEffect(() => {
    if (webHostId) {
      setSessionStorageItem("webHostId", webHostId);
      setSessionStorageItem("webHostUrl", webHostUrl)
    }
    if (contentWriterId) {
      setSessionStorageItem("contentWriterId", contentWriterId);
    }
  }, []);

  useEffect(() => {
    if (((contentWriterId || webHostId) && (getLocalStorageItem("auth_token")))) {
      Router.push(routPath.Payment);
    }
    // if ((getLocalStorageItem("admin_token") || getLocalStorageItem("auth_token")) || !vendorId) {
    //   Router.push(routPath.DashboardScreen);
    // TODO this WIP}
    if (((contentWriterId || webHostId) && (!getLocalStorageItem("auth_token")))) {
      Router.push(routPath.userCheckout);
    }
  }, []);

  const timeId = setTimeout(() => setLoading(false),3000)
  useEffect(() => {
    if (contentWriterId || webHostId) {
      return () => {
        clearTimeout(timeId)
      }
    }
    else {
          setLoading(false)
        }
  }, [contentWriterId, webHostId])

  if(typeof document === "undefined" || typeof window === "undefined"){
    return null
  }

  return (
    <>
      {loading ? <WSLoader className="d-flex justify-content-center align-items-center h-100vh" /> :
        <>
          <HeadElement title={metaTitle.MainScreen} />
          <NewMainPage />
        </>
      }
    </>
  )
}

Home.getInitialProps = async ({ query }) => {
  const { contentWriterId, webHostId, webHostUrl } = query

  return { contentWriterId, webHostId, webHostUrl }
}
