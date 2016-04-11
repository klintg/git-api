import React, {Component} from 'react'

class Search extends Component {
  onSubmit(e) {
    e.preventDefault()
    let username= this.refs.username.value.trim()
    if(!username) {
      alert('Please insert a username')
      return;
    }
    this.props.onFormsubmit(username)
    this.refs.username.value=''  //clear the input
  }

  render() {

    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label> Search Github Users </label>
          <input type="text" ref="username" className="form-control" required/>
        </form>
      </div>
    )
  }
}

export default Search
