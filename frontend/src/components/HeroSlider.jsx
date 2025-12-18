import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    const slides = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop',
            title: 'Grand Opening Sale',
            subtitle: 'Up to 50% off on all electronics'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
            title: 'New Arrivals',
            subtitle: 'Check out the latest fashion trends'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop',
            title: 'Smart Gadgets',
            subtitle: 'Upgrade your lifestyle today'
        }
    ];

    return (
        <div className="w-full relative bg-gray-100 mb-8 overflow-hidden rounded-md shadow-md">
            <Slider {...settings}>
                {slides.map((slide) => (
                    <div key={slide.id} className="relative h-80 md:h-96 outline-none">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay Gradient (Amazon style) */}
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>

                        <div className="absolute bottom-10 left-10 text-white z-10 p-4">
                            <h2 className="text-4xl font-bold mb-2 shadow-sm drop-shadow-lg">{slide.title}</h2>
                            <p className="text-xl font-medium drop-shadow-md">{slide.subtitle}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HeroSlider;
