import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Registration.css';
import Login from "./Login";
function Registration() {
    const initialFormData = {
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [emailExists, setEmailExists] = useState(false);
    const [loginEmail, setLoginEmail] = useState(''); // Store the email for login
    const [successRegistration,setSuccessRegistration] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validatePhoneNumber(formData.phoneNumber) &&
            validatePassword(formData.password) &&  !emailExists
        ) {
            // validateConfirmPassword(formData.confirmPassword, formData.password )&&validateEmail(formData.email) validateConfirmPassword(formData.confirmPassword) &&
            await axios.post("http://localhost:3001/submitEmployeesDetails", formData)
                .then((response) => {
                    console.log("Response", response.data);
                    setFormData(initialFormData);
                    setEmailExists(true); // Show the login form after successful registration
                    setSuccessRegistration(true);
                })
                .catch((error) => {
                    console.log(error.message);
                    setEmailExists(false); // Show the login form after successful registration
                    setSuccessRegistration(false); // Registration failed

                })
        }
    }
    const handleInputChange = async (event) => {
        event.preventDefault();

        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setLoginEmail(formData.email);
        clearErrors(name);

        if (name === 'phoneNumber') {
            validatePhoneNumber(value);
        } else if (name === 'password') {
            validatePassword(value);
        } else if (name === 'confirmPassword') {
            validateConfirmPassword(value, formData.password);
        } else if (name === 'email') {
            await checkEmailUniqueness(value);
        }
    }

    const clearErrors = (field) => {
        setErrors({ ...errors, [field]: '' });
    };

    const validatePhoneNumber = (phoneNumber) => {
        if (phoneNumber.length !== 10) {
            setErrors({
                ...errors,
                phoneNumber: 'Phone number should have exactly 10 digits',
            });
            return false;
        }
        return true;
    };
    const validatePassword = (password) => {
        // Define the password pattern (at least one uppercase letter, at least one digit, and at least 8 characters)
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!passwordPattern.test(password)) {
            setErrors({
                ...errors,
                password: 'Password should contain at least one uppercase letter, one digit, and be at least 8 characters long',
            });
            return false;
        }
        return true;
    };
    const validateConfirmPassword = (confirmPassword, password) => {
        if (confirmPassword !== password) {
            setErrors({
                ...errors,
                confirmPassword: 'Passwords do not match',
            });
            return false;
        }
        return true;
    };
    const checkEmailUniqueness = async (email) => {
        try {

            const response = await axios.get(`http://localhost:3001/uniqueEmail`, {
                params: {
                    email: email,
                },
            });

            if (response.data.exists) {
                setEmailExists(true);

                // event.preventDefault();
                setErrors({
                    ...errors,
                    email: 'Email already exists',
                });
            } else {
                setEmailExists(false);
                setErrors({
                    ...errors,
                    email: '',
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleLogin = async (event) => {
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
                } else {
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
    return (<div>
        <div className="container-fluid">
            {emailExists ? (
                    <Login handleLogin={handleLogin/* Pass your handleLogin function */}
                    formData={formData}
                    setFormData={setFormData}
                    errors={errors}/>
            ) : (
                <div className="card shadow-lg z-5 w-50">
                    <div className="card-header bg-info text-center text-info-emphasis"><h1>SIGN UP</h1></div>
                    <div className="card-body bg-info-subtle">

                        <form onSubmit={handleSubmit} className="text-info">
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    id="fullName"
                                    className="form-control"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="FullName"
                                    required
                                />
                                <label htmlFor="fullName">FullName</label>

                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="number"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    className="form-control"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="PhoneNumber"
                                    required
                                />
                                <label htmlFor="phoneNumber">PhoneNumber</label>
                                {errors.phoneNumber && (
                                    <p className="text-danger">{errors.phoneNumber}</p>
                                )}
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"

                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    required
                                />
                                <label htmlFor="email">Email</label>
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
                                    onChange={handleInputChange}
                                    placeholder="Password"
                                    required
                                />
                                <label htmlFor="password">Password</label>
                                {errors.password && (
                                    <p className="text-danger">{errors.password}</p>
                                )}
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="form-control"

                                    value={formData.confirmPassword}
                                    placeholder="ConfirmPassword"
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="confirmPassword">ConfirmPassword</label>
                                {errors.confirmPassword && (
                                    <p className="text-danger">{errors.confirmPassword}</p>
                                )}
                            </div>
                            <button className="btn btn-info w-100 shadow-lg z-5 text-info-emphasis" type="submit">Sign Up </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    </div>);
}
export default Registration;