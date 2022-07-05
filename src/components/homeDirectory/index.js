import React from 'react'
import Carousel, {CarouselItem} from "./../carousel";


//images
import image1 from "./../../assets/images-2.jpg"
import image2 from "./../../assets/images-4.jpg"

import "./style.scss";

const HomeDirectory = () => {
  return (
    <div className='home-directory'>
      <Carousel>
        <CarouselItem content="image">
          <img src={image1} alt='image_2'/>
        </CarouselItem>
        <CarouselItem content="image">
          <img src={image2} alt='image_1'/>
        </CarouselItem>
      </Carousel>
    </div>
  )
}

export default HomeDirectory;
