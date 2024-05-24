import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import { GetSeries } from '../../ReduxSystem/GetMovieSlice';
import { useNavigate } from "react-router-dom"
import { CreditsSeries, DetailsSeries } from '../../ReduxSystem/DetailsSeriesSlice';

const SeriesHome = () => {

    const [slidesToShow, setSlidesToShow] = useState(4);

    const { dataSeries } = useSelector(state => state.movieData)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetSeries())
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

    const handleDetails = (series) => {
        dispatch(DetailsSeries(series.id))
        dispatch(CreditsSeries(series.id))
        navigate(`/tv/${series.id}/name/${series.name}`)
    }

    return (

        <div className='container'>

            <h2 className='mt-5 mb-5 text-info text-center text-lg-start'>SERIES</h2>
            <Slider {...settings} className='m-4'>
                {dataSeries.map((series, index) => (
                    <div key={index} className='d-flex flex-column justify-content-center align-items-center'>
                        <img className='cursor-pointer  p-md-2 p-lg-3 p-xl-3 size-img-media' onClick={() => handleDetails(series)} style={{ width: "18rem" }} src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${series.poster_path}`} />
                    </div>
                ))}
            </Slider>
        </div>

    )
}

export default SeriesHome