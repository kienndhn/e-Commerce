import React from 'react'

import {  Nav } from 'react-bootstrap'


const BrandCategory = () => {

    return (
    <>
        <Nav fill variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link href="/brand/samsung">Samsung</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/brand/xiaomi">Xiaomi</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/brand/realme">Realme</Nav.Link>
            </Nav.Item>        
            <Nav.Item>
                <Nav.Link href="/brand/oppo">OPPO</Nav.Link>
            </Nav.Item>       
            <Nav.Item>
                <Nav.Link href="/brand/vivo">VIVO</Nav.Link>
            </Nav.Item>       
        </Nav>
    </>
    )
}

export default BrandCategory