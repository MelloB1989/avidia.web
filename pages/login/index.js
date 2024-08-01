import Head from 'next/head';
//import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '@/components/lms_components/layout/common';

export default function Login(){
    const [username, setUser] = useState(0);
    const [password, setPass] = useState(0);
    const [error, setError] = useState('');
    const router = useRouter();
    const { message, nextUrl } = router.query;
    //setError(message);
    //console.log(nextUrl)
    
     useEffect(() => {
    // Read the ACCESS_TOKEN from cookies
    setError(message);
    const jwt_token = document.cookie.replace(
      /(?:(?:^|.*;\s*)app_token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    if (jwt_token) {
      window.location.href = nextUrl || '/dashboard';
    }
    
  }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Create form data with the username and password
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      // Make a POST request to your API route in the pages/api directory
      setError('Checking...');
      const response = await axios.post('/api/auth', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the appropriate content type for form data
        },
      });

      if (response.status === 200 && response.data.success) {
        // Redirect to the dashboard page upon successful authentication
        setError('Welcome!');
        window.location.href = nextUrl || '/dashboard';
      } else {
        setError('Invalid credentials 🥲');
      }
    } catch (error) {
      setError('Please check your password and try again 🥲');
    }
  };

    return(
        <Layout title="Login | Avidia">
  {/* End Side Vav */}
  <a className="close_side_menu" href="javascript:void(0);" />
  {/* Start breadcrumb Area */}
  <div className="rbt-breadcrumb-default ptb--100 ptb_md--50 ptb_sm--30 bg-gradient-1">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb-inner text-center">
            <h2 className="title">Login</h2>
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
                Login
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End Breadcrumb Area */}
  <div className="rbt-elements-area bg-color-white rbt-section-gap">
    <div className="container">
      <div className="row gy-5 row--30">
        <div className="col-lg-6">
          <div className="rbt-contact-form contact-form-style-1 max-width-auto">
            <h3 className="title">Login</h3>
            <span className="rbt-badge-6 bg-secondary-opacity">{error}</span>
            <form className="max-width-auto" onSubmit={(e) => {e.preventDefault();}}>
              <div className="form-group">
                <input name="con_name" type="text" onChange={(event) => {setUser(event.target.value)}} />
                <label>Username or email *</label>
                <span className="focus-border" />
              </div>
              <div className="form-group">
                <input name="con_email" type="email" onChange={(event) => {setPass(event.target.value)}}/>
                <label>Password *</label>
                <span className="focus-border" />
              </div>
              <div className="form-submit-group mb--20">
                <button
                  type="submit"
                  className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100"
                  onClick={handleSubmit}
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text">Log In</span>
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
                    <a className="rbt-btn-link" href={nextUrl ? `/register?nextUrl=${nextUrl}` : '/register'}>
                      Register
                    </a>
                  </div>
                  <div className="rbt-lost-password text-end">
                    <a className="rbt-btn-link" href="https://spaces.noobsverse.com/forgot-password">
                      Lost your password?
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
/*
<>
            <Head>
    <title>Login || Avidia</title>
    <link
    rel="shortcut icon"
    type="image/x-icon"
    href="https://avidia.in/assets/images/logo.png"
  />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    </Head>
 
  <section className="">
   
    <div
      className="px-4 py-5 px-md-5 text-center text-lg-start"
      style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
    >
      <div className="container">
        <div className="row gx-lg-5 align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <h1 className="my-5 display-3 fw-bold ls-tight">
              Learning redefined <br />
              <span className="text-primary">Avidia Labs</span>
            </h1>
            <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
              Welcome to Avidia Labs. Here you learn with you AI tutors about the latest technologies by working on them! Say bye to boring lectures, welcome to the new way of learning ⚡
            </p>
          </div>
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="card">
              <div className="card-body py-5 px-md-5">
                <form onSubmit={(e) => {e.preventDefault();}}>
                <div class="text-center">
                <img src="https://cdn.global.noobsverse.com/logos/nvai/Avidia.png" height="150" class="rounded my-3" alt="Avidia Logo"/>
                </div>
                  
                  <div className="form-outline mb-4">
                    <input
                      type="username"
                      id="form3Example3"
                      className="form-control"
                      aria-label="Username"
                      placeholder="Username"
                      onChange={(event) => {setUser(event.target.value)}}
                    />
                  </div>
                 
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      placeholder="Password"
                      onChange={(event) => {setPass(event.target.value)}}
                    />
                  </div>
                  <div class="text-center">
                  
                  <p>{error}</p>
                  <button
                    className="btn btn-primary btn-block mb-4 mx-3"
                    onClick={handleSubmit}
                  >
                    Sign in
                  </button>
                  </div>
                  <div className="text-center my-1">
                  <a href="https://spaces.noobsverse.com/forgot-password">Forgot password?</a>
  <p className="my-2">Don't have a account?:</p>
                     
                  <a href="/register">
                  <button
                    className="btn btn-primary btn-block mb-4 mx-3"
                    type="button"
                  >
                    Signup with Noobs Spaces
                  </button>
                  </a>
</div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  </section>
  
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
        </>
*/