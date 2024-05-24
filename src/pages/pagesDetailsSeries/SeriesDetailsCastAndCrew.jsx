import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import { getDetailsActor, getDetailsActorExternalIDS, getDetailsActorKnownFor } from '../../ReduxSystem/PeopleDetailsSlice';
import { CreditsSeries, DetailsSeries } from '../../ReduxSystem/DetailsSeriesSlice';

const SeriesDetailsCastAndCrew = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, costumeMakeUp, artCrew, cameraCrew, writingCrew, crewCrew, directingCrew, editingCrew, lightingCrew, soundCrew, visualEffectsCrew, dataCast, dataCrew, dataDetailsSeries } = useSelector(state => state.DetailsForSeries)

    const { id } = useParams()

    const getPerson = (actor) => {
        const encodedName = encodeURIComponent(actor.name.toLowerCase().replace(/%3A/g, '').replace(/%20/g, '-').replace(/ /g, '-'));

        dispatch(getDetailsActorKnownFor(actor.name))
        dispatch(getDetailsActor(actor.id))
        dispatch(getDetailsActorExternalIDS(actor.id))
        navigate(`/person/${actor.id}/hisname/${encodedName}`)
    }

    useEffect(() => {
        dispatch(DetailsSeries(id))
        dispatch(CreditsSeries(id))
    }, [id])

    return (
        <>
            {loading === true ? (
                <div className='loadDetails d-flex justify-content-center align-items-center'>
                    <span className="loader"></span>
                </div>
            ) : (
                <section className='row'>
                    <div className='col-12 p-0 d-flex flex-wrap flex-column'>
                        <div variant="dark" className='col-12 bg-dark'>
                            <Card className="col-12 border border-0 container bg-dark">
                                <Card.Body variant="dark" className='text-light bg-dark d-flex flex-column flex-sm-row align-items-center gap-3'>
                                    <img variant="top" className='col-6 col-sm-4 col-md-3 rounded col-lg-1' src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${dataDetailsSeries && dataDetailsSeries.poster_path}`} />
                                    <div className='text-center text-sm-start'>
                                        <Card.Title className='fs-4'>{dataDetailsSeries && dataDetailsSeries.name} <span className='text-secondary'>({dataDetailsSeries && dataDetailsSeries.last_air_date?.split("-")[0]})</span></Card.Title>
                                        <div as={Link} className='Link text-secondary' onClick={() => navigate(-1)}>
                                            <BsArrowLeftShort />Back to main
                                        </div>
                                    </div>

                                </Card.Body>
                            </Card>
                        </div>
                        <div className='d-flex flex-column flex-lg-row align-items-center align-items-lg-start container mt-2 mt-lg-5'>
                            <div className='col-10 col-lg-6 gap-4 d-flex flex-column'>
                                {dataCast.length > 0 ? (
                                    <h2>Cast <span className='text-info'>{dataCast.length}</span></h2>
                                ) : (
                                    <h2>Cast not found</h2>
                                )}
                                {dataCast.map((cast, index) => (
                                    <Card key={index} className="col-12 border border-0 p-0 bg-dark col-9 col-sm-10 col-md-11 col-lg-8">
                                        <Card.Body variant="dark" className='text-light d-flex flex-column flex-sm-row align-items-center bg-dark gap-3 p-0'>
                                            <img className='cursor-pointer p-3 p-sm-0 col-7 col-sm-5 col-md-4 col-lg-6' variant="top" onClick={() => getPerson(cast)} src={cast.profile_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${cast.profile_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`} />
                                            <div className='text-center text-sm-start pb-3 pb-sm-3'>
                                                <Card.Title onClick={() => getPerson(cast)} className='fs-4 cursor-pointer'>{cast.name}</Card.Title>
                                                <Card.Text className='text-secondary fs-5'>
                                                    {cast.character}
                                                </Card.Text>
                                            </div>

                                        </Card.Body>
                                    </Card>
                                ))}




                            </div>
                            <div className='col-10 col-lg-6 gap-4 d-flex flex-column mt-5 mt-lg-5'>
                                {dataCrew.length > 0 ? (
                                    <h2>Crew <span className='text-info'>{dataCrew.length}</span></h2>
                                ) : (
                                    <>
                                        <h2>Crew</h2>
                                        <p className='text-light'>There are no crew records added to <span className='text-info'>{dataDetailsSeries && dataDetailsSeries.title}.</span></p>
                                    </>
                                )}



                                {artCrew.length > 0 && (
                                    <div className='gap-4 d-flex flex-column'>
                                        <h2 className='text-center text-lg-start fs-1 text-info'>Art</h2>
                                        {artCrew.map((crew,index) => (
                                            <Card key={index} className="col-12 border border-0 p-0 bg-dark col-9 col-sm-10 col-md-11 col-lg-8">
                                                <Card.Body variant="dark" className='text-light d-flex flex-column flex-sm-row align-items-center bg-dark gap-3 p-0'>
                                                    <img className='cursor-pointer p-3 p-sm-0 col-7 col-sm-5 col-md-4 col-lg-6' onClick={() => getPerson(crew)} variant="top" src={crew.profile_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${crew.profile_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`} />
                                                    <div className='text-center text-sm-start pb-3 pb-sm-3'>
                                                        <Card.Title onClick={() => getPerson(crew)} className='fs-4 cursor-pointer'>{crew.name}</Card.Title>
                                                        <Card.Text className='text-secondary fs-5'>
                                                            {crew.known_for_department} {crew.job}
                                                        </Card.Text>
                                                    </div>

                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>
                                )}



                                {cameraCrew.length > 0 && (
                                    <div className='gap-4 d-flex flex-column p-4'>
                                        <h2 className='text-center text-lg-start fs-1 text-info'>Camera</h2>
                                        {cameraCrew.map((crew, index) => (
                                            <Card key={index} className="col-12 border border-0 p-0 bg-dark col-9 col-sm-10 col-md-11 col-lg-8">
                                                <Card.Body variant="dark" className='text-light d-flex flex-column flex-sm-row align-items-center bg-dark gap-3 p-0'>
                                                    <img className='cursor-pointer p-3 p-sm-0 col-7 col-sm-5 col-md-4 col-lg-6' variant="top" onClick={() => getPerson(crew)} src={crew.profile_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${crew.profile_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`} />
                                                    <div className='text-center text-sm-start pb-3 pb-sm-3'>
                                                        <Card.Title onClick={() => getPerson(crew)} className='fs-4 cursor-pointer'>{crew.name}</Card.Title>
                                                        <Card.Text className='text-secondary fs-5'>
                                                            {crew.known_for_department} {crew.job}
                                                        </Card.Text>
                                                    </div>

                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>
                                )}


                                {costumeMakeUp.length > 0 && (
                                    <div className='gap-4 d-flex flex-column p-4'>
                                        <h2 className='text-center text-lg-start fs-1 text-info'>Costume & Make-Up</h2>
                                        {costumeMakeUp.map((crew, index) => (
                                            <Card key={index} className="col-12 border border-0 p-0 bg-dark col-9 col-sm-10 col-md-11 col-lg-8">
                                                <Card.Body variant="dark" className='text-light d-flex flex-column flex-sm-row align-items-center bg-dark gap-3 p-0'>
                                                    <img className='cursor-pointer p-3 p-sm-0 col-7 col-sm-5 col-md-4 col-lg-6' variant="top" onClick={() => getPerson(crew)} src={crew.profile_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${crew.profile_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`} />
                                                    <div className='text-center text-sm-start pb-3 pb-sm-3'>
                                                        <Card.Title onClick={() => getPerson(crew)} className='fs-4 cursor-pointer'>{crew.name}</Card.Title>
                                                        <Card.Text className='text-secondary fs-5'>
                                                            {crew.known_for_department} {crew.job}
                                                        </Card.Text>
                                                    </div>

                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>
                                )}




                                {writingCrew.length > 0 && (
                                    <div className='gap-4 d-flex flex-column p-4'>
                                        <h2 className='text-center text-lg-start fs-1 text-info'>Writing</h2>
                                        {writingCrew.map((crew, index) => (
                                            <Card key={index} className="col-12 border border-0 p-0 bg-dark col-9 col-sm-10 col-md-11 col-lg-8">
                                                <Card.Body variant="dark" className='text-light d-flex flex-column flex-sm-row align-items-center bg-dark gap-3 p-0'>
                                                    <img className='cursor-pointer p-3 p-sm-0 col-7 col-sm-5 col-md-4 col-lg-6' variant="top" onClick={() => getPerson(crew)} src={crew.profile_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${crew.profile_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`} />
                                                    <div className='text-center text-sm-start pb-3 pb-sm-3'>
                                                        <Card.Title onClick={() => getPerson(crew)} className='fs-4 cursor-pointer'>{crew.name}</Card.Title>
                                                        <Card.Text className='text-secondary fs-5'>
                                                            {crew.known_for_department} {crew.job}
                                                        </Card.Text>
                                                    </div>

                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>
                                )}



                                {crewCrew.length > 0 && (
                                    <div className='gap-4 d-flex flex-column p-4'>
                                        <h2 className='text-center text-lg-start fs-1 text-info'>Crew</h2>
                                        {crewCrew.map((crew, index) => (
                                            <Card key={index} className="col-12 border border-0 p-0 bg-dark col-9 col-sm-10 col-md-11 col-lg-8">
                                                <Card.Body variant="dark" className='text-light d-flex flex-column flex-sm-row align-items-center bg-dark gap-3 p-0'>
                                                    <img className='cursor-pointer p-3 p-sm-0 col-7 col-sm-5 col-md-4 col-lg-6' variant="top" onClick={() => getPerson(crew)} src={crew.profile_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${crew.profile_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`} />
                                                    <div className='text-center text-sm-start pb-3 pb-sm-3'>
                                                        <Card.Title onClick={() => getPerson(crew)} className='fs-4 cursor-pointer'>{crew.name}</Card.Title>
                                                        <Card.Text className='text-secondary fs-5'>
                                                            {crew.known_for_department} {crew.job}
                                                        </Card.Text>
                                                    </div>

                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>
                                )}


                                {directingCrew.length > 0 && (
                                    <div className='gap-4 d-flex flex-column p-4'>
                                        <h2 className='text-center text-lg-start fs-1 text-info'>Directing</h2>
                                        {directingCrew.map((crew, index) => (
                                            <Card key={index} className="col-12 border border-0 p-0 bg-dark col-9 col-sm-10 col-md-11 col-lg-8">
                                                <Card.Body variant="dark" className='text-light d-flex flex-column flex-sm-row align-items-center bg-dark gap-3 p-0'>
                                                    <img className='cursor-pointer p-3 p-sm-0 col-7 col-sm-5 col-md-4 col-lg-6' variant="top" onClick={() => getPerson(crew)} src={crew.profile_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${crew.profile_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`} />
                                                    <div className='text-center text-sm-start pb-3 pb-sm-3'>
                                                        <Card.Title onClick={() => getPerson(crew)} className='fs-4 cursor-pointer'>{crew.name}</Card.Title>
                                                        <Card.Text className='text-secondary fs-5'>
                                                            {crew.known_for_department} {crew.job}
                                                        </Card.Text>
                                                    </div>

                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>
                                )}





                                {editingCrew.length > 0 && (

                                    <div className='gap-4 d-flex flex-column p-4'>
                                        <h2 className='text-center text-lg-start fs-1 text-info'>Editing</h2>
                                        {editingCrew.map((crew, index) => (
                                            <Card key={index} className="col-12 border border-0 p-0 bg-dark col-9 col-sm-10 col-md-11 col-lg-8">
                                                <Card.Body variant="dark" className='text-light d-flex flex-column flex-sm-row align-items-center bg-dark gap-3 p-0'>
                                                    <img className='cursor-pointer p-3 p-sm-0 col-7 col-sm-5 col-md-4 col-lg-6' variant="top" onClick={() => getPerson(crew)} src={crew.profile_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${crew.profile_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`} />
                                                    <div className='text-center text-sm-start pb-3 pb-sm-3'>
                                                        <Card.Title onClick={() => getPerson(crew)} className='fs-4 cursor-pointer'>{crew.name}</Card.Title>
                                                        <Card.Text className='text-secondary fs-5'>
                                                            {crew.known_for_department} {crew.job}
                                                        </Card.Text>
                                                    </div>

                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>
                                )}


                                {lightingCrew.length > 0 && (
                                    <div className='gap-4 d-flex flex-column p-4'>
                                        <h2 className='text-center text-lg-start fs-1 text-info'>Lighting</h2>
                                        {lightingCrew.map((crew, index) => (
                                            <Card key={index} className="col-12 border border-0 p-0 bg-dark col-9 col-sm-10 col-md-11 col-lg-8">
                                                <Card.Body variant="dark" className='text-light d-flex flex-column flex-sm-row align-items-center bg-dark gap-3 p-0'>
                                                    <img className='cursor-pointer p-3 p-sm-0 col-7 col-sm-5 col-md-4 col-lg-6' variant="top" onClick={() => getPerson(crew)} src={crew.profile_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${crew.profile_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`} />
                                                    <div className='text-center text-sm-start pb-3 pb-sm-3'>
                                                        <Card.Title onClick={() => getPerson(crew)} className='fs-4 cursor-pointer'>{crew.name}</Card.Title>
                                                        <Card.Text className='text-secondary fs-5'>
                                                            {crew.known_for_department} {crew.job}
                                                        </Card.Text>
                                                    </div>

                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>
                                )}




                                {soundCrew.length > 0 && (

                                    <div className='gap-4 d-flex flex-column p-4'>
                                        <h2 className='text-center text-lg-start fs-1 text-info'>Sound</h2>
                                        {soundCrew.map((crew, index) => (
                                            <Card key={index} className="col-12 border border-0 p-0 bg-dark col-9 col-sm-10 col-md-11 col-lg-8">
                                                <Card.Body variant="dark" className='text-light d-flex flex-column flex-sm-row align-items-center bg-dark gap-3 p-0'>
                                                    <img className='cursor-pointer p-3 p-sm-0 col-7 col-sm-5 col-md-4 col-lg-6' variant="top" onClick={() => getPerson(crew)} src={crew.profile_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${crew.profile_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`} />
                                                    <div className='text-center text-sm-start pb-3 pb-sm-3'>
                                                        <Card.Title onClick={() => getPerson(crew)} className='fs-4 cursor-pointer'>{crew.name}</Card.Title>
                                                        <Card.Text className='text-secondary fs-5'>
                                                            {crew.known_for_department} {crew.job}
                                                        </Card.Text>
                                                    </div>

                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>
                                )}




                                {visualEffectsCrew.length > 0 && (
                                    <div className='gap-4 d-flex flex-column p-4'>
                                        <h2 className='text-center text-lg-start fs-1 text-info'>Visual Effects</h2>
                                        {visualEffectsCrew.map((crew, index) => (
                                            <Card key={index} className="col-12 border border-0 p-0 bg-dark col-9 col-sm-10 col-md-11 col-lg-8">
                                                <Card.Body variant="dark" className='text-light d-flex flex-column flex-sm-row align-items-center bg-dark gap-3 p-0'>
                                                    <img className='cursor-pointer p-3 p-sm-0 col-7 col-sm-5 col-md-4 col-lg-6' variant="top" onClick={() => getPerson(crew)} src={crew.profile_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${crew.profile_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`} />
                                                    <div className='text-center text-sm-start pb-3 pb-sm-3'>
                                                        <Card.Title onClick={() => getPerson(crew)} className='fs-4 cursor-pointer'>{crew.name}</Card.Title>
                                                        <Card.Text className='text-secondary fs-5'>
                                                            {crew.known_for_department} {crew.job}
                                                        </Card.Text>
                                                    </div>

                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>
                                )}



                            </div>
                        </div>
                    </div>
                    <div className='col-12 text-center mb-5'>
                        <Button variant='outline-info' onClick={() => navigate(-1)}>Back a Step</Button>
                    </div>
                </section>
            )}


        </>
    )
}

export default SeriesDetailsCastAndCrew
