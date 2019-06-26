import React from 'react';
import Form from './components/Form'
import ListOfFllowers from './components/ListOfFollowers';
import User from './components/User';
import styles from './App.css';

class App extends React.Component {

  state = {
    currentUserData: false,
    currentUserFolowers: false,
    error: false,
    message: false
  }

  getUserFolowers = async (nickname) => {
    this.setState({
      currentUserFolowers: false,
    });
    const api_url = await fetch(`https://api.github.com/users/${nickname}/followers`);
    const data = await api_url.json();
    if (data.message) {
      this.setState({
        error: true,
        message: data.message
      });
    } else {
      this.setState({
        currentUserFolowers: data,
        error: false
      });
    }
  }

  getUser = async (url) => {
    const api_url = await fetch(url);
    const data = await api_url.json();
    if (data.message) {
      this.setState({
        error: true
      });
    } else {
      this.setState({
        currentUserData: data,
        error: false
      });
    }
  }

  render () {
    return (
      <React.Fragment>
        <Form getUserFolowers={this.getUserFolowers}/>
        {this.state.error && 
          <div className="error">{this.state.message}</div>
        }
        <User data={this.state.currentUserData} />
        {this.state.currentUserFolowers && 
          <ListOfFllowers data={this.state.currentUserFolowers} getUser={this.getUser}/>
        }
      </React.Fragment>
    )
  }
}

export default App;