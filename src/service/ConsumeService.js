import Axios from "axios";
import { isAuthenticated, getCurrentAppToken } from 'service/AuthenticationService'

const consumeServicePost = async (payload, callBack, callBackSuccess, url) => {

    console.log('Enviando ...')
    putTokenHeader()
    await Axios.post(url, payload)
    .then((response)=>{
        console.log("Respuesta usuario", response);
        callBackSuccess(response.data)
    })
    .catch(
        function (error) {
            console.log("error", error.response)
            if (error.response) {
                if (400 === error.response.status) {
                    callBack(error.response.data)
                } else if (403 === error.response.status) {
                    window.location.href = '/login';
                } else if (404 === error.response.status) {
                    callBack(404)
                } else {
                    callBack(error.response.data)
                }
            } else {
                console.log("error", error)
                callBack("Error inesperado")
            }
        }
    )
}

export const consumeServicePut = async (payload, callBack, callBackSuccess, url) => {
    try {
        console.log('Enviando ...')
        putTokenHeader()
        const responseU = await Axios.put(url, payload);

        console.log("Respuesta usuario", responseU);

        if (responseU.status === 200) {
            callBackSuccess(responseU.data)
        } else {
            callBack(null)
        }

    } catch (error) {
        if (error.response) {
            if (400 === error.response.status) {
                callBack(error.response.data)
            } else if (403 === error.response.status) {
                window.location.href = '/login';
            } else {
                callBack(null)
            }
        } else {
            callBack(null)
        }
    }
}

export const consumeServiceGetFile = async (callBack, url) => {

    try {
        console.log('Enviando ...')
        putTokenHeader()
        const responseU = await Axios({
            url: url,
            method: 'GET',
            responseType: 'blob'
          }).then((response) => {
            FileDownload(response.data, 'products.xlsx');
        })

    } catch (error) {
        if (error.response) {
            if (400 === error.response.status) {
                callBack(error.response.data)
            } if (403 === error.response.status) {
                window.location.href = '/login';
            } if (404 === error.response.status) {
                callBack(404)
            } else {
                callBack(null)
            }
        } else {
            callBack(null)
        }
    }
}
const FileDownload = require('js-file-download');
export const consumeServiceGet = async (callBack, callBackSuccess, url) => {

    try {
        console.log('Enviando ...')
        putTokenHeader()
        const responseU = await Axios.get(url);


        console.log("Respuesta usuario", responseU);


        if (responseU.status === 200) {
            callBackSuccess(responseU.data)
        } else {
            console.log("error", responseU.body)
            callBack(null)
        }

    } catch (error) {
        if (error.response) {
            if (400 === error.response.status) {
                callBack(error.response.data)
            } if (403 === error.response.status) {
                window.location.href = '/login';
            } if (404 === error.response.status) {
                callBack(404)
            } else {
                callBack(null)
            }
        } else {
            callBack(null)
        }
    }
}

export const consumeServicePatch = async (payload, callBack, callBackSuccess, url) => {

    try {
        console.log('Enviando ...')
        putTokenHeader()
        const responseU = await Axios.patch(url, payload);


        console.log("Respuesta usuario", responseU);


        if (responseU.status === 200) {
            callBackSuccess(responseU.data)
        } else {
            console.log(responseU.body)
            callBack(null)
        }

    } catch (error) {
        if (error.response) {
            if (400 === error.response.status) {
                callBack(error.response.data)
            } if (403 === error.response.status) {
                window.location.href = '/login';
            } else {
                callBack(error.response.data)
            }
        } else {
            callBack(null)
        }
    }
}

const putTokenHeader = () => {
    if (isAuthenticated()) {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${getCurrentAppToken()}`;
    }
}

export default consumeServicePost;