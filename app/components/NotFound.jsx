import React from 'react';
import {Link, Redirect} from 'react-router-dom';


/**
 * NotFound React Component
 */
export class NotFound extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      secondsToRedirect: 3
    }
  }


  componentDidMount() {
    this.startCounter();
  }


  /**
   * Start redirect countdown
   */
  startCounter() {
    this._countdownId = setInterval(() => {
      this.setState({
        secondsToRedirect: this.state.secondsToRedirect - 1
      });
    }, 1000);
  }


  componentWillUnmount() {
    clearInterval(this._countdownId);
  }


  render() {
    const {secondsToRedirect} = this.state;

    if (secondsToRedirect <= 0) {
      return <Redirect to="/"/>
    }

    return (
      <div>
        <h2 className="page-title">[404] Not found!</h2>
        <h5 className="text-center">
          You will be redirected to the
          <Link className="start-link" to="/">Start</Link>
          page in {secondsToRedirect} seconds...
        </h5>
      </div>
    );
  }
}


export default NotFound;