import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { listOrders, orderCreateAtDate, orderNotPairList, orderPairList, orderStatusList, sortOrdersByPriceAscending, sortOrdersByPriceDescending } from '../actions/orderActions'
import formatCash from '../helper/currencyFormat'
import { userDeleteReducer } from '../reducers/userReducers'
import Paginate from './Paginate'




function AdminOrdersList() {

    const dispatch = useDispatch()

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
    const buttonFunction = useSelector(state => state.buttonFunction)
    const { mode } = buttonFunction

    useEffect(() => {
        if (mode === "ORDERS_LIST") {
            dispatch(listOrders())
        }
    }, [mode])

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
                <li className="nav-item"><a className="nav-link active show" data-toggle="tab" href="#orders">T???t c??? ????n h??ng</a></li>
                <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#menu1">????n c???a kh??ch</a></li>
            </ul>

            <div className="tab-content">
                <br />

                <div id="orders" className="tab-pane fade in active show" style={{ overflow: "auto" }}>
                    <h2>T???t c???</h2>
                    <Paginate />
                    <div style={{ maxHeight: "450px", overflow: "auto" }}>
                        <table className='table-sm table table-hover table-striped table-bordered ' style={{ fontSize: "1.25rem !important" }} >
                            <thead>
                                <tr className="text-center">
                                    {/* <th>ID</th> */}
                                    <th><span>Ng?????i ?????t</span></th>
                                    <th>
                                        <DropdownButton
                                            as={ButtonGroup}
                                            id="dropdown-variants-Secondary total-price"
                                            variant=""
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
                                    <th><p>C???p nh???t</p></th>
                                    <th>
                                        <DropdownButton
                                            as={ButtonGroup}
                                            id="dropdown-variants-Secondary total-price"
                                            variant=""
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
                                            variant=""
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
                                    <th><DropdownButton
                                        as={ButtonGroup}
                                        id="dropdown-variants-Secondary pair"
                                        variant=""
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

                        </table >
                    </div>

                </div>
                <div id="menu1" className="tab-pane fade" style={{ overflow: "auto" }}>
                    <h2>Th???ng k??</h2>
                    <table className='table-sm table-striped table-bordered table-hover'>
                        {/* <tr><td>T???ng: {orders.length} ????n h??ng</td></tr> */}
                        <thead>
                            <tr>
                                <th>Ng?????i ?????t</th>
                                <th>T???ng s??? ????n</th>
                                <th>S??? ????n th??nh c??ng</th>
                                <th>S??? ????n th???t b???i</th>
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
                                                    Chi ti???t
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

