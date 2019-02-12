import gql from 'graphql-tag';

const REGISTER = gql`
mutation register ($input : UserInput){register
    (input:$input) {
      
      firstName
      lastName
      email
      login
      password
    
    }}
`;

export default REGISTER;