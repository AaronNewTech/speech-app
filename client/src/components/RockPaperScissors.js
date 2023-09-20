// initial code source
// https://www.codingnepalweb.com/rock-paper-scissors-game-javascript/
import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Speech from "speak-tts";
import NavBar from "./NavBar";
import FlashCard from "./FlashCard";
import SpeechPractice from "./SpeechPractice";
import ReactModal from "react-modal";
import Modal from "react-modal";

Modal.setAppElement("#root");

const RockPaperScissors = () => {
  const [userResult, setUserResult] = useState("images/rock.png");
  const [cpuResult, setCpuResult] = useState("images/rock.png");
  const [result, setResult] = useState("Let's Play!!");
  const [activeOptionIndex, setActiveOptionIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const [counter, setCounter] = useState(0);

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
      if (gameResult === "User") {
        setPoints(points + 1);
      }

      setCounter(counter + 1);
    }, 2500);
  };

  useEffect(() => {
    // Check if the Points is a multiple of 3 (increases by 3)
    if (counter % 3 === 0 && counter > 0) {
      setIsOpen(true); // Open the modal when the Points increases by 3
    }
  }, [counter]);

  return (
    <div>
      {/* <NavBar /> */}
      <section
        className={`container ${activeOptionIndex !== null ? "start" : ""}`}
      >
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
        <p>Points: {points}</p>
      </section>
      <ReactModal
        isOpen={isOpen}
        contentLabel="Example Modal"
        onRequestClose={() => setIsOpen(false)}
      >
        <SpeechPractice />
      </ReactModal>
    </div>
  );
};

export default RockPaperScissors;
