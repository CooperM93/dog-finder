import React from "react";
import Bubble from './Bubble';
import './Dogs.css';

class Dogs extends React.Component {

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
                <h1 className="Dogs-title display-2 text-center">Dogs</h1>
                <div className="container">
                    <div className="row">
                        {this.props.dogs.map(d => (
                            <div className="col-xl-4 col-md-6  text-center">
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



