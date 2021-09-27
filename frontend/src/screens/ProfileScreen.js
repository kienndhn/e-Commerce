import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col, ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import cashFormat from '../helper/currencyFormat'
import Meta from '../components/Meta'
import ProfileFunction from '../components/ProfileFunction'
import OrdersList from '../components/OrdersList'
import UserInfo from '../components/UserInfo'
import ChangeInfo from '../components/ChangeInfo'
import ChangePassword from '../components/ChangePassword'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState(null)

  // const [mode, setMode] = useState('profile')
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success, error: errorUpdate } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  const buttonFunction = useSelector(state => state.buttonFunction)
  const { mode } = buttonFunction


  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } 
    }
  }, [dispatch, history, userInfo, user, success])

  return (
    <>
      <Meta title={"Tài khoản người dùng"} />
      <div className="row">
        <ProfileFunction />

        <div className="col col-md-8">
          <OrdersList />
          <UserInfo />
          <ChangeInfo />
          <ChangePassword />
        </div>
      </div >
    </>
  )
}

export default ProfileScreen
