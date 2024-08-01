import { styled } from "@mui/material";
import ReactMarkdown from "react-markdown";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import axios from "axios";

const ScrollableTypography = styled(Typography)({
  color: "white",
  marginTop: "20px",
  marginRight: "10px",
  marginBottom: "100px",
  height: "100%",
  overflowY: "auto",
  scrollbarWidth: "thin", // for modern browsers

  "&::-webkit-scrollbar": {
    // for Webkit browsers like Chrome and Safari
    width: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(255, 255, 255, 0.3)", // slightly transparent white
    borderRadius: "3px",
  },
  "&:hover::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(255, 255, 255, 0.6)", // slightly more visible on hover
  },
});

const ContentContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "calc(100vh - 310px)", // Assuming your AppBar has a height of 64px. Adjust if needed.
});

const m = `
# KarmaPay - The Universal Payment Gateway

![KarmaPay Logo](https://noobsverse-internal.s3.ap-south-1.amazonaws.com/karmapay-removebg-preview.png)

KarmaPay is an open-source project that aims to simplify online payments by providing a unified API endpoint for multiple payment gateways. It abstracts the complexities of integration, allowing developers to seamlessly work with various payment providers while maintaining a single, consistent interface.`

export default function Learn({ markdown }) {

  useEffect(() => {
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          margin: "5px",
          marginTop: "10px",
        }}
      >
        <ContentContainer>
          <ScrollableTypography
            component="div"
            variant="body1"
            sx={{
              color: "white",
              marginTop: "20px",
              marginRight: "10px",
              overflowY: "auto",
            }}
          >
              <div className="markdown-content content overflow-auto custom-scrollbar-css" style={{"overflowY": "auto", "max-height": "800px"}}>
  <ReactMarkdown>{m}</ReactMarkdown>
</div>
          </ScrollableTypography>
        </ContentContainer>
      </Box>
      <style jsx global>{`.markdown-content p,
.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
    color: white;
`}</style>
    </>
  );
}
