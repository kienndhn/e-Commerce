import {
    ADDRESS_REQUEST,
    ADDRESS_SUCCESS,
    ADDRESS_FAIL,
   
} from '../constants/addressConstants'

export const addressListReducer = (state = { addressList: [] }, action) => {
    switch (action.type) {
        case ADDRESS_REQUEST:
            return { loading: true, addressList: [] }
        case ADDRESS_SUCCESS:
            
            return {
                loading: false,
                addressList: action.payload
            }
        case ADDRESS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}