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
      <Meta title={"Chi ti???t ????n h??ng"} />
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>?????a ch??? nh???n h??ng</h2>
              <p>
                <strong>T??n ng?????i nh???n: </strong> {order.shippingAddress.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>

              <p>
                <strong>S??? ??i???n tho???i: </strong>{order.shippingAddress.phoneNumber}
              </p>
              <p>
                <strong>?????a ch???:</strong>
                {order.shippingAddress.detail}, {order.shippingAddress.ward}, {order.shippingAddress.district}, {order.shippingAddress.city}
              </p>
              {/* {order.isDelivered ? (
                <Message variant='success'>
                  Giao ng??y {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )} */}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Ph????ng th???c thanh to??n</h2>
              <p>
                <strong>Ph????ng th???c: </strong>
                {order.paymentMethod}
              </p>
              {/* {order.isPaid ? (
                <Message variant='success'>???? thanh to??n{order.paidAt}</Message>
              ) : (
                <Message variant='danger'>ch??a thanh to??n</Message>
              )} */}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Tr???ng th??i ????n h??ng</h2>
              {order.status === 'waiting' && (
                <Message variant='success'>
                  ??ang ch??? x??c nh???n, c???a h??ng s??? g???i ??i???n cho qu?? kh??ch ????? x??c nh???n
                </Message>

              )}
              {order.status === 'confirmed' && (
                <Message variant='success'>
                  ???? x??c nh???n, c???a h??ng ??ang chu???n b??? g???i h??ng
                </Message>
              )}
              {order.status === 'canceled' && (
                <Message variant='danger'>
                  ????n h??ng ???? h???y
                </Message>
              )}
              {order.status === 'delivered' && (
                <Message variant='success'>
                  ????n h??ng ???? ???????c g???i cho ????n v??? v???n chuy???n, ch??? ???n k???t th??c khi ???? nh???n h??ng
                </Message>
              )}
              {order.isPaid ?
                order.status === 'end' &&
                <Message variant='success'>
                  ????n h??ng ???? giao th??nh c??ng
                </Message>

                : order.status === 'end' &&
                <Message variant='success'>
                  ????n h??ng ???? h???y
                </Message>}

            </ListGroup.Item>
            <ListGroup.Item>
              <h2>H??ng</h2>
              {order.orderItems.length === 0 ? (
                <Message>????n h??ng r???ng</Message>
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
                          {item.qty} x {formatCash(item.price)} VN?? = {formatCash(item.qty * item.price)} VN??
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
                <h2>T??m t???t</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Ti???n h??ng</Col>
                  <Col>{formatCash(order.itemsPrice)} VN??</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>gi?? ship</Col>
                  <Col>{formatCash(order.shippingPrice)} VN??</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>T???ng</Col>
                  <Col>{formatCash(order.totalPrice)} VN??</Col>
                </Row>
              </ListGroup.Item>
              {order.status === 'waiting' && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={cancelHandler}
                  >
                    H???y ????n
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
                          Thanh To??n
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
                    ???? nh???n h??ng
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
