import styles from "../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Head from "next/head";

export default function coder({ subdomain, loader, arn }) {
  let url = "";
  const iframeRef = useRef(null);
  return (
    <>
      {loader === "false" ? (
        <iframe
          ref={iframeRef}
          className={styles.iframer}
          loading="lazy"
          height="100%"
          width="100%"
          src={`https://${subdomain}.internal.avidia.site`}
        ></iframe>
      ) : (
        <>
          <Head>
            <link
              rel="stylesheet"
              href="https://noobsverse-internal.s3.ap-south-1.amazonaws.com/coder2.css"
            />
          </Head>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "black",
              height: "100vh",
            }}
          >
            <img src="https://cdn.global.noobsverse.com/logos/nvai/loading.gif" />
            <h1 className="mx-3">
              Your
              <span style={{ color: "white" }}>
                <span style={{ color: "#e06c75" }}> workspace</span>
              </span>
              <span style={{ color: "#61afef" }}> {loader}</span>
            </h1>
            <br />
          </div>
          <div className="string">
            <h1 className="greeting en">Avidia Labs!</h1>
          </div>
          <h1 className="closure">");</h1>
        </>
      )}
    </>
  );
}
