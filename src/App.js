import React from 'react';

import './bootstrap.css'
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Menu from "./components/Menu";
import BuildQuiz from "./components/BuildQuiz"
import AddedQuiz from "./components/AddedQuiz"
import TakeQuiz from "./components/TakeQuiz"
import Quiz from "./components/Quiz";
import QuizSuccess from "./components/QuizSuccess"
import About from "./components/About"

import queryString from 'query-string'


const App = (props) => {
  
  return (
    <Router>
    <div className="container">
      <div className="row">
        <Switch>
        <Route exact path="/" component={Menu} />
        <Route path="/build-quiz" component={BuildQuiz} />
        <Route path="/added-quiz" render={ (props) =>  <AddedQuiz message={queryString.parse(props.location.search).qs} /> } />
        <Route path="/take-quiz" component={TakeQuiz} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/finish-quiz" component={QuizSuccess} />
        <Route path="/about" component={About} />
        </Switch>
      </div>
      <span className="floatingHome"><Link to="/">Home</Link></span>
    </div>
    </Router>
  );
}

export default App;
