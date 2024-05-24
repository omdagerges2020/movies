import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetTvSeasonDetails } from '../../ReduxSystem/TvSeasonsDetailsSlice'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import Card from 'react-bootstrap/Card';
import { format } from 'date-fns';
import { HiStar } from 'react-icons/hi';

const SeasonPageOfSeries = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, dataTvSeasonDetails, airDate, episodes } = useSelector(state => state.TvSeasonDetails)

    const { id , name , numberSeason} = useParams()

    useEffect(() => {
        dispatch(GetTvSeasonDetails({ seriesId: id, seasonNumber: numberSeason }))
    }, [])

    return (
        <>
            {loading === true ? (
                <div className='loadDetails d-flex justify-content-center align-items-center'>
                    <span className="loader"></span>
                </div>
            ) : (
                <section>
                    <div variant="dark" className='col-12 bg-dark'>
                        <Card className="col-12 border border-0 bg-dark container">
                            <Card.Body variant="dark" className='text-light bg-dark d-flex flex-column flex-sm-row align-items-center gap-3'>
                                <img variant="top" className='col-6 col-sm-4 col-md-3 rounded col-lg-1' src={dataTvSeasonDetails && dataTvSeasonDetails.poster_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${dataTvSeasonDetails.poster_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`} />
                                <div className='text-center text-sm-start'>
                                    <Card.Title className='fs-4'>{dataTvSeasonDetails && dataTvSeasonDetails?.name} <span className='text-secondary'>({airDate && airDate.split("-")[0]})</span></Card.Title>
                                    <div as={Link} className='Link cursor-pointer text-secondary' onClick={() => navigate(-1)}>
                                        <BsArrowLeftShort />Back to season list
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className='d-flex flex-column align-items-center align-items-lg-start gap-5 pt-5 p-lg-5'>

                        {episodes && episodes.map((episode, index) => {

                            const dateStr = episode.air_date && episode.air_date
                            const formattedData = format(new Date(dateStr), `MMMM d, yyyy`)
                            return (
                                <div key={index} className='d-flex flex-column align-items-center align-items-lg-start col-12 col-sm-7 col-md-5 col-lg-12'>
                                    <Card key={index} className='col-10 col-lg-12 bg-dark rounded' >
                                        <Card.Body className={episode.overview ? 'col-12 d-flex flex-column flex-lg-row align-items-start gap-0 gap-lg-2 p-0' : 'col-12 d-flex flex-column flex-lg-row align-items-center gap-0 gap-lg-2 p-0'}>
                                            <img className={episode.still_path ? `col-12 col-lg-1` : `col-12 col-lg-2`} variant="top" src={episode.still_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${episode.still_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`} />
                                            <div className={episode.still_path ? 'w-100 d-flex flex-column align-items-center align-items-lg-start p-4 p-lg-4 ps-lg-2  gap-2 gap-lg-4': 'd-flex flex-column align-items-center align-items-lg-start p-4 pt-0 p-lg-4 ps-lg-2  gap-2 gap-lg-4 col-lg-10'}>
                                                <div className='col-12 d-flex flex-column flex-lg-row flex-wrap align-items-center justify-content-lg-between gap-3 gap-lg-2 fw-bold Link'>
                                                    <div className='d-flex flex-column flex-lg-row fs-3 text-center text-lg-start gap-2 gap-lg-3'>
                                                        <div className='d-flex flex-column flex-lg-row gap-1 gap-lg-3'>
                                                            <span className='text-info'>{episode.episode_number && episode.episode_number} </span>

                                                            <span>
                                                                {episode.vote_average !== 0 && (
                                                                    <span className='fs-6 p-1 border rounded text-center text-lg-start align-items-center justify-content-center bg-light'>
                                                                        <span className='text-dark'><HiStar /></span>
                                                                        <span className='text-dark'>{episode.vote_average}</span>
                                                                    </span>
                                                                )}</span>

                                                        </div>

                                                        <div>
                                                            <span>{episode.name}</span>
                                                        </div>
                                                    </div>


                                                    <div className='d-flex flex-column align-items-center align-items-lg-start'>
                                                        <span className='text-info'>{formattedData}</span>
                                                        {episode.runtime &&
                                                            (
                                                                <span className='text-info'>{episode.runtime}min</span>
                                                            )
                                                        }
                                                    </div>
                                                </div>

                                                <span className='overflew-auto text-center text-lg-start'>
                                                    {episode.overview ? episode.overview : `There is no Overview for this Season`}
                                                </span>
                                            </div>
                                        </Card.Body>
                                    </Card>

                                    <div className=''>
                                        <Link className='Link text-info' to={`/tv/${id}/season/${episode.season_number}/episode/${episode.episode_number}`}>Full Cast & Crew</Link>
                                    </div>

                                </div>
                            )


                        })

                        }

                    </div>

                </section>
            )}
        </>
    )
}

export default SeasonPageOfSeries