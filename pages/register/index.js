import Head from 'next/head';
//import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '@/components/lms_components/layout/common';

export default function Register(){
    const [username, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [first_name, setFName] = useState('');
    const [last_name, setLName] = useState('');
    const [phone, setPhone] = useState('');
    const [confirm_password, setCPass] = useState('');
    const [password, setPass] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const { message, nextUrl } = router.query;
    
     useEffect(() => {
       setError(message);
    // Read the ACCESS_TOKEN from cookies
    const jwt_token = document.cookie.replace(
      /(?:(?:^|.*;\s*)app_token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    if (jwt_token) {
      window.location.href = '/dashboard';
    }
    
  }, []);

function validateFields() {
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/g;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate username
    if (username.includes(' ') || specialCharPattern.test(username)) {
        setError('Username should not contain spaces or special characters 🫣');
        return false;
    }

    // Validate email
    if (!emailPattern.test(email)) {
        setError('Invalid email address 🥹');
        return false;
    }

    // Validate password and confirm password
    if (password !== confirm_password) {
        setError('Password and Confirm Password do not match 🥹');
        return false;
    }

    //All fields are filled or not
    if (![username, email, first_name, last_name, phone, password, confirm_password].every(Boolean)) {
       setError('All fields must be filled 🥲');
       return false;
    }

    // Clear any existing error
    setError('');
    return true;
}

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        setError('Checking your details 🫣');
    //PERFORM FIELD CHECKS
    const f_check = validateFields();
    
    if(f_check) {
      setError('Preparing your data ✨ ')    
      // Create form data with the username and password
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('confirm_password', confirm_password);
      formData.append('email', email);
      formData.append('phone_number', phone);
      formData.append('first_name', first_name);
      formData.append('last_name', last_name);

      // Make a POST request to your API route in the pages/api directory
      const response = await axios.post('/api/user_register', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the appropriate content type for form data
        },
      });
      
      if (response.status === 200 && response.data.success) {
        // Redirect to the dashboard page upon successful authentication
        setError('Welcome!');
        window.location.href = nextUrl || '/dashboard';
      } else {
        setError('Something wrong with AUTH server 🥲');
      }
      //setError(response.error ? error+"🥲" : 'Our AUTH server seems to be down 🥲');
}
    } catch (error) {
      console.log(error);
      setError(error.response.data.error+'🥲');
    }
  }
    
    return(
      <Layout title="Register | Avidia">
        <a className="close_side_menu" href="javascript:void(0);" />
  {/* Start breadcrumb Area */}
  <div className="rbt-breadcrumb-default ptb--100 ptb_md--50 ptb_sm--30 bg-gradient-1">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb-inner text-center">
            <h2 className="title">Register</h2>
            <ul className="page-list">
              <li className="rbt-breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li>
                <div className="icon-right">
                  <i className="feather-chevron-right" />
                </div>
              </li>
              <li className="rbt-breadcrumb-item active">
                Register
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
      <div className="rbt-elements-area bg-color-white rbt-section-gap">
        <div className="container">
            <div className="row gy-5 row--30">
  <div className="col-lg-6">
  <div className="rbt-contact-form contact-form-style-1 max-width-auto">
    <h3 className="title">Register</h3>
    <span className="rbt-badge-6 bg-secondary-opacity">{error}</span>
    <form className="max-width-auto" onSubmit={(e) => {e.preventDefault();}}>
      <div className="form-group">
        <input name="register-email" type="text" onChange={(event) => {setEmail(event.target.value)}}/>
        <label>Email address *</label>
        <span className="focus-border" />
      </div>
      <div className="form-group">
        <input name="register_user" type="text" onChange={(event) => {setUser(event.target.value)}}/>
        <label>Username *</label>
        <span className="focus-border" />
      </div>
      <div className="form-group">
        <input name="register_user" type="text" onChange={(event) => {setFName(event.target.value)}}/>
        <label>First Name *</label>
        <span className="focus-border" />
      </div>
      <div className="form-group">
        <input name="register_user" type="text" onChange={(event) => {setLName(event.target.value)}}/>
        <label>Last Name *</label>
        <span className="focus-border" />
      </div>
      <div className="form-group">
        <input name="register_user" type="number" onChange={(event) => {setPhone(event.target.value)}}/>
        <label>Phone *</label>
        <span className="focus-border" />
      </div>
      <div className="form-group">
        <input name="register_password" type="password" onChange={(event) => {setPass(event.target.value)}}/>
        <label>Password *</label>
        <span className="focus-border" />
      </div>
      <div className="form-group">
        <input name="register_conpassword" type="password" onChange={(event) => {setCPass(event.target.value)}}/>
        <label>Confirm Password *</label>
        <span className="focus-border" />
      </div>
      <div className="form-submit-group mb--20">
        <button
          type="submit"
          className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100"
          onClick={handleSubmit}
        >
          <span className="icon-reverse-wrapper">
            <span className="btn-text">Register</span>
            <span className="btn-icon">
              <i className="feather-arrow-right" />
            </span>
            <span className="btn-icon">
              <i className="feather-arrow-right" />
            </span>
          </span>
        </button>
      </div>
                    <div className="rbt-lost-password text-end mb--10">
                    <a className="rbt-btn-link" href={nextUrl ? `/login?nextUrl=${nextUrl}` : '/login'}>
                      Login
                    </a>
                  </div>
    </form>
  </div>
</div>
</div>
</div>
</div>

      </Layout>
        )
}