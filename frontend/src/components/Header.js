import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import BrandCategory from './BrandCategory'
import AdminFunction from './AdminFunction'
const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const buttonFunction = useSelector(state => state.buttonFunction)
  const { mode } = buttonFunction

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <header style={{ position: 'sticky', top: '0px', zIndex: "200" }}>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect >
          <Container>
            <LinkContainer to={userInfo && userInfo.isAdmin ? '/admin/dashboard' : '/'}>
              <Navbar.Brand>Điện thoại Ngon</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              {((userInfo && !userInfo.isAdmin) || (!userInfo)) ?
                <>
                  <Route render={({ history }) => <SearchBox history={history} />} />
                  <Nav className='ml-auto'>
                    <LinkContainer to='/cart'>
                      <Nav.Link>
                        <i className='fas fa-shopping-cart'></i> Giỏ hàng
                      </Nav.Link>
                    </LinkContainer>
                    {userInfo ? (
                      <NavDropdown title={userInfo.name} id='username'>
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item>Hồ sơ</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}>
                          Đăng suất
                        </NavDropdown.Item>
                      </NavDropdown>
                    ) : (
                      <LinkContainer to='/login'>
                        <Nav.Link>
                          <i className='fas fa-user'></i> Đăng nhập
                        </Nav.Link>
                      </LinkContainer>
                    )}
                  </Nav>
                </> :
                <>
                  {/* <NavDropdown title={userInfo.name} id='username'>

                  <LinkContainer to='/profile'>
                    <NavDropdown.Item><Nav.Link>Hồ sơ</Nav.Link></NavDropdown.Item>
                  </LinkContainer> */}


                  {/* <Nav.Link onClick={logoutHandler}>Đăng suất</Nav.Link> */}


                  {/* </NavDropdown> */}
                  <Nav className="d-md-none d-block">
                    <a className="w-100" href="#orders">
                      <div className={`btn w-100 ${mode === 'ORDERS_LIST' ? 'btn-dark' : 'btn-light'}`}
                        onClick={(e) => {
                          // setActive('btn1')
                          dispatch({ type: "ORDERS_LIST" })
                        }}>Danh sách đơn hàng</div>
                    </a>
                    <a className="w-100" href="#users">
                      <div className={`w-100 btn ${mode === 'USERS_LIST' ? 'btn-dark' : 'btn-light'}`}
                        onClick={(e) => {
                          // setActive('btn2')
                          dispatch({ type: "USERS_LIST" })
                        }}>Danh sách người dùng</div>
                    </a>
                    <a className="w-100" href="#products">
                      <div className={`w-100 btn ${mode === 'PRODUCTS_LIST' ? 'btn-dark' : 'btn-light'} `}
                        onClick={(e) => {
                          // setActive('btn3')
                          dispatch({ type: "PRODUCTS_LIST" })
                        }}>Danh sách sản phẩm</div>
                    </a>
                    <a className="w-100" href="#admin">
                      <div className={`w-100 btn ${mode === 'USER_INFO' ? 'btn-dark' : 'btn-light'} `}
                        onClick={(e) => {
                          // setActive('btn4')
                          dispatch({ type: "USER_INFO" })
                        }
                        }>Quản trị viên</div>
                    </a>

                  </Nav>
                  <ul className="navbar-nav px-3 ml-auto">
                    <li className="nav-item text-nowrap m-auto text-center">
                      <a className="nav-link" href="#" onClick={logoutHandler}>Đăng suất</a>
                    </li>
                  </ul>
                </>
              }

            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* {<BrandCategory />} */}
      </header>
    </>
  )
}

export default Header
