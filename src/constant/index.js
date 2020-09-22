
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
    }
}