import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

function App() {
  // constructor() {
  //   super();
  //   this.state = {
  //     robots: [],
  //     searchfield: ''
  //   }
  // }

  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');
  // const [count, setCount] = useState(0);
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setRobots(users));
  }, []);
  
  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  }

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  });
  
  return !robots.length ?
  (<h1 className="f1 tc">Loading...</h1>) :
  (
    <div className="tc">
      <div className="application">
        <Helmet>
          <title>Robo Friends</title>
        </Helmet>
      </div>
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange}/>
      {/* <button onClick={ () => setCount(count+1) }>Click Me!</button> */}
      <Scroll>
        <ErrorBoundary>
          <CardList robots={filteredRobots}/>
        </ErrorBoundary>
      </Scroll>
    </div>
  );
}

export default App;
