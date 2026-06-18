import {useState} from "react";

function Login(_) {
    const handleSubmit = (e)=>{
        e.preventDefault();
    }
  //state mangement for email and password
    const [email, setEmail] = useState("");

    return(
        <div className="flex items-center justify-center h-screen">

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter Email" className="border p-2 rounded mb-4 w-full"/>
                <input type="password" placeholder="Password" className="border p-2 rounded mb-4 w-full"/>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Login</button>


            </form>
            <h1 className="text-4xl font-bold">Login Page</h1>
        </div>
    )

}

export default Login;