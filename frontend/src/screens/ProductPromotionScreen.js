
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Image, FormGroup, Row, Col, ListGroup, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProductOnSale } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'
const ProductPromotionScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [onSale, setOnSale] = useState('')

  const [isOnSale, setIsOnSale] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [salePercent, setSalePercent] = useState(0)


  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate
  const minDate = (new Date()).toISOString().split('T')[0]
  useEffect(() => {
    console.log(minDate)

    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setCountInStock(product.countInStock)

        setOnSale(product.onSale)

        if(product.onSale.isOnSale){
          setIsOnSale(true)
          setSalePercent(product.onSale.salePercent)
          setEndDate(product.onSale.endDate.substring(0, 10))
          setStartDate(product.onSale.startDate.substring(0, 10))
        }

        console.log(product)

      }
    }
  }, [dispatch, history, productId, product, successUpdate])




  const submitHandler = (e) => {

    onSale.isOnSale = true
    onSale.salePercent = salePercent
    onSale.endDate = endDate
    onSale.startDate = startDate

    e.preventDefault()
    dispatch(
      updateProductOnSale({
        _id: productId,
        onSale
      })
    )
  }


  return (
    <>
      <Meta title={"Quản lý Khuyến mại"} />
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Quay lại
      </Link>
      <FormContainer>
        <h1>Thêm khuyến mại</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (

          <Form onSubmit={submitHandler}>
            <Form.Group controlId='thumbnail'>
              <Form.Label><h4>Thumbnail</h4></Form.Label>
            </Form.Group>

            <Col>
              <Image src={image} fluid></Image>
            </Col>
            <Form.Group controlId='name'>
              <Form.Label><h4>Tên sản phẩm</h4></Form.Label>
              <Form.Control
                disabled
                type='name'
                placeholder='Nhập tên'
                value={name}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label><h4>Giá</h4></Form.Label>
              <Form.Control
                disabled
                min={0}
                type='number'
                placeholder='Nhập giá'
                value={price}
              // onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='salePercent'>
              <Form.Label><h4>Khuyến mãi</h4></Form.Label>
              <Form.Control
                required
                min={1}
                max={99}
                type='number'
                placeholder='Nhập giá'
                value={salePercent}
                onChange={(e) => setSalePercent(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* <Form.Group controlId='startDate'>
              <Form.Label><h4>Bắt đầu</h4></Form.Label>
              <Form.Control
                required
                // min={minDate}
                // type='date'
                disabled
                placeholder='Nhập giá'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              ></Form.Control>
            </Form.Group> */}

            <Form.Group controlId='startDate'>
              <Form.Label><h4>Bắt đầu</h4></Form.Label>
              <Form.Control
                required
                // min={minDate}
                type='date'
                placeholder='Nhập giá'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='endDate'>
              <Form.Label><h4>Kết thúc</h4></Form.Label>
              <Form.Control
                required
                min={minDate}
                type='date'
                placeholder='Nhập giá'
                value={endDate}
                onChange={(e) => {
                  console.log(e.target.value)
                  setEndDate(e.target.value)}}
              ></Form.Control>
            </Form.Group>


            <Button type='submit' variant='primary'>
              Cập nhật
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductPromotionScreen
