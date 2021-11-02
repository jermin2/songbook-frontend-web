import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

export default class AuthService {

    login(username, password) {
        const url = `${API_URL}/api/token/`;
        return axios.post(url,
            {
                "username":username,
                "password":password
            }).then(response => {
                sessionStorage.setItem("token", response.data.access);
                console.log("Logged in successfully", response)
            }).catch(e => {throw e});
    }

    logout(){
        console.log("logout")
        sessionStorage.clear("token");
    }

    async relogin(){
        if(sessionStorage.getItem("token")){
            const url = `${API_URL}/api/token/verify/`;
            const token = { token: sessionStorage.getItem('token') }
            return axios.post(url, token).then( response => {
                return true;
            }).catch( e => {
                console.log("Couldn't re-login");
                return false
            })
        } else {
            return false;
        }
    }

}

