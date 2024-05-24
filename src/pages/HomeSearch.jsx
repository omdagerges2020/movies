import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchFunction, SearchFunctionWithSeries, SearchMovies, SearchSeries } from '../ReduxSystem/SearchSlice'
import { useNavigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import StarRatings from 'react-star-ratings';
import { Skeleton } from '@mui/material';

const HomeSearch = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { category, value } = useParams()
    const { dataMoviesSearch, dataSeriesSearch } = useSelector(state => state.search)

    useEffect(() => {
        if (category === "movies") {
            dispatch(SearchMovies(value))
        } else {
            dispatch(SearchSeries(value))
        }
    }, [value])


    const handleDetails = (movieOrseries) => {

        if (category === "movies") {
            const encodedTitle = encodeURIComponent(movieOrseries.title.toLowerCase().replace(/%3A/g, '').replace(/%20/g, '-').replace(/ /g, '-'));
            navigate(`/movie/${movieOrseries.id}/title/${encodedTitle}`)
        } else {
            const encodedName = encodeURIComponent(movieOrseries.name.toLowerCase().replace(/%3A/g, '').replace(/%20/g, '-').replace(/ /g, '-'));
            navigate(`/tv/${movieOrseries.id}/name/${encodedName}`)
        }
    }

    return (
        <>
            <section className='d-flex flex-column gap-5 align-items-center'>
                <div className='mt-5'>
                    <h2 className='text-info text-center'>
                        {category === "movies" ? 'Search in Movies' : 'Search in Series'}
                    </h2>
                </div>

                <div className='d-flex justify-content-center align-items-center flex-wrap'>
                    {category === "movies" ? (
                        dataMoviesSearch.map((search, index) => (
                            <Card variant="dark" key={index} style={{ width: '18rem' }} className='me-4 bg-dark'>
                                {search.poster_path ? (
                                    <Card.Img variant="top" src={search.poster_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${search.poster_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`} />

                                ) : (
                                    <Skeleton variant="rectangular" width={290} height={435} />

                                )}
                                <Card.Body>
                                    <Card.Title className='text-light'>TAITLE : {search.title}</Card.Title>
                                    <div className='text-light'>
                                        <div className='d-flex justify-content-between align-items-start'>
                                            <div className='pt-1'>
                                                RATE : <span className='text-info'>{search.vote_average}</span>
                                            </div>
                                            <div >
                                                <StarRatings
                                                    rating={search.vote_average / 2}
                                                    starRatedColor="gold"
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension="20px"
                                                    starSpacing="3px"
                                                />
                                            </div>

                                        </div>
                                    </div>
                                    <div className='text-center'>
                                        <Button variant="outline-info" onClick={() => handleDetails(search)}>DETAILS</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (

                        dataSeriesSearch.map((search, index) => (
                            <Card variant="dark" key={index} style={{ width: '18rem' }} className='me-4 bg-dark'>
                                {search.poster_path ? (
                                    <Card.Img variant="top" src={search.poster_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${search.poster_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg` } />

                                ) : (
                                    <Skeleton variant="rectangular" width={290} height={435} />

                                )}
                                <Card.Body>
                                    <Card.Title className='text-light'>TAITLE : {search.name}</Card.Title>
                                    <div className='text-light'>
                                        <div className='d-flex justify-content-between align-items-start'>
                                            <div className='pt-1'>
                                                RATE : <span className='text-info'>{search.vote_average}</span>
                                            </div>
                                            <div >
                                                <StarRatings
                                                    rating={search.vote_average / 2}
                                                    starRatedColor="gold"
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension="20px"
                                                    starSpacing="3px"
                                                />
                                            </div>

                                        </div>
                                    </div>
                                    <div className='text-center'>
                                        <Button variant="outline-info" onClick={() => handleDetails(search)}>DETAILS</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))

                    )}
                </div>


            </section>
        </>
    )
}

export default HomeSearch