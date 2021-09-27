import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { deleteUser, listUsers } from '../actions/userActions'

export default function AdminUsersList() {
    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    const userDelete = useSelector((state) => state.userDelete)
    const { success: successDelete } = userDelete

    const buttonFunction = useSelector(state => state.buttonFunction)
    const { mode } = buttonFunction

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteUser(id))
        }
    }

    useEffect(() => {
        dispatch(listUsers())
    }, [successDelete])

    return (

        mode === "USERS_LIST" &&
        <>
            <h2>Dang sách người dùng</h2>

            <table className='table-sm table table-striped table-bordered table-hover table-responsive'>
                <thead className="text-center">
                    <tr>
                        <th><p>STT</p></th>
                        <th><p>Tên người dùng</p></th>
                        <th><p>Số điện thoại</p></th>
                        <th><p>Tổng đơn đặt hàng</p></th>
                        <th><p>Đơn thành công</p></th>
                        <th><p>Admin</p></th>
                        <th><p>xóa</p></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user) => (
                        <tr key={user._id}>
                            <td>{users.indexOf(user) + 1}</td>
                            <td>{user.name}</td>
                            <td>
                                {user.mobile}
                            </td>
                            <td>
                                {user.countOrder}
                            </td>
                            <td>
                                {user.finishedOrder}
                            </td>
                            <td>
                                {user.isAdmin ? (
                                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button
                                    variant='danger'
                                    className='btn-sm'
                                    onClick={() => deleteHandler(user._id)}
                                >
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
