import axios from "axios";
import {Navigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {commonFunctions} from "../helpers/commonFunctions"


export const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect ( ()=> { 
        localStorage.getItem("user") ? setNavigate(true) : setNavigate(false) 
    } , [])

    const submit = async e => {
        e.preventDefault();

        try {
            const {data} = await axios.post('auth/', {
                username, password
            }, {withCredentials: true});
            localStorage.setItem("token", JSON.stringify(data.token));
            setNavigate(true);
            props.SetIsLogged(true);
            commonFunctions.getUsers(localStorage.getItem("token"), props.setDisplayname)
        } catch (error) {
            setIsError(true);
        }
    }

    if (navigate) {
        return <Navigate to="/dashboard"/>;
    }

    return <main className="form-signin">
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="username"
                       onChange={e => setUsername(e.target.value)}
                />
                <label htmlFor="floatingInput">Username</label>
            </div>

            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                       onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
            </div>
            {isError ? <span className="text-danger">Username or Password Wrong</span> : ''}
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    </main>
}
