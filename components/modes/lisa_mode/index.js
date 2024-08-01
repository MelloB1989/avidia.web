import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Head from "next/head";

//APP-BAR----------

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import ReplayIcon from "@mui/icons-material/Replay";
import PlayIcon from "@mui/icons-material/PlayArrow";
import NavigateNextIcon from "@mui/icons-material/ArrowForwardIos";
import NavigateBackIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/router";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
    // other theme properties
  },
  // other theme properties
});

//Components
import Learn from "./learn";
import Doubt from "./doubt";
import Quiz from "./quiz";
import Challenge from "./challenge";

const talking = "https://cdn.global.noobsverse.com/1691165868420.gif";
const silent = "https://cdn.global.noobsverse.com/lisa.jpg";

export default function Lisa({ change_mode }) {
  const [markdown, setMark] = useState("Getting content...");
  const [mode, setMode] = useState("doubt");
  const [talk, setTalk] = useState(silent);
  const [toast, setToast] = useState("Lisa V2.9");
  const router = useRouter();

  const switchTalk = (set_to) => {
    if (set_to === 1) setTalk(talking);
    else setTalk(silent);
  };

  const sendToast = (mgs) => {
    if (mgs) setToast(mgs);
  };

  return (
    <>
      <Head>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
          crossorigin="anonymous"
        ></script>
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
      <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "#1b1a1c", height: "100vh" }}>
        <Grid container justifyContent="center">
          <Avatar
            alt="Lisa"
            src={talk}
            sx={{ width: 150, height: 150, marginTop: "16px" }}
          />
        </Grid>
        <Grid container justifyContent="center">
          <Typography
            variant="button"
            display="block"
            sx={{ color: "green" }}
            gutterBottom
          >
            {toast}
          </Typography>
        </Grid>
        {mode === "learn" ? (
          <Learn markdown={markdown} />
        ) : mode === "challenge" ? (
          <Challenge />
        ) : (
          <Doubt switchTalk={switchTalk} sendToast={sendToast} />
        )}
      </Box>
      </ThemeProvider>
    </>
  );
}
