import axios from 'axios'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,

  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
  SORT_ORDER_BY_PRICE,
  SORT_ORDER_BY_PAIR,
  ORDER_CREATE_AT_DATE,

  ORDER_CONFIRM_REQUEST,
  ORDER_CONFIRM_SUCCESS,
  ORDER_CONFIRM_FAIL,

  ORDER_CANCEL_REQUEST,
  ORDER_CANCEL_SUCCESS,
  ORDER_CANCEL_FAIL,

  ORDER_END_REQUEST,
  ORDER_END_SUCCESS,
  ORDER_END_FAIL,
  SORT_ORDER_BY_STATUS
} from '../constants/orderConstants'
import { logout } from './userActions'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/orders`, order, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    })
    localStorage.removeItem('cartItems')
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/${id}`, config)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    })
  }
}


export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
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

    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    )

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message,
    })
  }
}

export const confirmOrder = (order) => async (dispatch, getState) => {
  // console.log(order)
  try {
    dispatch({
      type: ORDER_CONFIRM_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/orders/${order._id}/confirm`,
      {},
      config
    )
    dispatch({
      type: ORDER_CONFIRM_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_CONFIRM_FAIL,
      payload: message,
    })
  }
}


export const cancelOrder = (order) => async (dispatch, getState) => {
  console.log(order)
  try {
    dispatch({
      type: ORDER_CANCEL_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/orders/${order._id}/cancel`,
      {},
      config
    )
    dispatch({
      type: ORDER_CANCEL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_CANCEL_FAIL,
      payload: message,
    })
  }
}

export const endOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_END_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/orders/${order._id}/end`,
      {},
      config
    )

    dispatch({
      type: ORDER_END_SUCCESS,
      payload: data,
    })


  }
  catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_END_FAIL,
      payload: message,
    })
  }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    )

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload: message,
    })
  }
}

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/myorders`, config)

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    })
  }
}

export const listOrdersUser = (id) => async (dispatch, getState) => {
  console.log(id)
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/user/${id}`, config)
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    })
  }
}

export const listOrders = (keyword = '', sort = '', pageNumber = '') => async (dispatch, getState) => {

  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    })

    dispatch({
      type: "ORDER_LIST"
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders?keyword=${keyword}&sort=${sort}&pageNumber=${pageNumber}`, config)

    dispatch({
      type: ORDER_LIST_SUCCESS,
      // payload: { "orders": data, "originOrders": data }
      payload: data
    })
    dispatch({
      type: "PAGINATE_INIT",
      payload: { page: data.page, pages: data.pages }
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    })
  }
}

export const sortOrdersByPriceAscending = () => (dispatch, getState) => {

  const { orderList: { originOrders } } = getState()
  // console.log(getState())
  const isArray = Array.isArray(originOrders)

  // console.log(orders)
  const list = originOrders.sort((a, b) =>
    parseInt(a.totalPrice) - parseInt(b.totalPrice)
  )

  // console.log(orders)
  dispatch({
    type: SORT_ORDER_BY_PRICE,
    payload: { "orders": list, "originOrders": originOrders }
  })
}

export const sortOrdersByPriceDescending = () => (dispatch, getState) => {

  const { orderList: { originOrders } } = getState()
  // console.log(getState())
  const isArray = Array.isArray(originOrders)

  // console.log(orders)
  const list = originOrders.sort((a, b) =>
    parseInt(b.totalPrice) - parseInt(a.totalPrice)
  )

  dispatch({
    type: SORT_ORDER_BY_PRICE,
    payload: { "orders": list, "originOrders": originOrders }
  })
}

export const orderPairList = () => (dispatch, getState) => {
  const { orderList: { originOrders } } = getState()

  // console.log(orders)
  const isArray = Array.isArray(originOrders)
  const list = originOrders.filter(order => order.isPaid)

  // console.log(list)
  dispatch({
    type: SORT_ORDER_BY_PAIR,
    payload: { "orders": list, "originOrders": originOrders }
  })

}

export const orderNotPairList = () => (dispatch, getState) => {
  const { orderList: { originOrders } } = getState()

  const isArray = Array.isArray(originOrders)
  const list = originOrders.filter(order => !order.isPaid)

  // console.log(list)
  dispatch({
    type: SORT_ORDER_BY_PAIR,
    payload: { "orders": list, "originOrders": originOrders }
  })
}

export const orderStatusList = (status) => (dispatch, getState) => {
  const { orderList: { originOrders } } = getState()

  const isArray = Array.isArray(originOrders)
  const list = originOrders.filter(order => order.status === status)

  // console.log(list)
  dispatch({
    type: SORT_ORDER_BY_STATUS,
    payload: { "orders": list, "originOrders": originOrders }
  })
}

export const orderCreateAtDate = (createAt) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/createAt/${createAt}`, config)

    dispatch({
      type: ORDER_CREATE_AT_DATE,
      payload: { "orders": data, "originOrders": data }
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    })
  }
}