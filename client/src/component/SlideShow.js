import { Box, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'

const SlideShow = () => {

    const images = [
        '/image/banner-2.jpg',
        '/image/banner-3.jpg',
        '/image/banner.jpg',
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const prevSlide = () => {
        setCurrentSlide((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 4000);

        return () => clearInterval(interval);
    }, [images.length]);
    return (
        <Box className="flex w-full justify-center p-4">
            <Box className="flex w-1/2 !rounded">
                <Box className="button-slide  my-auto" onClick={prevSlide} sx={{ marginRight: -3 }}>
                    <IconButton className='!bg-white !rounded-full' >&#10094;</IconButton>
                </Box>
                <Box src={images[currentSlide]} alt={`Slide ${currentSlide}`} component='img'
                    sx={{
                        height: 370,

                    }} />
                <Box className="button-slide my-auto" onClick={nextSlide} sx={{ marginLeft: -3 }}>
                    <IconButton className='!bg-white !rounded-full'>&#10095;</IconButton>
                </Box>
            </Box>
            <Box className="flex w-1/4">
                <Box>
                    <Box component='img' src={"/image/banner-4.png"} alt="image" sx={{ height: 1 / 2 }} />
                    <Box component='img' src={"/image/banner-5.png"} alt="image" sx={{ height: 1 / 2 }} />
                </Box>
            </Box>
        </Box>
    )
}

export default SlideShow