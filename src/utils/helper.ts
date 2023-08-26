import { useState } from 'react'
import moment from 'moment'
import { WSMessage } from '../component/common/message/WSMessage'

export const getLocalStorageItem = (key = '') => {
  if (process.browser) {
    return localStorage.getItem(key) || null
  }
}
export const setLocalStorageItem = (key = '', string = '') => {
  if (process.browser) {
    return localStorage.setItem(key, string)
  }
}
export const setSessionStorageItem = (key = '', string = '') => {
  if (process.browser) {
    return sessionStorage.setItem(key, string)
  }
}

export const getSessionStorageItem = (key = '') => {
  if (process.browser) {
    return sessionStorage.getItem(key) || null
  }
}
export const localStorageRemoveItem = (key = '') => {
  if (process.browser) {
    return localStorage.removeItem(key)
  }
}

export const localStorageClear = () => {
  if (process.browser) {
    return localStorage.clear()
  }
}

//For Member

export const getCurrentUser = () => {
  if (process.browser) {
    return localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser') || '')
      : false
  }
}

export const getBankProfileCompletedStatus = () => {
  if (process.browser) {
    return JSON.parse(localStorage.getItem('stripeAccountStatus'))
  }
}

export function getFirstName() {
  let data
  if (process.browser) {
    data = JSON.parse(localStorage.getItem('Name'))
  }
  const converted = {
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
  }
  return converted
}

//For Admin
export const getAdmin = () => {
  if (process.browser) {
    return localStorage.getItem('adminData')
      ? JSON.parse(localStorage.getItem('adminData') || '')
      : false
  }
}

export const isLoggedIn = (AuthData: { [x: string]: any }) => {
  if (process.browser) {
    return Object.keys(AuthData).length > 0
  }
}

export const usePageLimit = () => {
  const [pagination, setPagination] = useState({
    offset: '',
    limit: '',
    userType: '',
  })

  return { pagination, setPagination }
}

export const removeDataInCache = (
  alreadyAddedArr: any = [],
  compareData: string
) => {
  return alreadyAddedArr.filter(
    (item: { _id: string }) => item._id !== compareData
  )
}

export const DateTimeFormat = (date: string,returnFormat: string) => {
  return date ? moment(date).format(returnFormat) : moment().format(returnFormat)
}

export const simplifyArray = (arr: [], selected: string, week?: string) => {
  var singleArray = []
  {
    arr &&
      arr.forEach(function (item) {
        singleArray.push(week ? item[selected] + week : item[selected])
      })
  }
  return singleArray
}

export const copyCodeToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
  WSMessage({ type: 'success', messageValue: 'Copied to Clipboard!' })
}

export const camelCaseToNormalCase = (word: string) => {
  const result = word && word.replace(/([A-Z])/g, ' $1')
  const finalResult = result && result.charAt(0).toUpperCase() + result.slice(1)
  return finalResult
}

interface groupByName {
  group: string;
  vendorName: string;
  vendorRevenue: number;
  website: string;
}

export const groupByGroup = (data: groupByName[]) => {
  if (!data?.length) return {}
  return data.reduce(function (results: any, org: groupByName) {
    results[org.group] = [...(results[org.group] || []), org];
    return results;
  }, {});
};
