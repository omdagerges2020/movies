import React from 'react'
import BackgroundMoviesSectionOne from './pagesDelailsMovies/BackgroundMoviesSectionOne'
import SectionTwoDetailsActing from './pagesDelailsMovies/SectionTwoDetailsActing'
import SectionThreeDetails from './pagesDelailsMovies/SectionThreeDetails'
import SectionTwoDetailsTabs from './pagesDelailsMovies/SectionTwoDetailsTabs'
import SectionTwoDetailsTabsMedia from './pagesDelailsMovies/SectionTwoDetailsTabsMedia'
import SectionTwoDetailsCollection from './pagesDelailsMovies/SectionTwoDetailsCollection'
import SectionTwoDetailsRecommendations from './pagesDelailsMovies/SectionTwoDetailsRecommendations'

const DetailsMoviesPage = ({changeMode}) => {

  return (
    <>
        <div className={changeMode == "dark" ? 'd-flex flex-column gap-5' : 'd-flex flex-column gap-5 light'}>
          <BackgroundMoviesSectionOne />
          <section className='row flex-column flex-lg-row align-items-center align-items-lg-start gap-5 gap-lg-0'>
            <div className='col-12 col-sm-11 col-md-11 col-lg-9 d-flex flex-column gap-5'>
              <SectionTwoDetailsActing />
              <SectionTwoDetailsTabs />
              <SectionTwoDetailsTabsMedia />
              <SectionTwoDetailsCollection />
              <SectionTwoDetailsRecommendations />
            </div>
            <div className='col-12 col-sm-11 col-md-11 col-lg-3'>
              <SectionThreeDetails />
            </div>
          </section>

        </div>
    </>

  )
}

export default DetailsMoviesPage