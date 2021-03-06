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
import { listProducts } from '../actions/productActions'
import { listOrders } from '../actions/orderActions'

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

    console.log(history.location.hash)



    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/admin/login')
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

    useEffect(() => {
        if (history.location.hash === "" || history.location.hash === "#orders") {
            dispatch({ type: "ORDERS_LIST" })
        }
        else if (history.location.hash === "#products") {
            dispatch({ type: "PRODUCTS_LIST" })
        }
        else if (history.location.hash === "#users") {
            dispatch({ type: "USERS_LIST" })
        }
        else if (history.location.hash === "#admin") {
            dispatch({ type: "USER_INFO" })
        }
    }, [])

    const checkPassword = () => {
        if (newPassword !== confirmPassword) {
            setMessage('M???t kh???u kh??ng kh???p')
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
                setMessage('Nh???p m???t kh???u')
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
            <Meta title={"Qu???n tr???"} />
            <Row>
                <AdminFunction />
                <div className="col-md-10">
                    <UserInfo />
                    <AdminOrdersList />
                    <AdminUsersList />
                    <AdminProductsList />
                </div>
            </Row>
        </>
    )
}

export default AdminDashboardScreen