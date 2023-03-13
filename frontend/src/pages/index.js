import {ethers} from "ethers";
import Web3Modal from "web3modal";
// import { useState, useEffect } from "react";
// import { abi, CONTRACT_ADDRESS } from "../utils/constants";
import styles from "../styles/Home.module.css";

export default function Home() {
   const joke = () => {
    
  }
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        Connect your Ethereum wallet and send me a joke!
        </div>

        <button className="jokeButton" onClick={joke}>
         Post a joke!
        </button>
      </div>
    </div>
  ); 
}