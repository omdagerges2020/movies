import React from 'react'
import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DetailsSeries } from '../../ReduxSystem/DetailsSeriesSlice';
import { HiStar } from 'react-icons/hi';
import { GetTvSeasonDetails } from '../../ReduxSystem/TvSeasonsDetailsSlice';

const SectionTwoSeasonS = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, dataDetailsSeries } = useSelector(state => state.DetailsForSeries)


    const { id, name } = useParams()


    const handleBtnPageSeason = (season) => {
        dispatch(GetTvSeasonDetails({ seriesId: id, seasonEpisodeNumber: season.season_number }))
        navigate(`/tv/${id}/name/${name}/season/${season.season_number}`)
    }


    useEffect(() => {
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
                    <div className='d-flex flex-column gap-4 p-2 p-lg-5 pt-0 pt-lg-0 pb-0 pb-lg-0'>
                        <h2 className='text-info text-center text-md-start'>Last Season</h2>
                        <div className='d-flex flex-column align-items-center align-items-md-start flex-wrap gap-lg-4'>
                            {dataDetailsSeries && dataDetailsSeries.seasons && dataDetailsSeries.seasons.length > 0 ?
                                <Card className='col-10 col-sm-7 col-md-12 col-lg-12 bg-dark rounded' >
                                    <Card.Body className='d-flex flex-column flex-md-row gap-md-2 p-0'>
                                        <img onClick={() => handleBtnPageSeason(dataDetailsSeries && dataDetailsSeries.seasons[dataDetailsSeries.seasons.length - 1])} className="col-12 col-md-3 col-md-2 rounded-start cursor-pointer" variant="top" src={dataDetailsSeries && dataDetailsSeries.seasons[dataDetailsSeries.seasons.length - 1] && dataDetailsSeries.seasons[dataDetailsSeries.seasons.length - 1].poster_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${dataDetailsSeries.seasons[dataDetailsSeries.seasons.length - 1].poster_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`} />
                                        <div className='d-flex flex-column align-items-center align-items-md-start  p-3 p-md-4 ps-md-2 gap-2 gap-md-4'>
                                            <div className='fw-bold d-flex flex-column flex-md-row align-items-center align-items-md-start gap-3'>

                                                <span className='fs-5 cursor-pointer Link' onClick={() => handleBtnPageSeason(dataDetailsSeries && dataDetailsSeries.seasons[dataDetailsSeries.seasons.length - 1])}>
                                                    {dataDetailsSeries && dataDetailsSeries.seasons[dataDetailsSeries.seasons.length - 1] && dataDetailsSeries.seasons[dataDetailsSeries.seasons.length - 1].name}
                                                </span>

                                                {dataDetailsSeries && dataDetailsSeries.seasons[dataDetailsSeries.seasons.length - 1] && (
                                                    <span className='border ms-3 rounded text-dark text-center pe-2 ps-2 bg-light'><HiStar />{dataDetailsSeries.seasons[dataDetailsSeries.seasons.length - 1].vote_average}</span>
                                                )}

                                                <div>
                                                    <span className='fw-bold'>
                                                        {dataDetailsSeries && dataDetailsSeries.seasons[dataDetailsSeries.seasons.length - 1] && dataDetailsSeries.seasons[dataDetailsSeries.seasons.length - 1].air_date?.split("-")[0]}{dataDetailsSeries.seasons[dataDetailsSeries.seasons.length - 1] && dataDetailsSeries.seasons[dataDetailsSeries.seasons.length - 1].episode_count && ` | ${dataDetailsSeries.seasons[dataDetailsSeries.seasons.length - 1].episode_count} Episodes`}
                                                    </span>
                                                </div>
                                            </div>

                                            <span  className='text-center text-lg-start'>
                                                {dataDetailsSeries && dataDetailsSeries.seasons[dataDetailsSeries.seasons.length - 1] && dataDetailsSeries.seasons[dataDetailsSeries.seasons.length - 1].overview ? dataDetailsSeries.seasons[dataDetailsSeries.seasons.length - 1].overview : `There is no Overview for this Season`}

                                            </span>
                                        </div>
                                    </Card.Body>
                                </Card> : (
                                    <span>We don't have any Seasons for {dataDetailsSeries && dataDetailsSeries.name}</span>
                                )
                            }

                        </div>
                        {dataDetailsSeries && dataDetailsSeries.seasons.length > 1 &&
                            <div className='text-center text-md-start'>
                                <Card.Title as={Link} to={`/tv/${id}/name/${name}/seasons`} className='fs-6 Link cursor-pointer text-info p-2'>View All Seasons</Card.Title>
                            </div>
                        }
                    </div>

                </section>
            )}
        </>
    )
}

export default SectionTwoSeasonS