import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import NavBar from "./NavBar";

const VoiceTest = () => {
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

  return (
    <div>
      <NavBar />
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>
        Start
      </button>
      <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
      <button onClick={() => resetTranscript()}>Reset</button>
      <form>
        <textarea
          value={transcript}
          onChange={handleTextareaChange} // Add the onChange handler
        />
      </form>
    </div>
  );
};

export default VoiceTest;
