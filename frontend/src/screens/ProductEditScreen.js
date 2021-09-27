import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Image, FormGroup, Row, Col, ListGroup, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [gallery, setGallery] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const [hideThumbnail, setHideThumbnail] = useState(false)

  const [descriptionList, setDescriptionList] = useState([])

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
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
        setGallery(product.gallery)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)

        if (product.description) {
          setDescription(product.description)
          var list = Object.entries(product.description)
          // list.shift()
          if (list.length !== 0) {

            list.map((entry) => {
              descriptionList.push({ key: entry[0], value: entry[1] })
              setDescriptionList(descriptionList)
            })
          } else {
            setDescriptionList([{ key: "", value: "" }])
          }
        } else {
          setDescription({})
          setDescriptionList([{ key: "", value: "" }])
        }


      }

    }
  }, [dispatch, history, productId, product, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post(`/api/upload/${product._id}`, formData, config)

      //setImage(data)
      gallery.push({
        'name': data,
        'isThumbnail': false
      })
      setUploading(false)
      setGallery(gallery)

    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {

    descriptionList.map((entry) => {
      // console.log(entry['key'])
      description[entry['key']] = entry['value']
    })

    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        gallery,
        brand,
        category,
        description,
        countInStock,
      })
    )
    // console.log(description)
    // console.log(descriptionList)
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const list = [...descriptionList]
    list[index][name] = value
    setDescriptionList(list)
  }

  // handle click event of the Remove button
  const handleRemoveClick = index => {

    const list = [...descriptionList]
    console.log(list[index]['key'])
    delete description[list[index]['key']]
    list.splice(index, 1)
    // console.log(list)
    setDescriptionList(list)
    // console.log(descriptionList)

  }

  // handle click event of the Add button
  const handleAddClick = () => {
    setDescriptionList([...descriptionList, { key: "", value: "" }]);
  }

  const removeImageHandle = (imageName) => {
    product.gallery = product.gallery.filter(m => m['name'] !== imageName)

    setGallery(product.gallery)
  }

  const chooseThumbnailHandle = (imageName) => {
    gallery.forEach((element) => {
      if (element['name'] === imageName) {
        element['isThumbnail'] = true
      }
      else {
        element['isThumbnail'] = false
      }
    })

    setImage(imageName)
    setGallery(gallery)
  }

  return (
    <>
    <Meta title={product.name} />
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Quay lại
      </Link>
      <FormContainer>
        <h1>Chỉnh sửa thông tin</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label><h4>Tên sản phẩm</h4></Form.Label>
              <Form.Control
                required
                type='name'
                placeholder='Nhập tên'
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label><h4>Giá</h4></Form.Label>
              <Form.Control
                required
                min={0}
                type='number'
                placeholder='Nhập giá'
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='thumbnail'>
              <Form.Label><h4>Thumbnail</h4></Form.Label>
            </Form.Group>

            <Col>
              <Image src={image} fluid></Image>
            </Col>


            <fieldset>
              <Form.Group controlId='gallery' variant='flush'>

                <Form.Label><h4>Bộ sưu tập</h4></Form.Label>
                {gallery.length === 0 ? (<p><small>Không có ảnh</small></p>) :
                  (
                    <>
                      <br></br>
                      <Button
                        onClick={() => {
                          setHideThumbnail(!hideThumbnail)
                        }
                        }>
                        <small>Chọn thumbnail</small>
                      </Button>

                      {hideThumbnail && <>{gallery.map((i) => (
                        <Row key={i.name} className='' >
                          <Col className='align-self-center text-center'>
                            <Form.Check
                              type='radio'
                              name='chooseThumbnail'
                              id={i.name}
                              value={i.name}
                              onChange={(e) => chooseThumbnailHandle(e.target.value)}
                              defaultChecked={i.isThumbnail}
                            >
                            </Form.Check>
                          </Col>
                          <Col className='align-self-center'>
                            <Image src={i.name} alt={i} fluid='true' thumbnail='true' />
                          </Col>
                          <Col className='align-self-center text-right'>
                            <Button
                              type='button'
                              variant='light'
                              onClick={() => removeImageHandle(i.name)}
                            >
                              <i className='fas fa-trash'></i>
                            </Button>
                          </Col>
                        </Row>
                      ))
                      }
                      </>}
                    </>
                  )
                }
              </Form.Group>
            </fieldset>
            <Form.Group controlId='image'>
              <Form.Label><h4>Ảnh</h4></Form.Label>
              <Form.Control
                type='text'
                placeholder='Thêm ảnh'
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Chọn ảnh'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label><h4>Hãng</h4></Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='nhập thương hiệu'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label><h4>Số lượng còn lại</h4></Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                min={countInStock}
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label><h4>Phân loại</h4></Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <fieldset>
              <h4>Mô tả sản phẩm</h4>

              {descriptionList.map((x, i) => (
                <Form.Group controlId={x.key}>
                  <Row>
                    <Col md='4'>
                      <Form.Control
                        required
                        name='key'
                        type='text'
                        value={x.key}
                        onChange={(e) => handleInputChange(e, i)}
                      >

                      </Form.Control></Col>

                    <Col md='5'>
                      <Form.Control
                        required
                        name='value'
                        type='text'
                        value={x.value}
                        onChange={(e) => handleInputChange(e, i)}
                      >

                      </Form.Control></Col>

                    <Col className='btn-box text-right'>
                      {<Button onClick={() => handleRemoveClick(i)}>Xóa</Button>}
                      {/* {descriptionList.length - 1 === i && <Button onClick={() => handleAddClick()}>Thêm</Button>} */}
                    </Col>

                  </Row>

                </Form.Group>

              ))
              }
              <Row>
                <Col className='btn-box text-right'>
                  { <Button onClick={() => handleAddClick()}>Thêm</Button>}
                </Col>
              </Row>
              {/* <div style={{ marginTop: 20 }}>{JSON.stringify(descriptionList)}</div> */}
            </fieldset>


            {/* 
            <Button className='btn btn-light my-3'
              onClick={() => {
                setHideDescription(!hideDescription)
              }
              }>
              <h4>Mô tả sản phẩm</h4>
            </Button>

            {hideDescription &&
              <>
                <Form.Group controlId='display'>
                  <Form.Label><h5>Màn hình</h5></Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Nhập mô tả màn hình'
                    value={display}
                    onChange={(e) => {
                      //console.log(e.target.value)
                      setDisplay(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='os'>
                  <Form.Label><h5>Hệ điều hành</h5></Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Nhập mô tả hệ điều hành'
                    value={os}
                    onChange={(e) => {
                      //console.log(e.target.value)
                      setOs(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='backCamera'>
                  <Form.Label><h5>Camera sau</h5></Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Nhập mô tả Camera sau'
                    value={backCamera}
                    onChange={(e) => {
                      //console.log(e.target.value)
                      setBackCamera(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='frontCamera'>
                  <Form.Label><h5>Camera trước</h5></Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Nhập mô tả camera trước'
                    value={frontCamera}
                    onChange={(e) => {
                      //console.log(e.target.value)
                      setFrontCamera(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='chip'>
                  <Form.Label><h5>Chip</h5></Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Nhập mô tả chip'
                    value={chip}
                    onChange={(e) => {
                      //console.log(e.target.value)
                      setChip(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>

                <Row>
                  <Col>

                    <Form.Group controlId='internalStorage'>
                      <Form.Label><h5>Bộ nhớ trong</h5></Form.Label>
                      <Form.Control
                        required
                        type='text'
                        placeholder='Nhập mô Bộ nhớ trong'
                        value={internalStorage}
                        onChange={(e) => {
                          //console.log(e.target.value)
                          setInternalStorage(e.target.value)
                        }}
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group controlId='sim'>
                      <Form.Label><h5>Sim</h5></Form.Label>
                      <Form.Control
                        required
                        type='text'
                        placeholder='Nhập mô tả Sim'
                        value={sim}
                        onChange={(e) => {
                          //console.log(e.target.value)
                          setSim(e.target.value)
                        }}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId='pin'>
                      <Form.Label><h5>Pin</h5></Form.Label>
                      <Form.Control
                        required
                        type='text'
                        placeholder='Nhập mô tả pin'
                        value={pin}
                        onChange={(e) => {
                          //console.log(e.target.value)
                          setPin(e.target.value)
                        }}
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group controlId='charge'>
                      <Form.Label><h5>Bộ sạc</h5></Form.Label>
                      <Form.Control
                        required
                        type='text'
                        placeholder='Nhập mô tả Bộ sạc'
                        value={charge}
                        onChange={(e) => {
                          //console.log(e.target.value)
                          setCharge(e.target.value)
                        }}
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                </Row>
              </>}
            <br /> */}
            <Button type='submit' variant='primary'>
              Cập nhật
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
