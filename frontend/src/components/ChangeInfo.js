import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile } from '../actions/userActions'

const ChangeInfo = () => {

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const buttonFunction = useSelector(state => state.buttonFunction)
    const { mode } = buttonFunction

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()


    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setMobile(user.mobile)
        }
    })

    const submitHandler = (e) => {

        e.preventDefault()

        if (password === '') {
            // setMessage('Nhập mật khẩu')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, mobile, password }))
        }
    }

    return (
        mode === "CHANGE_INFO"
        &&
        <div style={{ fontSize: "1.25rem" }}>
            <h2>Thay đổi thông tin</h2>
            <form onSubmit={submitHandler}>
                <div className="form-group" controlId='name'>
                    <div className="label">Tên</div>
                    <input className="form-control"
                        type='name'
                        placeholder='Nhập họ và tên'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </div>

                <div className="form-group" controlId='email'>
                    <label>Email</label>
                    <input
                        className="form-control"
                        type='email'
                        placeholder='Nhập email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>

                <div className="form-group" controlId='mobile'>
                    <label>Số điện thoại</label>
                    <input
                        className="form-control"
                        type='tel'
                        placeholder='nhập số điện thoại'
                        value={mobile}
                        pattern='(09|03|07|08|05)+([0-9]{8})'
                        onChange={(e) => setMobile(e.target.value)}
                    ></input>
                </div>
                <div className="form-group" controlId='password'>
                    <label>Nhập mật khẩu</label>
                    <input className="form-control"
                        type='password'
                        placeholder='Nhập mật khẩu'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

export default ChangeInfo