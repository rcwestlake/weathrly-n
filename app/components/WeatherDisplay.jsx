const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');

let dayMap = {
  '0' : 'Today',
  '1' : 'Mon',
  '2' : 'Tue',
  '3' : 'Wed',
  '4' : 'Thu',
  '5' : 'Fri',
  '6' : 'Sat',
  '7' : 'Sun'
}

class WeatherDisplay extends React.Component {
  constructor() {
    super();

    this.state = {
      source: 'http://weatherly-api.herokuapp.com/api/weather/',
      location: '',
      locationHeader: '',
      data: []
    }
  }

  locationAccepted(e) {
    e.preventDefault();

    let locationFormatted = this.state.location.replace(' ', '-').toLowerCase();

    if (locationFormatted === 'denver' || locationFormatted === 'san-diego' || locationFormatted === 'san-fransico' ||locationFormatted === 'castle-rock') {

      this.apiRequest = $.get(this.state.source + locationFormatted, function(result){
        this.setState({
          data: result
        })
        console.log('first log: ', this.state.data);
        var weatherInfo = this.state.data;
      }.bind(this));

      this.resetLocation()

    } else {
      this.setState({
        locationHeader: 'Please enter a valid city' //or link to Google or weatherunderground
      })
    }
  }

  componentDidMount() {
    let retrievedLocation = JSON.parse(localStorage.getItem('location'))
    this.setState({
      location: ''
    })
  }

  handleUpdateLocation(e) {
    let storedLocation = localStorage.setItem('location', JSON.stringify(this.state.location))
    this.setState({
      location: (e.target.value)
    })
  }

  submitHandled(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state.location);
    this.setState({
      location: ''
    })
  }

  resetLocation() {
    this.setState({
      location: '',
      locationHeader: ''
    })
  }

  render() {
    let data;
    if (this.state.data.length) {
      data = DisplayWeather(this.state.data)
    }
    return (
      <section>
        <section className='header'>
          <div className='title'>weathr<span className='weathr-ly'>ly</span></div>
          <p>{this.state.locationHeader}</p>
          <form onSubmit={this.locationAccepted.bind(this)}>
            <div className="form-group">
              <input
              className="form-control"
              placeholder="Enter city"
              onChange={this.handleUpdateLocation.bind(this)}
              value={this.state.location}
              type="text" />
              </div>
            <div>
              <button type="submit">Get Weather</button>
            </div>
          </form>
        </section>

        <section className='weather-container'>
          <div>
            {data}
          </div>
        </section>
      </section>
    )
  }
}



function DisplayWeather(weatherData) {
  debugger;
  let i = 0;
  let weather = weatherData;
  let summaryArray = [];

  weather.forEach((item) => {
    summaryArray.push(<ul key={i}>
                        <li>{dayMap[i]}</li>
                        <li>High: {weather[i].temp.high}&deg;</li>
                        <li>Low: {weather[i].temp.high}&deg;</li>
                        <li>{weather[i].weatherType.chance * 100}% Chance of Precip</li>
                      </ul>)
  i++;
  })
  return summaryArray;
}

  module.exports = WeatherDisplay;
