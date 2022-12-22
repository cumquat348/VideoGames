

import React, { useState } from "react"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

import { Navigate, useNavigate, useLocation } from 'react-router'


export default function (props) {

    const navigate = useNavigate();

    const handleSignIn = (evt) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {

            let r = this.responseText;
            // console.log(r)
            if (r == "Loggedin") {
                //  console.log('logged in')
                navigate('/', { replace: true })
                window.location.reload();
            }
            else {
                window.alert("Nie udało się zalogować")
            }
        }
        xhttp.open("POST", "/signin", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader("Charset", "UTF-8");

        let parameters = JSON.stringify({
            email: document.getElementById("floatingEmail").value,
            password: document.getElementById("floatingPassword").value
        })

        xhttp.send(parameters);
    }
    return (
        <div className="m-auto">
            <div className="Auth-form-container ">
                <div className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="text-center">
                            Not registered yet?{" "}
                            {/* <span className="link-primary" onClick={changeAuthMode}>
                                
                            </span> */}
                            <Link to="/signup" className="link-primary">Sign Up</Link>
                        </div>
                        <FloatingLabel
                            controlId="floatingEmail"
                            label="Email address"
                            className="mb-3"
                        >
                            <Form.Control type="email" placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" placeholder="Password" />
                        </FloatingLabel>
                        <div className="d-grid gap-2 mt-3 ">
                            <button onClick={handleSignIn} type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* </div> */}
                </div >
            </div >
        </div>
    );
}
