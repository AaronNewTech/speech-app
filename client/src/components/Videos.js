import React, { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";
import SpeechPractice from "./SpeechPractice"; // Import your SpeechPractice component
import Modal from "react-modal";

Modal.setAppElement("#root");

const Videos = () => {
  const videoId = "Wm4R8d0d8kU"; // Replace with your video ID

  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [correct, setCorrect] = useState(false);

  const opts = {
    height: "630",
    width: "1120",
    playerVars: {
      autoplay: 0,
    },
  };

  const onReady = (event) => {
    // Player is ready to play
    setPlayer(event.target);
  };

  const onPlay = (event) => {
    // Video is playing
    setIsPlaying(true);
  };

  const onPause = (event) => {
    // Video is paused
    setIsPlaying(false);
  };

  const openModal = () => {
    // Pause the video when the modal opens
    if (player) {
      player.pauseVideo();
    }
    setShowModal(true);
  };

  useEffect(() => {
    let intervalId;

    if (isPlaying) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);

        // Check if elapsed time is a multiple of 30 seconds
        if (elapsedTime > 0 && elapsedTime % 2 === 0) {
          openModal();
        }
      }, 1000); // Update elapsed time every second
    } else {
      clearInterval(intervalId); // Pause the timer
    }

    return () => {
      clearInterval(intervalId); // Cleanup: Clear the timer when the component unmounts
    };
  }, [isPlaying, elapsedTime]);

  const closeModal = () => {
    setShowModal(false);

    // Continue playing the video (unpause)
    if (player) {
      player.playVideo();
    }
  };

  return (
    <div className="video-text">
      <h2> Video Speech Trainer </h2>
      <p>Say the word to continue watching the video</p>
      <div className="embed-video">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onPlay={onPlay}
          onPause={onPause}
        />
        {/* <div>
        {isPlaying ? (
          <p>Elapsed Time: {elapsedTime} seconds</p>
        ) : (
          <p>Video is paused</p>
        )}
      </div> */}
        {showModal && (
          <Modal
            isOpen={showModal}
            contentLabel="Example Modal"
            onRequestClose={closeModal}
          >
            <SpeechPractice correct={correct} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Videos;
