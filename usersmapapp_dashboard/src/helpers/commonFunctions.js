import axios from 'axios';

const getUsers = (token) => {
    let url = 'users/';
    axios.get(url, { params: { token: token } })
        .then(res => {
            if(res.data.length > 0){
                localStorage.setItem('userid', res.data[0]['id'])
                getProfiles();
            }
        })
}

const getProfiles = () => {
    let url = 'profiles/';
    axios.get(url, { params: { user: localStorage.getItem('userid') } })
        .then(res => {
            if(res.data.features.length > 0){
                localStorage.setItem('profilename', res.data.features[0].properties.name)
                localStorage.setItem('profilephoto', res.data.features[0].properties.photo)
                localStorage.setItem('description', res.data.features[0].properties.address_description)
                localStorage.setItem('phonenumber', res.data.features[0].properties.phone_number)
                localStorage.setItem('department', res.data.features[0].properties.department)
                localStorage.setItem('location', res.data.features[0].geometry.coordinates)
            }
        })
}


export const commonFunctions = {
    getUsers,
    getProfiles
};