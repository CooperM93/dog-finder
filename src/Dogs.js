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
          inputField: ''
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
                    <div class="form-group">
                        <label for="formControlRange">Number of Results: {this.state.dogNum}</label>
                        <input type="range" onChange={this.handleNumChange} class="form-control-range" min="2" max="24" id="formControlRange" />
                        <div className="form-group row">
                            <label for="location" className="loc-form col-md-2 col-form-label">Zipcode:</label>
                            <div className="loc-form col-md-4">
                                <input
                                    value={this.state.inputField}
                                    onChange={this.handleChange}
                                    type="text" 
                                    className="form-control" 
                                    name="location" 
                                    id="location" 
                                    aria-describedby="location" 
                                    placeholder="Enter Location"
                                />
                            </div>
                            <button type="submit" className="loc-form submit btn btn-primary col-md-4">Submit</button>
                        </div>
                    </div>
                </form>
                
                <div className="container">
                    <div className="row">
                        {this.props.dogs.map(d => (
                            <div key={d.id} className="col-xl-4 col-lg-6  text-center">
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



