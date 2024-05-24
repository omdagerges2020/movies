import React, { useEffect, useState } from "react";
import Header from "./componants/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import DetailsMoviesPage from "./pages/DetailsMoviesPage";
import DetailsSeriesPage from "./pages/DetailsSeriesPage";
import Footer from "./componants/Footer";
import MovieDetailsCastAndCrew from "./pages/pagesDelailsMovies/MovieDetailsCastAndCrew";
import PersonDetails from "./pages/pagesDelailsMovies/PersonDetails";
import ReviewPage from "./pages/pagesDelailsMovies/ReviewPage";
import VideoPage from "./pages/pagesDelailsMovies/VideoPage";
import ImagesBackdropsPage from "./pages/pagesDelailsMovies/ImagesBackdropsPage";
import ImagesPostersPage from "./pages/pagesDelailsMovies/ImagesPostersPage";
import CollectionPage from "./pages/pagesDelailsMovies/CollectionPage";
import PersonSeriesDetails from "./pages/pagesDetailsSeries/PersonSeriesDetails";
import SeriesDetailsCastAndCrew from "./pages/pagesDetailsSeries/SeriesDetailsCastAndCrew";
import ReviewSeriesPage from "./pages/pagesDetailsSeries/ReviewSeriesPage";
import VideoPageSeries from "./pages/pagesDetailsSeries/VideoPageSeries";
import ImagesBackdropsPageSeries from "./pages/pagesDetailsSeries/ImagesBackdropsPageSeries";
import ImagesPostersPageSeries from "./pages/pagesDetailsSeries/ImagesPostersPageSeries";
import SeasonPageS from "./pages/pagesDetailsSeries/SeasonPageS";
import SeasonPageOfSeries from "./pages/pagesDetailsSeries/SeasonPageOfSeries";
import PageCreditsEpisodeOfSeasonSeries from "./pages/pagesDetailsSeries/PageCreditsEpisodeOfSeasonSeries";
import PageNotFound from "./PageNotFound";
import HomeSearch from "./pages/HomeSearch";
import ContactUs from "./pages/ContactUs";


function App() {
  const [changeMode, setChangeMode] = useState("dark");

  useEffect(()=>{
    if(localStorage.theme === "dark"){
      setChangeMode("dark")
    }else {
      setChangeMode("light")
    }
  },[changeMode])

  const handleMode = ()=>{
    // console.log("cahnge mode");
    if(changeMode === "dark"){
      setChangeMode("light")
      localStorage.theme = "light"
    }else {
      setChangeMode("dark")
      localStorage.theme = "dark"
    }
  }

  return (
    <div className={changeMode === "dark" ? "dark" : "light"}>
      <Header handleMode={handleMode} changeMode={changeMode}/>

      <Routes>
        <Route path="/" element={<Home changeMode={changeMode}/>} />
        <Route path="/movies" element={<Movies changeMode={changeMode}/>} />
        <Route path="/series" element={<Series changeMode={changeMode}/>} />
        <Route path="/contactus" element={<ContactUs changeMode={changeMode}/>} />



        <Route path="/movie/:id/title/:title" element={<DetailsMoviesPage changeMode={changeMode}/>} />
        <Route path="/tv/:id/name/:name" element={<DetailsSeriesPage changeMode={changeMode}/>} />
        <Route path="/movie/:id/title/:title/cast" element={<MovieDetailsCastAndCrew changeMode={changeMode}/>} />
        <Route path="/person/:id/hisname/:name" element={<PersonDetails changeMode={changeMode}/>} />
        <Route path="/movie/:id/title/:title/reviews" element={<ReviewPage changeMode={changeMode}/>} />
        <Route path="/movie/:id/title/:title/videos" element={<VideoPage changeMode={changeMode}/>} />
        <Route path="/movie/:id/title/:title/images/backdrops" element={<ImagesBackdropsPage changeMode={changeMode}/>} />
        <Route path="/movie/:id/title/:title/images/posters" element={<ImagesPostersPage changeMode={changeMode}/>} />
        <Route path="/collection/:id/title/:title" element={<CollectionPage changeMode={changeMode}/>} />


        <Route path="/person/:id/hisname/:name" element={<PersonSeriesDetails changeMode={changeMode}/>} />
        <Route path="/tv/:id/name/:name/cast" element={<SeriesDetailsCastAndCrew changeMode={changeMode}/>} />
        <Route path="/tv/:id/name/:name/reviews" element={<ReviewSeriesPage changeMode={changeMode}/>} />
        <Route path="/tv/:id/name/:name/videos" element={<VideoPageSeries changeMode={changeMode}/>} />
        <Route path="/tv/:id/name/:name/images/backdrops" element={<ImagesBackdropsPageSeries changeMode={changeMode}/>} />
        <Route path="/tv/:id/name/:name/images/posters" element={<ImagesPostersPageSeries changeMode={changeMode}/>} />
        <Route path="/tv/:id/name/:name/seasons" element={<SeasonPageS changeMode={changeMode}/>} />
        <Route path="/tv/:id/name/:name/season/:numberSeason" element={<SeasonPageOfSeries changeMode={changeMode}/>} />
        <Route path="/tv/:seriesId/season/:seasonNumber/episode/:episodeNumber" element={<PageCreditsEpisodeOfSeasonSeries changeMode={changeMode}/>} />


      {/* HomeSearch Page */}
      <Route path="/searchwith/:value/in/:category" element={<HomeSearch changeMode={changeMode}/>} />


        <Route path="/*" element={<PageNotFound />} />
      </Routes>    


      <Footer changeMode={changeMode}/>
    </div>
  );
}

export default App;
