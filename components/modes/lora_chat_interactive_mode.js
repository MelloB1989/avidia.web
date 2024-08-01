import styles from '../../styles/Home.module.css';
import get_jwt from '../../lib/frontend_functions/get_jwt';
import chat from '../../lib/lora_chat/lisa'
import verify_session from '../../lib/verify_session';
import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import ChatBubbles from './lora_chat_components/chat_bubbles';
import axios from 'axios';
const talking = 'https://au-spot.s3.ap-south-1.amazonaws.com/assets/1691165868420.gif';
const silent = 'https://au-spot.s3.ap-south-1.amazonaws.com/assets/lisa1.jpg';

export default function lora_ai_mode(){
  /*
    try{
        const token = get_jwt();
        if(verify_session(token) === null) { window.location.href = '/login'; document.cookie = "app_token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;' }
    }
    catch(e){
        console.log(e);
        window.location.href = '/login'; document.cookie = "app_token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }*/
    
  const getAudio = async (text) => {
    try {
        const response = await axios.post('/api/lora_ai_chat/speech', { text: text.toString() }, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        //console.log(response.data)
        //const audioBlob = await new Blob([response.data], { type: 'audio/mpeg' }); // adjust the MIME type accordingly
        const audio = new Audio(response.data.audioUrl);
        audio.addEventListener('ended', function() {
    console.log('Audio playback has completed.');
    setSpeak(0);
    // You can add any additional logic here if necessary.
  });
        setSpeak(1);
        audio.play();
        //const audioUrl = URL.createObjectURL(audioBlob);
        //return audioUrl;

    } catch (error) {
        console.error("There was a problem with the axios request:", error.message);
    }
};


    const chatBoxRef = useRef(null);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [speaking, setSpeak] = useState(0);
  const [isLoading, setIsLoading] = useState(false); 

useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [conversation]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    //console.log(message)
    e.preventDefault();
    setIsLoading(true); 

    const newConversation = [...conversation, { text: message, fromUser: true }];
    setConversation(newConversation);
    //console.log(conversation);
    try {
        const m = message;
        setMessage('');
      const botMessage = await chat(m);
      console.log(botMessage)
      setIsLoading(false);
      const audioData = await getAudio(botMessage);
    
      setConversation([...newConversation, { text: botMessage, fromUser: false }]);
    } catch (err) {
      console.error(err);
    }
  };

    return(
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
<link rel="stylesheet" href="https://au-spot.s3.ap-south-1.amazonaws.com/assets/scroll-bar.css"/>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
    </Head>
    
<div className="bg-dark">
        <div className="d-flex justify-content-center">
<img
  src={speaking ? talking : silent}
  className="rounded-circle"
  style={{ width: 150 }}
  alt="Avatar"
/>
</div>
<div className="overflow-auto custom-scrollbar-css p-2" ref={chatBoxRef} id="chat-bx" style={{"max-height": "550px", "margin-left": "5px", "margin-right": "9px", "margin-top": "30px", }}><ChatBubbles conversation={conversation}/></div>
<div className="card-footer text-muted d-flex justify-content-start align-items-center p-3" style={{"bottom": "0px"}}>
            <div className="input-group mb-0">
              <input
                type="text"
                className="form-control"
                placeholder="Type message"
                value={message}
                onChange={handleChange}
                onKeyDown={(event) => { if(event.key === 'Enter') { handleSubmit(event); } }}
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <button
                className="btn btn-primary"
                type="button"
                id="button-addon2"
                style={{ paddingTop: ".55rem" }}
                onClick={handleSubmit}
              >
                Ask ⚡
              </button>
            </div>
          </div>
          </div>
        </>
        )
}