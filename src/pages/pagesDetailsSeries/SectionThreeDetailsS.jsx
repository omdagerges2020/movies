import React, { useEffect } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { RiMovieFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux';
import { getExternalIDSSeries, getWatchProvidersSeries } from '../../ReduxSystem/DetailsSeriesSlice';
import { useParams } from 'react-router-dom';
import { GetKeyWordsSeries } from '../../ReduxSystem/GetKeyWordsSeriesSlice';

const SectionThreeDetailsS = () => {

    const dispatch = useDispatch()
    const { dataWatchProvidersSeries, dataExternalIDSSeries, dataDetailsSeries } = useSelector(state => state.DetailsForSeries)
    const { keyWordsSeries, loading } = useSelector(state => state.KeyWordsSeries)

    const handleLink = (id) => {
        (id === null || id === "") && alert("The Page not found")
    }


    const { id } = useParams()


    useEffect(() => {
        dispatch(getExternalIDSSeries(id))
        dispatch(GetKeyWordsSeries(id))
        dispatch(getWatchProvidersSeries(id))
    }, [id])

    const keys = Object.keys(dataWatchProvidersSeries);
    const firstKey = keys.length > 0 ? keys[0] : null;
    const link = firstKey ? dataWatchProvidersSeries[firstKey].link : "#";

    console.log(dataDetailsSeries);
    return (
        <>
            {loading === true ? (
                <div className='loadDetails d-flex justify-content-center align-items-center'>
                    <span className="loader"></span>
                </div>
            ) : (
                <section className='row gap-5'>
                    <div className='col-12 d-flex flex-column justify-content-center justify-content-lg-start align-items-center align-items-lg-start gap-4 text-light fs-6'>
                        <div className='text-light d-flex gap-3 fs-4'>

                            <a title='Visit JustWatch' className={dataWatchProvidersSeries && ((dataWatchProvidersSeries.EG && dataWatchProvidersSeries.EG.link) || link) ? "cursor-pointer text-info hoverIcons" : "cursor-pointer text-info"} target={dataWatchProvidersSeries && dataWatchProvidersSeries.EG && dataWatchProvidersSeries.EG.link ? dataWatchProvidersSeries.EG.link : (link + `_blank`)} href={dataWatchProvidersSeries && dataWatchProvidersSeries.EG && dataWatchProvidersSeries.EG.link ? dataWatchProvidersSeries.EG.link : (link)}>
                                <RiMovieFill onClick={() => handleLink(dataWatchProvidersSeries && ((dataWatchProvidersSeries.EG && dataWatchProvidersSeries.EG.link) || link))} />
                            </a>
                            <a title='Visit Homepage' className={dataDetailsSeries && dataDetailsSeries.homepage ? "cursor-pointer text-info hoverIcons" : "cursor-pointer text-info"} target={dataExternalIDSSeries.homepage ? "_blank" : ""} href={dataDetailsSeries && (dataDetailsSeries.homepage !== null && dataDetailsSeries.homepage !== "") ? `${dataDetailsSeries.homepage}` : `#`}>
                                <AiOutlineHome onClick={() => handleLink(dataDetailsSeries && dataDetailsSeries.homepage)} />
                            </a>

                        </div>
                        <div className='text-center text-lg-start'>
                            <h5>original Name</h5>
                            <span className='text-info'>{dataDetailsSeries && dataDetailsSeries.original_name}</span>
                        </div>
                        <div className='text-center text-lg-start'>
                            <h5>Status</h5>
                            <span className='text-info'>{dataDetailsSeries && dataDetailsSeries.status}</span>
                        </div>
                        <div className='text-center text-lg-start'>
                            <h5>Network</h5>
                            {dataDetailsSeries && dataDetailsSeries.networks.length > 0 ? (
                                <img className='text-info col-1' src={dataDetailsSeries && dataDetailsSeries.networks.length > 0 && dataDetailsSeries.networks[0].logo_path && `https://image.tmdb.org/t/p/w600_and_h900_bestv2${dataDetailsSeries.networks[0].logo_path}`} />

                            ) : (
                                <p>There is no Logo</p>

                            )}
                        </div>
                        <div className='text-center text-lg-start'>
                            <h5>Type</h5>
                            <span className='text-info'>{dataDetailsSeries && dataDetailsSeries.type}</span>
                        </div>
                        <div className='text-center text-lg-start'>
                            <h5>Original Language</h5>
                            <span className='text-info'>
                                {dataDetailsSeries && dataDetailsSeries.spoken_languages[0] ? `${dataDetailsSeries.spoken_languages[0].iso_639_1.toUpperCase()} : ${dataDetailsSeries.spoken_languages[0].english_name} : ${dataDetailsSeries.spoken_languages[0].name}` : dataDetailsSeries && dataDetailsSeries.original_language}
                            </span>
                        </div>
                    </div>

                    {/* keyWords */}
                    <div>
                        <h2 className='text-info'>Keywords</h2>
                        <div className='text-light d-flex gap-1 flex-wrap'>
                            {keyWordsSeries.length > 0 ? keyWordsSeries.map((keyWord) => (
                                <button key={keyWord.id} className='rounded style-hover-btn'>{keyWord.name && keyWord.name}</button>
                            )) : (
                                <p>
                                    No keywords have been added.
                                </p>
                            )}
                        </div>
                    </div>

                </section>
            )}
        </>
    )
}

export default SectionThreeDetailsS
