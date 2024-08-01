import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import ChatBubbles from '../lora_chat_components/chat_bubbles';
import chat from '../../../lib/lora_chat/lisa';
import axios from 'axios';

export default function Doubt({switchTalk, sendToast}){
      const getAudio = async (text) => {
          sendToast("Lisa: generating audio...");
    try {
        const response = await axios.post('/api/lora_ai_chat/speech_3', { ssml: text.toString() }, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        //console.log(response.data)
        //const audioBlob = await new Blob([response.data], { type: 'audio/mpeg' }); // adjust the MIME type accordingly
        const audio = new Audio(response.data.audioUrl);
        audio.addEventListener('ended', function() {
    console.log('Audio playback has completed.');
    sendToast("Lisa V2.9");
    switchTalk(0);
    // You can add any additional logic here if necessary.
  });
        switchTalk(1);
        sendToast("Lisa speaking...");
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
    sendToast("Lisa: thinking...");
    e.preventDefault();
    setIsLoading(true); 

    const newConversation = [...conversation, { text: message, fromUser: true }];
    setConversation(newConversation);
    //console.log(conversation);
    try {
        const m = message;
        setMessage('');
        
        // Get the token from the cookie
    const accessToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        .split('=')[1];
    const appToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('app_token='))
        .split('=')[1];
        const botMessage = await chat(m, accessToken, appToken);
      //const botMessage = await chat(m);
      //console.log(botMessage)
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
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>

    </Head>
    <div className="overflow-auto custom-scrollbar-css p-2" ref={chatBoxRef} id="chat-bx" style={{"max-height": "300px", "margin-left": "5px", "margin-right": "9px", "margin-top": "30px"}}><ChatBubbles conversation={conversation}/></div>
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
        </>
        )
}