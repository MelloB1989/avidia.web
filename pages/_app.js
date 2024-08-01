import { ToastContainer } from "react-toastify";
import {Toaster} from 'react-hot-toast';
import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/helpers/apollo";
const ASSETS_CDN_URL = "https://cdn.global.noobsverse.com/avidia.lms/";
import "react-toastify/dist/ReactToastify.css";
import Preloader from "../components/preloader";
import { SaasProvider } from '@saas-ui/react'
import "../styles/preloader.css";
import "../styles/add_contest.css";
import "react-loading-skeleton/dist/skeleton.css";
import { UserProvider } from "@/components/lms_components/layout/UserContext";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import "../styles/globals.css";
//import { DeepChat } from "deep-chat-react";

export default function AvidiaRoot({ Component, pageProps }) {
  const initialFocusRef = useRef()
  const [loading, setLoading] = useState(true);

  function loadExternalScript(src) {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }

  useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/main.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/modernizr.min.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/jquery.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/bootstrap.min.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/sal.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/swiper.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/magnify.min.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/jquery-appear.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/odometer.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/backtotop.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/isotop.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/imageloaded.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/wow.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/waypoint.min.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/easypie.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/text-type.js`);
      loadExternalScript(
        `${ASSETS_CDN_URL}assets/js/vendor/jquery-one-page-nav.js`,
      );
      loadExternalScript(
        `${ASSETS_CDN_URL}assets/js/vendor/bootstrap-select.min.js`,
      );
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/jquery-ui.js`);
      loadExternalScript(
        `${ASSETS_CDN_URL}assets/js/vendor/magnify-popup.min.js`,
      );
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/paralax-scroll.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/paralax.min.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/countdown.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/plyr.js`);
      loadExternalScript(
        `https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js`,
      );
    }, 2000);
  }, [loading]);

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <Toaster />
        <Head>
          {/* Title Tag */}
          <title>{"Avidia Cohort 2024"}</title>
          {/* Meta Description Attribute */}
          <meta
            name="description"
            content={
              "Avidia, India's first AI powered LMS platform. Join the Avidia Cohort 2024. Empower and take your coding skill to next level."
            }
          />
          {/* Meta Robots Attribute */}
          <meta name="robots" content="index, follow" />
          {/* Meta Keywords Attribute (less important nowadays) */}
          <meta name="keywords" content="Avidia, noobsverse, mellob, nbl" />
          {/* Meta Viewport Tag for responsive web design */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {/* Meta Charset Tag */}
          <meta charSet="UTF-8" />
          {/* Meta Language Tag */}
          <meta httpEquiv="content-language" content="en" />
          {/* Meta Author Tag */}
          <meta name="author" content="CoffeeCodes" />
          {/* Dynamic Open Graph Image */}
          <meta
            property="og:image"
            content={"https://avidia.in/assets/images/logo.png"}
          />
          <link
            rel="icon"
            type="image/x-icon"
            href="https://avidia.in/assets/images/logo.png"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@500&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://cdn.global.noobsverse.com/scroll-bar-custom.css"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </Head>
        {loading ? (
          <Preloader />
        ) : (
          <UserProvider>
            <HMSRoomProvider>
            <SaasProvider>
                <Component {...pageProps} />
            </SaasProvider>
              <ToastContainer />
            </HMSRoomProvider>
          </UserProvider>
        )}
        
      </ApolloProvider>
    </>
  );
}
