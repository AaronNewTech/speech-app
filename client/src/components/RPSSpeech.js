import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Speech from "speak-tts";
import NavBar from "./NavBar";
import FlashCard from "./FlashCard";
import { redirect } from "react-router-dom";
import SpeechPractice from "./SpeechPractice";
import RockPaperScissors from "./RockPaperScissors";


function RPSSpeech () {
    const [counter, setCounter] = useState(0)
    const [view, setView] = useState(true)

    if (counter % 3 === 0) {
        setView(false)
    }

    return (
        <div>
            {view ? <RockPaperScissors /> : <SpeechPractice />}
            

        </div>
    )
}

export default RPSSpeech;