import Head from 'next/head';
import { useState, useEffect } from "react";
import Layout from '../../layouts/env'
import styles from '../../styles/Home.module.css';
import Coder from '../../components/coder';
import ThreeD from '../../components/modes/3d_mode'
import TextMode from '../../components/modes/text_mode'
import Lora from '../../components/modes/lora_chat_interactive_mode'
import axios from 'axios';

export default function Home() {
  
  const [mode, setMode] = useState("text");
  const [allow, setAllow] = useState();
  
  useEffect(() => {
    // Read the ACCESS_TOKEN from cookies
    const jwt_token = document.cookie.replace(
      /(?:(?:^|.*;\s*)app_token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    //console.log(jwt_token)

    if (jwt_token) {
      // Verify the token using the same secret key used during token generation
      try {
        //Verify the JWT token
    axios.post('/api/verify_user', {"token" : jwt_token}, {
        headers: {
          'Content-Type': 'application/json', // Set the appropriate content type for form data
        },
      })
      .then(function (response) {
          //console.log(response.data.success)
    if(response.status === 200 && response.data.success) {
      const is_pro = document.cookie.split('; ')
  .find(cookie => cookie.startsWith('pp='))
  ?.split('=')[1] || null;
  setAllow(1);
  if(!is_pro) {
    document.cookie = "app_token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          window.location.href = '/login';
  }
    }
    if(response.status === 500 || !response.data.success){ window.location.href = '/login'; document.cookie = "app_token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }
  })
  .catch(function (error) {
    console.log(error);
  });
    //console.log(userData['userId'])
      } catch (error) {
        // Handle token verification errors
        // If the token verification fails, the user is not authenticated
        window.location.href = '/login';
        console.log(error)
      }
    } else {
      // If the ACCESS_TOKEN cookie is not available, the user is not authenticated
      window.location.href = '/login';
    }
  }, []);
  
  return (
    <>
    { allow ? (
      <>
    <Head>
    <title>Lora | Noobs Learning</title>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
    <link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
  crossOrigin="anonymous"
/>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
    </Head>
    <Layout>
      <div className={styles.splitl} seamless="seamless">
      {mode === "lora" ? (<div className=""><Lora/></div>) : mode === "threed" ? (<ThreeD/>) : (<TextMode/>)}
    <div className={styles.lblock}>
    <div className="btn-group d-flex justify-content-center mx-2 my-2" role="group" aria-label="Navigation">
<button type="button" className="btn btn-primary" onClick={() => {mode === "lora" ? setMode("threed") : setMode("lora")}}>{mode === "lora" ? "Metaverse" : "Lora Chat"}</button>
<button type="button" className="btn btn-success" onClick={() => {setMode("text")}}>Text Mode</button>
</div>
<div className="progress mx-2 my-2">
  <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>
  <footer className="blockquote-footer my-1 mx-2">Powered by <cite title="Noobs Learning">Noobs Learning</cite></footer>
  </div>
</div>
  <div className={styles.splitr}>
        <Coder/>
  </div>
  </Layout>
  </>
  ) : (<p></p>) }
    </>
  )
}
