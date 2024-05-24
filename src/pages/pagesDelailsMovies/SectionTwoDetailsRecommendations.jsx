import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailsRecommendationsMovies } from '../../ReduxSystem/DetailsRecommendationsMoviesSlice';
import Card from 'react-bootstrap/Card';
import { Credits, DetailsMovies } from '../../ReduxSystem/DetailsMoviesSlice';

const SectionTwoDetailsRecommendations = () => {

    const [scrollingRight, setScrollingRight] = useState(false);

    const { id } = useParams()

    const { dataRecommendationsMovies, loading } = useSelector(state => state.RecommendationsMovies)
    const { dataDetailsMovies } = useSelector(state => state.DetailsForMovies)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDetails = (movie) => {
        const encodedTitle = encodeURIComponent(movie.title.toLowerCase().replace(/%3A/g, '').replace(/%20/g, '-').replace(/ /g, '-'));

        dispatch(DetailsMovies(movie.id))
        dispatch(Credits(movie.id))
        navigate(`/movie/${movie.id}/title/${encodedTitle}`)
    }

    useEffect(() => {
        dispatch(DetailsRecommendationsMovies(id))
        dispatch(DetailsMovies(id))
    }, [id])

    const handleScroll = (e) => {
        const scrollLeft = e.target.scrollLeft;
        if (scrollLeft > 0) {
            setScrollingRight(true);
        } else {
            setScrollingRight(false);
        }
    };


    return (
        <>
            {loading === true ? (
                <div className='loadDetails d-flex justify-content-center align-items-center'>
                    <span className="loader"></span>
                </div>
            ) : (

                <section className='row'>
                    <div className='section-acting d-flex flex-column flex-wrap gap-2 p-2 p-lg-5 pt-0 pt-lg-0 pb-0 pb-lg-0'>
                        <div>
                            <h4 className='text-info'>Recommendations</h4>
                        </div>

                        {dataRecommendationsMovies.length > 0 ? (
                            <div className={`col-12 d-flex flex-nowrap overflow-auto style-cards-acting position-relative rounded gap-3 ${scrollingRight ? 'hide-shadow' : ''}`}
                            onScroll={handleScroll}
                            >

                                {dataRecommendationsMovies.length > 0 && dataRecommendationsMovies.map((recommend, index) => (
                                    <Card key={recommend.id} variant="dark" className='bg-dark text-light col-lg-4 col-md-5 col-sm-6 col-11 shadow bg-dark-tertiary rounded'>
                                        <Card.Body className='d-flex flex-column gap-3 p-2 col-12'>
                                            <img  onClick={() => handleDetails(recommend)} className='col-12 cursor-pointer' src={recommend && recommend.poster_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${recommend.poster_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`} />
                                            <div onClick={() => handleDetails(recommend)} className='d-flex justify-content-between cursor-pointer'>
                                                <span>{recommend && recommend.title}</span>
                                                <span className='text-info'>{recommend && ((recommend.vote_average * 10).toFixed())}%</span>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                           <div>
                             <span>
                                We don't have enough data to suggest any movies based on <span className='text-info'>{dataDetailsMovies && dataDetailsMovies.title}</span>
                            </span>
                           </div>
                        )}

                    </div>
                </section>






            )}

        </>
    )
}

export default SectionTwoDetailsRecommendations