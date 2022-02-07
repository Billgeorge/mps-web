import { types } from "types.js/types";



export const promotionsReducer = (state ={}, action) => {

        switch (action.type) {
            case types.errorMessage:
                return{
                    ...state,
                    successMessage: '',
                    errorMessage: action.payload.message,
                    isLoading: action.payload.isLoading,
                }
            case types.successMessage:
                return{
                    ...state,
                    errorMessage: '',
                    successMessage: action.payload.message,
                    isLoading: action.payload.isLoading,
                    mustChange: action.payload.mustChange
                }
            case types.isLoading:
                return{
                    ...state,
                    isLoading: true
                }
            case types.product:
                return{
                    ...state,
                    product: action.payload,
                    isLoadingImage: false
                }
            case types.isLoadingImage:
                return{
                    ...state,
                    isLoadingImage: true
                }
                      

                default:
                return state;
        }

}