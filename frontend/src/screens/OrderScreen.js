import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'

import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'

import {
  getOrderDetails,
  payOrder,
  cancelOrder,
  endOrder
} from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_CANCEL_RESET,
  ORDER_END_RESET
} from '../constants/orderConstants'

import {
  createMomoPayment,
} from '../actions/momoActions'

import formatCash from '../helper/currencyFormat'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const momoPayment = useSelector((state) => state.momoResult)
  const { momo: momoResult } = momoPayment

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderCancel = useSelector((state) => state.orderCancel)
  const { success: successCancel } = orderCancel

  const orderEnd = useSelector((state) => state.orderEnd)
  const { success: successEnd } = orderEnd

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(0)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }



    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }


    if (!order || successPay || successEnd || successCancel || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch({ type: ORDER_CANCEL_RESET })
      dispatch({ type: ORDER_END_RESET })
      dispatch(getOrderDetails(orderId))

    } else if (!order.isPaid) {
      console.log(order.paymentMethod)
      console.log((parseInt(order.totalPrice) / 23000).toFixed(2))
      if (order.paymentMethod === 'paypal') {
        if (!window.paypal) {
          addPayPalScript()
        } else {
          setSdkReady(true)
        }
      }
      else if (order.paymentMethod === 'momo' && !momoResult) {
        dispatch(createMomoPayment(orderId))
      }
    }
    if (order) {
      console.log(order._id)
    }
    if (momoResult) {
      console.log(momoResult.payUrl)
    }

  }, [dispatch, orderId, successPay, order, momoResult, successCancel])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }
  const cancelHandler = () => {
    dispatch(cancelOrder(order))
    dispatch(endOrder(order))
  }
  const endHandler = () => {
    // console.log('ket thuc')
    if (!order.paid) {
      dispatch(payOrder(orderId, { 'id': orderId, 'status': 'COMPLETE', 'update_time': new Date(), 'payer': { 'email_address': userInfo.email } }))
    }

    dispatch(endOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Meta title={"Chi tiết đơn hàng"} />
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Địa chỉ nhận hàng</h2>
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
              {/* {order.isPaid ? (
                <Message variant='success'>Đã thanh toán{order.paidAt}</Message>
              ) : (
                <Message variant='danger'>chưa thanh toán</Message>
              )} */}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Trạng thái đơn hàng</h2>
              {order.status === 'waiting' && (
                <Message variant='success'>
                  Đang chờ xác nhận, cửa hàng sẽ gọi điện cho quý khách để xác nhận
                </Message>

              )}
              {order.status === 'confirmed' && (
                <Message variant='success'>
                  Đã xác nhận, của hàng đang chuẩn bị gửi hàng
                </Message>
              )}
              {order.status === 'canceled' && (
                <Message variant='danger'>
                  Đơn hàng đã hủy
                </Message>
              )}
              {order.status === 'delivered' && (
                <Message variant='success'>
                  Đơn hàng đã được gửi cho đơn vị vận chuyển, chỉ ấn kết thúc khi đã nhận hàng
                </Message>
              )}
              {order.isPaid ?
                order.status === 'end' &&
                <Message variant='success'>
                  Đơn hàng đã giao thành công
                </Message>

                : order.status === 'end' &&
                <Message variant='success'>
                  Đơn hàng đã hủy
                </Message>}

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
              {!order.isPaid && order.paymentMethod !== 'ship cod' && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {order.paymentMethod === 'paypal' && (!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={(parseInt(order.totalPrice) / 23000).toFixed(2)}
                      onSuccess={successPaymentHandler}
                    />
                  ))}

                  {order.paymentMethod === 'momo' && (!momoResult ? (
                    <Loader />)
                    : (
                      <Link to={{ pathname: momoResult.payUrl }}
                        target='_blank'>
                        <Button variant='light' className='btn-sm'>
                          Thanh Toán
                        </Button>
                      </Link>
                    ))
                  }
                </ListGroup.Item>
              )}

              {!order.isPaid && order.status === 'delivered' && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={endHandler}
                  >
                    Đã nhận hàng
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

export default OrderScreen
