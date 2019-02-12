import React  from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';



const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});
const loginMutation = gql`

mutation Login($input: UserInput){
  login(input: $input){
    token
  }
}
`;

class  SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          open: false,
        }
      }
      handleClose = () => {
        console.log('test');
        const { open } = this.state;
        this.setState({
          open: !open
        })
      }
      state = {login: "",password:""};
handelChange = e => {
  this.setState({
    [e.target.name]: e.target.value
  });
};

handelSubmit = fn => async (e) => {
  e.preventDefault();
//  console.log("this.state",this.state);

const config = {variables: {"input":{"login":this.state.login, "password": this.state.password}}}
const data = await fn(config);
// console.log('****', data);
const jwToken = data.data.login.token;
if (jwToken){
  // window.alert("user logged")
  this.props.history.push('/Page')
  localStorage.setItem("jwToken", jwToken);
}
} ;

render (){
    
    const{login,password} = this.state;
    const classes = this.props.classes;
    // const { open } = this.state;
  
  return (
    
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Wrapper>
        <Mutation mutation={loginMutation}>
        {(loginfunction,{error, Loading})=>
        (<form onSubmit={this.handelSubmit(loginfunction)} className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="login">Login</InputLabel>
            <Input id="login" name="login" autoComplete="login" autoFocus type="text" value={login} onChange={this.handelChange} placeholder="Login"/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" value={password} onChange={this.handelChange} placeholder="password"/>
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            link to = "/Page"
          >
            Sign in
          </Button>
        </form>)}
       </Mutation>
       </Wrapper>
      </Paper>
     
    </main>
  );
}
}


SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default  withStyles (styles) (withRouter(SignIn))  ;
const Wrapper = styled.div``;