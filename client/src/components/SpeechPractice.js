import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Speech from "speak-tts";
import NavBar from "./NavBar";
import FlashCard from "./FlashCard";
import { redirect } from "react-router-dom";

const SpeechPractice = ({ keyCount }) => {
  const [randomSound, setRandomSound] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasSpokenGreatJob, setHasSpokenGreatJob] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);


  const minSoundId = 1;
  const maxSoundId = 26;

  useEffect(() => {

    fetchRandomSound();
    
  }, []);

  const fetchRandomSound = async () => {
    try {
      const randomSoundId =
        Math.floor(Math.random() * (maxSoundId - minSoundId + 1)) + minSoundId;

      const response = await fetch(`/sounds/${randomSoundId}`);

      if (response.ok) {
        const randomSoundData = await response.json();
        await initPlayText(randomSoundData.sound);

        setRandomSound(randomSoundData);
        console.log(randomSoundData);
        setLoading(false);
        return randomSoundData;
      }
      // Data has been fetched, set loading to false
    } catch (error) {
      console.error("An error occurred while fetching random sound:", error);
      setLoading(false); // Handle the error case and set loading to false
    }
  };

  const initPlayText = async (sound) => {
    if (sound) {
      speech.speak({
        text: sound,
      });
      // console.log(sound)
    }
  };

  const speech = new Speech();
  speech
    .init()
    .then((data) => {
      // The "data" object contains the list of available voices and the voice synthesis params
    })
    .catch((e) => {
      console.error("An error occurred while initializing:", e);
    });

  const handlePlayText = (event) => {
    if (randomSound) {
      speech
        .speak({
          text: randomSound.sound,
        })
        .then(() => {
          console.log("Success !");
        })
        .catch((e) => {
          console.error("An error occurred:", e);
        });
    }
  };

  async function handleClick(event) {
    await SpeechRecognition.startListening();
  }

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleTextareaChange = (event) => {
    // Update the transcript when the textarea value changes
    resetTranscript(); // Reset the transcript since it's controlled
  };

  let correct = "";

  if (randomSound && transcript === randomSound.sound) {
    correct = "Correct";
    
  } else {
    correct = "";
  }
  
  if (randomSound && transcript === randomSound.sound && !hasSpokenGreatJob) {
    initPlayText("Great job");
    setHasSpokenGreatJob(true); // Mark that "Great job" has been spoken
  }

  const handleNextCard = () => {
    if (showNextButton) {
      // Redirect when the "Next" button is clicked
      redirect("/speech_practice");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="voice-test">
        <p id="microphone" >Microphone: {listening ? "on" : "off"}</p>
        <button onClick={handleClick}>Start</button>
        <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
        <button onClick={() => resetTranscript()}>Reset</button>
        <br />
        <br />
        {loading ? ( // Render a loading indicator while fetching data
          <p>Loading...</p>
        ) : (
          <>
            {randomSound && (
              <>
                {/* <h2>{`Say the word  "${randomSound.sound}"`}</h2> */}

                <FlashCard sound={randomSound} />
              </>
            )}
          </>
        )}
        <br />
        <button onClick={handlePlayText}>Play Audio</button>
        <br />
        <br />
        <h2>{correct}</h2>
        {hasSpokenGreatJob ? <button onClick={handleNextCard} >Next Card</button> :  <div></div>}
      </div>
    </div>
  );
};

export default SpeechPractice;
