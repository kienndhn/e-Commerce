import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Dropdown, DropdownButton, ButtonGroup, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
// import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import {
  listProducts,
  deleteProduct,
  createProduct,
  listProductsOnSale,

} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

import cashFormat from '../helper/currencyFormat'
// import { getProducts } from '../../../backend/controllers/productController'

const ProductListScreen = ({ history, match }) => {


  const [listMode, setListMode] = useState(localStorage.getItem('listMode'))

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const [count, setCount] = useState(0)
  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const productOnSale = useSelector((state) => state.productOnSale)
  const { loading: loadingOnSale, success: successOnSale, products: listOnSale } = productOnSale

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts(''))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    listMode,
    count
  ])

  const getDateTime = (value) => {
    const date = new Date(value)
    return date.toLocaleString()
  }

  const listAllHandler = () => {
    setListMode('All')
    localStorage.setItem('listMode', 'All')
    dispatch(listProducts)
  }

  const listOnSaleHandler = () => {
    setListMode('OnSale')
    localStorage.setItem('listMode', 'OnSale')
    dispatch(listProductsOnSale)
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <Row>
      <Col md='3'>
        <Row>
          <Col className='my-3'><h2>Ch???c n??ng</h2></Col></Row>
        <ListGroup>
          <ListGroup.Item
            as='a'
            href='/admin/orderlist'
          >
            Qu???n l?? ????n h??ng
          </ListGroup.Item>
          <ListGroup.Item
            as='a'
            href='/admin/productList'
          >
            Qu???n l?? s???n ph???m
          </ListGroup.Item>
          <ListGroup.Item
            as='a'
            href='/admin/userlist'
          >
            Qu???n l?? ng?????i d??ng
          </ListGroup.Item>
        </ListGroup>

      </Col>
      <Col>
        <Row className='align-items-center'>
          <Col>
            <DropdownButton
              className='my-3'
              as={ButtonGroup}
              id="dropdown-variants-Secondary total-price"
              variant={'secondary'}
              title="Danh m???c s???n ph???m">
              <Dropdown.Item
                onClick={() => listAllHandler()}
              >
                T???t c???
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => listAllHandler()}
              >
                B??n ch???y
              </Dropdown.Item>

              <Dropdown.Item
                onClick={() => listOnSaleHandler()}
              >
                Gi???m gi??
              </Dropdown.Item>

            </DropdownButton>

          </Col>
          <Col className='text-right'>
            {listMode === 'All' &&
              <Button className='my-3' onClick={createProductHandler}>
                <i className='fas fa-plus'></i> T???o s???n ph???m
              </Button>
            }
            {(listMode === 'OnSale' || listMode === 'selectProduct') &&
              <Button className='my-3' onClick={() => {
                setListMode('selectProduct')
                localStorage.setItem('listMode', 'selectProduct')
              }}>
                <i className='fas fa-plus'></i> Th??m S???n ph???m gi???m gi??
              </Button>
            }
          </Col>
        </Row>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Meta title={"Qu???n l?? s???n ph???m"} />
            {listMode === 'All' &&
              (
                <>
                  <caption style={{ width: '150px', textAlign: 'center', marginLeft: '15px' }}>T???t c??? s???n ph???m</caption>
                  <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                      <tr>
                        <th className='text-center'>STT</th>
                        <th className='text-center'>T??n</th>
                        <th className='text-center'>
                          <DropdownButton
                            as={ButtonGroup}
                            id="dropdown-variants-Secondary total-price"
                            variant={'secondary'}
                            title="Gi??">
                            <Dropdown.Item
                              onClick={() => dispatch(listProducts('', '{"price":-1}'))}
                            >
                              Gi???m d???n
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => dispatch(listProducts('', '{"price":1}'))}
                            >
                              T??ng d???n
                            </Dropdown.Item>
                          </DropdownButton></th>
                        <th className='text-center'>Ph??n lo???i</th>
                        <th className='text-center'><DropdownButton
                          as={ButtonGroup}
                          id="dropdown-variants-Secondary total-price"
                          variant={'secondary'}
                          title="???? b??n">
                          <Dropdown.Item
                            onClick={() => dispatch(listProducts('', '{"countSold":-1}'))}
                          >
                            Gi???m d???n
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => dispatch(listProducts('', '{"countSold":1}'))}
                          >
                            T??ng d???n
                          </Dropdown.Item>
                        </DropdownButton></th>
                        <th><DropdownButton
                          as={ButtonGroup}
                          id="dropdown-variants-Secondary total-price"
                          variant={'secondary'}
                          title="C??n l???i">
                          <Dropdown.Item
                            onClick={() => dispatch(listProducts('', '{"countInStock":-1}'))}
                          >
                            Gi???m d???n
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => dispatch(listProducts('', '{"countInStock":1}'))}
                          >
                            T??ng d???n
                          </Dropdown.Item>
                        </DropdownButton></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {products&&products.map((product) =>
                      (
                        <tr key={product._id}>
                          <td>{products.indexOf(product) + 1}</td>
                          <td>{product.name}</td>
                          <td>{cashFormat(product.price)} VN??</td>
                          <td>{product.category}</td>
                          <td>{product.countSold}</td>
                          <td>{product.countInStock}</td>
                          <td>
                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                              <Button variant='light' className='btn-sm'>
                                <i className='fas fa-edit'></i>
                              </Button>
                            </LinkContainer>
                            <Button
                              variant='danger'
                              className='btn-sm'
                              onClick={() => deleteHandler(product._id)}
                            >
                              <i className='fas fa-trash'></i>
                            </Button>
                          </td>
                        </tr>
                      )

                      )}
                    </tbody>
                  </Table></>

              )
            }
            {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
          </>
        )}
        {listMode === 'selectProduct' && (
          <>
            <caption style={{ width: '150px', textAlign: 'center', marginLeft: '15px' }}>Th??m khuy???n m???i</caption>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>T??n</th>
                  <th>Ph??n lo???i</th>
                  <th>Th??m</th>
                </tr>
              </thead>
              <tbody>
                {products&&products.map((product) => (
                  !product.onSale.isOnSale &&
                  <tr key={product._id}>
                    <td>{products.indexOf(product) + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>
                      {console.log()}
                      <LinkContainer to={`/admin/product/${product._id}/addPromotion`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>

                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

          </>
        )}
        {listMode === 'OnSale' && (
          <>
            <caption style={{ width: '150px', textAlign: 'center', marginLeft: '15px' }}>??ang khuy???n m???i</caption>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>T??n</th>
                  <th>Ph??n lo???i</th>
                  <th>B???t ?????u</th>
                  <th>K???t th??c</th>
                  <th>Gi?? b??n</th>
                  <th>Gi?? khuy???n m???i</th>
                </tr>
              </thead>
              <tbody>
                {products&&products.map((product) => (
                  product.onSale.isOnSale &&
                  <tr key={product._id}>
                    <td>{products.indexOf(product) + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{getDateTime(product.onSale.startDate)}</td>
                    <td>{getDateTime(product.onSale.endDate)}</td>
                    <td>{cashFormat(product.price)} VN??</td>
                    <td>{cashFormat(product.price * (1 - product.onSale.salePercent * 0.01))} VN??</td>
                    <td>
                      {console.log()}
                      <LinkContainer to={`/admin/product/${product._id}/addPromotion`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

          </>
        )}

      </Col>
    </Row>
  )
}

export default ProductListScreen
