import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import abi from "./utils/HaHaHub.json";


const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allJokes, setAllJokes] = useState([]);
  const [totalJokes, setTotalJokes] = useState(0);
  const [jokeMessage, setJokeMessage] = useState("");
  const [isMining, setIsMining] = useState(false);
  const [isMined, setIsMined] = useState(false);

  const contractAddress = "0x109C9c5198B98901BbAB1F6750C4FBBdEC30f82F";
  const contractABI = abi.abi;

  const getAllJokes = async () => {
    const { ethereum } = window;

    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const jokePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        const jokes = await jokePortalContract.getAllJokes();


        const jokesCleaned = jokes.map(joke => {
          return {
            address: joke.joker,
            timestamp: new Date(joke.timestamp * 1000),
            message: joke.message,
          };
        });

        setAllJokes(jokesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
  let jokePortalContract;

  const onNewJoke = (from, timestamp, message) => {
    console.log("NewJoke", from, timestamp, message);
    setAllJokes(prevState => [
      ...prevState,
      {
        address: from,
        timestamp: new Date(timestamp * 1000),
        message: message,
      },
    ]);
  };

  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    jokePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
    jokePortalContract.on("NewJoke", onNewJoke);
  }

  return () => {
    if (jokePortalContract) {
      jokePortalContract.off("NewJoke", onNewJoke);
    }
  };
}, []);

 

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }


  const joke = async () => {
      try {
        const { ethereum } = window;

        if (ethereum && jokeMessage) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const jokePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

          let count = await jokePortalContract.getTotalJokes();
          console.log("Retrieved total joke count...", count.toNumber());
          
          const jokeTxn = await jokePortalContract.joke(jokeMessage, {gasLimit:300000});
          console.log("Mining...", jokeTxn.hash);
          setIsMined(false);
          setIsMining(true);

          await jokeTxn.wait();
          console.log("Mined -- ", jokeTxn.hash);
          setIsMining(false);
          setIsMined(true);

          count = await jokePortalContract.getTotalJokes();
          console.log("Retrieved total joke count...", count.toNumber());
          setJokeMessage("");
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error)
      }
  }
  
  const initTotalJokes = async (callback) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const jokePortalContract = new ethers.Contract(contractAddress, contractABI, provider);
        console.log("Initializing total joke count...");
        const jokeCount = await jokePortalContract.getTotalJokes()
        console.log("Total jokes : ", jokeCount.toNumber())
        callback(jokeCount.toNumber())
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    initTotalJokes(setTotalJokes);
    getAllJokes();
  }, [])

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          👋 Hey there!
        </div>

        <div className="bio">
          I am Tanja, a TV editor turned software engineer. Connect your Ethereum wallet and send me your favorite joke! 🤓
        </div>

        {currentAccount ? (<textarea name="jokeArea"   className="inputBox"
            placeholder="Enter your joke here."
            type="text"
            value={jokeMessage}
            onChange={e => setJokeMessage(e.target.value)} />) : null
        }
     
        <button className="jokeButton" onClick={joke}>
        Send Me Your Joke!
        </button>
  
        {!currentAccount && (
          <button className="jokeButton" onClick={connectWallet}>
            Connect Your Wallet!
          </button>
        )}

        <div className="jokeCount">
        Number of jokes sent so far: {allJokes.length}
        </div>  

        {isMining && (
          <img className="miningGif" src="https://media.giphy.com/media/SWVzkIlHdEckF81gnA/giphy.gif"/>
        )}

        {isMined && (
          <img className="miningGif" src="https://media.giphy.com/media/dmB5vD2t2gR8Y/giphy.gif"/>
        )}

        {allJokes.map((joke, index) => {
          return (
            <div key={index} style={{ backgroundColor: '#EFEFEF',  color: '#8b7c9c', marginTop: "16px", padding: "8px",     border: "0",
    borderRadius: "5px"}}>
              <div><strong>Address:</strong> {joke.address}</div>
              <div><strong>Time:</strong> {joke.timestamp.toString()}</div>
              <div><strong>Joke:</strong> {joke.message}</div>
            </div>)
        })}

      </div>
    </div>
  );
} 

export default App
