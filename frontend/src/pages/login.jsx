import {useState} from 'react';


const Login =()=> {
  // State variables for email and password
    const [state,setState] = useState("login");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    


    return (
        <h1>Login Page</h1>
    )

  
};

export default Login;
