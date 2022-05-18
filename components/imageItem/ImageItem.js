import React, {Component} from 'react';
import './style.css'

const ImageItem = (props) => {
    const {title, description, img} = props.image;

    return(
        <div className={'container__img active'}>
            <span className={'title__img'}>title {title}</span>
            <img src={img} alt="description"/>
            <p className={'description__img'}>{description}</p>
        </div>
    )
}

export default ImageItem;