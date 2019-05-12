import React, { Component } from 'react'
import queryString from 'query-string'
import {Link} from 'react-router-dom';

export default class QuizSuccess extends Component {
  render() {
    const values = queryString.parse(this.props.location.search);

    // Message based on how well they scored
    const ranking = [ "Better luck next time :'(", "Not a bad attempt :)", "You're a Genius!"][Math.round((2/values.t)*values.s)];
    return (
        <div className="col-12">
          <div className="jumbotron">
            Congratulations!, you scored { values.s } / {values.t}
          </div>
          <div className="col-12">
          <p>{ranking}</p>
          <p><Link to="/">Back to Home</Link></p>
          </div>
        </div>
        

      )
  }
}
