import React from "react";
import Bubble from './Bubble';
import './Dogs.css';

class Dogs extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNumChange = this.handleNumChange.bind(this);
        this.state = {
          inputField: '',
          dogNum: this.props.dog
        };
      }
    handleSubmit(e) {
        e.preventDefault()
        this.props.handleSubmit(this.state)
    }
    handleNumChange(e) {
        this.setState({
            dogNum: e.target.value
        })
    }
    handleChange(e) {
        this.setState({
            inputField: e.target.value
        })
    }
    render() {
        if(this.props.loading){
            return(
                <div className="spinner">
                    <div className="bar rect1"></div>
                    <div className="bar rect2"></div>
                    <div className="bar rect3"></div>
                    <div className="bar rect4"></div>
                    <div className="bar rect5"></div>
                </div>
            )
        }
        return (
            <div className="container Dogs">
                <div className="Dogs-title">
                    <h1 className="display-2 text-center">Dogs</h1>
                    <h4 className="display-6 text-center">in {this.props.location}</h4>
                </div>
                <form onSubmit={this.handleSubmit} className="location-form">
                    <div className="form-group">
                        <label for="formControlRange">Number of Results: {this.state.dogNum}</label>
                        <input type="range" onChange={this.handleNumChange} className="form-control-range" min="2" max="48" id="formControlRange" />
                        <div className="form-group row text-input">
                            <label for="location" className="loc-form col-md-6 col-form-label">Zipcode:</label>
                            <div className="loc-form col-md-6">
                                <input
                                    value={this.state.inputField}
                                    onChange={this.handleChange}
                                    type="text" 
                                    className="form-control" 
                                    name="location" 
                                    id="location" 
                                    aria-describedby="location" 
                                    placeholder="Enter Zipcode"
                                    defaultValue={this.props.location}
                                />
                            </div>
                        </div>
                        <button type="submit" className="loc-form submit btn btn-light col-md-8">Submit</button>
                    </div>
                </form>
                
                <div className="container">
                    <div className="row">
                        {this.props.dogs.map(d => (
                            <div key={d.id} className="text-center">
                                <Bubble dogData={d} photos={d.photos[0]} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Dogs;



