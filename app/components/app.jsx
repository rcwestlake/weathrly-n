const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      location: '',
      data: []
    }
  }

  render() {
    return (
      <inputField onUpdateLocation={this.handleUpdateLocation} onSubmit={this.handleSubmitLocation} location={this.state.location}/>
    )
  }

  }

ReactDOM.render(<App />, document.querySelector('.app'));
