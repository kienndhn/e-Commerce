import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const ProfileFunction = () => {

    const [active, setActive] = useState('btn1')
    const dispatch = useDispatch()


    // useEffect(() => {

    // }, [input])
    return (
        <div className="col">
            <div className="text-center" style={{ position: "fixed" }}>
                {/* <h2>Bộ lọc</h2> */}
                <h2>Hồ sơ người dùng</h2>
                <div className="d-flex flex-column w-100 border btn-group-vertical" style={{ height: "fit-content", }}>
                    <a className="w-100" href="#order">
                        <div className={`btn w-100 ${active === 'btn1' ? 'btn-dark' : 'btn-light'}`}
                            onClick={(e) => {
                                setActive('btn1')
                                dispatch({ type: "ORDERS_LIST" })
                            }}>Đơn mua</div>
                    </a>
                    <a className="w-100" href="#profile">
                        <div className={`w-100 btn ${active === 'btn2' ? 'btn-dark' : 'btn-light'}`}
                            onClick={(e) => {
                                setActive('btn2')
                                dispatch({ type: "USER_INFO" })
                            }}>Thông tin người dùng</div>
                    </a>
                    <a className="w-100" href="#changeinfo">
                        <div className={`w-100 btn ${active === 'btn3' ? 'btn-dark' : 'btn-light'} `}
                            onClick={(e) => {
                                setActive('btn3')
                                dispatch({ type: "CHANGE_INFO" })
                            }}>Thay đổi thông tin</div>
                    </a>
                    <a className="w-100" href="#changepassword">
                        <div className={`w-100 btn ${active === 'btn4' ? 'btn-dark' : 'btn-light'} `}
                            onClick={(e) => {
                                setActive('btn4')
                                dispatch({ type: "CHANGE_PASSWORD" })
                            }
                            }>Thay đổi mật khẩu</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ProfileFunction