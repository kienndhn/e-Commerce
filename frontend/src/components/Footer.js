import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer style={{height: "77px", background: "#343a40"}}>
      <Container >
        <Row>
          <Col className='text-center py-3' style={{color:'white'}} >Copyright &copy; ProShop</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
