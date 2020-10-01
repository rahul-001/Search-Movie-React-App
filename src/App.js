import React from 'react';
import './App.css';
import { instance } from './AxisInstance';
import Search from './Search'
import defaultImage from './Assets/defaultImage.png'


class App extends React.Component {
  constructor(props) {
    super();
    this.state = { movie: [], movieDetial: null };
    this.getMovies = this.getMovies.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies() {
    instance
      .get("movie/upcoming")
      .then((resp) => {
        this.setState({
          movie: resp.data.results
        })
      })
      .catch((error) => {
        throw error;
      });
  }

  updateSearch(arrMovies) {
    this.setState({ movie: arrMovies, movieDetial: null })
  }

  setMovieDetails = (objData) => {
    this.setState({ movieDetial: objData })
  }
  render() {
    const { movie, movieDetial } = this.state;
    return (<div style={{ height: '100vh' }}>
      <Search
        updateSearch={this.updateSearch} />
      <div style={{ display: "flex", paddingTop: 60 }}>
        <div style={{ width: '25%' }}>
          {
            movie.map(x => {
              return (
                <div className="Block" style={{ marginBottom: 20, }}>
                  <div style={{ display: "flex" }} >
                    <img
                      width="100"
                      height="100"
                      alt={`defaultImage`}
                      src={x.poster_path ? `${'https://image.tmdb.org/t/p/w500' + x.poster_path}` : defaultImage}
                      onClick={() => this.setMovieDetails(x)}
                    />
                    <div className="fontSize" style={{ width: 150 }}>
                      <div className="general-padding-class" style={{ paddingTop: 10 }}>Movie:{x.original_title}</div>
                      <div className="general-padding-class">Rating:{x.vote_average}</div>
                      <div className="general-padding-class">Release on:{x.release_date}</div>
                    </div>
                  </div>
                  <div className="fontSize" style={{ padding: 0, paddingTop: 10 }}>Overview:{x.overview.length > 200 ? `${x.overview.substring(0, 180)}...` : `${x.overview}`}</div>
                </div>
              )
            })
          }
        </div>
        <div style={{ width: '75%' }}>
          {movieDetial && <div className="Block" style={{ marginBottom: 20, position: "fixed" }}>
            <div style={{ display: "flex" }} >
              <img
                width="400"
                height="400"
                alt={`defaultImage`}
                src={movieDetial.poster_path ? `${'https://image.tmdb.org/t/p/w500' + movieDetial.poster_path}` : defaultImage}
              />
              <div className="fontSize-heading" style={{ width: 600 }}>
                <div className="general-padding-class" style={{ paddingTop: 10 }}>Movie:{movieDetial.original_title}</div>
                <div className="general-padding-class">Rating:{movieDetial.vote_average}</div>
                <div className="general-padding-class">Release on:{movieDetial.release_date}</div>
              </div>
            </div>
            <div className="fontSize-heading" style={{ padding: 0, paddingTop: 10, marginRight: 150 }}>Overview:{movieDetial.overview}</div>
          </div>}

          {
            movie.length == 0 &&
            <h3 style={{ marginLeft: 160 }}>No result found</h3>
          }
        </div>
      </div>
    </div>)
  }
}

export default App;
