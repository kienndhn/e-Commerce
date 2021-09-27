import {
  CREATE_MOMO_PAYMENT_REQUEST,
  CREATE_MOMO_PAYMENT_SUCCESS,
  CREATE_MOMO_PAYMENT_FAIL,
  CREATE_MOMO_PAYMENT_RESET,
} from '../constants/momoConstants'
//import { CREATE_MOMO_PAYMENT } from '../redux/constants/momoConstants'

export const momoCreatePaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_MOMO_PAYMENT_REQUEST:
      return {
        loading: true,
      }
    case CREATE_MOMO_PAYMENT_SUCCESS:
      return {
        loading: false,
        success: true,
        momo: action.payload,
      }
    case CREATE_MOMO_PAYMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CREATE_MOMO_PAYMENT_RESET:
      return {}
    default:
      return state
  }
}
