import React from 'react';
import './App.css';
import NavBar from './NavBar';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dogs from './Dogs';
import DogInfo from './DogInfo';
import axios from 'axios';
import Querystring from 'querystring';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        dogs: [],
        loading: false,
        location: 94707,
        authorization: '',
        dogNum: 12
    };

    this.dogGetter = this.dogGetter.bind(this);
    this.apiAuth = this.apiAuth.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static defaultProps = {
      dogs: [
          {
              name: "Spot",
              age: 1,
              src: 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/01/12201051/cute-puppy-body-image.jpg',
              facts: [
                  "Loves to run!",
                  "Very cuddly",
                  "Always smiling"
              ]
          },
          {
              name: "Rover",
              age: 3,
              src: 'https://cdn.editorchoice.com/wp-content/uploads/2019/06/dogtilt.jpg',
              facts: [
                  "Loves to jump!",
                  "Independent",
                  "Sad when alone"
              ]
          }
      ]
  }
  componentDidMount() {
    this.state.dogs && this.setState({loading: true});
    this.apiAuth().then(this.dogGetter);
  }
  handleSubmit(state) {
    const regNum = new RegExp(/^-?\d+\.?\d*$/);
    regNum.test(state.inputField) 
    ? this.setState({ location: state.inputField, dogNum: state.dogNum })
    : alert('Please enter valid Zipcode');
    !regNum.test(this.state.location) && alert('Please enter a valid Zipcode')
    console.log(state);
    this.setState({loading: true});
    this.apiAuth().then(this.dogGetter);
  }
  async apiAuth() {
    const apiAuth_data = {
        grant_type: 'client_credentials',
        client_id: 'tNAak61YIaJoFRcMA81dwb72M9ipGN6oxAW5aWeCzf0zfI5eGK',
        client_secret: 'C4TTi4FvKYy0q2nMJ7hJMbLCzeC9aebTjvRtg2SC'
    }
    await axios.post('https://api.petfinder.com/v2/oauth2/token', Querystring.stringify(apiAuth_data))
        .then(response => {
            console.log(response.data);
            this.setState({authorization: 'Bearer ' + response.data.access_token})
            console.log('userresponse' + response.data.access_token);
        })
        .catch((e) => {
            console.log('error' + e);
        });
  }
  async dogGetter() {
      try{ 
          const dogGetter_data = {
            headers: {
              Authorization: this.state.authorization
            },
            params: {
              type: 'dog',
              location: this.state.location,
              page: 1,
              limit: 100
            }
          }
          console.log(dogGetter_data);
          let response = await axios.get('https://api.petfinder.com/v2/animals', {...dogGetter_data})
          let dogs = []
          let i = 2
          while (dogs.length < this.state.dogNum) {
            let lastanimal = response.data.animals[response.data.animals.length-1];
            if(lastanimal.photos.length !== 0 ){
              dogs.push(response.data.animals.pop());
              console.log(dogs, 'dog array')
              lastanimal = response.data.animals[response.data.animals.length-1];
              continue
            }            
            else if(response.data.animals.length < 5){
              let dogGetter_newData = {
                headers: {
                  Authorization: this.state.authorization
                },
                params: {
                  type: 'dog',
                  location: this.state.location,
                  page: i,
                  limit: 100
                }
              }
              let response = await axios.get('https://api.petfinder.com/v2/animals', {...dogGetter_newData});
              i++;
              console.log(i, 'response size too small');
              lastanimal = response.data.animals[response.data.animals.length-1];
              continue
            }
            else if(i > 5){
              break;
            }
            else{
              console.log(lastanimal.photos.length, 'failed photo length')
              response.data.animals.pop();
              lastanimal = response.data.animals[response.data.animals.length-1];
              continue
            }
          }
          this.setState(
              st => ({
                  dogs: dogs,
                  loading: false
              })
          )
      } catch (e) {
          alert(e);
          this.setState({loading: false});
      } 
  }
  render() {
    const getDog  = props => {
      let name = props.match.params.name;
      let currentDog = this.state.dogs.find(
        dog => dog.name.toLowerCase() === name.toLowerCase()
      );
      return <DogInfo {...props} dog={currentDog}/>
    }
    return (
      <div className="App">
        <NavBar dogs={this.state.dogs} />
        <Switch>
          <Route
            exact path='/dog/:name'
            render={getDog}
          />
          <Route
            exact path='/'
            render={() => <Dogs location={this.state.location} handleSubmit={this.handleSubmit} loading={this.state.loading} dogs={this.state.dogs}></Dogs>}
          />
          <Redirect to="/" />
        </ Switch>
      </div>
    );
  }
}

export default App;
