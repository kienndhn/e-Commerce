import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const Gallery = ({ gallery }) => {
    const [images, setImages] = useState([])
    gallery.forEach((image) => {
        images.push({
            "original": image.name,
            "thumbnail": image.name
        })
    })
    // console.log(images)
    return (<>
        <ImageGallery items={images}
            // showNav={false}
            showThumbnails={false}
        />
    </>
    )
}

export default Gallery
