import React from 'react';
import './App.css';
import { instance } from './AxisInstance';

class Search extends React.Component {
    constructor(props) {
        super();
        this.state = { searchValue: null };
    }

    handleSearchInputChanges = (e) => {
        this.setState({ searchValue: e.target.value })
    }

    callSearchFunction = () => {
        instance
            .get(`search/movie?api_key=1e7d7bc9019c5243da2aacfefe7f9a76&language=en-US&query=${this.state.searchValue}&page=1&include_adult=false
                  `)
            .then((resp) => {
                this.props.updateSearch(resp.data.results)
            })
            .catch((error) => {
                throw error;
            });
    }

    render() {
        const { searchValue } = this.state;
        return (
            <div className="search" style={{ position: "fixed", paddingBottom: 25, right: 0, left: 0 }}>
                <input
                    value={searchValue}
                    onChange={this.handleSearchInputChanges}
                    type="text"
                    style={{ padding: 0, boxSizing: "border-box", width: 350, height: 25 }}
                />
                <input onClick={this.callSearchFunction} type="submit" value="SEARCH" style={{ height: 25 }} />
            </div>
        );
    }
}

export default Search;