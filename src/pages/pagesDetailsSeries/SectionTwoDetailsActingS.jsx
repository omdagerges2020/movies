import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card';
import { BsArrowRightShort } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDetailsActor, getDetailsActorExternalIDS, getDetailsActorKnownFor } from '../../ReduxSystem/PeopleDetailsSlice';
import { CreditsSeries, getExternalIDSSeries } from '../../ReduxSystem/DetailsSeriesSlice';


const SectionTwoDetailsActingS = () => {
    const [scrollingRight, setScrollingRight] = useState(false);
    const { id, name } = useParams()


    const { dataCast, loading, dataDetailsSeries } = useSelector(state => state.DetailsForSeries)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const getPerson = (actor) => {
        const encodedName = encodeURIComponent(actor.name.toLowerCase().replace(/%3A/g, '').replace(/%20/g, '-').replace(/ /g, '-'));

        dispatch(getDetailsActorKnownFor(actor.name))
        dispatch(getDetailsActor(actor.id))
        dispatch(getDetailsActorExternalIDS(actor.id))
        navigate(`/person/${actor.id}/hisname/${encodedName}`)
    }


    useEffect(() => {
        dispatch(getExternalIDSSeries(id))
        dispatch(CreditsSeries(id))
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
                            <h4 className='text-info'>Series Cast</h4>
                        </div>
                        <div className={`${dataCast.length > 0 ? 'ms-auto col-12 d-flex flex-nowrap overflow-auto style-cards-acting position-relative gap-3 rounded': 'ms-auto col-12 d-flex flex-nowrap overflow-auto position-relative gap-3 rounded'} ${scrollingRight ? 'hide-shadow' : ''}` }
                        onScroll={handleScroll}
                        >

                            {dataCast.length > 9 ?
                                (dataCast.filter((cast, index) => index <= 9).map((cast, index) => (
                                    <Card key={index} variant="dark" className='bg-dark text-light col-lg-2 col-md-3 col-sm-4 col-7 shadow bg-dark-tertiary rounded'>
                                        <Card.Img onClick={() => getPerson(cast)} variant="top" className='h-100 cursor-pointer' src={cast && cast.profile_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${cast.profile_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`} />
                                        <Card.Body className='h-50'>
                                            <Card.Title className='cursor-pointer' onClick={() => getPerson(cast)}>{cast && cast.name}</Card.Title>
                                            <Card.Text>{cast.character}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                ))) : (dataCast.length > 5 || dataCast.length !== 0) ? (
                                    dataCast.map((cast, index) => (
                                        <Card key={index} variant="dark" className='bg-dark text-light col-lg-2 col-md-3 col-sm-4 col-7 shadow bg-dark-tertiary rounded'>
                                            <Card.Img onClick={() => getPerson(cast)} variant="top" className='h-100 cursor-pointer' src={cast && cast.profile_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${cast.profile_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`} />
                                            <Card.Body className='h-50'>
                                                <Card.Title className='cursor-pointer' onClick={() => getPerson(cast)}>{cast && cast.name}</Card.Title>
                                                <Card.Text>{cast.character}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    ))
                                ) : (
                                    <span>
                                        We don't have any Cast for <span className='text-info'>{dataDetailsSeries && dataDetailsSeries.name}</span>
                                    </span>
                                )}

                            {dataCast.length > 9 &&
                                <Card variant="dark" className='bg-dark text-light d-flex justify-content-center align-items-center col-md-2 col-sm-4 col-6 shadow bg-dark-tertiary rounded'>
                                    <Card.Title as={Link} to={`/tv/${id}/name/${name}/cast`} className='fs-6 Link cursor-pointer'>Show more <BsArrowRightShort className='fs-5' /></Card.Title>
                                </Card>
                            }

                        </div>
                        {dataCast.length > 6 &&
                            <div>
                                <Card.Title as={Link} to={`/tv/${id}/name/${name}/cast`} className='fs-6 Link cursor-pointer text-info p-2'>Full Cast & Crew</Card.Title>
                            </div>
                        }

                    </div>
                </section>
            )}
        </>

    )
}

export default SectionTwoDetailsActingS

