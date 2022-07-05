import React, { useState } from "react";

import "./style.scss";

export const CarouselItem = ({ children, width, content }) => {
    const carouselContentClass = (content === "image") ? "img-container" : "product-container";

    return (
        <div className="carousel-item" style={{ width: width }}>
            <div className={carouselContentClass}>
                {children}
            </div>
        </div>
    )
};



const Carousel = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const updateIndex = (newIndex) => {
        if (newIndex >= React.Children.count(children)) {
            newIndex = 0;
        } else if (newIndex < 0) {
            newIndex = React.Children.count(children) - 1;
        };

        setActiveIndex(newIndex);
    };

    return (
        <div className="carousel">
            <div
                className="inner"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
                {React.Children.map(children, (child, idx) => {
                    return React.cloneElement(child, {width: "100%"})
                })}
            </div>

            <div className="indicators">
                <button
                    className="indicators-prev"
                    onClick={() => updateIndex(activeIndex -1)}
                >
                    &lt;
                </button>
                <button
                    className="indicators-next"
                    onClick={() => updateIndex(activeIndex + 1)}
                >
                    &gt;
                </button>
            </div>
        </div>
    )
};

export default Carousel;

