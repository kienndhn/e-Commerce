export const buttonFunctionReducer = (state = { mode: "ORDERS_LIST" }, action) => {
    switch (action.type) {
        case "ORDERS_LIST":
            
        case "USER_INFO":
            
        case "CHANGE_INFO":
           
        case "CHANGE_PASSWORD":
            
        case "USERS_LIST":
            
        case "PRODUCTS_LIST":
            return {mode: action.type}
        default:
            // console.log(state.mode)
            return state
    }
}

export const productFilterReducer = (state = { mode: "ALL_LIST" }, action) => {
    switch (action.type) {
        case "ALL_LIST":
            
        case "TOP_LIST":
            
        case "SALE_LIST":

        case "ORDER_LIST":
            console.log(action.type)
            return { mode: action.type }
        default:
            return state
    }
}

export const paginateButtonReducer = (state = {}, action) => {
    switch (action.type) {
        case "PAGINATE_INIT":
            return {
                page: action.payload.page,
                pages: action.payload.pages,
                sort: action.payload.sort
            }
        case "PAGINATE_RESET":
            return {page: 0, pages: 0, sort: ""}
        default:
            return state
    }
}