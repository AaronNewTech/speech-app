import React, { useState, useEffect } from "react";
import { useAuth } from "./UseContext";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Speech from "speak-tts";
import FlashCard from "./FlashCard";
import { useNavigate } from "react-router-dom";

const SpeechPractice = ({ email, setEmail }) => {
  const { user } = useAuth();
  const [randomSound, setRandomSound] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasSpokenGreatJob, setHasSpokenGreatJob] = useState(false);
  const [score, setScore] = useState(() => {
    // initializes score from localStorage, or 0 if not present
    const storedScore = localStorage.getItem("score");
    return storedScore ? parseInt(storedScore, 10) : 0;
  });

  const navigate = useNavigate();
  const minSoundId = 1;
  // const maxSoundId = 100;

  useEffect(() => {
    fetchMaxSoundId();

    if (user) {
      fetchUserScore();
    }
  }, []);

  // fetches the max sound id from the database
  const fetchMaxSoundId = async () => {
    try {
      const response = await fetch("/get_last_sound_id");
      if (response.ok) {
        const maxSoundData = await response.json();
        fetchRandomSound(maxSoundData);
      } else {
        console.error("Failed to fetch max sound ID");
      }
    } catch (error) {
      console.error("An error occurred while fetching max sound ID:", error);
    }
  };

  // fetches random flash card data to be displayed
  const fetchRandomSound = async (maxSoundId) => {
    let randomSoundData = null;
    while (!randomSoundData) {
      const randomSoundId =
        Math.floor(Math.random() * (maxSoundId - minSoundId + 1)) + minSoundId;
      const response = await fetch(`/sounds/${randomSoundId}`);

      if (response.ok) {
        randomSoundData = await response.json();
        await initPlayText(randomSoundData.sound);

        setRandomSound(randomSoundData);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  // fetches the user's score from the database
  const fetchUserScore = async () => {
    try {
      const response = await fetch("/user_score");

      if (response.ok) {
        const userScoreData = await response.json();
        const score = userScoreData.score;

        // update the score state and localStorage
        setScore(score);
        localStorage.setItem("score", score.toString());
      }
    } catch (error) {
      console.error("An error occurred while fetching random score:", error);
    }
  };

  // plays the sound once the sound data has been loaded
  const initPlayText = async (sound) => {
    if (sound) {
      speech.speak({
        text: sound,
      });
    }
  };

  // creates new speech object
  const speech = new Speech();
  speech
    .init()
    .then((data) => {})
    .catch((e) => {
      console.error("An error occurred while initializing:", e);
    });

  // handles playing of text to audio production
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

  // handles recording of audio when record button is clicked
  async function handleClick(event) {
    await SpeechRecognition.startListening();
  }

  // handles transcript for recording user speech
  const {
    transcript,
    listening,
    // resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // check for brower support
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // increases the score when a word is spoken correctly
  const handleScoreChange = async (event) => {
    const newScore = score + 1;

    try {
      const response = await fetch("/scores", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score_value: newScore,
        }),
      });

      if (response.ok) {
        // Update the score state and localStorage
        setScore(newScore);
        localStorage.setItem("score", newScore.toString());
        console.log("Score updated successfully");
      } else {
        console.error("Failed to update score on the server");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  let result = null;

  // conditional to check if the word was said correctly
  if (transcript.toLowerCase()) {
    if (transcript.toLowerCase() === randomSound.sound) {
      result = "Correct";
    } else if (transcript.toLowerCase() !== randomSound.sound) {
      result = "Incorrect, try again";
    }
  } else {
    result = "";
  }

  // conditional to check if the word was said correctly to play "Great job" and increase the score
  if (
    randomSound &&
    transcript.toLowerCase() === randomSound.sound &&
    !hasSpokenGreatJob
  ) {
    initPlayText("Great job");
    setHasSpokenGreatJob(true);
    setScore(score + 1);
    handleScoreChange();
  }

  // navgates to empty route to retrigger useEffect to play sound for next flash card
  const handleNextCard = () => {
    navigate("/empty-route");
  };

  // const handleTextareaChange = (event) => {
  //   resetTranscript(); // Reset the transcript since it's controlled
  // };

  return (
    <div className="voice-test">
      {user ? <div id="score">Score: {score}</div> : <div></div>}
      <p id="microphone">Microphone: {listening ? "on" : "off"}</p>
      <button onClick={handleClick}>Start</button>
      <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
      {/* <button onClick={() => resetTranscript()}>Reset</button> */}
      <h3>Your Speech: {transcript} </h3>
      <br />
      <br />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {randomSound && (
            <>
              <FlashCard sound={randomSound} email={email} />
            </>
          )}
        </>
      )}
      <br />
      <button onClick={handlePlayText}>Play Audio</button>
      <br />
      <br />
      <h2>{result}</h2>
      <br />
      <button onClick={handleNextCard}>Next Card</button>
    </div>
  );
};

export default SpeechPractice;
