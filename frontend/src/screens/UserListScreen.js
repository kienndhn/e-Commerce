import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'
import Meta from '../components/Meta'

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <Row>
      <Meta title={"Quản lý người dùng"} />
      <Col md={3}>
        <Row>
          <Col className='my-3'><h2>Chức năng</h2></Col></Row>
        <ListGroup>
          <ListGroup.Item
            as='a'
            href='/admin/orderlist'
          >
            Quản lý đơn hàng
          </ListGroup.Item>
          <ListGroup.Item
            as='a'
            href='/admin/productList'
          >
            Quản lý sản phẩm
          </ListGroup.Item>
          <ListGroup.Item
            as='a'
            href='/admin/userlist'
          >
            Quản lý người dùng
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col>
        <h1>Dang sách người dùng</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên người dùng</th>
                <th>Số điện thoại</th>
                <th>Tổng đơn đặt hàng</th>
                <th>Đơn thành công</th>
                <th>Admin</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{users.indexOf(user) + 1}</td>
                  <td>{user.name}</td>
                  {/* <td> 
                     <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td> */}
                  <td>
                    {user.mobile}
                  </td>
                  <td>
                    {user.countOrder}
                  </td>
                  <td>
                    {user.finishedOrder}
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default UserListScreen
