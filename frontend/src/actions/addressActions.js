import axios from 'axios'

import {
    ADDRESS_REQUEST,
    ADDRESS_SUCCESS,
    ADDRESS_FAIL,
    
} from '../constants/addressConstants'


export const getAddress = () => async(dispatch) =>{
    try {
        dispatch({ type: ADDRESS_REQUEST })
    
        const { data } = await axios.get(`/api/address/`)
    
        
        dispatch({
          type: ADDRESS_SUCCESS,
          payload: data,
        })
      } catch (error) {
        dispatch({
          type: ADDRESS_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
}

// export const getDistrict = () => async(dispatch, getState)