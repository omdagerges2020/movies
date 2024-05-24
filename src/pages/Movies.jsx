import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import { FiftyMovies } from "../ReduxSystem/PageMoviesSlice";
import Pagination from "react-bootstrap/Pagination";
import {
  moviesPaginationFirst,
  moviesPaginationLast,
  moviesPaginationNext,
  moviesPaginationPrev,
} from "../ReduxSystem/BtnsPaginationSlice";
import { Skeleton } from "@mui/material";
import { Credits } from "../ReduxSystem/DetailsMoviesSlice";
import { useNavigate } from "react-router-dom";

const Movies = ({changeMode}) => {
  const dispatch = useDispatch();
  const { dataFiftyMovies, loading } = useSelector((state) => state.PageMovies);
  const { moviesBtnsNumber } = useSelector((state) => state.BtnsPagination);

  useEffect(() => {
    dispatch(FiftyMovies(moviesBtnsNumber));
  }, [moviesBtnsNumber]);

  const navigate = useNavigate();

  const handleDetails = (fiftyMovies) => {
    const encodedTitle = encodeURIComponent(
      fiftyMovies.title
        .toLowerCase()
        .replace(/%3A/g, "")
        .replace(/%20/g, "-")
        .replace(/ /g, "-")
    );
    dispatch(Credits(fiftyMovies.id));
    navigate(`/movie/${fiftyMovies.id}/title/${encodedTitle}`);
  };

  return (
    <div className={changeMode == "dark" ? "dark" : "light"}>
      <div className="container">

        <div className="text-center  mb-5">
          <h2>MOVIES</h2>
          <h2>
            PAGE NUMBER <span className="text-info">{moviesBtnsNumber}</span>{" "}
            FROM <span className="text-info">500</span>
          </h2>
        </div>

        {loading === true ? (
          <div className="loadDetails d-flex justify-content-center align-items-center">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="d-flex gap-5 gap-lg-4 gap-xl-3 justify-content-center align-items-center flex-wrap">
            {dataFiftyMovies.map((fiftyMovies, index) => (
              <Card
                variant="dark"
                key={index}
                style={{ width: "18rem" }}
                className="bg-dark"
              >
                {fiftyMovies.poster_path ? (
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${fiftyMovies.poster_path}`}
                  />
                ) : (
                  <Skeleton variant="rectangular" width={290} height={435} />
                )}
                <Card.Body className="d-flex flex-column gap-3">
                  <Card.Title className="text-center text-sm-start text-light m-0">
                    <span className="text-info">TAITLE :</span>{" "}
                    {fiftyMovies.title}
                  </Card.Title>
                  <div className="text-light">
                    <div className="style-rate d-flex justify-content-between align-items-start">
                      <div>
                        RATE :{" "}
                        <span className="text-info">
                          {fiftyMovies.vote_average}
                        </span>
                      </div>
                      <div>
                        <StarRatings
                          rating={fiftyMovies.vote_average / 2}
                          starRatedColor="gold"
                          numberOfStars={5}
                          name="rating"
                          starDimension="20px"
                          starSpacing="2px"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <Button
                      variant="outline-info"
                      onClick={() => handleDetails(fiftyMovies)}
                    >
                      DETAILS
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
        <div className="m-5 d-flex justify-content-center align-items-center">
          <Pagination>
            <Pagination.First
              onClick={() => dispatch(moviesPaginationFirst())}
              disabled={moviesBtnsNumber === 1}
            />
            <Pagination.Prev
              onClick={() => dispatch(moviesPaginationPrev())}
              disabled={moviesBtnsNumber === 1}
            />

            <Pagination.Item>{moviesBtnsNumber}</Pagination.Item>

            <Pagination.Next
              onClick={() => dispatch(moviesPaginationNext())}
              disabled={moviesBtnsNumber === 500}
            />
            <Pagination.Last
              onClick={() => dispatch(moviesPaginationLast())}
              disabled={moviesBtnsNumber === 500}
            />
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Movies;
