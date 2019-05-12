import React, { Component } from 'react'


/* Obviously an about page :) 
 * Just some details about me and maybe a quick blurb
 */
export default class About extends Component {
  render() {
    return (
      <div className="col-12">
        <div className="jumbotron">
            <h1>About this application</h1>
        </div>       
        <div className="col">
        <p>
            This was my first ever React application, as I am <a href="https://medium.com/@dtkatz/10-react-starter-project-ideas-to-get-you-coding-5b35782e1831" target="_blank" rel="noopener noreferrer" >following a post on medium</a> with recommendations for beginner react projects. My goal is to find a remote job,
            and it seems react is very popular, so that's what I'm learning.
        </p>
        </div>
        <div className="row">
            <div className="col">
                <h3>Developer details:</h3>
                <ul className="list-group">
                    <li className="list-group-item">Developer: Cole Atkinson</li>
                    <li className="list-group-item">Website: <a href="http://www.coleatkinson.nz" target="_blank" rel="noopener noreferrer" >coleatkinson.nz</a></li>
                    <li className="list-group-item">Email: <a href="mailto:coleatkinson1@gmail.com">coleatkinson1@gmail.com</a></li>
                </ul>
            </div>
            <div className="col">
                <h3>Software used:</h3>
                <ul className="list-group">
                    <li className="list-group-item">Node</li>
                    <li className="list-group-item">React</li>
                    <li className="list-group-item">MySQL</li>
                    <li className="list-group-item">Express</li>
                    <li className="list-group-item">Bootstrap</li>
                    <li className="list-group-item">Docker</li>
                    <li className="list-group-item">NGINX</li>
                </ul>
            </div>
        </div>
      </div>
    )
  }
}
