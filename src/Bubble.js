import React from 'react';
import { Link } from 'react-router-dom'
import './Bubble.css';

class Bubble extends React.Component {
    render() {
        let photo = []
        this.props.photos
        ? photo = this.props.photos.large
        : photo = 'NoPicture.jpg';
        return(
            <div className="Bubble">
                <Link to={`/dog/${this.props.dogData.name}`}>
                    <h1 className="h5 display-5 BubbleTitle">{this.props.dogData.name}</h1>
                    {<img className="BubbleImg" src={photo} alt={this.props.dogData.name}></img>}
                </Link>
            </div>
        )
    }
}

export default Bubble;