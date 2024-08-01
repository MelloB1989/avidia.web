import { useState, useEffect, useContext } from "react";
import Layout from '../../layouts/env'
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css';
import Lisa from '../../components/modes/lisa_mode/index';
import LiveSession from '../../components/modes/live_sessions/meet';
import {UserContext} from '@/components/lms_components/layout/UserContext';
import LayoutOuter from '@/components/lms_components/layout/protected-raw';
import axios from 'axios';
import get_jwt from '@/lib/frontend_functions/get_jwt';
import toast, {Toaster} from 'react-hot-toast';
//Code-Editor
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { monokai } from '@uiw/codemirror-theme-monokai';
import React from 'react';
const extensions = [javascript({ jsx: true })];

const model = ``;

export default function LearnPage() {
  const router = useRouter();
  const { userData } = useContext(UserContext);
  const { course } = router.query;
  
  const [mode, setMode] = useState('code');
  const [code, setCode] = useState(model);

  const onChange = React.useCallback((value, viewUpdate) => {
    console.log('value:', value);
    setCode(value);
  }, []);

useEffect(() => {
  
}, [userData]);

  return (
        <LayoutOuter>
          <Toaster/>
          <Layout>
            <div className="rbt-lesson-area bg-color-white">
    <div className="rbt-lesson-content-wrapper">
        <div className="rbt-lesson-leftsidebar">
        <Lisa courseId={course} change_mode={setMode} />
      </div>
      <div className="rbt-lesson-rightsidebar overflow-hidden" style={{height: "100vh"}}>
        <div style={{height: "100%"}}>
        <CodeMirror
              value={code}
              height="100vh"
              theme={monokai}
              onChange={onChange}
              extensions={[javascript({ jsx: true })]}
            />
        </div>
        </div>
    </div>
  </div>
  <div className="rbt-progress-parent">
    <svg
      className="rbt-back-circle svg-inner"
      width="100%"
      height="100%"
      viewBox="-1 -1 102 102"
    >
      <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
    </svg>
  </div>
          </Layout>
        </LayoutOuter>
  );
}