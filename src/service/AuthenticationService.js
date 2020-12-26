import Axios from 'axios';
import {CORE_BASEURL} from '../constant/index'


export const isAuthenticated = () => {
    const itemStr = localStorage.getItem("currentUser")
    // if the item doesn't exist, return null
    if (!itemStr) {
          return false
    }
      const item = JSON.parse(itemStr)
      const now = new Date()
      // compare the expiry time of the item with the current time
      if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem("currentUser")
        return false
      }
      return true
}

export const getCurrentAppToken = () => {
    return JSON.parse(JSON.parse(localStorage.getItem('currentUser')).value).token
}

export const getEmail = () => {
    return JSON.parse(JSON.parse(localStorage.getItem('currentUser')).value).username
 }

 export const getMerchantName = () => {
    return JSON.parse(JSON.parse(localStorage.getItem('currentUser')).value).merchantName
 }

 export const getMerchantId = () => {
    return JSON.parse(JSON.parse(localStorage.getItem('currentUser')).value).merchantId
 }

export const  login = async (payload,callback, callBackError) =>{
    console.log("autenticando")
    const response = await Axios.post(`${CORE_BASEURL}/auth/signin`, payload)
    .then(response =>{
        const signInRespose = response.data    
        if (response.status === 200) {
            setWithExpiry('currentUser',JSON.stringify(signInRespose),3600000)           
            callback()
                
        } else {
            console.log("error")
            callBackError("Error realizando login")
        }
    })
    .catch(error => {
        console.log(error.response)
        callBackError(typeof error.response!='undefined'?error.response.data.errorMessage:"Error realizando login")
    })    
};

function setWithExpiry(key, value, ttl) {
	const now = new Date()

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}

export const logout = (callBack) => {
    localStorage.removeItem('currentUser');
    callBack()
}