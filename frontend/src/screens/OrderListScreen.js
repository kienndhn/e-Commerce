import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, ButtonGroup, ListGroup } from 'react-bootstrap'
import { DropdownButton } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import {
  listOrders,
  sortOrdersByPriceAscending,
  sortOrdersByPriceDescending,
  orderPairList,
  orderNotPairList,
  orderCreateAtDate,
  orderStatusList
}
  from '../actions/orderActions'

import formatCash from '../helper/currencyFormat'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [userOrder, setUserOrder] = useState([])
  // var userOrder = []
  const [hideOrderList, setHideOrderList] = useState(true)
  const [hideUserList, setHideUserList] = useState(true)

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
      orderByUser()
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])


  const orderByPriceAscending = () => {
    dispatch(sortOrdersByPriceAscending())
  }
  const orderByPriceDescending = () => {
    dispatch(sortOrdersByPriceDescending())

  }
  const allOrders = () => {
    dispatch(listOrders())
  }

  const getOrderPairList = () => {
    if (!orders) {
      dispatch(listOrders())
    }
    dispatch(orderPairList())
  }
  const getOrderNotPairList = () => {
    if (!orders) {
      dispatch(listOrders())
    }
    dispatch(orderNotPairList())
  }

  const getOrderStatusList = (status) => {
    if (!orders) {
      dispatch(listOrders())
    }
    dispatch(orderStatusList(status))
  }


  const getOrderCreateAt = (value) => {
    dispatch(orderCreateAtDate(value))
  }
  const getDateTime = (value) => {
    const date = new Date(value)
    return date.toLocaleString()
  }



  const orderByUser = async () => {

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders`, config)


    let list = {}
    data.forEach(element => {
      list[element.user.name] = {}
      list[element.user.name]["total"] = 0
      list[element.user.name]["success"] = 0
      list[element.user.name]["fail"] = 0
      list[element.user.name]["id"] = element.user._id
    })

    data.forEach(element => {
      list[element.user.name]["total"]++
      if (element.status === 'end' && element.isPaid) {
        list[element.user.name]["success"]++
      }
      if ((element.status === 'end' && !element.isPaid) || element.status === 'canceled')
        list[element.user.name]["fail"]++
    })
    userOrder.splice(0, userOrder.length)

    Object.keys(list).forEach((key) => {
      userOrder.push({ count: list[key], "name": key })
    })
    console.log(userOrder)

  }
  return (
    <>
      <Meta title={"Qu???n l?? ????n h??ng"} />
      <Row>
        <Col>
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
          <h1>????n h??ng</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              {/* {orders && orderByUser()} */}
              <Table striped bordered hover responsive className='table-sm'>
                {/* <tr><td>T???ng: {orders.length} ????n h??ng</td></tr> */}
                <thead>
                  <tr>
                    <th>Ng?????i ?????t</th>
                    <th>T???ng s??? ????n</th>
                    <th>S??? ????n th??nh c??ng</th>
                    <th>S??? ????n th???t b???i</th>
                    <th
                      onClick={() => { setHideUserList(!hideUserList) }}
                    >xem</th>
                  </tr>
                </thead>
                {hideUserList&&<tbody>
                  {
                    userOrder.map((element) => (
                      <tr>
                        <td>{element.name}</td>
                        <td>{element.count.total}</td>
                        <td>{element.count.success}</td>
                        <td>{element.count.fail}</td>
                        <td>
                          <LinkContainer to={`/admin/order/user/${element.count.id}`}>
                            <Button variant='light' className='btn-sm'>
                              Chi ti???t
                            </Button>
                          </LinkContainer></td>
                      </tr>
                    ))
                  }
                </tbody>
                }
              </Table>
              {<Table striped bordered hover responsive className='table-sm'>

                <thead>
                  <tr>
                    {/* <th>ID</th> */}
                    <th>Ng?????i ?????t</th>
                    <th>
                      <DropdownButton
                        as={ButtonGroup}
                        id="dropdown-variants-Secondary total-price"
                        variant={'secondary'}
                        title="T???o ????n">
                        <Dropdown.Item
                          onClick={() => dispatch(listOrders())}
                        >
                          T???t c???
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => getOrderCreateAt(0)}
                        >
                          H??m nay
                        </Dropdown.Item>

                        <Dropdown.Item
                          onClick={() => getOrderCreateAt(3)}
                        >
                          3 ng??y tr?????c
                        </Dropdown.Item>

                        <Dropdown.Item
                          onClick={() => getOrderCreateAt(7)}
                        >
                          1 tu???n tr?????c
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => getOrderCreateAt(30)}
                        >
                          1 th??ng
                        </Dropdown.Item>
                      </DropdownButton>
                    </th>
                    <th><DropdownButton
                      as={ButtonGroup}
                      id="dropdown-variants-Secondary total-price"
                      variant={'secondary'}
                      title="C???p nh???t">

                    </DropdownButton></th>
                    <th>
                      <DropdownButton
                        as={ButtonGroup}
                        id="dropdown-variants-Secondary total-price"
                        variant={'secondary'}
                        title="T???ng">
                        <Dropdown.Item
                          onClick={(e) => orderByPriceAscending()}
                        >Th???p ?????n cao</Dropdown.Item>
                        <Dropdown.Item
                          onClick={(e) => orderByPriceDescending()}
                        >Cao ?????n th???p</Dropdown.Item>
                      </DropdownButton>
                    </th>
                    <th>
                      <DropdownButton
                        as={ButtonGroup}
                        id="dropdown-variants-Secondary total-price"
                        variant={'secondary'}
                        title="Tr???ng th??i">
                        <Dropdown.Item
                          onClick={(e) => dispatch(listOrders())}
                        >T???t c???</Dropdown.Item>
                        <Dropdown.Item
                          onClick={(e) => getOrderStatusList('waiting')}
                        >Ch??? x??? l??</Dropdown.Item>
                        <Dropdown.Item
                          onClick={(e) => getOrderStatusList('confirmed')}
                        >??ang ????ng g??i</Dropdown.Item>
                        <Dropdown.Item
                          onClick={(e) => getOrderStatusList('delivered')}
                        >??ang giao h??ng</Dropdown.Item>
                        <Dropdown.Item
                          onClick={(e) => getOrderStatusList('canceled')}
                        >???? h???y</Dropdown.Item>
                        <Dropdown.Item
                          onClick={(e) => getOrderStatusList('end')}
                        >???? k???t th??c</Dropdown.Item>
                      </DropdownButton>
                    </th>
                    <th>
                      <DropdownButton
                      as={ButtonGroup}
                      id="dropdown-variants-Secondary pair"
                      variant={'secondary'}
                      title="Thanh to??n">
                      <Dropdown.Item
                        onClick={(e) => allOrders()}
                      >T???t c???</Dropdown.Item>
                      <Dropdown.Item
                        onClick={(e) => getOrderPairList()}
                      >???? thanh to??n</Dropdown.Item>
                      <Dropdown.Item
                        onClick={(e) => getOrderNotPairList()}
                      >Ch??a thanh to??n</Dropdown.Item>
                    </DropdownButton></th>

                    <th
                      onClick={() => { setHideOrderList(!hideOrderList) }}
                    >
                      Xem</th>
                  </tr>
                </thead>
                {!hideOrderList && <tbody>
                  {
                    orders.map((order) =>
                    (
                      <tr key={order._id}>
                        {/* <td>{order._id}</td> */}
                        <td>{order.user && order.user.name}</td>
                        <td>{getDateTime(order.createdAt)}</td>
                        <td>{getDateTime(order.updatedAt)}</td>

                        <td>{formatCash(order.totalPrice)} VN??</td>
                        <td>
                          {order.status === 'waiting' && <p>Ch??? x??c nh???n</p>}
                          {order.status === 'confirmed' && <p>??ang ????ng g??i</p>}
                          {order.status === 'delivered' && <p>??ang giao h??ng</p>}
                          {order.status === 'canceled' && <p>???? h???y</p>}
                          {order.status === 'end' && <p>???? k???t th??c</p>}
                        </td>
                        <td>
                          {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                          )}
                        </td>


                        <td>
                          <LinkContainer to={`/admin/order/${order._id}`}>
                            <Button variant='light' className='btn-sm'>
                              Chi ti???t
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    )

                    )}

                </tbody>
                }
              </Table>}
            </>
          )}
        </Col>

      </Row>


    </>
  )
}

export default OrderListScreen
