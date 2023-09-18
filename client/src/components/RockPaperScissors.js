import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Speech from "speak-tts";
import NavBar from "./NavBar";
import FlashCard from "./FlashCard";

const RockPaperScissors = () => {
    const [userResult, setUserResult] = useState("images/rock.png");
    const [cpuResult, setCpuResult] = useState("images/rock.png");
    const [result, setResult] = useState("Let's Play!!");
    const [activeOptionIndex, setActiveOptionIndex] = useState(null);
  
    const optionImages = [
      "images/rock.png",
      "images/paper.png",
      "images/scissors.png",
    ];
  
    const handleOptionClick = (index) => {
      setActiveOptionIndex(index);
      setUserResult("images/rock.png");
      setCpuResult("images/rock.png");
      setResult("Wait...");
  
      setTimeout(() => {
        setActiveOptionIndex(null);
  
        const userChoice = optionImages[index];
        const cpuChoice =
          optionImages[Math.floor(Math.random() * optionImages.length)];
  
        setUserResult(userChoice);
        setCpuResult(cpuChoice);
  
        const outcomes = {
          "images/rock.pngimages/rock.png": "Draw",
          "images/rock.pngimages/paper.png": "Cpu",
          "images/rock.pngimages/scissors.png": "User",
          "images/paper.pngimages/rock.png": "User",
          "images/paper.pngimages/paper.png": "Draw",
          "images/paper.pngimages/scissors.png": "Cpu",
          "images/scissors.pngimages/rock.png": "Cpu",
          "images/scissors.pngimages/paper.png": "User",
          "images/scissors.pngimages/scissors.png": "Draw",
        };
  
        const outcomeKey = `${userChoice}${cpuChoice}`;
        const gameResult = outcomes[outcomeKey] || "Invalid choice";
  
        setResult(gameResult === "Draw" ? "Match Draw" : `${gameResult} Won!!`);
      }, 2500);
    };
  
    return (
      <div>
      <NavBar />
      <section className={`container ${activeOptionIndex !== null ? "start" : ""}`}>
        <div className="result_field">
          <div className="result_images">
            <span className="user_result">
              <img src={userResult} alt="" />
            </span>
            <span className="cpu_result">
              <img src={cpuResult} alt="" />
            </span>
          </div>
          <div className="result">{result}</div>
        </div>
  
        <div className="option_images">
          {optionImages.map((image, index) => (
            <span
              key={index}
              className={`option_image ${
                activeOptionIndex === index ? "active" : ""
              }`}
              onClick={() => handleOptionClick(index)}
            >
              <img src={image} alt="" />
              <p>{image.split("/").pop().split(".")[0]}</p>
            </span>
          ))}
        </div>
      </section>
      </div>
    );
  }  

export default RockPaperScissors;


//   const [randomSound, setRandomSound] = useState(null);
//   const [loading, setLoading] = useState(true); // Add loading state
//   const minSoundId = 1;
//   const maxSoundId = 50;

//   useEffect(() => {
//     fetchRandomSound();
//   }, []);

//   const fetchRandomSound = async () => {
//     try {
//       const randomSoundId = 49;
//       const response = await fetch(`/sounds/${randomSoundId}`);

//       if (response.ok) {
//         const randomSoundData = await response.json();
//         setRandomSound(randomSoundData);
//       }
//       setLoading(false); // Data has been fetched, set loading to false
//     } catch (error) {
//       console.error("An error occurred while fetching random sound:", error);
//       setLoading(false); // Handle the error case and set loading to false
//     }
//   };

//   const speech = new Speech();
//   speech
//     .init()
//     .then((data) => {
//       // The "data" object contains the list of available voices and the voice synthesis params
//     })
//     .catch((e) => {
//       console.error("An error occurred while initializing:", e);
//     });

//   const handlePlayText = (event) => {
//     if (randomSound) {
//       speech
//         .speak({
//           text: transcript,
//         })
//         .then(() => {
//           console.log("Success !");
//         })
//         .catch((e) => {
//           console.error("An error occurred:", e);
//         });
//     }
//   };

//   async function handleClick(event) {
//     await SpeechRecognition.startListening();
//   }

//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   const handleTextareaChange = (event) => {
//     // Update the transcript when the textarea value changes
//     resetTranscript(); // Reset the transcript since it's controlled
//   };

//   let correct = "";
//   if (randomSound && transcript === randomSound.sound) {
//     correct = "Correct";
//   } else if (randomSound && transcript !== randomSound.sound) {
//     correct = "Try Again";
//   }


 {/* <div className="voice-test">
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={handleClick}>Start</button>
      <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
      <button onClick={() => resetTranscript()}>Reset</button>
      {loading ? ( // Render a loading indicator while fetching data
        <p>Loading...</p>
      ) : (
        <>
          
          <p>{`Say the word  "${randomSound && randomSound.sound}"`}</p>
          <p>{correct}</p>
          <FlashCard sound={randomSound} />
        </>
      )}
      <br />
      <br />
      <button onClick={handlePlayText}>Play Audio</button>
      </div> */}