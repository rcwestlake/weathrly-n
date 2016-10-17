const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const WeatherDisplay = require('./WeatherDisplay.jsx');


class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <WeatherDisplay />
    )
  }
}

ReactDOM.render(<App />, document.querySelector('.app'));
