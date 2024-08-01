import { useState, useEffect } from "react";
import Homer from '../components/home/home';
import { MdCall } from "react-icons/md"
import { Button } from "@chakra-ui/react";
import ChatSupport from "@/components/chat-support/index";
import { ChakraProvider } from '@chakra-ui/react';

export default function Home() {
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  }
  
  return (
    <>
    <ChakraProvider>
    <Homer/>
    {isChatOpen && <ChatSupport />}
                <Button position="fixed" bottom="4" size='lg' right="4" zIndex="9999" rightIcon={<MdCall />} colorScheme='blue' variant='solid' onClick={toggleChat}>
                    Chat with Lisa
                  </Button>
    </ChakraProvider>
    </>
  )
}
