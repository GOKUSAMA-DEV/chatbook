import { createContext } from 'react';
  
// Creating the context object and passing the default values.
const Context = createContext({status:null,login:()=>{}});
  
export default Context;