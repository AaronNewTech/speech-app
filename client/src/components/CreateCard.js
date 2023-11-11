import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import FlashCard from "./FlashCard";

function CreateCard() {
  const [formErrors, setFormErrors] = useState([]);
  const [sounds, setSounds] = useState([]);
  const [selectedSound, setSelectedSound] = useState(null);
  const [updateData, setUpdateData] = useState({
    sound: "",
    image: "",
  });

  useEffect(() => {
    fetchAllSounds();
  }, []);

  // function to fetch created sounds from the database and display them on this web page
  const fetchAllSounds = async () => {
    try {
      const response = await fetch("/created_sounds");

      if (response.ok) {
        const allSounds = await response.json();
        setSounds(allSounds);
      } else {
        console.error("Error fetching sounds:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching sounds:", error);
    }
  };

  // funtion to delete created sounds from the database when the delete button is clicked and display the remaining sounds on this web page
  const handleDelete = async (soundId) => {
    try {
      const response = await fetch(`/sounds/${soundId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // updates the sounds on the web page
        fetchAllSounds();
      } else {
        console.error("Error deleting sound:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting sound:", error);
    }
  };

  // function for displaying the fields to edit when edit button is clicked
  const handleEdit = (sound) => {
    // set the selected sound for editing
    setSelectedSound(sound);
    // sets the selected sound data to sent to the database
    setUpdateData({
      sound: sound.sound || "",
      image: sound.image || "",
    });
  };

  // function for sending the updated sounds to the database
  const handleUpdate = (soundId) => {
    fetch(`http://localhost:3000/sounds/${soundId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((response) => {
        if (response.ok) {
          // refreshes the sounds once successfully updated
          fetchAllSounds();
          // clear the selected sound
          setSelectedSound(null);
          // updates the selected sound text in the form when edit is button is clicked
          setUpdateData({
            sound: updateData.sound,
            image: updateData.image,
          });
        } else {
          console.error("Error updating sound:", response.statusText);
        }
      })
      .catch((error) => console.error("Error updating sound:", error));
  };

  // formik form handling for submiting the new sound data for a newly created sound
  const formik = useFormik({
    // displays blank sound data in form fields
    initialValues: {
      sound: "",
      image: "",
    },

    // handles the new sound  post when submit is button is clicked
    onSubmit: async (values) => {
      // creates sound object to post
      const newSound = {
        sound: values.sound,
        image: values.image,
      };
      // sends post request to database
      const response = await fetch("/create_card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSound),
      });

      // clears form and fetches created sounds to display on screen including the newly created one
      if (response.ok) {
        // eslint-disable-next-line
        const sound = await response.json();
        // addSound(sound);
        formik.resetForm();
        fetchAllSounds();
        setFormErrors([]);
      } else {
        const err = await response.json();
        setFormErrors(err.errors);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="new-sound-form">
        <label htmlFor="email">Sound: </label>
        <input
          id="sound"
          name="sound"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.sound}
          placeholder="Sound"
        />

        <label htmlFor="email">Image: </label>
        <input
          id="image"
          name="image"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.image}
          placeholder="Image URL"
        />
        {formErrors.length > 0
          ? formErrors.map((err, index) => (
              <p key={index} style={{ color: "red" }}>
                {err}
              </p>
            ))
          : null}
        <input id="add-sound-button" type="submit" value="Create Sound" />
      </form>
      <h2 id="flash-card-library">Flash Card Library</h2>
      <div className="cards-container">
        {sounds &&
          sounds.map((sound) => (
            <div className="display-container" key={sound.id}>
              <FlashCard sound={sound} />
              <button onClick={() => handleDelete(sound.id)}>Delete</button>
              <button onClick={() => handleEdit(sound)}>Edit</button>
              {selectedSound && selectedSound.id === sound.id && (
                <div>
                  <input
                    type="text"
                    placeholder="sound Name"
                    value={updateData.sound}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, sound: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={updateData.image}
                    onChange={(e) =>
                      setUpdateData({
                        ...updateData,
                        image: e.target.value,
                      })
                    }
                  />

                  <button onClick={() => handleUpdate(selectedSound.id)}>
                    Save
                  </button>
                  <button onClick={() => setSelectedSound(null)}>Cancel</button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default CreateCard;
