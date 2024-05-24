import React, { useState } from 'react'
import Controls from './pagesHome/Controls'
import MoviesHome from './pagesHome/MoviesHome'
import SeriesHome from './pagesHome/SeriesHome'
import TopMovies from './pagesHome/TopMovies'
import TopSeries from './pagesHome/TopSeries'
// Icon Moon
import { FaRegMoon } from "react-icons/fa";
import { Button } from 'react-bootstrap'

const Home = ({handleMode, changeMode}) => {

  

  return (
    <div className={changeMode == "light" ? "light" : 'dark'}>
    
      <div className='text-center text-info'><h1>Home</h1></div>
      <Controls />
      <MoviesHome />
      <SeriesHome />
      <TopMovies />
      <TopSeries />
    </div>
  )
}

export default Home