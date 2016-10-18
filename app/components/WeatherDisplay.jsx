const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');

class WeatherDisplay extends React.Component {
  constructor() {
    super();

    this.state = {
      source: 'http://weatherly-api.herokuapp.com/api/weather/',
      location: '',
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

    } else {
    }
  }

  handleUpdateLocation(e) {
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

  render() {
    return (
      <section>
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
