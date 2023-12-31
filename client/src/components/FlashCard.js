import React from "react";
import SaveSoundButton from "./SaveSoundButton";

// component for displaying flash cards
function FlashCard({ sound, email }) {
  return (
    <div id="flash-card-container" >
      <div>
        <h2>Say the word "{sound.sound}"</h2>
        <br />
        <div className="sound-image-container">
          <img src={sound.image} alt={sound.sound}></img>
        </div>
        <SaveSoundButton soundId={sound.id} email={email} />
      </div>
    </div>
  );
}

export default FlashCard;
