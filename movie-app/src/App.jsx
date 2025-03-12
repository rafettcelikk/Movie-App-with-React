import { useState } from "react";
import useMovies from "./hooks/useMovies";
import useLocalStorage from "./hooks/useLocalStorage";
import Pagination from "./components/Pagination";
import ErrorMessage from "./components/ErrorMessage";
import Loading from "./components/Loading";
import Nav from "./components/Navbar/Nav";
import Logo from "./components/Navbar/Logo";
import Search from "./components/Navbar/Search";
import NavSearchResult from "./components/Navbar/NavSearchResult";
import Main from "./components/Main";
import ListContainer from "./components/ListContainer";
import MovieList from "./components/Movies/MovieList";
import MyListSummary from "./components/SelectedMovies/MyListSummary";
import MyMovieList from "./components/SelectedMovies/MyMovieList";
import MovieDetails from "./components/Movies/MovieDetails";

export default function App() {
  const [query, setQuery] = useState("marvel");
  const [selectedMovies, setSelectedMovies] = useLocalStorage(
    [],
    "selectedMovies"
  );
  const [selectedMovie, setSelectedMovie] = useState(null);

  const {
    movies,
    loading,
    error,
    currentPage,
    totalPage,
    totalResult,
    previousPage,
    nextPage,
  } = useMovies(query);

  function handleSelectedMovie(id) {
    setSelectedMovie((selectedMovie) => (id === selectedMovie ? null : id));
  }

  function handleUnSelectMovie() {
    setSelectedMovie(null);
  }

  function handleAddToList(movie) {
    setSelectedMovies((selectedMovies) => [...selectedMovies, movie]);
    handleUnSelectMovie();
  }

  function handleDeleteFromList(id) {
    setSelectedMovies((selectedMovies) =>
      selectedMovies.filter((m) => m.id !== id)
    );
  }

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NavSearchResult totalResult={totalResult} />
      </Nav>
      <Main>
        <div className="row mt-2">
          <div className="col-md-9">
            <ListContainer>
              {loading && <Loading />}
              {!loading && !error && (
                <>
                  {movies.length > 0 && (
                    <>
                      <MovieList
                        movies={movies}
                        onSelectMovie={handleSelectedMovie}
                        selectedMovie={selectedMovie}
                      />
                      <Pagination
                        nextPage={nextPage}
                        previousPage={previousPage}
                        currentPage={currentPage}
                        totalPage={totalPage}
                      />
                    </>
                  )}
                </>
              )}
              {error && <ErrorMessage message={error} />}
            </ListContainer>
          </div>
          <div className="col-md-3">
            <ListContainer>
              <>
                {selectedMovie ? (
                  <MovieDetails
                    selectedMovie={selectedMovie}
                    onUnSelectMovie={handleUnSelectMovie}
                    onAddToList={handleAddToList}
                    selectedMovies={selectedMovies}
                  />
                ) : (
                  <>
                    <MyListSummary selectedMovies={selectedMovies} />
                    <MyMovieList
                      selectedMovies={selectedMovies}
                      onDeleteFromList={handleDeleteFromList}
                    />
                  </>
                )}
              </>
            </ListContainer>
          </div>
        </div>
      </Main>
    </>
  );
}
