import React from "react";

function FlashCard({ sound }) {
  //   console.log(card);

  return (
    <div>
    
      <div
        // className="card-container"
        // onClick={(e) => {
        //   e.stopPropagation();
        //   onClick(card);
        // }}
      >
        <h2>
        Say the word "{sound.sound}"
        </h2>
        <br />
        <div className="sound-image-container" >
        <img src={sound.image} alt={sound.sound}></img>
        </div>
      </div>
    </div>
  );
}

export default FlashCard;
