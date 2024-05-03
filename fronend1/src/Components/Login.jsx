import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
function Login({ handleLogin, formData, setFormData, errors }) {
    [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    var [errors, setErrors] = useState({});

    const clearErrors = (field) => {
        setErrors({ ...errors, [field]: '' });
    };
    handleLogin = async (event) => {
          event.preventDefault();
        if (formData.email && formData.password) {
            try {
                const response = await axios.post("http://localhost:3001/login", formData);

                if (response.status === 200) {
                    // Login successful, you can perform further actions here
                    // For example, store user information in state or localStorage
                    console.log("Login successfully");
                    alert("Login Successfully"); 

                    // Clear login form
                    setFormData({
                        email: '',
                        password: ''
                    });
                    var loginCard = document.getElementById('loginCard');
                    loginCard.style.display="none";
                    var userDetail = document.getElementById('userDetail');
                    userDetail.style.display="inline";
                }
                // else if(response.status === 200) {

                //   console.log("Login successfully");
                //   alert("Login Successfully"); 

                //     setFormData({
                //         email: '',
                //         password: ''
                //     });
                //     var loginCard = document.getElementById('loginCard');
                //     loginCard.style.display="none";
                //     var userDetail = document.getElementById('userDetail');
                //     userDetail.style.display="inline";
                //   }
                
                else if(response.status === 200 ){

                  if(formData.email==="admin@gmail.com"){
                  setFormData({
                    email: '',
                    password: ''
                });
                var loginCard = document.getElementById('loginCard');
                loginCard.style.display="none";
                var adminPanel = document.getElementById('adminPanel');
                adminPanel.style.display="inline";
              //   var userDetail1 = document.getElementById('userDetail');
              // userDetail1.style.display="none";
              }

            }
                else {
                    // Handle login failure (e.g., show an error message)
                    console.log("Login failed");
                }
            } catch (error) {
                console.error("Error during login:", error);
            }
        } else {
            // Handle empty email or password
            console.log("Please provide email and password");
        }
    };
  return (
        <div className='container-fluid'>
          <div style={{display:"none"}} id='userDetail'>
            Hello!! {formData.fullName}
          </div>
          <div style={{display:"none"}} id='adminPanel'>
            Hello!! {formData.fullName} this is Admin Panel
          </div>

                <div className="card w-100" id="loginCard">
      <div className="card-header bg-info text-white"><h1>Login</h1></div>
      <div className="card-body bg-info-subtle">
        <form onSubmit={handleLogin} className="text-info">
          {/* Login form */}
          <div className="form-floating mb-3">
            <input
              type="email"
              id="loginEmail"
              name="loginEmail"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <label htmlFor="loginEmail">Email</label>
            {errors.email && (
              <p className="text-danger">{errors.email}</p>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Password"
              required
            />
            <label htmlFor="password">Password</label>
            {errors.password && (
              <p className="text-danger">{errors.password}</p>
            )}
          </div>
          {/* Add other login form fields */}
          <button className="btn btn-info w-100 shadow-lg z-5 text-white" type="submit">Log In</button>
        </form>
      </div>
    </div>
        </div>
  );
}

export default Login;
