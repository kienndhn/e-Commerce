import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buttonFunctionReducer } from '../reducers/groupbuttonReducers'

function AdminFunction() {
    const [active, setActive] = useState('btn1')

    const dispatch = useDispatch()

    const buttonFunction = useSelector(state => state.buttonFunction)
    const {mode} = buttonFunction

    return (

        <div className="col-md-3 d-md-block d-none">
            <div className="text-center" style={{ position: "sticky" }}>
                {/* <h2>Bộ lọc</h2> */}
                <h2>Chức năng</h2>
                <div className="d-flex flex-column w-100 border btn-group-vertical" style={{ height: "fit-content", }}>
                    <a className="w-100" href="#orders">
                        <div className={`btn w-100 ${mode === 'ORDERS_LIST' ? 'btn-dark' : 'btn-info'}`}
                            onClick={(e) => {
                                // setActive('btn1')
                                dispatch({ type: "ORDERS_LIST" })
                            }}>Danh sách đơn hàng</div>
                    </a>
                    <a className="w-100" href="#users">
                        <div className={`w-100 btn ${mode === 'USERS_LIST' ? 'btn-dark' : 'btn-info'}`}
                            onClick={(e) => {
                                // setActive('btn2')
                                dispatch({ type: "USERS_LIST" })
                            }}>Danh sách người dùng</div>
                    </a>
                    <a className="w-100" href="#products">
                        <div className={`w-100 btn ${mode === 'PRODUCTS_LIST' ? 'btn-dark' : 'btn-info'} `}
                            onClick={(e) => {
                                // setActive('btn3')
                                dispatch({ type: "PRODUCTS_LIST" })
                            }}>Danh sách sản phẩm</div>
                    </a>
                    <a className="w-100" href="#admin">
                        <div className={`w-100 btn ${mode === 'USER_INFO' ? 'btn-dark' : 'btn-info'} `}
                            onClick={(e) => {
                                // setActive('btn4')
                                dispatch({ type: "USER_INFO" })
                            }
                            }>Quản trị viên</div>
                    </a>
                </div>
            </div>
        </div>

    )
}

export default AdminFunction

