import {useState, useEffect, useMemo, useRef, useCallback  } from "react";
import axios from "axios";
import {Navigate} from 'react-router-dom';
import { Button, Container, Row, Col, Spinner } from "react-bootstrap";
import {commonFunctions} from "../helpers/commonFunctions"
import Select from 'react-select';
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";


export const Profile = (props) => {
    const [profilename, setProfilename] = useState('');
    const [photoprofile, setPhotoprofile] = useState('');
    const [department, setDepartment] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [addressdescription, setAddressdescription] = useState('');
    const [navigate, setNavigate] = useState(false);
    const [isError, setIsError] = useState(false);
    let center;
    if(localStorage.getItem('location')){
        center = {
            lat: localStorage.getItem('location').split(",")[1],
            lng: localStorage.getItem('location').split(",")[0],
        }
    } else {
        center = {
            lat:-6.195, lng:106.823
        }
    }   
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    function DraggableMarker() {
        const markerRef = useRef(null)
        const eventHandlers = useMemo(() => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                }
            },
        }), [],)
        const toggleDraggable = useCallback(() => {
            setDraggable((d) => !d)
        }, [])

        return (
            <Marker
                draggable={draggable}
                eventHandlers={eventHandlers}
                position={position}
                ref={markerRef}>
                <Popup minWidth={90}>
                    <span onClick={toggleDraggable}>
                    {draggable
                        ? 'Marker is draggable now'
                        : 'Click here to edit coordinates marker..!'}
                    </span>
                </Popup>
            </Marker>
        )
    }

    const options = [
        {value: 'Engineering and Infrastructure', label: 'Engineering and Infrastructure'},
        {value: 'Geo Science', label: 'Geo Science'},
        {value: 'Information Technology', label: 'Information Technology'},
        {value: 'Contract Administration', label: 'Contract Administration'},
        {value: 'Accounting and Finance', label: 'Accounting and Finance'},
        {value: 'Research and Development', label: 'Research and Development'},
        {value: 'Human Resources', label: 'Human Resources'}
    ]

    const submit = async e => {
        e.preventDefault();
        const uploadData = new FormData();
        uploadData.append('user', localStorage.getItem('userid'));
        uploadData.append('name', profilename);
        uploadData.append('photo', photoprofile, photoprofile.name);
        uploadData.append('department', department['value']);
        uploadData.append('phone_number', phonenumber);
        uploadData.append('address_location', 'SRID=4326;POINT ('+position["lng"].toString()+' '+position["lat"].toString()+')');
        uploadData.append('address_description', addressdescription);
        
        axios({
            method: 'post',
            url: 'profiles/',
            data: uploadData
        }).then(res=>{
            commonFunctions.getProfiles();
            setNavigate(true);
        }).catch(function (error) {
            console.log(error.response.data);
            setIsError(true);
        });
    }

    const closeprofile = () => {
        setNavigate(true);
    }

    if (navigate) {
        return <Navigate to="/dashboard" />;
    }
    
    if(props.isLogged) {
        let selected_department_idx = options.findIndex(x => x.label === localStorage.getItem('department'));

        return (
        <main className="profile-form">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">User Profile <b>({localStorage.getItem('profilename')})</b></h1>
                <Button onClick={closeprofile} className="btn btn-light me-1 closebtn">x</Button>
                
                <Container>
                    <Row>
                        <Col xs={3}>
                            <div className="form-floating">
                                <input type="file" onChange={(evt) => setPhotoprofile(evt.target.files[0])}/>
                                <img src={localStorage.getItem('profilephoto')} className='profile-photo' />
                            </div>
                        </Col>
                        <Col xs={9}>
                            <div className="form-floating">
                                <input type="text" className="form-control"
                                    onChange={e => setProfilename(e.target.value)}
                                    defaultValue={localStorage.getItem('profilename')}
                                />
                                <label>Profile Name</label>
                            </div>
                            <div className="form-floating">
                                <Select options={options} className="form-control" 
                                    defaultValue={options[selected_department_idx]}
                                    onChange={setDepartment}
                                />
                                <label>Department</label>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control"
                                    onChange={e => setPhonenumber(e.target.value)}
                                    placeholder='+628125xxxxxxxx'
                                    defaultValue={localStorage.getItem('phonenumber')}
                                />
                                <label>Phone Number</label>
                            </div>
                            <label className="label-description">Address Description</label>
                            <div className="form-floating">
                                <textarea type="text" className="form-control-textarea"
                                    onChange={e => setAddressdescription(e.target.value)}
                                    rows="10" cols="100"
                                    defaultValue={localStorage.getItem('description')}
                                ></textarea>
                            </div>
                            <div className="form-floating">
                                <MapContainer 
                                    center={localStorage.getItem('location') ? localStorage.getItem('location').split(",").reverse() : center} 
                                    zoom={13} 
                                    className='leaflet-container-profile'>
                                    <TileLayer
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <DraggableMarker />
                                </MapContainer>
                            </div>
                            {isError ? <h5 className="text-danger">Input Parameters Error</h5> : ''}
                            <div className="form-floating">
                                <button className="w-100 btn btn-lg btn-primary" type="submit">Update</button>
                            </div>
                        </Col>
                    </Row>
                </Container>
                
            </form>
        </main>
    )}
}
