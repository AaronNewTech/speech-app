import React, { useState, useEffect } from "react";
import FlashCard from "./FlashCard";

function SavedCards() {
  const [sounds, setSounds] = useState([]);

  useEffect(() => {
    fetchAllSounds();
  }, []);

  const fetchAllSounds = async () => {
    try {
      const response = await fetch("/user_saved_sounds");

      if (response.ok) {
        const allSounds = await response.json();
        // console.log(allSounds)
        setSounds(allSounds);
      } else {
        console.error("Error fetching sounds:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching sounds:", error);
    }
  };

  console.log();
  return (
    <div>
      <h2 id="flash-card-library">Flash Card Library</h2>
      <div className="cards-container">
        {sounds &&
          sounds.map((sound) => (
            <div className="display-container" key={sound.id}>
              <FlashCard sound={sound} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default SavedCards;
