import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ImagesMovies, videoKeyMovies } from '../../ReduxSystem/DetailsMoviesSlice';
import { BsArrowRightShort } from 'react-icons/bs';

// تعريف دالة a11yProps
function a11yProps(index) {
    return {
        id: `tabpanel-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

// تعريف مكون TabPanel
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const SectionTwoDetailsTabsMedia = () => {
    const [scrollingRight, setScrollingRight] = useState(false);

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleScroll = (e) => {
        const scrollLeft = e.target.scrollLeft;
        if (scrollLeft > 0) {
            setScrollingRight(true);
        } else {
            setScrollingRight(false);
        }
    };


    const dispatch = useDispatch()
    const { loading , videoData, imagesbackdrops, imagesposters } = useSelector(state => state.DetailsForMovies)

    const { id , title} = useParams()

    useEffect(() => {
        dispatch(videoKeyMovies(id))
        dispatch(ImagesMovies(id))
    }, [id])



    return (
        <>
            {loading === true ? (
                <div className='loadDetails d-flex justify-content-center align-items-center'>
                    <span className="loader"></span>
                </div>
            ) : (
                <section className='row'>
                    <div className='text-light p-2 p-lg-5 pt-0 pt-lg-0 pb-0 pb-lg-0 d-flex flex-column gap-3'>
                    <h4 className='text-info'>Media</h4>
                        <Box sx={{ maxWidth: { xs: 500, sm: 1500 } }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'black', color: 'white' }}>
                                <div className='d-flex gap-4'>
                                    <Tabs 
                                      value={value}
                                      onChange={handleChange}
                                      variant="scrollable"
                                      scrollButtons
                                      allowScrollButtonsMobile
                                      aria-label="scrollable force tabs example"
                                      textColor="secondary"
                                      indicatorColor="secondary"
                                    >
                                        <Tab label={`Videos (${videoData && videoData.length})`} {...a11yProps(0)} sx={{ color: 'white' }} />
                                        <Tab label={`Backdrops (${imagesbackdrops && imagesbackdrops.length})`} {...a11yProps(1)} sx={{ color: 'white' }} />
                                        <Tab label={`Posters (${imagesposters && imagesposters.length})`} {...a11yProps(1)} sx={{ color: 'white' }} />
                                    </Tabs>
                                </div>
                            </Box>
                            <Box className={`${videoData.length > 0 ? `bg-dark rounded-3 style-cards-acting position-relative`: `bg-dark rounded-3`} ${scrollingRight ? 'hide-shadow' : ''}`}>
                                <TabPanel value={value} index={0} >
                                    <div className="col-12 d-flex flex-nowrap overflow-auto gap-3" onScroll={handleScroll}>
                                        {videoData.length > 5 ?
                                            (videoData.filter((video, index) => index < 6).map((video, index) => (
                                                <div key={index} className='col-lg-5 col-md-5 col-sm-8 col-12 shadow bg-dark-tertiary rounded'>
                                                    <iframe className='col-12' key={video.key} height="300" src={`https://www.youtube.com/embed/${video.key}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                                                </div>
                                            ))


                                            ) : (videoData.length > 5 || videoData.length !== 0) ? (
                                                videoData.map((video, index) => (
                                                    <div key={index} className='col-lg-6 col-md-5 col-sm-8 col-12 shadow bg-dark-tertiary rounded'>
                                                        <iframe className='col-12' height="300" src={`https://www.youtube.com/embed/${video.key}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>
                                                    No video have been added.
                                                </p>
                                            )}
                                        {videoData.length > 5 && (
                                            <div variant="dark" className='bg-dark text-light d-flex justify-content-center align-items-center col-md-2 col-sm-4 col-6 shadow bg-dark-tertiary rounded'>
                                                <Link as={Link} to={`/movie/${id}/title/${title}/videos`} className='fs-6 Link text-light cursor-pointer'>Show more <BsArrowRightShort className='fs-5' /></Link>
                                            </div>
                                        )}
                                    </div>
                                </TabPanel>
                                <TabPanel value={value} index={1} className={`${imagesbackdrops.length > 0 ? `style-cards-acting position-relative` : ``} ${scrollingRight ? 'hide-shadow' : ''}`}>
                                    <div className="col-12 d-flex flex-nowrap overflow-auto gap-3"
                                    onScroll={handleScroll}
                                    >
                                        {imagesbackdrops.length > 5 ?
                                            (imagesbackdrops.filter((images, index) => index < 6).map((images, index) => (
                                                <div key={index} className='col-lg-4 col-md-4 col-sm-6 col-12 shadow bg-dark-tertiary rounded'>
                                                    <img className='col-12' src={images.file_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${images.file_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`} />
                                                </div>
                                            ))


                                            ) : (imagesbackdrops.length > 5 || imagesbackdrops.length !== 0) ? (
                                                imagesbackdrops.map((images, index) => (
                                                    <div key={index} className='col-lg-6 col-md-4 col-sm-6 col-12 shadow bg-dark-tertiary rounded'>
                                                        <img className='col-12' src={images.file_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${images.file_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`} />
                                                    </div>
                                                ))
                                            ) : (
                                                <p>
                                                    No Images Backdrops have been added.
                                                </p>
                                            )}
                                        {imagesbackdrops.length > 5 && (
                                            <div variant="dark" className='bg-dark text-light d-flex justify-content-center align-items-center col-md-2 col-sm-4 col-6 shadow bg-dark-tertiary rounded'>
                                                <Link as={Link} to={`/movie/${id}/title/${title}/images/backdrops`} className='fs-6 Link text-light cursor-pointer'>Show more <BsArrowRightShort className='fs-5' /></Link>
                                            </div>
                                        )}
                                    </div>
                                </TabPanel>
                                <TabPanel value={value} index={2} className={`${imagesposters.length > 0 ? `style-cards-acting position-relative` : ``} ${scrollingRight ? 'hide-shadow' : ''}`}>
                                    <div className="col-12 d-flex flex-nowrap overflow-auto gap-3"
                                    onScroll={handleScroll}>
                                        {imagesposters.length > 5 ?
                                            (imagesposters.filter((posters, index) => index < 6).map((posters, index) => (
                                                <div key={index} className='col-lg-4 col-md-4 col-sm-6 col-12 shadow bg-dark-tertiary rounded'>
                                                    <img className='col-12' src={posters.file_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${posters.file_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`} />
                                                </div>
                                            ))


                                            ) : (imagesposters.length > 5 || imagesposters.length !== 0) ? (
                                                imagesposters.map((posters, index) => (
                                                    <div key={index} className='col-lg-6 col-md-4 col-sm-6 col-12 shadow bg-dark-tertiary rounded'>
                                                        <img className='col-12' src={posters.file_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${posters.file_path}` : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`} />
                                                    </div>
                                                ))
                                            ) : (
                                                <p>
                                                    No Images Posters have been added.
                                                </p>
                                            )}
                                        {imagesposters.length > 5 && (
                                            <div variant="dark" className='bg-dark text-light d-flex justify-content-center align-items-center col-md-2 col-sm-4 col-6 shadow bg-dark-tertiary rounded'>
                                                <Link as={Link} to={`/movie/${id}/title/${title}/images/posters`} className='fs-6 Link text-light cursor-pointer'>Show more <BsArrowRightShort className='fs-5' /></Link>
                                            </div>
                                        )}
                                    </div>
                                </TabPanel>
                            </Box>
                        </Box>
                    </div>
                </section>
            )}
        </>
    );
}

export default SectionTwoDetailsTabsMedia;
