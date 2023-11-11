import React, { useState, useEffect } from "react";
import FlashCard from "./FlashCard";

function SavedCards() {
  const [sounds, setSounds] = useState([]);

  useEffect(() => {
    fetchAllSounds();
  }, []);

  // handles fetching all saved cards from the database
  const fetchAllSounds = async () => {
    try {
      const response = await fetch("/user_saved_sounds");

      if (response.ok) {
        const allSounds = await response.json();
        // sets saved sounds to be displayed
        setSounds(allSounds);
      } else {
        console.error("Error fetching sounds:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching sounds:", error);
    }
  };

  return (
    <div id="flash-card-library">
      <h2>Flash Card Library</h2>
      <h3 id="practice-message">for extra practice</h3>
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
