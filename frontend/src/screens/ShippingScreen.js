import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import Meta from '../components/Meta'

import { getAddress } from '../actions/addressActions'
import { getUserDetails } from '../actions/userActions'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const address = useSelector((state) => state.addressList)
  const { loading, error, addressList } = address

  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  const [name, setName] = useState()
  const [phoneNumber, setPhoneNumber] = useState('')

  const [detail, setDetail] = useState('')
  const [ward, setWard] = useState('')
  const [district, setDistrict] = useState('')
  const [city, setCity] = useState('')

  const [cityList, setCityList] = useState([])
  const [districtList, setDistrictList] = useState([])

  const [wardList, setWardList] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {

    if (!user || !user.name)
      dispatch(getUserDetails('profile'))
    else {
      setName(user.name)
      setPhoneNumber(user.mobile)
    }

    dispatch(getAddress())
  }, [dispatch, history, user])

  const submitHandler = (e) => {

    e.preventDefault()
    dispatch(saveShippingAddress({ city, district, ward, detail, name, phoneNumber }))
    history.push('/payment')
  }

  return (
    <>
      <Meta title={"Địa chỉ nhận hàng"} />
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Địa chỉ nhận hàng</h1>
        <Form onSubmit={submitHandler}>


          <Form.Group controlId='name'>
            <Form.Label>Tên người nhận</Form.Label>
            <Form.Control
              type='text'
              placeholder='Tên người nhận'
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            >
            </Form.Control>
          </Form.Group>


          <Form.Group controlId='mobile'>
            <Form.Label>Số điện thoại Tên người nhận</Form.Label>
            <Form.Control
              type='tel'
              placeholder='Số điện thoại nhận hàng'
              value={phoneNumber}
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
              pattern='(09|03|07|08|05)+([0-9]{8})'
            >
            </Form.Control>
          </Form.Group>


          <Form.Group controlId='city'>
            <Form.Label>Thành phố</Form.Label>
            <Form.Control
              as='select'
              type='text'
              placeholder='Thành phố'
              value={city}
              required
              onClick={(e) =>
                setCityList(addressList)
              }
              onChange={(e) => {
                setCity(e.target.value)
                setDistrictList([])
                setWardList([])
                setDistrict('')
                setWard('')
                setDetail('')

                //console.log(e.target.value)
                Object.keys(cityList).forEach((key) => {
                  if (cityList[key].Name === e.target.value) {
                    setDistrictList(cityList[key].Districts)
                    // console.log(districtList)
                  }
                })
              }}
            >
              <option key='blankChoice' hidden value='chọn tỉnh thành' />
              <option key='blankChoice' disabled>Chọn tỉnh thành....</option>
              {cityList.map((item) =>
                (<option key={item.Id}>{item.Name}</option>)
              )}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='district'>
            <Form.Label>Quận huyện</Form.Label>
            <Form.Control
              as='select'
              type='text'
              placeholder='Quận huyện'
              value={district}
              required
              onChange={(e) => {
                setDistrict(e.target.value)
                setWardList([])
                setWard('')
                setDetail('')
                Object.keys(districtList).forEach((key) => {
                  if (districtList[key].Name === e.target.value) {
                    setWardList(districtList[key].Wards)
                    console.log(wardList)
                  }
                })

              }}
            >
              <option key='blankChoice' hidden value />
              <option key='blankChoice' disabled>Chọn quận huyện....</option>
              {districtList.map((item) =>
                (<option key={item.Id}>{item.Name}</option>)
              )}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='ward'>
            <Form.Label>Xã phường</Form.Label>
            <Form.Control
              as='select'
              type='text'
              placeholder='Xã phường'
              value={ward}
              required

              onChange={(e) => {
                setDetail('')
                setWard(e.target.value)
              }}
            >
              <option key='blankChoice' hidden value />
              <option key='blankChoice' disabled>Chọn xã phường....</option>
              {wardList.map((item) =>
                (<option key={item.Id}>{item.Name}</option>)
              )}
            </Form.Control>
          </Form.Group>


          <Form.Group controlId='detail'>
            <Form.Label>Địa chỉ, số nhà, thôn xóm</Form.Label>
            <Form.Control
              type='text'
              placeholder='số nhà, thôn xóm, tổ dân phố...'
              value={detail}
              required
              onChange={(e) => {
                setDetail(e.target.value)
              }}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Tiếp tục
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ShippingScreen
