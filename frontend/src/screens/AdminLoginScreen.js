import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import Meta from '../components/Meta'
import { login } from '../actions/userActions'

const AdminLoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/admin/dashboard'

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    console.log(email)
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <>
      <Meta title={"Đăng nhập"} />
      <FormContainer>
        <h1>Đăng nhập với vai trò admin</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>Email/ Số điện thoại</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nhập email hoặc số điện thoại'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type='password'
              placeholder='Nhập mật khẩu'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Đăng nhập
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default AdminLoginScreen
