import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import Meta from '../components/Meta'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.detail) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <>
      <Meta title={"Phương thức thanh toán"} />
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Phương thức thanh toán</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend' required>Chọn phương thức thanh toán</Form.Label>
            <Col>
              <Form.Check
                type='radio'
                label='Thanh toán khi nhận hàng'
                id='shipcod'
                name='paymentMethod'
                value='ship cod'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              {/* <Form.Check
                type='radio'
                label='PayPal/Credit Card'
                id='PayPal'
                name='paymentMethod'
                value='paypal'
                //checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type='radio'
                label='MoMo'
                id='thanh toán MoMo'
                name='paymentMethod'
                value='momo'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check> */}
            </Col>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Tiếp theo
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default PaymentScreen
