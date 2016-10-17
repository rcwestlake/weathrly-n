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

  getData(location) {
    debugger;
     var data = $.get(this.state.source + location, function(result){
       this.setState({
         data: [result]
       })
       console.log(this.state.data);
     }.bind(this));
  }

  handleSubmitLocation(location) {
    var data = this.getData(location);
    this.setState({
      location: '',
      data: data
    })
  }

  render() {
    return (
      <div>
        <InputField handleSubmit={this.handleSubmitLocation.bind(this)}/>
      </div>
    )
  }

}

class InputField extends React.Component {
  constructor() {
    super();
    this.state = {
      location: ''
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
      <form onSubmit={this.submitHandled.bind(this)}>
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
    )
  }
  }

  class DisplayWeather extends React.Component {

  }

  module.exports = WeatherDisplay;
