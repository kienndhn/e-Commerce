import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

const UserInfo = () => {

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const buttonFunction = useSelector(state => state.buttonFunction)
    const { mode } = buttonFunction

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')

    useEffect(() => {
        if (!user.name) {
            dispatch(getUserDetails('profile'))
        }
        else {
            setName(user.name)
            setEmail(user.email)
            setMobile(user.mobile)
        }
        // console.log(user)
    }, [user])

    
    return (
        mode === "USER_INFO" &&
        <>
            <h2>Thông tin người dùng</h2>
            <div className="list-group" style={{ fontSize: "1.25rem" }}>
                <div className="list-group-item d-flex flex-row">
                    <div className="col"><strong>Tên người dùng</strong></div>
                    <div className="col">{name}</div>
                </div>
                <div className="list-group-item d-flex flex-row">
                    <div className="col"><strong>địa chỉ mail</strong></div>
                    <div className="col">{email}</div>
                </div>
                <div className="list-group-item d-flex flex-row">
                    <div className="col"><strong>Số điện thoại</strong></div>
                    <div className="col">{mobile}</div>
                </div>

            </div>
        </>
    )
}

export default UserInfo