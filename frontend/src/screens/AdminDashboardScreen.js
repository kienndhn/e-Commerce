import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button, ListGroup } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'

import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import AdminFunction from '../components/AdminFunction'
import UserInfo from '../components/UserInfo'
import AdminOrdersList from '../components/AdminOrdersList'
import AdminUsersList from '../components/AdminUsersList'
import AdminProductsList from '../components/AdminProductsList'

const AdminDashboardScreen = ({ match, history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [message, setMessage] = useState(null)

    const [mode, setMode] = useState('profile')
    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success, error: errorUpdate } = userUpdateProfile

    useEffect(() => {
        if (!userInfo && !userInfo.isAdmin) {
            history.push('/login')
        }
        else {
            // if ( !user.name || success) {
            //     dispatch({ type: USER_UPDATE_PROFILE_RESET })
                
            // } 
            // if (!errorUpdate) {
            //     setMode('profile')
            // }
        }
    }, [dispatch, history, userInfo, user, success])

    const checkPassword = () => {
        if (newPassword !== confirmPassword) {
            setMessage('Mật khẩu không khớp')
            return true
        } else {
            setMessage(null)
            return false
        }
    }
    const submitHandler = (e) => {

        e.preventDefault()
        if (mode === 'changeProfile') {
            if (password === '') {
                setMessage('Nhập mật khẩu')
            } else {
                dispatch(updateUserProfile({ id: user._id, name, email, mobile, password }))
            }
        }
        else if (mode === 'changePassword') {

            if (checkPassword()) {
                dispatch(updateUserProfile({ id: user._id, name, email, mobile, password, newPassword }))
            }
        }

    }

    return (
        <>
            <Meta title={"Quản trị"} />
            <Row>
                <AdminFunction />
                <div className="col-md-9">
                    <UserInfo/>
                    <AdminOrdersList />
                    <AdminUsersList />
                    <AdminProductsList />
                </div>
            </Row>
        </>
    )
}

export default AdminDashboardScreen