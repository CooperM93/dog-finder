import React from 'react';
import './DogInfo.css';
import {Link} from 'react-router-dom';

class DogInfo extends React.Component {
    render() {
        !localStorage.getItem(this.props.match.params.name) && localStorage.setItem(this.props.dog.name, JSON.stringify(this.props));
        let dogProps = JSON.parse(localStorage.getItem(this.props.match.params.name));
        console.log(dogProps)
        let photos;
        dogProps.dog.photos
        ? photos = dogProps.dog.photos
        : photos = 'NoPicture.jpg'; 
        let photo = photos[0]
        return(
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{dogProps.dog.name}</h5>
                        <a href={dogProps.dog.url}>
                            <img src={photo.large} className="card-img-top" alt={dogProps.dog.name} />
                        </a>
                    </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><span className="left">Age:</span>{dogProps.dog.age}</li>
                            {dogProps.dog.breeds.primary && <li className="list-group-item"><span className="left">Breed:</span>{dogProps.dog.breeds.primary}</li>}
                            {dogProps.dog.gender && <li className="list-group-item"><span className="left">Sex:</span>{dogProps.dog.gender}</li>}
                            {dogProps.dog.size && <li className="list-group-item"><span className="left">Size:</span>{dogProps.dog.size}</li>}
                        </ul>
                    <div className="card-body">
                        <Link className="btn btn-light" to='/'>Go Back</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default DogInfo;