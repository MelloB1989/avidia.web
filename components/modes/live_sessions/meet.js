import dynamic from 'next/dynamic';
import { FC } from 'react';
import { IJitsiMeetingProps } from '@jitsi/react-sdk/lib/types';

const JitsiMeeting = dynamic(
  () =>
    import('@jitsi/react-sdk').then(({ JitsiMeeting }) => JitsiMeeting),
  {
    ssr: false,
  }
);

//export default JitsiMeeting;
//  
/*
getIFrameRef={(iframeRef) => {
  iframeRef.style.height = '100%';
  iframeRef.parentNode.style.height = '100%'; // Set the height of the iframe's parent
}}
*/
export default function Meet({meet_id, name, email}){
    const DOMAIN = "meet.noobsverse.com";
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Safe to use the getUserMedia API
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      // Use the stream
    })
    .catch((error) => {
      // Handle the error
      console.error("Error accessing the camera:", error);
    });
} else {
  console.error('getUserMedia is not supported in this browser.');
}

    return(
        <JitsiMeeting
    
    domain = { DOMAIN }
    roomName = { meet_id }
    configOverwrite = {{
        startWithAudioMuted: true,
        disableModeratorIndicator: true,
        startScreenSharing: false,
        hideDisplayName: false,
        noticeMessage: 'Hello',
        enableEmailInStats: false
    }}
    interfaceConfigOverwrite = {{
        APP_NAME: 'Avidia Meet',
        DEFAULT_WELCOME_PAGE_LOGO_URL: 'https://avidia.in/assets/images/logo.png',
        BRAND_WATERMARK_LINK: 'https://avidia.in/assets/images/logo.png',
         JITSI_WATERMARK_LINK: 'https://avidia.in',
         SHOW_JITSI_WATERMARK: false,
    }}
    userInfo = {{
        displayName: name,
        email: email
    }}
    onApiReady = { (externalApi) => {
        // here you can attach custom event listeners to the Jitsi Meet External API
        // you can also store it locally to execute commands
    } }
    getIFrameRef = { (iframeRef) => { iframeRef.style.height = '100vh'; } }
/>
        )
}