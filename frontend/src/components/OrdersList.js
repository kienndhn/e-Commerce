import React from 'react'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import cashFormat from '../helper/currencyFormat.js'

const OrdersList = () => {


    const buttonFunction = useSelector(state => state.buttonFunction)
    const { mode } = buttonFunction

    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    return (
        mode === "ORDERS_LIST" &&
        // <div className="" md={8}>
        <>
            <h2>Đơn hàng của tôi</h2>

            <div className='table table-striped table-bordered table-hover table-sm text-center table-responsive' style={{ color: "black", maxHeight: '500px', overflow: "auto" }}>
                <thead >
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Thời gian tạo đơn</th>
                        <th scope="col">Giá trị</th>
                        <th scope="col">Thanh toán</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map((order) => (
                        <>
                            <tr key={order._id}>
                                <td>{order._id.substring(0, 6)}...</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{cashFormat(order.totalPrice)} VNĐ</td>
                                <td>
                                    {order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    )}
                                </td>
                                <td>
                                    {order.status === 'waiting' && <p>Đang chờ xác nhận</p>}
                                    {order.status === 'confirmed' && <p>Đã xác nhận, chờ gửi hàng</p>}
                                    {order.status === 'delivered' && <p>Đang giao hàng</p>}
                                    {order.status === 'end' && <p>Đã kết thúc</p>}
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <div className="btn btn-light"  >
                                            Chi tiết
                                        </div>
                                    </LinkContainer>
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </div>

            {/* </Col> */}
        </>
    )
}

export default OrdersList