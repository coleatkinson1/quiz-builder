import React from 'react';
import QuestionField from './QuestionField';
import { Redirect } from 'react-router';

class BuildQuiz extends React.Component {
    state = {
        name : " ",
        count : 1,
        // The questions array will hold question objects, keeping track of the values of our question fields
        questions : [
            [ "", "", "", "", "" ]
        ],
        finished : false,
        finishMessage : "The quiz was added to the database",
        errorMessage : ""
    }
    // Validate form fields and send the data to our MySQL API
    handleForm = (e) => {
        e.preventDefault();

        //Do some stuff here
        let url = "http://localhost:3001/mysqlapi/?m=insert&data=" + JSON.stringify(this.state.questions)
        url += "&name=" + this.state.name;
        url += "&qnum=" + this.state.count;
        fetch(url)
        .then( (res) => res.text() )
        .then( function(data) {
            console.log(data);
        })
        .catch( error =>{
            console.log("There was an error:")
            console.log(error)
           this.setState( state => { return { finishMessage : "There was an error adding your quiz to the database :("  } } );
        })
        // Redirect
        console.log("Redirecting");
        this.setState( state => { return {finished : true} });
        
         //this.props.history.push('/quiz-success');
    }

    // Handle the changing of the name and count values in state
    // The e.persist() is a bit of a hack to fix a problem I was getting where e.target would be unidentified when putting it
    // into the state.
    updateName = (e) => {
        e.persist();
        this.setState( state => {
            return { name : e.target.value, count : state.count, questions : state.questions }
        })
    }
    updateCount= (e) => {
        e.persist();
        // Validate our count field to integer 1-99 (with a maximum of how many questions we have)
        let count = Math.min(Math.min(99, this.state.questions.length), parseInt(e.target.value) >= 1 ? e.target.value : 1);
        this.setState( state => {
            return { name : state.name, count : count, questions : state.questions }
        })
    }
    /* Add a new question field
     * This will add a new question object to the state.
     * The KEY of the component will be the array index of the new object.
     * Since the state changes, this component will re-render, and our new question field will be visible.
     */
    addQuestion = (e) => {
        e.preventDefault();
        // Max 99 questions
        if ( this.state.questions.length >= 99){
            this.setState( state => { return { errorMessage : "Maximum of 99 questions allowed"}});
            return;
        }
        this.setState( state => {
            return { questions : [...state.questions, [ "", "", "", "", ""] ]}
        })
    }
    /* Update a value in a question
     * To be passed to a questionField component as props - called whenever an input field is changed.
     */
    updateQuestion = (question, index, value) => {
        this.setState( (state) => {
            let tmpState = state.questions
            tmpState[question][index] = value
            return { tmpState }
        })
    }
    render() {
        // If we are finished, redirect to the finished page.
        if (this.state.finished)
            return <Redirect to={"/added-quiz?qs=" + this.state.finishMessage } />;

        return (
            <div className="col-12">
                <div className="jumbotron">
                <h1>Let's create a quiz!</h1>
                <p>&nbsp;</p>
                <h6>Please fill out the form below. You can add more questions by using the 'Add another Question' button at the bottom of the form.</h6>
                </div>
                <form onSubmit={ this.handleForm } className="form-group">
                    <div className="row">
                        <div className="col">
                            <label>Quiz Name: </label><input className="form-control" type="text" id="a" placeholder="My awesome Avengers quiz!" onChange={this.updateName} />
                        </div>
                        <div className="col">
                        <span className="aHint" title="This is how many questions are selected randomly from all of the available questions for the quiz-taker to answer.">(?)</span> <label>Number of Questions:</label><input className="form-control"  type="text" id="b" placeholder="10"  value={this.state.count} onChange={this.updateCount} />
                        </div><p>&nbsp;</p>
                    </div>
                    <div className="row">  
                        <div className="col-3">
                            <input className="btn btn-primary quizSubmit" type="submit" value="Submit" />
                        </div>
                    </div>  
                    <div className="row">
                        <div className="col-12">
                            { this.state.questions.map( (v, i) => {
                                return <QuestionField key={i} id={i} data={this.state.questions[i]} updateQuestion={this.updateQuestion} />
                            }) }
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={ this.addQuestion }>Add another Question</button>
                </form>
            </div>
        );
    }
}

export default BuildQuiz;