import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile } from '../actions/userActions'

function ChangePassword() {

    const buttonFunction = useSelector(state => state.buttonFunction)
    const { mode } = buttonFunction

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const dispatch = useDispatch()

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const submitHandler = (e) => {

        e.preventDefault()

        if (newPassword===confirmPassword) {
            dispatch(updateUserProfile({ id: user._id, name: user.name, email: user.email, mobile: user.mobile, password, newPassword }))
        }
    }

    return (

        mode === "CHANGE_PASSWORD" &&
        <div style={{ fontSize: "1.25rem" }}>
            <h2>Thay đổi mật khẩu</h2>
            <form onSubmit={submitHandler}>
                <div className="form-group" controlId='password'>
                    <label>Nhập mật khẩu</label>
                    <input
                    className="form-control"
                        type='password'
                        placeholder='Nhập mật khẩu'
                        value={password}

                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>

                <div className="form-group" controlId='newPassword'>
                    <label>Mật khẩu mới</label>
                    <input className="form-control"
                        type='password'
                        placeholder='Nhập mật khẩu mới'
                        value={newPassword}

                        onChange={(e) => setNewPassword(e.target.value)}
                    ></input>
                </div>

                <div className="form-group" controlId='confirmPassword'>
                    <label>Nhập lại mật khẩu mới</label>
                    <input className="form-control"
                        type='password'
                        placeholder='nhập lại mật khẩu mới'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                </div>
                <div className="form-group">
                    <div className="btn btn-primary" type='submit' variant='primary'>
                        Cập nhật
                    </div>
                </div>
            </form>
        </div>

    )
}

// ChangePassword.propTypes = {

// }

export default ChangePassword

