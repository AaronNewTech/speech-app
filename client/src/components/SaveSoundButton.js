import React, { useState, useEffect } from "react";
import { useAuth } from "./UseContext";

function SaveSoundButton({ soundId, email }) {
  const { user } = useAuth();
  const [userSavedSounds, setUserSavedSounds] = useState([]);
  const [isSoundSaved, setIsSoundSaved] = useState(false);

  // 
  useEffect(() => {
    fetchUserSavedSounds();
  }, []);

  // fetch user's saved sounds
  const fetchUserSavedSounds = async () => {
    try {
      const response = await fetch("user_saved_sounds_button");

      if (response.ok) {
        const userSoundData = await response.json();
        setUserSavedSounds(userSoundData);
      }
    } catch (error) {
      console.error("An error occurred while fetching saved sounds:", error);
    }
  };

  // updates isSoundSaved whenever userSavedSounds or soundId changes
  useEffect(() => {
    setIsSoundSaved(
      userSavedSounds.some((savedSound) => savedSound.sound_id === soundId)
    );
  }, [userSavedSounds, soundId]);

  const handleFavoriteClick = async () => {
    try {
      if (isSoundSaved) {
        // if sound is already favorited, send a DELETE request to remove it from saved sounds in database
        const response = await fetch(`/user_saved_sounds/${soundId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          // removes the sound from the user's saved sounds list in local storage
          setUserSavedSounds((prevSavedSounds) =>
            prevSavedSounds.filter((savedSound) => savedSound.sound_id !== soundId)
          );
        } else {
          console.error("Failed to remove sound from favorites on the server");
        }
      } else {
        // if sound is not favorited, send a POST request to add it to favorites in the database
        const response = await fetch("/saved_sounds", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, soundId }),
        });
        if (response.ok) {
          // adds the sound to the user's saved sounds list in local storage so that the sound persists on page reload
          setUserSavedSounds((prevSavedSounds) => [
            ...prevSavedSounds,
            { sound_id: soundId },
          ]);
        } else {
          console.error("Failed to add sound to favorites on the server");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
    <div>
      {user ? (
        <button onClick={handleFavoriteClick}>
          {isSoundSaved ? "Unfavorite" : "Favorite"}
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default SaveSoundButton;
