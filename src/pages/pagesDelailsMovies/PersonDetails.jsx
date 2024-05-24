import React, { useEffect, useState } from 'react'
import { AiFillYoutube, AiOutlineHome } from 'react-icons/ai'
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { FaTiktok } from 'react-icons/fa'
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom'
import { Credits, DetailsMovies, getExternalIDSMovies } from '../../ReduxSystem/DetailsMoviesSlice'
import Button from 'react-bootstrap/Button';
import { getDetailsActor, getDetailsActorExternalIDS, getDetailsActorKnownFor } from '../../ReduxSystem/PeopleDetailsSlice'




const PersonDetails = ({changeMode}) => {
    const { id , name} = useParams()

    const dispatch = useDispatch()
    const {loading, dataExternalIDS, dataActorKnownFor, dataActor } = useSelector(state => state.PeopleDetails)
    const [scrollingRight, setScrollingRight] = useState(false);

    const navigate = useNavigate()

    const handleDetails = (seriesOrMovie) => {

        dispatch(DetailsMovies(seriesOrMovie.id))
        dispatch(Credits(seriesOrMovie.id))    
        if(seriesOrMovie.media_type ===  "movie"){
            const encodedTitle = encodeURIComponent(seriesOrMovie.title.toLowerCase().replace(/%3A/g, '').replace(/%20/g, '-').replace(/ /g, '-'));

            navigate(`/movie/${seriesOrMovie.id}/title/${encodedTitle}`)
        }else{
            const encodedName = encodeURIComponent(seriesOrMovie.name.toLowerCase().replace(/%3A/g, '').replace(/%20/g, '-').replace(/ /g, '-'));

            navigate(`/tv/${seriesOrMovie.id}/name/${encodedName}`)
        }
    }

    useEffect(() => {
        dispatch(getDetailsActorExternalIDS(id))
        dispatch(getDetailsActor(id))
        dispatch(getDetailsActorKnownFor(name))

    }, [id])

    const handleScroll = (e) => {
        const scrollLeft = e.target.scrollLeft;
        if (scrollLeft > 0) {
            setScrollingRight(true);
        } else {
            setScrollingRight(false);
        }
    };

    const handleLink = (id) => {
        (id === null || id === "") && alert("The Page not found")
    }

    return (
        <>
            {loading === true ? (
                <div className='loadDetails d-flex justify-content-center align-items-center'>
                    <span className="loader"></span>
                </div>
            ) : (
                <section className={changeMode == "dark" ? 'row p-5' : 'row p-5 light'}>
                    <div className='d-flex flex-column flex-lg-row align-items-center align-items-lg-start'>
                        <div className='mb-5 mb-lg-0 col-12 col-lg-4 d-flex flex-column align-items-center align-items-lg-start gap-5 container '>

                            <div className='col-12 text-center text-lg-start'>
                                <img className='col-10 col-sm-7 col-md-6 col-lg-11 rounded' src={dataActor && dataActor.profile_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${dataActor.profile_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`} />
                            </div>
                            <div className='text-light d-flex gap-3 gap-md-4 fs-4'>

                                <a title='Visit Facebook' className={dataExternalIDS && dataExternalIDS.facebook_id ? "cursor-pointer text-info hoverIcons" : "cursor-pointer text-info"} target={dataExternalIDS && dataExternalIDS.facebook_id ? "_blank" : ""} href={dataExternalIDS && dataExternalIDS.facebook_id ? `https://www.facebook.com/${dataExternalIDS.facebook_id}` : `#`}>
                                    <BsFacebook onClick={() => handleLink(dataExternalIDS && dataExternalIDS.facebook_id)} />
                                </a>



                                <a title='Visit Twitter' className={dataExternalIDS && dataExternalIDS.twitter_id ? "cursor-pointer text-info hoverIcons" : "cursor-pointer text-info"} target={dataExternalIDS && dataExternalIDS.twitter_id ? "_blank" : ""} href={dataExternalIDS && dataExternalIDS.twitter_id ? `https://twitter.com/${dataExternalIDS.twitter_id}` : `#`}>
                                    <BsTwitter onClick={() => handleLink(dataExternalIDS && dataExternalIDS.twitter_id)} />
                                </a>



                                <a title='Visit Instagram' className={dataExternalIDS && dataExternalIDS.instagram_id ? "cursor-pointer text-info hoverIcons" : "cursor-pointer text-info"} target={dataExternalIDS && dataExternalIDS.instagram_id ? "_blank" : ""} href={dataExternalIDS && dataExternalIDS.instagram_id ? `https://www.instagram.com/${dataExternalIDS.instagram_id}` : `#`}>
                                    <BsInstagram onClick={() => handleLink(dataExternalIDS && dataExternalIDS.instagram_id)} />
                                </a>


                                <a title='Visit TikTok' className={dataExternalIDS && dataExternalIDS.tiktok_id ? "cursor-pointer text-info hoverIcons" : "cursor-pointer text-info"} target={dataExternalIDS && dataExternalIDS.tiktok_id ? "_blank" : ""} href={dataExternalIDS && dataExternalIDS.tiktok_id ? `https://www.tiktok.com/${dataExternalIDS.tiktok_id}` : `#`}>
                                    <FaTiktok onClick={() => handleLink(dataExternalIDS && dataExternalIDS.tiktok_id)} />
                                </a>



                                <a title='Visit YouTube' className={dataExternalIDS && dataExternalIDS.youtube_id ? "cursor-pointer text-info hoverIcons" : "cursor-pointer text-info"} target={dataExternalIDS && dataExternalIDS.youtube_id ? "_blank" : ""} href={dataExternalIDS && dataExternalIDS.youtube_id ? `https://www.youtube.com/${dataExternalIDS.youtube_id}` : `#`}>
                                    <AiFillYoutube onClick={() => handleLink(dataExternalIDS && dataExternalIDS.youtube_id)} />
                                </a>


                                <a title='Visit Homepage' className={dataActor && dataActor.homepage ? "cursor-pointer text-info hoverIcons" : "cursor-pointer text-info"} target={dataActor && dataActor.homepage ? "_blank" : ""} href={dataActor && dataActor.homepage ? `${dataActor.homepage}` : `#`}>
                                    <AiOutlineHome onClick={() => handleLink(dataActor && dataActor.homepage)} />
                                </a>

                            </div>
                            <div>
                                <h2 className='fs-4 text-center text-lg-start mb-3'>Personal Info</h2>
                                <div className='d-flex flex-column align-items-center align-items-lg-start gap-4 text-light'>
                                    <div className='text-center text-lg-start'>
                                        <h2 className='fs-5'>Known For</h2>
                                        <span className='text-info'>{dataActor && dataActor.known_for_department && dataActor.known_for_department}</span>
                                    </div>
                                    <div className='text-center text-lg-start'>
                                        <h2 className='fs-5'>Known Credits</h2>
                                        <span className='text-info'>
                                            {dataActorKnownFor.length > 0 ? dataActorKnownFor.length : "Sorry, there is no Known Credits"}
                                        </span>
                                    </div>
                                    <div className='text-center text-lg-start'>
                                        <h2 className='fs-5'>Gender</h2>
                                        <span className='text-info'>{dataActor && dataActor.gender === 1 ? ("Female") : ("male")}</span>
                                    </div>

                                    <div className='text-center text-lg-start'>
                                        <h2 className='fs-5'>Birthday</h2>
                                        <span className='text-info'>{dataActor && dataActor.birthday ? dataActor.birthday : "Sorry, there is no birthday"}</span>
                                    </div>
                                    <div className='text-center text-lg-start'>
                                        <h2 className='fs-5'>Place of Birth</h2>
                                        <span className='text-info'>{dataActor && dataActor.place_of_birth ? dataActor.place_of_birth : "Sorry, there is no Place of Birth"}</span>
                                    </div>
                                    <div className='text-center text-lg-start'>
                                        <h2 className='fs-5'>Also Known As</h2>
                                        <div className='text-info d-flex flex-column'>{dataActor && dataActor.also_known_as.length > 0 ? dataActor.also_known_as.map((knownAs) => (
                                            <span>{knownAs}</span>
                                        )) : ("Sorry, there is no Known")}</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='col-12 col-lg-8 text-light'>
                            <div className='d-flex flex-column align-items-center align-items-lg-start gap-5 container ps-0'>
                                <div className='text-center text-lg-start'>
                                    <h2>{dataActor && dataActor.name}</h2>
                                </div>
                                <div className='text-center text-lg-start'>
                                    <h4 className='text-info'>Biography</h4>
                                    <p>{dataActor && dataActor.biography ? dataActor.biography : (<span>We don't have a biography for <span className='text-info'>{dataActor && dataActor.name}</span></span>)}</p>
                                </div>
                                <div className='col-12 text-center d-flex flex-column gap-4 text-lg-start'>

                                    <h4 className='text-info'>Known For</h4>
                                    <div className={`${dataActorKnownFor.length > 0 ? `col-12 d-flex flex-nowrap overflow-auto gap-3 style-cards-acting position-relative` : `col-12 d-flex flex-nowrap overflow-auto gap-3`} ${scrollingRight ? 'hide-shadow' : ''}`}
                                    onScroll={handleScroll}
                                    >
                                        {dataActorKnownFor.length > 0 ? dataActorKnownFor.map((known) => (
                                            <Card key={known.id} variant="dark" className='bg-dark text-light col-lg-3 col-md-4 col-sm-7 col-12 shadow bg-dark-tertiary rounded'>
                                                <img onClick={() => handleDetails(known)} variant="top" className='col-12 cursor-pointer' src={known.poster_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${known.poster_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`} />
                                                <Card.Body className='h-25 text-center'>
                                                    <p onClick={() => handleDetails(known)} className='cursor-pointer'>{known.title ? known.title : known.name}</p>
                                                </Card.Body>
                                            </Card>
                                        )) : ("There is no Known For")}
                                    </div>
                                </div>
                                <div className='text-center col-10'>
                                    <Button variant='outline-info' onClick={() => navigate(-1)}>Back a Step</Button>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default PersonDetails