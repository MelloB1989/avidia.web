import Heads from '../common/header';
import Footer from '../common/footer';
//import {useEffect} from 'react';

export default function Layout({ children, title }) {
 /* 
    function loadExternalScript(src) {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
}
    
    useEffect(()=>{
      setTimeout(()=>{
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
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/jquery-one-page-nav.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/bootstrap-select.min.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/jquery-ui.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/magnify-popup.min.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/paralax-scroll.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/paralax.min.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/countdown.js`);
      loadExternalScript(`${ASSETS_CDN_URL}assets/js/vendor/plyr.js`);
      }, 3000);
  }, []);
  */
  return (
    <>
      <Heads title={title}/>
      <div>{children}</div>
      <Footer />
    </>
  );
}