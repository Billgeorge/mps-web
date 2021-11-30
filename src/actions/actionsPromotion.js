import { types } from "types.js/types";


 export const doSuccessMessage = (mustChange, succes) => ({
    type: types.successMessage,
    payload: {
      message: succes,
      isLoading: false,
      mustChange: !mustChange,
    }
 })

 export const doErrorMessage = (err) => ({
    
        type: types.errorMessage,
        payload: {
          message: err,
          isLoading: false
        }
 })

 export const doGetProduct = (product) => ({
        type: types.product,
        payload: product
  })

  export const doIsLoading = () => ({
    type: types.isLoading
  })