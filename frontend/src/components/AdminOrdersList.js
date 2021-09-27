import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { listOrders, orderCreateAtDate, orderNotPairList, orderPairList, orderStatusList, sortOrdersByPriceAscending, sortOrdersByPriceDescending } from '../actions/orderActions'
import formatCash from '../helper/currencyFormat'
import { userDeleteReducer } from '../reducers/userReducers'




function AdminOrdersList() {

    const dispatch = useDispatch()

    const buttonFunction = useSelector(state => state.buttonFunction)
    const { mode } = buttonFunction

    const orderList = useSelector((state) => state.orderList)
    const { loading, error, orders } = orderList

    const [userOrder, setUserOrder] = useState([])

    const orderByUser = (orders) => {

        let list = {}
        orders.forEach(element => {
            list[element.user.name] = {}
            list[element.user.name]["total"] = 0
            list[element.user.name]["success"] = 0
            list[element.user.name]["fail"] = 0
            list[element.user.name]["id"] = element.user._id
        })

        orders.forEach(element => {
            list[element.user.name]["total"]++
            if (element.status === 'end' && element.isPaid) {
                list[element.user.name]["success"]++
            }
            if ((element.status === 'end' && !element.isPaid) || element.status === 'canceled')
                list[element.user.name]["fail"]++
        })

        userOrder.splice(0, userOrder.length)

        Object.keys(list).forEach((key) => {
            setUserOrder(userOrder => [...userOrder, ...[{ count: list[key], "name": key }]])
        })
        // console.log(userOrder)

    }

    useEffect(() => {
        dispatch(listOrders())
    }, [])

    useEffect(() => {
        if (orders) {
            orderByUser(orders)
        }
    }, [orders])

    const getDateTime = (value) => {
        const date = new Date(value)
        return date.toLocaleString()
    }

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


    return (
        mode === "ORDERS_LIST" &&
        <div style={{}}>

            <ul className="nav nav-tabs">
                <li className="nav-item"><a className="nav-link active show" data-toggle="tab" href="#orders">Tất cả đơn hàng</a></li>
                <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#menu1">Đơn của khách</a></li>

            </ul>

            <div className="tab-content">
                <br />

                <div id="orders" className="tab-pane fade in active show">
                    <h2>Tất cả</h2>
                    <table className='table-sm table table-hover table-striped table-bordered table-responsive' style={{ height: "500px", fontSize: "1.25rem !important" }} >
                        <thead>
                            <tr className="text-center">
                                {/* <th>ID</th> */}
                                <th><span>Người đặt</span></th>
                                <th>
                                    <DropdownButton
                                        as={ButtonGroup}
                                        id="dropdown-variants-Secondary total-price"
                                        variant=""
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
                                <th><p>Cập nhật</p></th>
                                <th>
                                    <DropdownButton
                                        as={ButtonGroup}
                                        id="dropdown-variants-Secondary total-price"
                                        variant=""
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
                                        variant=""
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
                                <th><DropdownButton
                                    as={ButtonGroup}
                                    id="dropdown-variants-Secondary pair"
                                    variant=""
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

                                <th><p>Xem</p></th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                orders && orders.map((order) =>
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

                    </table >
                </div>
                <div id="menu1" className="tab-pane fade">
                    <h2>Thống kê</h2>
                    <table className='table-sm table-striped table-bordered table-hover table-responsive'>
                        {/* <tr><td>Tổng: {orders.length} đơn hàng</td></tr> */}
                        <thead>
                            <tr>
                                <th>Người đặt</th>
                                <th>Tổng số đơn</th>
                                <th>Số đơn thành công</th>
                                <th>Số đơn thất bại</th>
                                <th>xem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userOrder.length > 0 && userOrder.map((user) => (
                                    <tr key={user.name}>
                                        <td>{user.name}</td>
                                        <td>{user.count.total}</td>
                                        <td>{user.count.success}</td>
                                        <td>{user.count.fail}</td>
                                        <td>
                                            <LinkContainer to={`/admin/order/user/${user.count.id}`}>
                                                <Button variant='light' className='btn-sm'>
                                                    Chi tiết
                                                </Button>
                                            </LinkContainer></td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>
                </div>

            </div>


        </div >
    )
}



export default AdminOrdersList

