const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');

let dayMap = {
  '0' : 'Today',
  '1' : 'Monday',
  '2' : 'Tuesday',
  '3' : 'Wednesday',
  '4' : 'Thursday',
  '5' : 'Friday',
  '6' : 'Saturday',
  '7' : 'Sunday'
}

class WeatherDisplay extends React.Component {
  constructor() {
    super();

    this.state = {
      source: 'http://weatherly-api.herokuapp.com/api/weather/',
      location: '',
      locationHeader: '',
      locationTitle: 'So close... enter city above',
      data: []
    }
  }

  locationAccepted(e) {
    e.preventDefault();

    let locationFormatted = this.state.location.trim().replace(' ', '-').toLowerCase();
    debugger;

    if (locationFormatted === 'denver' || locationFormatted === 'san-diego' || locationFormatted === 'san-fransico' ||locationFormatted === 'castle-rock') {

      this.apiRequest = $.get(this.state.source + locationFormatted, function(result){
        this.setState({
          data: result,
          locationTitle: 'Location: ' + capitalizeEachWord(locationFormatted)
        })
        console.log('first log: ', this.state.data);
        var weatherInfo = this.state.data;
      }.bind(this));

      this.resetLocation()

    } else {
      this.setState({
        locationHeader: 'Please enter a valid city or click WeatherU to visit WeatherUnderground'
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
      <section className='app-container'>
        <section className='header'>
          <section className='built-container'>
          <img className='small-logo' src='../design/cloudy-night.png' />
            <small>Built By: <a href='https://github.com/rcwestlake/weathrly-n'>Ryan W</a></small>
          </section>
          <div className='logo'>
            <p className='title'>weathr<span className='weathr-ly'>ly</span></p>
          </div>
          <form onSubmit={this.locationAccepted.bind(this)}>
            <div className="form-group">
              <input
              className="form-input"
              placeholder="Enter city"
              onChange={this.handleUpdateLocation.bind(this)}
              value={this.state.location}
              type="text" />
              <button type="submit" className='submit'>Get Weather</button>
              <a href='https://www.wunderground.com/' target='_blank'><button type="button" className='google-btn'> WeatherU</button></a>
            </div>
            <p className='error'>{this.state.locationHeader}</p>
          </form>
          <h4 className='location-header-container'><span className='location-header'>{this.state.locationTitle}</span></h4>
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
    summaryArray.push(<article className={dayMap[i]} key={i}>
                        <p className={weather[i].weatherType.type}></p>
                        <h3 className='day'>{dayMap[i]} - {capitalizeEachWord(weather[i].weatherType.type)}</h3>
                        <h5 className='temp'><span className='high'>{weather[i].temp.high}&deg;</span> | <span className='low'>{weather[i].temp.low}&deg;</span></h5>
                        <h6 className='precip'>{Math.floor(weather[i].weatherType.chance * 100)}% Chance of Precip</h6>
                        <p className='alert'>{DisplayAlert(weather, i)}</p>
                      </article>)
  i++;
  })
  return summaryArray.slice(0, 7);
}

function DisplayAlert(weather, index) {
  debugger;
  if (weather[index].weatherType.scale > 2) {
    return (
      <span className='alert'>Severe weather expected. Stay safe.</span>
    )
  }
}

function capitalizeEachWord(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

  module.exports = WeatherDisplay;
