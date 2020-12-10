// 'http://localhost:8083/mps'

export const CORE_BASEURL = 'https://mpscore-prod.herokuapp.com/mps';


export const getPaymentState = (idState) => {
    switch(idState){
        case 1:
            return "Creado"        
        case 2:
            return "Acordado"
        case 3:
            return "Pagado"
        case 4:
            return "Despachado"
        case 5:
            return "En Disputa"
        case 6:
            return "Cerrado"
        case 7:
            return "Recibido"
        case 8:
            return "Transferido"
    }
}

export const getBankNumber = (bank) => {
    switch(bank){
        case "BANCO_AV_VILLAS":
            return 1        
        case "BANCO_BBVA_COLOMBIA":
            return 2
        case "BANCO_CAJA_SOCIAL":
            return 3
        case "BANCO_DAVIVIENDA":
            return 4
        case "BANCO_DE_BOGOTA":
            return 5
        case "BANCO_DE_OCCIDENTE":
            return 6
        case "BANCO_ITAU":
            return 7
        case "BANCOLOMBIA":
            return 8
        case "SCOTIABANK_COLPATRIA":
            return 9
        default:
            return 0
    }
}

export const getPaymentIdState = (state) => {
    switch(state){
        case "Creado" :
            return  1      
        case "Acordado":
            return 2
        case "Pagado":
            return 3
        case "Despachado":
            return 4
        case "Disputa":
            return 5
        case "Cerrado":
            return 6
        case "Recibido":
            return 7
    }
}