import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { DetailsMovies, videoKeyMovies } from '../../ReduxSystem/DetailsMoviesSlice';
import Card from 'react-bootstrap/Card';
import { BsArrowLeftShort } from 'react-icons/bs';

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

const VideoPage = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading, videoDataBehindtheScenes, videoDataBloopers, videoDataFeaturette, videoDataClip, videoDataTeaser, videoDataTrailer, dataDetailsMovies } = useSelector(state => state.DetailsForMovies)

    const { id } = useParams()

    useEffect(() => {
        dispatch(videoKeyMovies(id))
        dispatch(DetailsMovies(id))
    }, [id])


    const tabData = [
        {
            label: 'Trailers',
            videos: videoDataTrailer,
        },
        {
            label: 'Teasers',
            videos: videoDataTeaser,
        },
        {
            label: 'Clips',
            videos: videoDataClip,
        },
        {
            label: 'Behind the Scenes',
            videos: videoDataBehindtheScenes,
        },
        {
            label: 'Bloopers',
            videos: videoDataBloopers,
        },
        {
            label: 'Featurettes',
            videos: videoDataFeaturette,
        },
    ];


    return (
        <>
            {loading === true ? (
                <div className='loadDetails d-flex justify-content-center align-items-center'>
                    <span className="loader"></span>
                </div>
            ) : (
                <section className='row'>
                    <div variant="dark" className='col-12 bg-dark'>
                        <Card className="col-12 border border-0 bg-dark container">
                            <Card.Body variant="dark" className='text-light bg-dark d-flex flex-column flex-sm-row align-items-center gap-3'>
                                <img variant="top" className='col-6 col-sm-4 col-md-3 rounded col-lg-1' src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${dataDetailsMovies && dataDetailsMovies.poster_path}`} />
                                <div className='text-center text-sm-start'>
                                    <Card.Title className='fs-4'>{dataDetailsMovies && dataDetailsMovies.title} <span className='text-secondary'>({dataDetailsMovies && dataDetailsMovies.release_date?.split("-")[0]})</span></Card.Title>
                                    <div as={Link} className='Link text-secondary' onClick={() => navigate(-1)}>
                                        <BsArrowLeftShort />Back to main
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className='col-12 text-light pt-5 p-lg-5 d-flex flex-column gap-3'>
                        <Box sx={{ maxWidth: { xs: 500, sm: 1500 } }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'white', color: 'white' }}>
                            <h4 className='text-info fs-3 text-center text-lg-start'>Social</h4>
                                <div className='d-flex flex-wrap justify-content-center gap-4'>
                                    <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons allowScrollButtonsMobile aria-label="scrollable force tabs example" textColor="secondary" indicatorColor="secondary">
                                        {tabData.filter((tab, index) =>
                                            tab.videos.length > 0).map((tab, index) => (
                                                <Tab key={index} label={`${tab.label} (${tab.videos.length})`} {...a11yProps(index)} sx={{ color: 'white' }} />
                                            ))}
                                    </Tabs>
                                </div>
                            </Box>
                            <Box className="bg-dark rounded-3">
                                {tabData.filter((tab, index) =>
                                    tab.videos.length > 0
                                ).map((tab, index) => (
                                    <TabPanel key={index} value={value} index={index}>
                                        <div className="col-12 d-flex flex-wrap gap-5">
                                            {tab.videos.map((video, videoIndex) => (
                                                <div key={videoIndex} className='col-12 shadow bg-dark-tertiary rounded'>
                                                    <iframe className='col-12' height="300" src={`https://www.youtube.com/embed/${video.key}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                                                </div>
                                            ))}
                                        </div>
                                    </TabPanel>
                                ))}
                            </Box>
                        </Box>

                    </div>
                </section>
            )}
        </>
    );
}

export default VideoPage;
