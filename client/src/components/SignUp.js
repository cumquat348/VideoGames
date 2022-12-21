import React, { useState } from "react"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

import { Navigate, useNavigate ,useLocation } from 'react-router'


export default function (props) {
    

    let icons = {
        avatar : "https://img.icons8.com/ios-glyphs/90/null/person-male.png",
        spyro : "https://img.icons8.com/ios-glyphs/90/null/spyro.png",
        mario : "https://img.icons8.com/ios-glyphs/90/null/super-mario.png",
        among : "https://img.icons8.com/ios-glyphs/90/null/among-us.png",
        dice : "https://img.icons8.com/ios-glyphs/90/null/dice.png",

    }
    const [avatar, setAvatar] = useState(icons.avatar);

    const navigate = useNavigate();
    const location = useLocation();
    function uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
      }
      
    const handleSignUp=(evt)=>{
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            let r = this.responseText;
            console.log(r)
            if(r == "Created")
            {
                console.log('adasdsadas')
                navigate('/', {  replace: true })
                window.location.reload();
                // const xhttp = new XMLHttpRequest();
                // xhttp.onload = function () {
                //   let r = this.response;
                //   let result = JSON.parse(r)
                //   console.log(result["priviledges"])

                  
                  
                // }
                // xhttp.open("GET", "/priviledges", true);
                // xhttp.send();

            }
            else{
                alert("Coś poszło nie tak")
            }
            // callback(result)
        }
        xhttp.open("POST", "/signup", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader("Charset", "UTF-8");
        
        let parameters = JSON.stringify({
                nick:document.getElementById("floatingNick").value,
                email : document.getElementById("floatingEmail").value,
                password: document.getElementById("floatingPassword").value,
                picture : Object.keys(icons).find(key => icons[key] === avatar)
            })
            
        xhttp.send(parameters);
    }
    return (
        <div className="m-auto">

    
        <div className="Auth-form-container">
            <div className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign Up</h3>
                    <div className="text-center">
                        Already registered?{" "}
                        {/* <span className="link-primary" onClick={changeAuthMode}>
                            Sign In
                        </span> */}
                        <Link to={"/signin"} className="link-primary">Sign In</Link>
                    </div>
                    <FloatingLabel
                        controlId="floatingNick"
                        label="Nick"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="John" />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingEmail"
                        label="Email"
                        className="mb-3"
                    >
                        <Form.Control type="email" placeholder="name@example.com" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control type="password" placeholder="Password" />
                    </FloatingLabel>
                    <img src={avatar} alt="avatar" id="avatar" width={60}/>
                    <select id="avatar" title="Select your avatar" className="mt-3 w-100 selectpicker" onChange={(evt)=>{
                        setAvatar(evt.target.selectedOptions[0].getAttribute('data-thumbnail'))}}>

                        {
                            
                            Object.entries(icons).map(([key, value]) => {
                                
                                return(
                                <option key={value} data-thumbnail={value}>{key}</option>
                                    
                                )
                              })
                        }
                    </select>

                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" onClick={handleSignUp} className="btn btn-primary">
                            Submit
                        </button>
                    </div>


                </div>
            </div>
        </div>
        </div>
    );
}

// class SignUp extends React.Component {
    
//     constructor(props) {
//         super(props)

//         this.icons = {
//             avatar : "https://img.icons8.com/ios-glyphs/90/null/person-male.png",
//             spyro : "https://img.icons8.com/ios-glyphs/90/null/spyro.png",
//             mario : "https://img.icons8.com/ios-glyphs/90/null/super-mario.png",
//             among : "https://img.icons8.com/ios-glyphs/90/null/among-us.png",
//             dice : "https://img.icons8.com/ios-glyphs/90/null/dice.png",
    
//         }
//         this.state = {avatar : this.icons.avatar}
//         function isJsonString(str) {
//             try {
//                 JSON.parse(str);
//             } catch (e) {
//                 return false;
//             }
//             return true;
//         }

//         this.handleSignUp=(evt)=>{
//             const xhttp = new XMLHttpRequest();
//             xhttp.onload = function () {
//                 let r = this.responseText;
//                 console.log(r)
//                 if(r == "Created")
//                 {
//                     console.log('adasdsadas')
                    
//                 }
//                 else{
//                     alert("Coś poszło nie tak")
//                 }
//                 // callback(result)
//             }
//             xhttp.open("POST", "/signup", true);
//             xhttp.setRequestHeader("Content-Type", "application/json");
//             xhttp.setRequestHeader("Charset", "UTF-8");
            
//             let parameters = JSON.stringify({
//                     nick:document.getElementById("floatingNick").value,
//                     email : document.getElementById("floatingEmail").value,
//                     password: document.getElementById("floatingPassword").value,
//                     picture : Object.keys(this.icons).find(key => this.icons[key] === this.state.avatar)
//                 })
                
//             xhttp.send(parameters);
//         }
//     }
    

//     render(props) {
//         return (
//             <div className="m-auto">

        
//             <div className="Auth-form-container">
//                 <div className="Auth-form">
//                     <div className="Auth-form-content">
//                         <h3 className="Auth-form-title">Sign Up</h3>
//                         <div className="text-center">
//                             Already registered?{" "}
//                             {/* <span className="link-primary" onClick={changeAuthMode}>
//                                 Sign In
//                             </span> */}
//                             <Link to={"/signin"} className="link-primary">Sign In</Link>
//                         </div>
//                         <FloatingLabel
//                             controlId="floatingNick"
//                             label="Nick"
//                             className="mb-3"
//                         >
//                             <Form.Control type="text" placeholder="John" />
//                         </FloatingLabel>
//                         <FloatingLabel
//                             controlId="floatingEmail"
//                             label="Email"
//                             className="mb-3"
//                         >
//                             <Form.Control type="email" placeholder="name@example.com" />
//                         </FloatingLabel>
//                         <FloatingLabel controlId="floatingPassword" label="Password">
//                             <Form.Control type="password" placeholder="Password" />
//                         </FloatingLabel>
//                         <img src={this.state.avatar} alt="avatar" id="avatar" width={60}/>
//                         <select id="avatar" title="Select your avatar" className="mt-3 w-100 selectpicker" onChange={(evt)=>{
//                             this.setState({avatar:evt.target.selectedOptions[0].getAttribute('data-thumbnail')})}}>
    
//                             {
                                
//                                 Object.entries(this.icons).map(([key, value]) => {
                                    
//                                     return(
//                                     <option key={value} data-thumbnail={value}>{key}</option>
                                        
//                                     )
//                                   })
//                             }
//                         </select>
    
//                         <div className="d-grid gap-2 mt-3">
//                             <button type="submit" onClick={this.handleSignUp} className="btn btn-primary">
//                                 Submit
//                             </button>
//                         </div>

//                         <Navigate id='navigation' />

//                     </div>
//                 </div>
//             </div>
//             </div>
//         );
//     }
// }
// export default SignUp;