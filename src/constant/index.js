
export const CORE_BASEURL = 'http://localhost:8084'
export const PULL_BASEURL = 'http://localhost:8084'
export const LOGISTIC_SERVICE_URL = ' https://233cvk2400.execute-api.us-east-1.amazonaws.com/dev/'

export const getPaymentState = (idState) => {
    switch (idState) {
        case 1:
            return "Falido"
        case 2:
            return "Creado"
        case 3:
            return "Pagado"
        case 4:
            return "Despachado"
        case 5:
            return "Recibido"
        case 6:
            return "Transferido"
    }
}

export const getBankNumber = (bank) => {
    switch (bank) {
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
        case "NEQUI":
            return 10
        case "DAVIPLATA":
            return 11
        default:
            return 0
    }
}

export const getAccountType = (bank) => {
    switch (bank) {
        case "AHORROS":
            return 1
        case "CORRIENTE":
            return 2
        case "BILLETERA":
            return 3
        default:
            return 0
    }
}

export const getPaymentIdState = (state) => {
    switch (state) {
        case "Creado":
            return 1
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
export const getOrderIdState = (state) => {
    switch (state) {
        case "Fallado":
            return 1
        case "En Despacho":
            return 2
        case "En Entrega":
            return 3
        case "Pendiente":
            return 4
        case "Transferido":
            return 5
        case "Entregado":
            return 6
        case "Devolucion":
            return 7
        case "Cancelado":
            return 8
        case "Novedad":
            return 9
        case "Por confirmar":
            return 10
    }
}
export const getOrderState = (idState) => {
    switch (idState) {
        case 1:
            return "Falido"
        case 2:
            return "Creado"
        case 3:
            return "Pagado"
        case 4:
            return "Despachado"
        case 5:
            return "Recibido"
        case 6:
            return "Transferido"
    }
}

export const categories = [
    {
        category: 1,
        name: "Mascotas"
    },
    {
        category: 2,
        name: "Tecnología"
    },
    {
        category: 3,
        name: "Hogar"
    },
    {
        category: 4,
        name: "Niños"
    },
    {
        category: 5,
        name: "Estilo de vida"
    },
    {
        category: 7,
        name: "Ropa y calzado"
    },
    {
        category: 8,
        name: "Productos para adultos"
    },
    {
        category: 9,
        name: "Productos de belleza"
    },
    {
        category: 10,
        name: "Perfumería"
    },
    {
        category: 6,
        name: "Otros"
    }
]