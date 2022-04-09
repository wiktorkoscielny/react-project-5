import React from "react";
import { createRoot } from "react-dom/client";

// components
import App from './App';

//styles
import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
  body
  {
    margin: 0;
    background-color: #000;
    color: #fff;
    text-align: center;
  }
`

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <>
    <GlobalStyle />
    <App />
  </>
  
);