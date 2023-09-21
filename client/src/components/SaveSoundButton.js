import React, { useState, useEffect } from "react";
import { useAuth } from "./UseContext";
function SaveSoundButton({ soundId, email }) {
  const { user } = useAuth();
  const [userSavedSounds, setUserSavedSounds] = useState([]);

  // Load favorited sounds from localStorage on component mount
  useEffect(() => {
    fetchUserSavedSounds()
  }, []);

  // Update localStorage whenever userSavedSounds changes
  // useEffect(() => {
  //   localStorage.setItem("userSavedSounds", JSON.stringify(userSavedSounds));
  // }, [userSavedSounds]);

  const fetchUserSavedSounds = async () => {
    try {
      const response = await fetch("/user_saved_sounds");

      if (response.ok) {
        const userSoundData = await response.json();
        // await initPlayText(randomSoundData.sound);
        let sounds = userSoundData
        // console.log(userSoundData);
        setUserSavedSounds(sounds)
        
      }
    } catch (error) {
      console.error("An error occurred while fetching random score:", error);
    }
  };
  // useEffect(() => {
  //   console.log('userSavedSounds updated:', userSavedSounds);
  // }, [userSavedSounds]);
  // console.log(userSavedSounds);
  const isSoundSaved = userSavedSounds.includes(soundId);

  const handleFavoriteClick = async () => {
    try {
      if (isSoundSaved) {
        // If already favorited, send a DELETE request to remove it from favorites on the server
        const response = await fetch(`/user_saved_sounds/${soundId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          // Remove the sound from the user's saved sounds list in local storage
          setUserSavedSounds((prevSavedSounds) =>
            prevSavedSounds.filter((savedSound) => savedSound !== soundId)
          );
        } else {
          console.error("Failed to remove sound from favorites on the server");
        }
      } else {
        // If not favorited, send a POST request to add it to favorites on the server
        const response = await fetch("/saved_sounds", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, soundId }),
        });
        if (response.ok) {
          // Add the sound to the user's saved sounds list in local storage
          setUserSavedSounds((prevSavedSounds) => [
            ...prevSavedSounds,
            soundId,
          ]);
        } else {
          console.error("Failed to add sound to favorites on the server");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // console.log(soundId);
  // console.log(userSavedSounds);
  return (
    // {user ? <div id="score">Score: {score}</div> : <div></div>}
    <div>{user ?  <button onClick={handleFavoriteClick}>
      {isSoundSaved ? "Unfavorite" : "Favorite"}
    </button> : <div></div>}</div>
    
  );
}

export default SaveSoundButton;
