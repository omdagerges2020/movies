import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  SearchFunction,
  SearchFunctionWithSeries,
  defaultValueMovies,
  defaultValueSeries,
} from "../ReduxSystem/SearchSlice";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Credits, DetailsMovies } from "../ReduxSystem/DetailsMoviesSlice";
import {
  CreditsSeries,
  DetailsSeries,
} from "../ReduxSystem/DetailsSeriesSlice";
import { FaRegMoon } from "react-icons/fa";
import { IoSunny } from 'react-icons/io5';


const Header = ({ changeMode, handleMode }) => {
  const searchValue = useRef();
  const form = useRef();

  const { dataSearch, dataSearchWithSeries } = useSelector(
    (state) => state.search
  );
  const dispatch = useDispatch();
  const searchListRef = useRef(null);

  const [toggelSearch, setToggelSearch] = useState(false);

  const itemsToShow = 6;

  const handleSearch = () => {
    const value = searchValue.current.value.toLowerCase();
    if (toggelSearch === false) {
      dispatch(SearchFunction(value));
    } else {
      dispatch(SearchFunctionWithSeries(value));
    }
  };

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (searchListRef.current) {
      const list = searchListRef.current;
      const items = list.children;
      if (items.length > itemsToShow) {
        list.style.maxHeight = `${itemsToShow * items[0].offsetHeight}px`;
      }
    }
  }, [dataSearch, dataSearchWithSeries]);

  useEffect(() => {
    const value = searchValue.current?.value;
    const isValueEmpty = !value || value.trim() === "";
    const doesValueStartWithSlash = value?.startsWith("/");
    setIsDisabled(isValueEmpty || doesValueStartWithSlash);
  }, [searchValue.current?.value]);

  const handleToggelSearch = () => {
    if (toggelSearch === false) {
      setToggelSearch(true);
      dispatch(defaultValueSeries());
    } else {
      setToggelSearch(false);
      dispatch(defaultValueMovies());
    }
  };

  const navigate = useNavigate();

  const handleDetailsMovies = (movie) => {
    const encodedTitle = encodeURIComponent(
      movie.title
        .toLowerCase()
        .replace(/%3A/g, "")
        .replace(/%20/g, "-")
        .replace(/ /g, "-")
    );

    dispatch(DetailsMovies(movie.id));
    dispatch(Credits(movie.id));
    navigate(`/movie/${movie.id}/title/${encodedTitle}`, {
      state: {
        location: "movie",
      },
    });
    dispatch(defaultValueMovies());
    form.current.reset();
  };

  const handleDetailsSeries = (series) => {
    const encodedName = encodeURIComponent(
      series.name
        .toLowerCase()
        .replace(/%3A/g, "")
        .replace(/%20/g, "-")
        .replace(/ /g, "-")
    );

    dispatch(DetailsSeries(series.id));
    dispatch(CreditsSeries(series.id));
    navigate(`/tv/${series.id}/name/${encodedName}`, {
      state: {
        location: "series",
      },
    });
    dispatch(defaultValueSeries());
    form.current.reset();
  };

  const handleBtnHomeSearch = () => {
    const value = searchValue.current?.value;

    if (searchListRef.current) {
      const list = searchListRef.current;
      const items = list.children;
      if (items.length > 0) {
        navigate(
          `/searchwith/${value && value}/in/${
            toggelSearch === false ? `movies` : `series`
          }`
        );
        form.current.reset();
        dispatch(defaultValueSeries());
        dispatch(defaultValueMovies());
      }
    } else {
      alert("Sorry, there is no a Result");
    }
  };

  return (
    <div className="row sticky-top">
      <div className={changeMode === "dark" ? "bg-dark col-12 z-index" : "bg-secondary col-12 z-index "}>
        {/* Start my Header */}
        <Navbar  variant="dark"  expand="lg" className={changeMode === "dark" ? "container bg-dark" : "container bg-secondary"}>
          <Container >
            <Navbar.Brand href="#">Redux Movies</Navbar.Brand>
            {/* Dark && Light mode Button */}
            <Button
              className="bg-transparent text-white border border-0"
              onClick={() => handleMode()}
            >
              {changeMode == "dark" ? <FaRegMoon /> : <IoSunny />}
            </Button>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link as={Link} to="/" href="#action1">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/movies" href="#action2">
                  Movies
                </Nav.Link>
                <Nav.Link as={Link} to="/series" href="#action3">
                  Series
                </Nav.Link>
                <Nav.Link as={Link} to="/contactus" href="#action4">
                  Contact Us
                </Nav.Link>
              </Nav>
              <div className="position-relative">
                <Form
                  ref={form}
                  className="d-flex flex-column flex-md-row justify-content-between gap-4 gap-md-2 align-items-center"
                >
                  <Form.Control
                    type="search"
                    placeholder={
                      toggelSearch === false
                        ? "Search with movies"
                        : "Search with series"
                    }
                    aria-label="Search"
                    ref={searchValue}
                    onChange={handleSearch}
                  />
                  <div className="d-flex justify-content-center flex-wrap flex-md-nowrap gap-3 gap-md-2">
                    <Button
                      variant={changeMode === "dark" ? "outline-success" : "outline-white"}
                      disabled={isDisabled}
                      onClick={handleBtnHomeSearch}
                      className={changeMode === "light" && "text-white"}
                    >
                      Search
                    </Button>
                    <Button
                      variant={
                        toggelSearch === false
                          ? "outline-danger fw-bold"
                          : "outline-primary outline-primary fw-bold"
                      }
                      onClick={handleToggelSearch}
                    >
                      {toggelSearch === false ? "serachSeries" : "serachMovies"}
                    </Button>
                  </div>
                </Form>
                {toggelSearch === false
                  ? dataSearch.length > 0 && (
                      <ul
                        className="position-absolute w-100 p-0 mt-3 bg-dark text-light overflow-auto"
                        ref={searchListRef}
                      >
                        {dataSearch.map((result, index) => (
                          <li
                            key={index}
                            onClick={() => handleDetailsMovies(result)}
                            className="d-flex justify-content-between border border-end-0 border-start-0 mb-2 border-info rounded-2 p-2 hover-movies cursor-pointer"
                          >
                            <Stack direction="row">
                              <Avatar
                                alt="Remy Sharp"
                                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${result.poster_path}`}
                              />
                            </Stack>
                            <p className="ps-2">{result.original_title}</p>
                          </li>
                        ))}
                      </ul>
                    )
                  : dataSearchWithSeries.length > 0 && (
                      <ul
                        className="position-absolute w-100 p-0 mt-3 bg-dark text-light overflow-auto"
                        ref={searchListRef}
                      >
                        {dataSearchWithSeries.map((result, index) => (
                          <li
                            key={index}
                            onClick={() => handleDetailsSeries(result)}
                            className="d-flex justify-content-between p-2 border border-end-0 border-start-0 mb-2 border-info rounded-2 hover-series cursor-pointer"
                          >
                            <Stack direction="row">
                              <Avatar
                                alt="Remy Sharp"
                                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${result.poster_path}`}
                              />
                            </Stack>
                            <p className="ps-2">{result.name}</p>
                          </li>
                        ))}
                      </ul>
                    )}
              </div>
              <div className="text-center text-lg-start m-3 m-lg-0 ms-0 me-0">
                <Button variant="outline-info" className="ms-lg-2  fw-bold">
                  LogIn
                </Button>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* Start my Header */}
      </div>
    </div>
  );
};

export default Header;
