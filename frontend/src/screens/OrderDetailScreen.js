import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
  getOrderDetails,
  deliverOrder,
  confirmOrder,
  cancelOrder,
  endOrder
} from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_CONFIRM_RESET
} from '../constants/orderConstants'

import formatCash from '../helper/currencyFormat'

const OrderDetailScreen = ({ match, history }) => {
  const orderId = match.params.id

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const orderConfirm = useSelector((state) => state.orderConfirm)
  const { loading: loadingConfirm, success: successConfirm } = orderConfirm

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading && order) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(0)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  const orderCancel = useSelector((state) => state.orderCancel)
  const { success: successCancel } = orderCancel

  const orderEnd = useSelector((state) => state.orderEnd)
  const { success: successEnd } = orderEnd

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }
    if (!order || order._id !== orderId || successDeliver || successConfirm ||successCancel||successEnd) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch({ type: ORDER_CONFIRM_RESET })
      dispatch(getOrderDetails(orderId))
    }
  }, [dispatch, orderId, successDeliver, successConfirm, order])

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }
  const confirmHandle = () => {
    dispatch(confirmOrder(order))
  }

  const cancelHandler = () => {
    dispatch(cancelOrder(order))
    dispatch(endOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Meta title={"Đơn hàng"} />
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Tên người nhận: </strong> {order.shippingAddress.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>

              <p>
                <strong>Số điện thoại: </strong>{order.shippingAddress.phoneNumber}
              </p>
              <p>
                <strong>Địa chỉ:</strong>
                {order.shippingAddress.detail}, {order.shippingAddress.ward}, {order.shippingAddress.district}, {order.shippingAddress.city}
              </p>
              {/* {order.isDelivered ? (
                <Message variant='success'>
                  Giao ngày {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )} */}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Phương thức thanh toán</h2>
              <p>
                <strong>Phương thức: </strong>
                {order.paymentMethod}
              </p>

            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Trạng thái đơn hàng</h2>
              {order.status === 'waiting' && (

                <p>Đang chờ xác nhận</p>

              )}
              {
                order.status === 'confirmed' &&
                (<p>Đã xác nhận và chuẩn bị gửi hàng</p>)
              }
              {
                order.status === 'canceled' &&
                (<p>Đơn hàng đã bị hủy</p>)
              }
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Hàng</h2>
              {order.orderItems.length === 0 ? (
                <Message>Đơn hàng rỗng</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {formatCash(item.price)} VNĐ = {formatCash(item.qty * item.price)} VNĐ
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Tóm tắt</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tiền hàng</Col>
                  <Col>{formatCash(order.itemsPrice)} VNĐ</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>giá ship</Col>
                  <Col>{formatCash(order.shippingPrice)} VNĐ</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tổng</Col>
                  <Col>{formatCash(order.totalPrice)} VNĐ</Col>
                </Row>
              </ListGroup.Item>
              {loadingConfirm && <Loader />}
              {order.status === 'waiting' && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={confirmHandle}
                  >
                    Chấp nhận
                  </Button>
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {order.status === 'confirmed' && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={deliverHandler}
                  >
                    Đánh dấu đã giao
                  </Button>
                </ListGroup.Item>
              )}
              {order.status === 'waiting' && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={cancelHandler}
                  >
                    Hủy Đơn
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderDetailScreen
