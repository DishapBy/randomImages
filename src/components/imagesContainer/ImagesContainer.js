import React, {useEffect, useState} from "react";
import axios from "axios";
import ImageItem from "../imageItem/ImageItem";
import './styles.css'


const ImagesContainer = () => {

    const [dataList, setDataList] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [imageNumber, setImageNumber] = useState([])
    const [arrayForSlider, setArrayForSlider] = useState([])
    const [activeNumber, setActiveNumber] = useState(1);
    const [activeItem, setActiveItem] = useState({});
    const [wasItems, setWasItems] = useState([]);


    useEffect(() => {
        axios.get('https://j0.wlmediahub.com/App_Themes/api/test/phtos.js')
            .then(res => {
                const allData = res.data.photo;
                setDataList(allData);
                setArrayForSlider(() => oneImages(allData));
                setWasItems(arrayForSlider);
                setLoadingData(false);
            })


    }, [])

    const oneImages = (arr) => {
        let tmpArr = []
        for (let i = 0; i < 5; ) {
            let number = Math.floor(Math.random() * (500 - 1) + 1);

            if(!checkItems(arr[number])) {
                tmpArr.push(arr[number]);
                i++;
            }

            setArrayForSlider(tmpArr);
        }
        setWasItems([...wasItems, ...tmpArr])
        return tmpArr
    }


    useEffect(() => {
        if(wasItems.length === 15){
            setWasItems([])
        }
    }, [wasItems])

    const allPhotos = arrayForSlider.map((item, id) => {
        return (
            <ImageItem key={item.id} number={id} image={item}/>
        )
    })

    const oneItem = allPhotos[activeNumber];
    let container = null;

    const getNewImage = (number) => {
        setActiveNumber(number)
    }

    const checkItems = (itemForCheck) => {
        return wasItems.find(item => item === itemForCheck)
    }

    const refreshImages = () => {
        setArrayForSlider(() => oneImages(dataList));
    }

    if (!loadingData) {
        container =
            <div className={'container__main'}>
                {allPhotos[activeNumber]}
                <div className={'container__btn'}>
                    <div className={'numbers__btn'}>
                        {allPhotos.map(item => {
                                if(activeNumber === item.props.number){
                                   return <button key={item.props.number} className={'btn__active'} onClick={() => getNewImage(item.props.number)}>{item.props.number + 1}</button>
                                }else{
                                   return <button key={item.props.number} onClick={() => getNewImage(item.props.number)}>{item.props.number + 1}</button>
                                }
                        })}
                    </div>
                    {<button className={'btn__refresh'} onClick={refreshImages}>Refresh</button>}
                </div>

            </div>
    }


    return (
        <div>

            {loadingData
                ? <h2>Loading...</h2>
                : container
            }

        </div>
    )

}

export default ImagesContainer;