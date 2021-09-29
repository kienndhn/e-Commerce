import {

  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
  ORDER_MOMO_REQUEST,
  ORDER_MOMO_FAIL,
  ORDER_MOMO_SUCCESS,
  ORDER_MOMO_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_CREATE_RESET,
  SORT_ORDER_BY_PRICE,
  SORT_ORDER_BY_PAIR,
  SORT_ORDER_BY_STATUS,
  ORDER_CREATE_AT_DATE,

  ORDER_CONFIRM_REQUEST,
  ORDER_CONFIRM_SUCCESS,
  ORDER_CONFIRM_RESET,
  ORDER_CONFIRM_FAIL,

  ORDER_CANCEL_REQUEST,
  ORDER_CANCEL_SUCCESS,
  ORDER_CANCEL_FAIL,
  ORDER_CANCEL_RESET,

  ORDER_END_REQUEST,
  ORDER_END_SUCCESS,
  ORDER_END_FAIL,
  ORDER_END_RESET
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      }
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}



export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}


export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      }
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_DELIVER_RESET:
      return {}
    default:
      return state
  }
}

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_LIST_MY_RESET:
      return { orders: [] }
    default:
      return state
  }
}

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        page: action.payload.page,
        pages: action.payload.pages
        // originOrders: action.payload.originOrders
      }
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case SORT_ORDER_BY_PRICE:
      return {
        loading: false,
        orders: action.payload.orders,
        // originOrders: action.payload.originOrders
      }
    case SORT_ORDER_BY_PAIR:
      return {
        loading: false,
        orders: action.payload.orders,
        // originOrders: action.payload.originOrders
      }
    case SORT_ORDER_BY_STATUS:
      return {
        loading: false,
        orders: action.payload.orders,
        // originOrders: action.payload.originOrders
      }
    case ORDER_CREATE_AT_DATE:
      return {
        loading: false,
        orders: action.payload.orders,
        // originOrders: action.payload.originOrders
      }
    default:
      return state
  }
}

export const orderConfirmReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CONFIRM_REQUEST:
      return {
        loading: true,
      }
    case ORDER_CONFIRM_SUCCESS:
      return {
        loading: false,
        success: true
      }
    case ORDER_CONFIRM_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case ORDER_CONFIRM_RESET:
      return {}
    default:
      return state
  }
}

export const orderCancelReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CANCEL_REQUEST:
      return {
        loading: true,
      }
    case ORDER_CANCEL_SUCCESS:
      return {
        loading: false,
        success: true
      }
    case ORDER_CANCEL_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case ORDER_CANCEL_RESET:
      return {}
    default:
      return state
  }
}

export const orderEndReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_END_REQUEST:
      return {
        loading: true,
      }
    case ORDER_END_SUCCESS:
      return {
        loading: false,
        success: true
      }
    case ORDER_END_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case ORDER_END_RESET:
      return {}
    default:
      return state
  }
}