const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');

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
      }.bind(this));

      this.resetLocation()

    } else {
      debugger;
      this.setState({
        locationHeader: 'Please enter a valid city'
      })
    }
  }

  componentDidMount() {
    debugger;
    let retrievedLocation = JSON.parse(localStorage.getItem('location'))
    debugger;

  }

  resetLocation() {
    this.setState({
      location: '',
      locationHeader: ''
    })
  }

  handleUpdateLocation(e) {
    this.setState({
      location: (e.target.value)
    })
    let storedLocation = localStorage.setItem('location', JSON.stringify(this.state.location))
  }

  submitHandled(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state.location);
    this.setState({
      location: ''
    })
  }

  render() {
    let data;
    if (this.state.data.length) {
      data = JSON.stringify(this.state.data)
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
          <div>{data}</div>
        </section>
      </section>
    )
  }
}
  //   let forecast;
  //   if (this.state.data.length) {
  //     forecast = <DisplayWeather data={forecast} />
  //   }
  //   return (
  //     <div>
  //       <InputField handleSubmit={this.handleSubmitLocation.bind(this)}/>
  //       {forecast}
  //     </div>
  //   )
  // }

  module.exports = WeatherDisplay;
