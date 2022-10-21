import axios from 'axios';

const getUsers = (token, setDisplayname) => {
    let url = 'users/';
    axios.get(url, { params: { token: token } })
        .then(res => {
            if(res.data.length > 0){
                setDisplayname(res.data[0]['username'])
            }
        })
}


export const commonFunctions = {
    getUsers
};