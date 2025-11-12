import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const Banner = () => {
    const {loading, bannerData} = useContext(AuthContext)
    const data = bannerData
    if(loading){
        return <p>Loading</p>
    }

    console.log(data);
    return (
        <div className="carousel w-full h-[500px] ">
            {data.map((slide) => (
                <div key={slide.id} id={slide.id} className="carousel-item relative w-full ">
                    <img
                        src={slide.imageSrc}
                        className="w-full"
                        alt={slide.altText}
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href={`#${slide.prevSlide}`} className="btn btn-circle">❮</a>
                        <a href={`#${slide.nextSlide}`} className="btn btn-circle">❯</a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Banner;