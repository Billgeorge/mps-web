import Axios from "axios";
import { useHistory } from "react-router-dom";
import {isAuthenticated,getCurrentAppToken} from 'service/AuthenticationService'


const consumeServicePost = async (payload,callBack,callBackSuccess,url) => {

    //React.setActionState({ sending: true, error: null, });

    try {
        console.log('Enviando ...')
        putTokenHeader()
        const responseU = await Axios.post(url, payload);
        

        console.log("Respuesta usuario" + responseU);
        

        if (responseU.status === 200) {
            callBackSuccess(responseU.data)
        } else {
            console.log(responseU.body)
            callBack(null)
        }

    } catch (error) {
        if(error.response){
            if(400 == error.response.status){
                callBack(error.response.data)
            } else if(403 == error.response.status){
                useHistory.push("/login")
            }else{
                callBack(null)
            }
        }else{
            callBack(null)
        }        
    }
}

export const consumeServiceGet = async (callBack,callBackSuccess,url) => {

    //React.setActionState({ sending: true, error: null, });

    try {
        console.log('Enviando ...')
        putTokenHeader()
        const responseU = await Axios.get(url);
        

        console.log("Respuesta usuario" + responseU);
        

        if (responseU.status === 200) {
            callBackSuccess(responseU.data)
        } else {
            console.log(responseU.body)
            callBack(null)
        }

    } catch (error) {
        if(error.response){
            if(400 == error.response.status){
                callBack(error.response.data)
            } if(403 == error.response.status){
                useHistory.push("/login")
            } if(404 == error.response.status){
                callBack(404)
            } else{
                callBack(null)
            }
        }else{
            callBack(null)
        }        
    }
}

export const consumeServicePatch = async (payload,callBack,callBackSuccess,url) => {

    //React.setActionState({ sending: true, error: null, });

    try {
        console.log('Enviando ...')
        putTokenHeader()
        const responseU = await Axios.patch(url,payload);
        

        console.log("Respuesta usuario" + responseU);
        

        if (responseU.status === 200) {
            callBackSuccess(responseU.data)
        } else {
            console.log(responseU.body)
            callBack(null)
        }

    } catch (error) {
        if(error.response){
            if(400 == error.response.status){
                callBack(error.response.data)
            } if(403 == error.response.status){
                useHistory.push("/login")
            }else{
                callBack(null)
            }
        }else{
            callBack(null)
        }        
    }
}

const putTokenHeader = () => {
    if(isAuthenticated()){
        Axios.defaults.headers.common['Authorization'] = `Bearer ${getCurrentAppToken()}`;
    }
}

export default consumeServicePost;