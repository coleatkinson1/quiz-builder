import React from 'react';
import queryString from 'query-string'
import { Redirect } from 'react-router';
import uniqueId from 'react-html-id';
//mport ReactHtmlParser from 'react-html-parser'



class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title : "", qnum : 1, questions : [ [] ], count : 0, score : 0, buttonClasses : ["default", "default", "default", "default"], answers : [ "", "", "", ""], answered : false, finished : false };
        uniqueId.enableUniqueIds(this);
    }
    componentWillMount() {
        // Fetch our quiz
        const values = queryString.parse(this.props.location.search);
        let url = "http://localhost:3001/mysqlapi/?m=select&id=" + values.q;
        fetch(url)
        .then( (res) => res.json() )
        .then( data => {
            console.log(data[0].data);
            this.setState( state => {
                return { title : data[0].name, questions : JSON.parse(data[0].data), qnum : data[0].qnum }
            })
        })
        .then( ()=> {
            // Generate the initial set of answers
            this.generateAnswers();
        })
        .catch( error =>{
            console.log(error)
        })
        
    }
    generateAnswers = ( next = false ) => {
        
        // Check if we are generating the next set of questions vs initial set
        const count  = (next) ?  this.state.count +1 : this.state.count;

        // Nifty array shuffling
        let shuffledAnswers = [...this.state.questions[count]].splice(1,5);
        shuffledAnswers.sort( (a,b) =>{
            return Math.random() - Math.random();
        });
        /* This function is called initially, then after each answer is given,
         * therefore we need to check if we are generating the next set of questions - 
         * in which case we will increment the count also
         * */
        if (next)
            this.setState( state => { return { answers : shuffledAnswers, count : state.count+1, answered : false, buttonClasses : ["default", "default", "default", "default"] } } );
        else
            this.setState( state => { return { answers : shuffledAnswers }; });
    }
    componentDidMount(){
        //todo        
    }
    nextQuestion = () => {
        // Check if we are at the end of the quiz
        if ( this.state.count === this.state.qnum -1 ){
            this.setState ( state => { return { finished : true} } );
            return;
        }

        // If not, generate the next set of questions
        this.generateAnswers( true );
    }
    handleAnswer = (e) => {
        e.preventDefault();
        let newScore = this.state.score;

        // Don't allow further button presses if we have already answered the current question
        if (this.state.answered)
            return;

        // Set the className of the answer buttons, and score based on whether the answer is correct
        // Note: The first answer in our questions array is always the correct one
        let bc = "";
        if ( e.target.innerText === this.state.questions[this.state.count][1]){
            bc = "correctAnswer";
            newScore++;
            
        }else{
            bc = "wrongAnswer";
        }
        
        // Update state
        let tmpbc = this.state.buttonClasses;
        tmpbc[e.target.id] = bc;
        this.setState( state => { return { buttonClasses : tmpbc, answered : true, score: newScore } });

        // Make a little delay before showing the new set of questions (possibly put an animation here?)
        setTimeout( this.nextQuestion, 1000 );
    }

        // Unfortunately, React doesn't like my HTML special chars, so I will convert them back
        strFix(str)
        {
            if ( str === undefined)
                return "";
            str = str.replace(/&#44;'/g, ",");
            str = str.replace(/&#40;'/g, "(");
            str = str.replace(/&#41;/g, ")");
            str = str.replace(/&quot;/g, "\"");
            str = str.replace(/&#039;/g, "'");
        return str;
        }

    render() {

        // Copy our state variables so that we don't need to type this.state everywhere
        const {buttonClasses, answers, questions, count, score} = this.state;

        // If the quiz is finished, redirect to the next page
        if (this.state.finished)
            return <Redirect to={"/finish-quiz?s=" + this.state.score +"&t=" + (this.state.count+1) } />;

        // Prevent render until we have our state variables set correctly
        // Note: This is a hack, for a problem which I do not correctly know how to solve. On first render, my state variables may be 'undefined', and this will
        // cause problems. 
        if ( questions[count][0] === undefined )
            return null;

        return (
            <div className="col-12">
                <div className="jumbotron">
                    { /* Display the question and score at the top */ }
                    <h1>{questions[count][0]}</h1>
                    <h6>Score: { score }</h6>
                </div>
                <div className="col-12 form-group">
                    { /* Loop through the answers and render buttons for each of them */ }
                    { answers.map( (v, i) => {
                        // Generate unique id for our dynamically created components 
                        let uid = this.nextUniqueId();
                        return  <div key={uid+"container"} className="col-6 mx-auto">
                                    <button key={uid} id={i} onClick={this.handleAnswer} className={"btn btn-primary mb-2 form-control " + buttonClasses[i] } >{ this.strFix(v) }</button>
                                </div>
                    })}
                </div>
            </div>
            
        );
    }
}

export default Quiz;