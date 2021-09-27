import axios from 'axios'
import {
    CREATE_MOMO_PAYMENT_FAIL,
    CREATE_MOMO_PAYMENT_REQUEST,
    CREATE_MOMO_PAYMENT_SUCCESS,
} from '../constants/momoConstants'

// export const createMomoPayment = (body) => async (dispatch, getState) => {

//     const config = {
//         headers: {
//             'Access-Control-Allow-Origin':'*',
//             'Content-Type': 'application/json'            
//         },
//     }
//     const { data } = await axios.post('https://test-payment.momo.vn/gw_payment/transactionProcessor', body, config)

//     console.log(data)
    
//     dispatch({
//         type: CREATE_MOMO_PAYMENT,
//         payload: {
//             orderId: data.orderId,
//             errorCode: data.errorCode,
//             message: data.localMessage,
//             payUrl: data.payUrl,
//             qrCodeUrl: data.qrCodeUrl,
//         },
//     })

//     localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
// }

export const createMomoPayment = (orderId) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: CREATE_MOMO_PAYMENT_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(
        `/api/orders/${orderId}/momo`, config
      )
  
      dispatch({
        type: CREATE_MOMO_PAYMENT_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        //dispatch(logout())
      }
      dispatch({
        type: CREATE_MOMO_PAYMENT_FAIL,
        payload: message,
      })
    }
  }

// export const removeFromCart = (id) => (dispatch, getState) => {
//   dispatch({
//     type: CART_REMOVE_ITEM,
//     payload: id,
//   })

//   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
// }

// export const saveShippingAddress = (data) => (dispatch) => {
//   dispatch({
//     type: CART_SAVE_SHIPPING_ADDRESS,
//     payload: data,
//   })

//   localStorage.setItem('shippingAddress', JSON.stringify(data))
// }

// export const savePaymentMethod = (data) => (dispatch) => {
//   dispatch({
//     type: CART_SAVE_PAYMENT_METHOD,
//     payload: data,
//   })

//   localStorage.setItem('paymentMethod', JSON.stringify(data))
// }
