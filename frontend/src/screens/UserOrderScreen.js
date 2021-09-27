import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col, ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrdersUser } from '../actions/orderActions'
import cashFormat from '../helper/currencyFormat'
import Meta from '../components/Meta'

const ProfileScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  const user_id=match.params.id

  useEffect(() => {
    
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrdersUser(user_id))
    } else {
      history.push('/login')
    }
    
  }, [dispatch, history, userInfo, userInfo, user_id])

  

  return (
    <>
      <Meta title={"Người dùng"} />
      <Row>
        
        <Col md={8}>
          <h2>Đơn hàng</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant='danger'>{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Thời gian tạo đơn</th>
                  <th>Giá trị</th>
                  <th>Thanh toán</th>
                  <th>Trạng thái</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{cashFormat(order.totalPrice)} VNĐ</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                      )}
                    </td>
                    <td>
                      {/* {order.status==='end' ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )} */}

                      {order.status === 'waiting' && <p>Đang chờ xác nhận</p>}
                      {order.status === 'confirmed' && <p>Đã xác nhận, chờ gửi hàng</p>}
                      {order.status === 'delivered' && <p>Đang giao hàng</p>}
                      {order.status === 'end' && <p>Đã kết thúc</p>}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Chi tiết
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row >
    </>
  )
}

export default ProfileScreen
