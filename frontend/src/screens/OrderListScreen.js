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
      <Meta title={"Quản lý đơn hàng"} />
      <Row>
        <Col>
          <Row>
            <Col className='my-3'><h2>Chức năng</h2></Col></Row>
          <ListGroup>
            <ListGroup.Item
              as='a'
              href='/admin/orderlist'
            >
              Quản lý đơn hàng
            </ListGroup.Item>
            <ListGroup.Item
              as='a'
              href='/admin/productList'
            >
              Quản lý sản phẩm
            </ListGroup.Item>
            <ListGroup.Item
              as='a'
              href='/admin/userlist'
            >
              Quản lý người dùng
            </ListGroup.Item>
          </ListGroup>

        </Col>
        <Col>
          <h1>Đơn hàng</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              {/* {orders && orderByUser()} */}
              <Table striped bordered hover responsive className='table-sm'>
                {/* <tr><td>Tổng: {orders.length} đơn hàng</td></tr> */}
                <thead>
                  <tr>
                    <th>Người đặt</th>
                    <th>Tổng số đơn</th>
                    <th>Số đơn thành công</th>
                    <th>Số đơn thất bại</th>
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
                              Chi tiết
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
                    <th>Người đặt</th>
                    <th>
                      <DropdownButton
                        as={ButtonGroup}
                        id="dropdown-variants-Secondary total-price"
                        variant={'secondary'}
                        title="Tạo đơn">
                        <Dropdown.Item
                          onClick={() => dispatch(listOrders())}
                        >
                          Tất cả
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => getOrderCreateAt(0)}
                        >
                          Hôm nay
                        </Dropdown.Item>

                        <Dropdown.Item
                          onClick={() => getOrderCreateAt(3)}
                        >
                          3 ngày trước
                        </Dropdown.Item>

                        <Dropdown.Item
                          onClick={() => getOrderCreateAt(7)}
                        >
                          1 tuần trước
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => getOrderCreateAt(30)}
                        >
                          1 tháng
                        </Dropdown.Item>
                      </DropdownButton>
                    </th>
                    <th><DropdownButton
                      as={ButtonGroup}
                      id="dropdown-variants-Secondary total-price"
                      variant={'secondary'}
                      title="Cập nhật">

                    </DropdownButton></th>
                    <th>
                      <DropdownButton
                        as={ButtonGroup}
                        id="dropdown-variants-Secondary total-price"
                        variant={'secondary'}
                        title="Tổng">
                        <Dropdown.Item
                          onClick={(e) => orderByPriceAscending()}
                        >Thấp đến cao</Dropdown.Item>
                        <Dropdown.Item
                          onClick={(e) => orderByPriceDescending()}
                        >Cao đến thấp</Dropdown.Item>
                      </DropdownButton>
                    </th>
                    <th>
                      <DropdownButton
                        as={ButtonGroup}
                        id="dropdown-variants-Secondary total-price"
                        variant={'secondary'}
                        title="Trạng thái">
                        <Dropdown.Item
                          onClick={(e) => dispatch(listOrders())}
                        >Tất cả</Dropdown.Item>
                        <Dropdown.Item
                          onClick={(e) => getOrderStatusList('waiting')}
                        >Chờ xử lý</Dropdown.Item>
                        <Dropdown.Item
                          onClick={(e) => getOrderStatusList('confirmed')}
                        >Đang đóng gói</Dropdown.Item>
                        <Dropdown.Item
                          onClick={(e) => getOrderStatusList('delivered')}
                        >Đang giao hàng</Dropdown.Item>
                        <Dropdown.Item
                          onClick={(e) => getOrderStatusList('canceled')}
                        >Đã hủy</Dropdown.Item>
                        <Dropdown.Item
                          onClick={(e) => getOrderStatusList('end')}
                        >Đã kết thúc</Dropdown.Item>
                      </DropdownButton>
                    </th>
                    <th>
                      <DropdownButton
                      as={ButtonGroup}
                      id="dropdown-variants-Secondary pair"
                      variant={'secondary'}
                      title="Thanh toán">
                      <Dropdown.Item
                        onClick={(e) => allOrders()}
                      >Tất cả</Dropdown.Item>
                      <Dropdown.Item
                        onClick={(e) => getOrderPairList()}
                      >Đã thanh toán</Dropdown.Item>
                      <Dropdown.Item
                        onClick={(e) => getOrderNotPairList()}
                      >Chưa thanh toán</Dropdown.Item>
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

                        <td>{formatCash(order.totalPrice)} VNĐ</td>
                        <td>
                          {order.status === 'waiting' && <p>Chờ xác nhận</p>}
                          {order.status === 'confirmed' && <p>Đang đóng gói</p>}
                          {order.status === 'delivered' && <p>Đang giao hàng</p>}
                          {order.status === 'canceled' && <p>Đã hủy</p>}
                          {order.status === 'end' && <p>Đã kết thúc</p>}
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
                              Chi tiết
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
