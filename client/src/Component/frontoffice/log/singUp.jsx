import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import  REGISTER  from '../../graphql/mutations/register';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';



class AddUser extends Component {
  constructor(props){
    super(props);
    if(props)
    this.state = {
      firstName: '',
      lastName : '',
      email : '',
      login : '',
      password : '',
    }
  }
  
  
  handleChange = (event) =>{
  const { target: {  name, value} } = event;
  this.setState({[name]: value});
  }

  add = async (ajout) =>{
      try {
        // const result = await ajout();
        // console.log('result', result);
        window.alert('ok');
        // this.props.close();
      } catch (error) {
        window.alert(error);
      }
      
    }
  render() { 
      
  const { id, firstName, lastName, email, login, password } = this.state;
  const variables = id ? { id, firstName, lastName, email, login, password } : { firstName, lastName, email, login, password };
  const action = REGISTER ;
  
  return (
    
    <Wrapper>
              <Mutation mutation={action} variables={{UserInput : {...variables}}}>
                  {(addUser)=>(
                      <div>
                          <TextField
                              label="firstName"
                              value={firstName}
                              onChange={this.handleChange}
                              margin="normal"
                              name ="firstName"
                          /><br/>
                          <TextField
                              label="lastName"
                              value={lastName}
                              onChange={this.handleChange}
                              margin="normal"
                              name ="lastName"
                          /><br/>
                           <TextField
                              label="email"
                              value={email}
                              onChange={this.handleChange}
                              margin="normal"
                              name ="email"
                          /><br/>
                           <TextField
                              label="login"
                              value={login}
                              onChange={this.handleChange}
                              margin="normal"
                              name ="login"
                          /><br/>
                          <TextField
                              label="password"
                              type="password"
                              value={password}
                              onChange={this.handleChange}
                              margin="normal"
                              name ="password"
                          /><br/>
                          <Fab  className="button" aria-label="Add" onClick={()=>{this.add(addUser)}}>

                              <AddIcon />
                          </Fab>
                          {/* {error && <Error error={error}/> } */}
                    </div>
              )}
                </Mutation>
            </Wrapper>
          )
          }
        }
export default AddUser;

const Wrapper = styled.div`
button{
  top: 100px;
    left: 170px;
    align-content: center;
    align-self: auto;
    color: #fff;
    background-color: black;
}

`