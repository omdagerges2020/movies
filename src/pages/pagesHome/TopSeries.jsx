import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { GetSeries } from '../../ReduxSystem/GetMovieSlice';
import StarRatings from 'react-star-ratings';
import { useNavigate } from "react-router-dom"
import { CreditsSeries, DetailsSeries } from '../../ReduxSystem/DetailsSeriesSlice';


const TopSeries = () => {

    const dispatch = useDispatch()
    const { topSeries } = useSelector(state => state.movieData)


    useEffect(() => {
        dispatch(GetSeries())
    }, [])

    const navigate = useNavigate()

    const handleDetails = (seriesTop) => {
        const encodedName = encodeURIComponent(seriesTop.name.toLowerCase().replace(/%3A/g, '').replace(/%20/g, '-').replace(/ /g, '-'));

        dispatch(DetailsSeries(seriesTop.id))
        dispatch(CreditsSeries(seriesTop.id))
        navigate(`/tv/${seriesTop.id}/name/${encodedName}`)
    }


    return (
        <div>
            <div className='container'>

                <h2 className='mt-5 mb-5 text-info text-center text-lg-start'>TOP SERIES</h2>

                <div className='d-flex gap-5 justify-content-center align-items-center flex-wrap'>
                    {topSeries.map((seriesTop, index) => (
                        <Card variant="dark" key={index} style={{ width: '18rem' }} className='bg-dark'>
                            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${seriesTop.poster_path}`} />
                            <Card.Body className='d-flex flex-column gap-3'>
                                <Card.Title className='text-light m-0'>TAITLE : {seriesTop.name}</Card.Title>
                                <div className='text-light'>
                                    <div className='d-flex justify-content-between align-items-start'>
                                        <div>
                                            RATE : <span className='text-info'>{seriesTop.vote_average}</span>
                                        </div>
                                        <div >
                                            <StarRatings
                                                rating={seriesTop.vote_average / 2}
                                                starRatedColor="gold"
                                                numberOfStars={5}
                                                name='rating'
                                                starDimension="20px"
                                                starSpacing="2px"
                                            />
                                        </div>

                                    </div>
                                </div>
                                <div className='text-center'>
                                    <Button variant="outline-info" onClick={() => handleDetails(seriesTop)}>DETAILS</Button>

                                </div>
                            </Card.Body>
                        </Card>
                    ))}

                </div>

            </div>
        </div>
    )
}

export default TopSeries