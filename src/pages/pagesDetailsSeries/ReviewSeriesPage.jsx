import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import ShowMore from 'react-show-more';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { AiFillStar } from 'react-icons/ai';
import { GetReviewsSeries } from '../../ReduxSystem/ReviewSeriesSlice';
import { DetailsSeries } from '../../ReduxSystem/DetailsSeriesSlice';

const ReviewSeriesPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { dataDetailsSeries } = useSelector(state => state.DetailsForSeries)
    const { loading, dataReviewsSeries } = useSelector(state => state.ReviewsSeries)


    const { id } = useParams()

    useEffect(() => {
        dispatch(GetReviewsSeries(id))
        dispatch(DetailsSeries(id))
    }, [id])


    return (
        <>
            {loading === true ? (
                <div className='loadDetails d-flex justify-content-center align-items-center'>
                    <span className="loader"></span>
                </div>
            ) : (
                <section>
                    <div variant="dark" className='col-12 bg-dark'>
                        <Card className="col-12 border border-0 container bg-dark">
                            <Card.Body variant="dark" className='text-light bg-dark d-flex flex-column flex-sm-row align-items-center gap-3'>
                                <img variant="top" className='col-6 col-sm-4 col-md-3 rounded col-lg-1' src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${dataDetailsSeries && dataDetailsSeries.poster_path}`} />
                                <div className='text-center text-sm-start'>
                                    <Card.Title className='fs-4'>{dataDetailsSeries && dataDetailsSeries.name} <span className='text-secondary'>({dataDetailsSeries && dataDetailsSeries.first_air_date.split("-")[0]})</span></Card.Title>
                                    <div as={Link} className='Link text-secondary' onClick={() => navigate(-1)}>
                                        <BsArrowLeftShort />Back to main
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className='d-flex flex-column gap-5 pt-5 p-2 p-lg-5'>

                        {dataReviewsSeries && dataReviewsSeries.map((review) => {
                            const rawDate = review.created_at;
                            const formattedDate = new Date(rawDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

                            return (
                                <div key={review.id} className="d-flex bg-dark d-flex flex-column flex-sm-row gap-3 gap-sm-5 p-3">
                                    <div className='d-flex flex-column align-items-center align-items-sm-start'>
                                        <Stack direction="row">
                                            <Avatar sx={{ width: 66, height: 66 }} alt="Remy Sharp" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${review.author_details.avatar_path && review.author_details.avatar_path}`} />
                                        </Stack>
                                    </div>
                                    <div className='d-flex flex-column gap-3 col-12 col-sm-9 col-md-10 col-lg-10'>
                                        <div className='d-flex flex-column align-items-center flex-sm-row gap-3'>
                                            <h2 className='fw-bold fs-4 text-center text-sm-start'>A review by <span className='text-info'>{review.author}</span></h2>

                                            {review.author_details.rating && (
                                                <span className='border rounded text-light text-center col-3 col-sm-2 col-md-2 col-lg-1'><AiFillStar className='text-light' /> {review.author_details.rating.toFixed(1)}</span>
                                            )}

                                        </div>

                                        <div className='text-light text-center text-sm-start'>
                                            <p>
                                                Written by <span className='fw-bold text-info'>{review.author}</span> on <span className='text-info'>{formattedDate}</span>
                                            </p>
                                        </div>

                                        <div>
                                            <div>
                                                <p className='fs-5 mb-1 text-primary'>Content :-</p>
                                            </div>
                                            <div>
                                                <p>
                                                    <ShowMore
                                                        lines={3}
                                                        more='Show more'
                                                        less='Show less'
                                                        anchorClass='text-info'
                                                    >
                                                        {review.content}
                                                    </ShowMore>
                                                </p>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </section>
            )}
        </>
    )
}

export default ReviewSeriesPage
