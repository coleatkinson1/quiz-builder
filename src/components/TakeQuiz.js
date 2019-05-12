import React from 'react';
import { Link } from 'react-router-dom';
import uniqueId from 'react-html-id';

class TakeQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = { list : [] };
        uniqueId.enableUniqueIds(this)
    }
    // Fetch the quiz list before we render
    componentWillMount() {
        let url = "http://localhost:3001/mysqlapi/?m=list";
        fetch(url)
        .then( (res) => res.json() )
        .then( data => {
            this.setState( state => {
                return { list : data }
            })
        })
        .catch( error =>{
            console.log(error)
        })
    }
    render() {
        return (
            <div className="col-12">
                <div className="jumbotron">
                    <h1>Please choose a quiz</h1>
                </div>
                <table className="table">
                    <thead><tr><th scope="col">#</th><th scope="col">Name</th><th scope="col">Times played</th><th scope="col">Average Score</th><th>&nbsp;</th></tr></thead>
                    <tbody>
                            {this.state.list.map( (v, i) => {
                                let uid = this.nextUniqueId();
                                return <tr key={uid + "row"} ><td key={uid + "cell"}>{i+1}</td><td key={uid+"name"} ><Link  key={uid + "link"} to={ "/quiz?q=" + v.id }>{v.name}</Link></td><td key={uid+"played"}>#</td><td key={uid+"score"}>#</td><td key={uid+"button"}><Link  key={uid + "playlink"} to={ "/quiz?q=" + v.id }><button  key={uid + "play"} className="btn btn-primary">PLAY</button></Link></td></tr>
                            })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TakeQuiz;