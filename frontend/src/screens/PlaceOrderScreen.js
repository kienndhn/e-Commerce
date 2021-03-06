import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'
import formatCash from '../helper/currencyFormat.js'
import Meta from '../components/Meta'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  if (!cart.shippingAddress.detail) {
    history.push('/shipping')
  } else if (!cart.paymentMethod) {
    history.push('/payment')
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(0)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 1000000 ? 0 : 30000)
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) 
    
  ).toFixed(0)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      if ((cart.paymentMethod === 'paypal')) {
        history.push(`/order/${order._id}`)
      }
      else
        history.push(`/order/${order._id}`)
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <> 
    <Meta title={"?????a ch??? nh???n h??ng"} />
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>?????a ch??? nh???n h??ng</h2>
              <p>
                <strong>Ng?????i nh???n: </strong>{cart.shippingAddress.name}
              </p>
              <p>
                <strong>S??? ??i???n tho???i: </strong>{cart.shippingAddress.phoneNumber}
              </p>
              <p>
                <strong>?????a ch???:</strong>
                {cart.shippingAddress.detail}, {cart.shippingAddress.ward}, {cart.shippingAddress.district}, {cart.shippingAddress.city}             
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Ph????ng th???c thanh to??n</h2>
              <strong>Ph????ng th???c: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Gi??? h??ng tr???ng</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
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
                <h2>D??n h??ng</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Ti???n h??ng</Col>
                  <Col>{formatCash(cart.itemsPrice)} VN??</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Ti???n Ship</Col>
                  <Col>{formatCash(cart.shippingPrice)} VN??</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>T???ng</Col>
                  <Col>{formatCash(cart.totalPrice)} VN??</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                C???a h??ng s??? g???i cho Qu?? Kh??ch ????? x??c nh???n th??ng tin ?????t h??ng
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  ?????t h??ng
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
