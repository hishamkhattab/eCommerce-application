import React, {useState} from 'react'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

import {SliderData} from "./../../slideData";

import "./style.scss";

const HomeDirectory = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
    
  const slideLength = SliderData.length;
  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  }

  const circleSlide = (idx) => {
    setCurrentSlide(idx);
  };

  return (
    <div className='slider-container'>
      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
      {SliderData.map((el, idx) => {
        const { image } = el;
        return (
          <div className={idx === currentSlide ? "slide-active" : "slide"} key={idx}>
            {idx === currentSlide &&
              <div style={{ backgroundImage: `url(${image})` }} className="image-container">
              </div>
            }
          </div>
        )
      })}
      <div className='nav-circle'>
        {SliderData.map((el, idx) => {
          return (
            <span
              key={`cir-${idx}`}
              className={idx === currentSlide ? "active" : ''}
              onClick={() => circleSlide(idx)}
            ></span>
          )
        })}
      </div>
    </div>
  )
}

export default HomeDirectory;
