import React, { useState, useEffect } from "react";

function SaveSoundButton({ soundId, email }) {
  const [userSavedSounds, setUserSavedSounds] = useState([]);

  // Load favorited sounds from localStorage on component mount
  useEffect(() => {
    const savedSoundsFromLocalStorage =
      JSON.parse(localStorage.getItem("userSavedSounds")) || [];
    setUserSavedSounds(savedSoundsFromLocalStorage);
  }, []);

  // Update localStorage whenever userSavedSounds changes
  useEffect(() => {
    localStorage.setItem("userSavedSounds", JSON.stringify(userSavedSounds));
  }, [userSavedSounds]);

  // useEffect(() => {
  //   console.log('userSavedSounds updated:', userSavedSounds);
  // }, [userSavedSounds]);

  const isSoundSaved = userSavedSounds.includes(soundId);

  const handleFavoriteClick = async () => {
    try {
      if (isSoundSaved) {
        // If already favorited, send a DELETE request to remove it from favorites on the server
        const response = await fetch(`/save_sounds/${soundId}`, {
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
    <button onClick={handleFavoriteClick}>
      {isSoundSaved ? "Unfavorite" : "Favorite"}
    </button>
  );
}

export default SaveSoundButton;
