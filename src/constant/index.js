
export const CORE_BASEURL = 'http://localhost:8083/mps';

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