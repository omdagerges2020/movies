import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import { GetMovies } from '../../ReduxSystem/GetMovieSlice';
import {useNavigate} from "react-router-dom"
import { Credits, DetailsMovies } from '../../ReduxSystem/DetailsMoviesSlice';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "react-responsive";
import { useState } from 'react';

const MoviesHome = () => {

    const dispatch = useDispatch()
    const [slidesToShow, setSlidesToShow] = useState(4);
    const { dataMovies } = useSelector(state => state.movieData)

    useEffect(() => {
        dispatch(GetMovies())
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, [])



    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: slidesToShow,
      };
    

      const handleResize = () => {
        if (window.innerWidth >= 1200) {
          setSlidesToShow(4);
        } else if (window.innerWidth >= 992) {
          setSlidesToShow(3);
        }else if (window.innerWidth >= 768) {
            setSlidesToShow(2);
        } else {
          setSlidesToShow(1);
        }
      };

    
    const navigate = useNavigate()

    const handleDetails = (movie)=>{
        const encodedTitle = encodeURIComponent(movie.title.toLowerCase().replace(/%3A/g, '').replace(/%20/g, '-').replace(/ /g, '-'));

        dispatch(DetailsMovies(movie.id))
        dispatch(Credits(movie.id))
        navigate(`/movie/${movie.id}/title/${encodedTitle}`)
    }



    return (
        <div className='container'>

            <h2 className='mt-5 mb-5 text-info text-center text-lg-start'>MOVIES</h2>
            <Slider {...settings} className='m-4'>
                {dataMovies.map((movie, index) => (
                    <div key={index} className='d-flex flex-column justify-content-center align-items-center'>
                        <img className='cursor-pointer p-md-2 p-lg-3 p-xl-3 size-img-media' onClick={()=> handleDetails(movie)} style={{ width: "18rem" }} src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} />
                    </div>
                ))}
            </Slider>
        </div>
    )
}



export default MoviesHome