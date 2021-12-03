// export const CORE_BASEURL = process.env.REACT_APP_CORE_BASEURL  //'http://localhost:8084'
// export const PULL_BASEURL = process.env.REACT_APP_PULL_BASEURL // 'http://localhost:8084'
export const CORE_BASEURL ='http://localhost:8084'
export const PULL_BASEURL = 'http://localhost:8084'

export const getPaymentState = (idState) => {
    switch (idState) {
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
            return "Fallido"
        case 2:
            return "En Despacho"
        case 3:
            return "En Entrega"
        case 4:
            return "Pendiente"
        case 5:
            return "Transferido"
        case 6:
            return "Entregado"
        case 7:
            return "Devolucion"
        case 8:
            return "Cancelado"
        case 9:
            return "Novedad"
        case 10:
            return "Por confirmar"

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
        category: 6,
        name: "Otros"
    }
]