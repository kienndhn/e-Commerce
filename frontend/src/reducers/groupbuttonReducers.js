export const buttonFunctionReducer = (state = {mode: "ORDERS_LIST"}, action) => {
    switch (action.type) {
        case "ORDERS_LIST":
            return {mode: "ORDERS_LIST"}
        case "USER_INFO":
            return {mode: "USER_INFO"}
        case "CHANGE_INFO":
            return {mode: "CHANGE_INFO"}
        case "CHANGE_PASSWORD":
            return {mode: "CHANGE_PASSWORD"}
        case "USERS_LIST":
            return {mode: "USERS_LIST"}
        case "PRODUCTS_LIST":
            return {mode: "PRODUCTS_LIST"}
        default:
            // console.log(state.mode)
            return state
    }
}