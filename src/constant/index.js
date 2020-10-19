
export const CORE_BASEURL = 'https://mpscore.herokuapp.com/mps';

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