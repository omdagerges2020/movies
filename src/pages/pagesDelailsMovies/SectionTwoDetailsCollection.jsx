import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DetailsCollectionMovies } from '../../ReduxSystem/DetailsCollectionMoviesSlice'
import { Link, useParams } from 'react-router-dom'
import { DetailsMovies } from '../../ReduxSystem/DetailsMoviesSlice'
import Button from 'react-bootstrap/Button';

const SectionTwoDetailsCollection = () => {
    const dispatch = useDispatch()
    const { dataCollectionMovies, loading } = useSelector(state => state.CollectionMovies)
    const { dataDetailsMovies } = useSelector(state => state.DetailsForMovies)

    const { id } = useParams()

    useEffect(() => {
        dispatch(DetailsMovies(id))
    }, [id])

    useEffect(() => {
        if (dataDetailsMovies && dataDetailsMovies.belongs_to_collection) {
            dispatch(DetailsCollectionMovies(dataDetailsMovies.belongs_to_collection.id));
        }
    }, [dataDetailsMovies]);

    const encodedTitle = encodeURIComponent(dataDetailsMovies && dataDetailsMovies.belongs_to_collection && dataDetailsMovies.belongs_to_collection.name.toLowerCase().replace(/%3A/g, '').replace(/%20/g, '-').replace(/ /g, '-'));


    return (
        <>
            {loading === true ? (
                <div className='loadDetails d-flex justify-content-center align-items-center'>
                    <span className="loader"></span>
                </div>
            ) : (
                dataCollectionMovies && dataDetailsMovies && dataDetailsMovies.belongs_to_collection && (
                    <section className='row vh-75 d-flex flex-wrap w-100 position-relative'>
                        <div className='p-2 p-lg-5 pt-0 pt-lg-0 pb-0 pb-lg-0'>
                            <div
                                className='p-4 p-md-3 p-lg-3 rounded bg-img-collection col-12 w-100 h-100 '
                                style={{
                                    backgroundImage: dataCollectionMovies?.backdrop_path ? `url("https://image.tmdb.org/t/p/w600_and_h900_bestv2${dataCollectionMovies.backdrop_path}")` : 'none'
                                }}
                            >
                                <div className='col-12 d-flex flex-column flex-wrap align-items-center gap-3 z-index fw-bold'>
                                    <div>
                                        <h2 className='text-center'>Part of {dataCollectionMovies?.name}</h2>
                                    </div>
                                    <div className='text-center'>
                                        <span className='text-info'>Includes : </span>
                                        <span className='d-flex flex-column'>
                                            {dataCollectionMovies?.parts?.map((title, index) => (
                                                <span key={index}>
                                                    <span className='text-info'> {index + 1}: </span>
                                                    {title.title}
                                                    {index !== dataCollectionMovies.parts.length - 1 && ','}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                    <Button as={Link} to={`/collection/${dataDetailsMovies && dataDetailsMovies.belongs_to_collection && dataDetailsMovies.belongs_to_collection.id}/title/${encodedTitle}`}
                                        variant='outline-light' className='rounded-pill text-info fw-bold'>
                                        VIEW THE COLLECTION
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            )}

        </>
    )
}

export default SectionTwoDetailsCollection

