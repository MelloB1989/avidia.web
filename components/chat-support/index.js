import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Avatar,
  Text,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaPaperPlane } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { chat } from '@/lib/chat-support/api';

const Message = ({ msg }) => (
  <Flex
    alignSelf={msg.fromUser ? 'flex-end' : 'flex-start'}
    flexDirection="column"
    alignItems={msg.fromUser ? 'flex-end' : 'flex-start'}
    mb={4}
  >
    <HStack spacing={2}>
      {!msg.fromUser && <Avatar size="sm" name="Lisa" src="https://noobsverse-internal.s3.ap-south-1.amazonaws.com/assets/lisa1.jpg" />}
      <Box
        as={motion.div}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        p={3}
        bg={msg.fromUser ? 'blue.400' : 'gray.100'}
        color={msg.fromUser ? 'white' : 'black'}
        borderRadius="full"
        boxShadow="2xl"
        maxWidth="75%"
      >
        <Text fontSize="sm">{msg.text}</Text>
      </Box>
      {msg.fromUser && <Avatar size="sm" name="User" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp" />}
    </HStack>
  </Flex>
);

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { text: 'Hi', fromUser: true },
    { text: 'Hi there! I am Lisa! I am here to help you with the questions you have regarding Avidia Cohort 2024. Feel free to ask me anything regarding the cohort.', fromUser: false }
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef(null);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true); 

    const newConversation = [...messages, { text: message, fromUser: true }];
    setMessages(newConversation);

    try {
        const m = message;
        setMessage('');
      const botMessage = await chat(m);
      setIsLoading(false);
      //const audioData = await getAudio(botMessage);
             // Send the response text to get audio data
      // Play the audio data
       // playAudio(audioData);
       setMessages([...newConversation, { text: botMessage, fromUser: false }]);
    } catch (err) {
      console.error(err);
    }
  };

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <VStack
      spacing={4}
      bg={useColorModeValue('gray.50', 'gray.700')}
      p={5}
      borderRadius="lg"
      boxShadow="lg"
      maxW="250px" // Reduced width for a more compact look
      w="full"
      margin="auto"
      mt="5"
      overflow="hidden"
      position="fixed"
      bottom="40" 
      right="20"
      zIndex="9999"
    >
      <Text fontSize="2xl">Lisa AI</Text> 
      <Flex direction="column" overflowY="auto" h="250px" px={2} gap={4} sx={{
    '&::-webkit-scrollbar': {
      width: '4px', // Making the scrollbar thinner
      borderRadius: '4px',
      backgroundColor: `rgba(0, 0, 0, 0.05)`,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `orange`, // Changing the scrollbar color to orange
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: `darkorange`, // A darker orange on hover for better interaction feedback
    },
    '&{scrollbar-width}': {
      scrollbarWidth: 'thin',
      scrollbarColor: `orange rgba(0, 0, 0, 0.05)`, // Applying orange color for Firefox
    },
  }}>
        <AnimatePresence>
          {messages.map((msg, index) => (
            <Message key={index} msg={msg} />
          ))}
        </AnimatePresence>
        <div ref={endOfMessagesRef} />
      </Flex>
      <HStack w="full">
        <Input
          value={message}
          onChange={handleChange}
          placeholder="Type a message..."
          onKeyPress={(event) => event.key === 'Enter' && handleSubmit()}
        />
        <Button
          onClick={handleSubmit}
          colorScheme="blue"
          rightIcon={<FaPaperPlane />}
        >
          Send
        </Button>
      </HStack>
    </VStack>
  );
};

export default ChatBox;



/*
import { useState, useRef } from 'react';
import axios from 'axios';
import { chat } from '@/lib/chat-support/api';  // Importing chat function from api.js

export default function ChatBox() {
  const getAudio = async (text) => {
    try {
        const response = await axios.post('/api/synthesize', { text: text.toString() }, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log(response.data)
        //const audioBlob = await new Blob([response.data], { type: 'audio/mpeg' }); // adjust the MIME type accordingly
        const audio = new Audio(response.data.audioUrl);
        audio.play();
        //const audioUrl = URL.createObjectURL(audioBlob);
        //return audioUrl;

    } catch (error) {
        console.error("There was a problem with the axios request:", error.message);
    }
};

const playAudio = (audioData) => {
  // Use the Web Audio API or an HTML5 audio element to play the audio data.
  let audio = new Audio(audioData); // assuming audioData is a valid audio URL or blob URL
  audio.play();
};

    const chatBoxRef = useRef(null);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 

    const newConversation = [...conversation, { text: message, fromUser: true }];
    setConversation(newConversation);

    try {
        const m = message;
        setMessage('');
      const botMessage = await chat(m);
      setIsLoading(false);
      //const audioData = await getAudio(botMessage);
             // Send the response text to get audio data
      // Play the audio data
       // playAudio(audioData);
      setConversation([...newConversation, { text: botMessage, fromUser: false }]);
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  };

  return (
      <>
     <section style={{ backgroundColor: "transparent", position: "fixed", bottom: "0", right: "0", zIndex: "9999", width: "1000px"  }}>
  <div className="container py-5">
    <div className="row d-flex justify-content-center">
      <div className="col-md-8 col-lg-6 col-xl-4">
        <div className="card">
          <div
            className="card-header d-flex justify-content-between align-items-center p-3"
            style={{ borderTop: "4px solid #ffa900" }}
          >
            <h5 className="mb-0">Lora AI</h5>
            <div class="d-flex flex-row align-items-center">
            {isLoading ? (<img src="https://user-images.githubusercontent.com/3059371/49334754-3c9dfe00-f5ab-11e8-8885-0192552d12a1.gif" height="30px" width="30px"/>) : ( <p></p>)}
            </div>
          </div>
          <div
            ref={chatBoxRef}
            className="card-body"
            data-mdb-perfect-scrollbar="true"
            style={{ position: "relative", height: 400, overflowY: "auto" }}
          >
          
            {conversation?.map((msg, index) => (
              <div key={index} className={msg.fromUser ? 'user-message' : 'bot-message'}>
                {msg.fromUser ? (
                <>
                <div className="d-flex justify-content-between">
            </div>
            <div className="d-flex flex-row justify-content-end mb-4 pt-1">
              <div>
                <p className="small p-2 me-3 mb-3 text-white rounded-3 bg-warning">
                  {msg.text}
                </p>
              </div>
              <img
                className="rounded-circle"
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                alt="user"
                style={{ width: 45, height: "100%" }}
              />
            </div>
                </>
                ):(
                <>
                <div className="d-flex justify-content-between">
              <p className="small mb-1">Lora AI</p>
            </div>
            <div className="d-flex flex-row justify-content-start">
              <img
                src="https://noobsverse-internal.s3.ap-south-1.amazonaws.com/assets/lisa1.jpg"
                alt="Lora AI"
                style={{ width: 45, height: "100%" }}
              />
              <div>
                <p
                  className="small p-2 ms-3 mb-3 rounded-3"
                  style={{ backgroundColor: "#f5f6f7" }}
                >
                  {msg.text}
                </p>
              </div>
            </div>
                </>
                )
                }
              </div>
            ))}
            
          </div>
          <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
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
                className="btn btn-warning"
                type="button"
                id="button-addon2"
                style={{ paddingTop: ".55rem" }}
                onClick={handleSubmit}
              >
                Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</>
  );
}
*/