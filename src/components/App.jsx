import React,{Component} from 'react'
//var $ = require('jquery');
import $ from 'jquery'
import Profile from './github/Profile.jsx'
import Search from './github/Search.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'klintg',
      userData: [],
      userRepo:[],
      perPage: 5
    }
  }

  //getting data from github
  getUserData() {
    $.ajax({
      url: 'https://api.github.com/users/'+this.state.username+'?client_id='+this.props.clientId+'&client_secret'+this.props.clientSecret,
      dataType: "json",
      cache: false,
      success: function(data) {
        this.setState({userData: data})

      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({username: null})
        alert(err)
      }.bind(this)
    })
  }

  //getting user Repo from github
  getUserRepo() {
    $.ajax({
      url: 'https://api.github.com/users/'+this.state.username+'/repos?per_page='+this.state.perPage+'&client_id='+this.props.clientId+'&client_secret'+this.props.clientSecret+'&sort=created',
      dataType: "json",
      cache: false,
      success: function(data) {
        this.setState({userRepo: data})

      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({username: null})
        alert(err)
      }.bind(this)
    })
  }

  handleFormSubmit(username) {
    this.setState({username : username}, function() {
      this.getUserData()
      this.getUserRepo()
    });
  }
  componentDidMount() {
    this.getUserData()
    this.getUserRepo()
  }

  render() {
    return (
      <div>
        <Search onFormsubmit={this.handleFormSubmit.bind(this)}/>
        <Profile {...this.state}/>
      </div>
    )
  }


}

App.propTypes = {
  clientId: React.PropTypes.string,
  clientSecret: React.PropTypes.string
}

App.defaultProps = {
  clientId:'35c7f8445d45b87f740f',
  clientSecret: 'b122df4161f4871b72ce36f826e181f0748eb894'
}

export default App
