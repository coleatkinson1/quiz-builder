import React from 'react';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="col-12">
                <div className="jumbotron">
                    <h1>Welcome to Cole's React Quiz</h1>
                    <p>&nbsp;</p>
                    <h6>Please choose from the options below</h6>
                </div>
            <ul className="list-group">
            <Link to="/build-quiz"><li className="list-group-item" >Build a Quiz</li></Link>
            <Link to="/take-quiz"><li className="list-group-item">Take a Quiz</li></Link>
            <Link to="/about"><li className="list-group-item">About this Quiz</li></Link>
            </ul>
            </div>
        );
    }
}

export default Menu;