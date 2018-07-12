import _ from "lodash";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import YTSearch from 'youtube-api-search';
import VideoDetail from './components/video_detail';

const API_KEY = config.SECRET_KEY;


// Create new component and it should produce some html
class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('Fortnite');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
       });
      // Condensed version of this.setState({ videos: videos})
    });
  }


  render()  {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300)
    // function can only be called every 300 milliseconds
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
        onVideoSelect={selectedVideo => this.setState({selectedVideo})}
        videos={this.state.videos} />
      </div>
    );
  }
}

// Take component and put it onto page(DOM)

ReactDOM.render(<App/>, document.querySelector(".container"));
