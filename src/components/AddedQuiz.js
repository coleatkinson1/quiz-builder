import React, { Component } from 'react'
import { Redirect } from 'react-router';


/* This component simply prints the success/fail message from BuildQuiz and then redirects to the homepage after a short wait */

export default class AddedQuiz extends Component {
    state = {
        redirect : false
    }
    goHome = () => {
        this.setState( state => { return{ redirect : true}});
    }
    componentDidMount() {
      return setTimeout(this.goHome, 1000);
    }
    
  render() {
    if (this.state.redirect){
        return <Redirect to="/" />
    }

    return (
      <div className="col-12">
        <div className="jumbotron">
            { this.props.message }
        </div>
      </div>
    )
  }
}
