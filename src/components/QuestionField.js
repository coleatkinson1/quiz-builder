import React from 'react';

class QuestionField extends React.Component {
    state = {  }

    /* Fires on the onChange event for the inputs
     * Calls the updateQuestion function of BuildQuiz (referenced as a prop)
     */
    handleChange = (e) => {
        this.props.updateQuestion( this.props.id, e.target.id ,e.target.value )
    }
    render() {
        return (
            <div className="QuestionField form-group" id={this.props.id} >
                <label>Question: {this.props.id+1}</label><input className="form-control" name="question" id="0" type="text" placeholder="Enter your question here" onChange={this.handleChange} /><br />
                <label>Answer:</label><input className="form-control"  name="correctAnswer" id="1" type="text" placeholder="Put the correct answer here" onChange={this.handleChange} /><br />
                <label>Wrong Answer 1:</label><input className="form-control"  name="wrongAnswer" id="2" type="text" placeholder="Put a wrong answer here" onChange={this.handleChange} /><br />
                <label>Wrong Answer 2:</label><input className="form-control"  name="wrongAnswer" id="3" type="text" placeholder="Put a wrong answer here" onChange={this.handleChange} /><br />
                <label>Wrong Answer 3:</label><input className="form-control"  name="wrongAnswer" id="4" type="text" placeholder="Put a wrong answer here" onChange={this.handleChange} /><br />
            </div>
        );
    }
}

export default QuestionField;