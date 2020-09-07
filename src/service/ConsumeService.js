import Axios from "axios";


const consumeService = async (payload,callBack,callBackSuccess) => {

    //React.setActionState({ sending: true, error: null, });

    try {
        console.log('Enviando ...')
        const responseU = await Axios.post("https://mpscore-prod.herokuapp.com/mps/merchant", payload);
        

        console.log("Respuesta usuario" + responseU);
        

        if (responseU.status === 200) {
            callBackSuccess()
        } else {
            console.log(responseU.body)
            callBack({"Error":"Error creando Merchant por favor contactar el administrador"})
        }

    } catch (error) {
        if(error.response){
            if(400 == error.response.status){
                callBack(error.response.data)
            }else{
                callBack({"Error":"Error creando Merchant por favor contactar el administrador"})
            }
        }else{
            callBack({"Error":"Error creando Merchant por favor contactar el administrador"})
        }        
    }
}

export default consumeService;