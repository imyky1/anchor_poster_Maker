import React, { useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import * as htmlToImage from "html-to-image";
import DatePicker from "react-datepicker";
import download from "downloadjs";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import Loader from "./Loader"; // Import the Loader component
import Image1 from "./Image1";
import Image2 from "./Image2";
import Image3 from "./Image3";
import Image4 from "./Image4";
import Image5 from "./Image5";

const PosterGenerator = () => {
  const posterRef = useRef(null);
  const imageContainerRef = useRef(null); // Reference to the image container
  const [eventType, setEventType] = useState("");
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [speakerName, setSpeakerName] = useState("");
  const [speakerRole, setSpeakerRole] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null); // State to hold the selected color
  const [color1, setColor1] = useState(null); // State to hold the  color
  const [color2, setColor2] = useState(null); // State to hold the selected color
  const [TextColor, setTextColor] = useState(null); // State to hold the selected color
  const [TextColor1, setTextColor1] = useState(null); // State to hold the selected color
  const [TextColor2, setTextColor2] = useState(null); // State to hold the selected color
  const [showColorButtons, setShowColorButtons] = useState(false); // State to control button visibility

  const handleColorChange = (color) => {
    setSelectedColor(color);
    // Check color brightness
    const brightness = calculateBrightness(color);
    // Set text color based on brightness
    const textColor = brightness < 128 ? "#FFFFFF" : "#212121";
    setTextColor(textColor);
    generatePoster(color, textColor, color1, color2);
  };

  const handleColorChange1 = (color) => {
    setColor1(color);
    // Check color brightness
    const brightness = calculateBrightness(color);
    // Set text color based on brightness
    const textColor1 = brightness < 128 ? "#FFFFFF" : "#212121";
    setTextColor1(textColor1);
    generatePoster(
      selectedColor,
      TextColor,
      color,
      color2,
      textColor1,
      TextColor2
    );
  };

  const handleColorChange2 = (color) => {
    setColor2(color);
    // Check color brightness
    const brightness = calculateBrightness(color);
    // Set text color based on brightness
    const textColor2 = brightness < 128 ? "#FFFFFF" : "#212121";
    setTextColor2(textColor2);
    generatePoster(
      selectedColor,
      TextColor,
      color1,
      color,
      TextColor1,
      textColor2
    );
  };

  const getMonthName = (date) => {
    return new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
  };

  const getDayName = (date) => {
    return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const calculateBrightness = (hexColor) => {
    const color = hexColor.substring(1); // Remove #
    const r = parseInt(color.substring(0, 2), 16); // Red value
    const g = parseInt(color.substring(2, 4), 16); // Green value
    const b = parseInt(color.substring(4, 6), 16); // Blue value

    // Calculate brightness using a standard formula
    return (r * 299 + g * 587 + b * 114) / 1000;
  };

  const generatePoster = async (
    selectedColor,
    textColor,
    color1,
    color2,
    TextColor1,
    TextColor2
  ) => {
    console.log("genrating poster");
    try {
      let imageUrl = ""; // Placeholder for the image URL from the form
      if (selectedFile) {
        if (selectedFile) {
          imageUrl = selectedFile;
        }
      }
      console.log("imageUrl", imageUrl);
      console.log("selectedColor,", selectedColor);
      const WAposterContent = (
        <div
          style={{
            background:
              selectedColor ||
              "linear-gradient(180deg, #373737 0%, #0E001C 100%",
          }}
          className="WAposter"
        >
          <div className="imgComponentContainer">
            <Image1 textcolor={textColor} />
            <Image2 textcolor={textColor} />
            {/* <img className="imgComponent2" src="/Group 177.png" alt="" /> */}
            <Image3 textcolor={textColor} />
            {/* <img className="imgComponent3" src="/Group 147.png" alt="" /> */}
          </div>
          <div style={{ marginRight: "80px" }}>
            <Image4 textcolor={textColor} />
            {/* <img className="imgComponent4" src="/Group 152.png" alt="" /> */}
          </div>
          <h2 style={{ color: textColor }} className="event_type">
            {eventType}
          </h2>
          <h1 style={{ color: textColor }}>{eventName}</h1>
          <div className="date_time">
            <div className="date_container">
              <div
                style={{ background: color1 || "#ff5c5c", color: TextColor1 }}
                id="Month"
              >
                {getMonthName(selectedDate)}
              </div>
              <div
                style={{ background: color2 || "#121212", color: TextColor2 }}
                id="date"
              >
                {selectedDate.getDate()}
              </div>
            </div>
            <div className="time_container">
              <div style={{ color: textColor }} className="day">
                {getDayName(selectedDate)}
              </div>
              <div style={{ color: textColor }} className="time">
                {startTime} to {endTime}
              </div>
            </div>
          </div>
          <div
            style={{ background: color1 || "#ff5c5c" }}
            className="few_seats"
          >
            <Image5 textcolor={TextColor1} />
            {/* <img style={{color:textColor}} className="imgComponent5" src="/mdi_hot.png" alt="" /> */}

            <div style={{ marginLeft: "50px", color: TextColor1 }}>
              ONLY FEW SEATS AVAILABLE
            </div>
          </div>
          <div className="speaker_container">
            <div className="image_container">
              <img src={imageUrl} alt="" />
            </div>

            <h6 style={{ color: textColor }}>SPEAKER</h6>
            <h3 style={{ color: textColor }}>{speakerName}</h3>
            <h4 style={{ color: textColor }}>{speakerRole}</h4>
          </div>
        </div>
      );
      const IgposterContent = (
        <div
          style={{
            background:
              selectedColor ||
              "linear-gradient(180deg, #373737 0%, #0E001C 100%)",
          }}
          className="Igposter"
        >
          <div className="imgComponentContainer">
            {/* <img className="imgComponent1" src="/Group 151.png" alt="" /> */}
            <Image1 textcolor={textColor} />
            {/* <img className="imgComponent2" src="/Group 177.png" alt="" /> */}
            <Image2 textcolor={textColor} />
            {/* <img className="imgComponent3" src="/Group 147.png" alt="" /> */}
            <Image3 textcolor={textColor} />
          </div>
          <div style={{ marginRight: "80px" }}>
            {/* <img className="imgComponent4" src="/Group 152.png" alt="" /> */}
            <Image4 textcolor={textColor} />
          </div>
          <h2 style={{ color: textColor }} className="event_type">
            {eventType}
          </h2>
          <h1 style={{ color: textColor }}>{eventName}</h1>
          <div className="date_time">
            <div className="date_container">
              <div
                style={{ background: color1 || "#ff5c5c", color: TextColor1 }}
                id="Month"
              >
                {getMonthName(selectedDate)}
              </div>
              <div
                style={{ background: color2 || "#121212", color: TextColor2 }}
                id="date"
              >
                {selectedDate.getDate()}
              </div>
            </div>
            <div className="time_container">
              <div style={{ color: textColor }} className="day">
                {getDayName(selectedDate)}
              </div>
              <div style={{ color: textColor }} className="time">
                {startTime} to {endTime}
              </div>
            </div>
          </div>
          <div
            style={{ background: color1 || "#ff5c5c" }}
            className="few_seats"
          >
            <Image5 textcolor={TextColor1} />
            {/* <img className="imgComponent5" src="/mdi_hot.png" alt="" /> */}

            <div style={{ marginLeft: "50px", color: TextColor1 }}>
              ONLY FEW SEATS AVAILABLE
            </div>
          </div>
          <div className="speaker_container">
            <div className="image_container">
              <img src={imageUrl} alt="" />
            </div>

            <h6 style={{ color: textColor }}>SPEAKER</h6>
            <h3 style={{ color: textColor }}>{speakerName}</h3>
            <h4 style={{ color: textColor }}> {speakerRole}</h4>
          </div>
        </div>
      );
      const WA_mssg_posterContent = (
        <div
          style={{
            background:
              selectedColor ||
              "linear-gradient(180deg, #373737 0%, #0E001C 100%)",
          }}
          className="WAmssg"
        >
          <div className="imgComponentContainer">
            {/* <img className="imgComponent1" src="/Group 151.png" alt="" /> */}
            <Image1 textcolor={textColor} />
            {/* <img className="imgComponent2" src="/Group 177.png" alt="" /> */}
            <Image2 textcolor={textColor} />
            {/* <img className="imgComponent3" src="/Group 151.png" alt="" /> */}
            <div className="imgComponent3">
              <Image1 textcolor={textColor} />
            </div>
          </div>
          <div style={{ marginRight: "80px" }}>
            {/* <img className="imgComponent4" src="/Group 152.png" alt="" /> */}
            <Image4 textcolor={textColor} />
          </div>
          <h2 style={{ color: textColor }} className="event_type">
            {eventType}
          </h2>
          <h1 style={{ color: textColor }}>{eventName}</h1>
          <div
            style={{ background: color1 || "#ff5c5c" }}
            className="few_seats"
          >
            {/* <img className="imgComponent5" src="/mdi_hot.png" alt="" /> */}
            <Image5 textcolor={TextColor1} />

            <div style={{ marginLeft: "30px", color: TextColor1 }}>
              ONLY FEW SEATS AVAILABLE
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="date_time">
              <div className="date_container">
                <div
                  style={{ background: color1 || "#ff5c5c", color: TextColor1 }}
                  id="Month"
                >
                  {getMonthName(selectedDate)}
                </div>
                <div
                  style={{ background: color2 || "#121212", color: TextColor2 }}
                  id="date"
                >
                  {selectedDate.getDate()}
                </div>
              </div>
              <div className="time_container">
                <div style={{ color: textColor }} className="day">
                  {getDayName(selectedDate)}
                </div>
                <div style={{ color: textColor }} className="time">
                  {startTime} to {endTime}
                </div>
              </div>
            </div>

            <div className="speaker_container">
              <div className="image_container">
                <img src={imageUrl} alt="" />
              </div>

              <h6 style={{ color: textColor }}>SPEAKER</h6>
              <h3 style={{ color: textColor }}>{speakerName}</h3>
              <h4 style={{ color: textColor }}>{speakerRole}</h4>
            </div>
          </div>
        </div>
      );
      const Linkedin_posterContent = (
        <div
          style={{
            background:
              selectedColor ||
              "linear-gradient(180deg, #373737 0%, #0E001C 100%)",
          }}
          className="Linkedin"
        >
          <div className="imgComponentContainer">
            {/* <img className="imgComponent1" src="/Group 151.png" alt="" /> */}
            <Image1 textcolor={textColor} />
            {/* <img className="imgComponent2" src="/Group 177.png" alt="" /> */}
            <Image2 textcolor={textColor} />
            {/* <img className="imgComponent3" src="/Group 151.png" alt="" /> */}
            <div className="imgComponent3">
              <Image1 textcolor={textColor} />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ marginRight: "80px" }}>
                {/* <img className="imgComponent4" src="/Group 152.png" alt="" /> */}
                <Image4 textcolor={textColor} />
              </div>
              <h2 style={{ color: textColor }} className="event_type">
                {eventType}
              </h2>
              <h1 style={{ color: textColor }}>{eventName}</h1>
              <div
                style={{ background: color1 || "#ff5c5c" }}
                className="few_seats"
              >
                {/* <img className="imgComponent5" src="/mdi_hot.png" alt="" /> */}
                <Image5 textcolor={TextColor1} />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "50px",
                    color: TextColor1,
                  }}
                >
                  ONLY FEW SEATS AVAILABLE
                </div>
              </div>
            </div>
            <div style={{ display: "block", marginRight: "70px" }}>
              <div className="date_time">
                <div className="time_container">
                  <div style={{ color: textColor }} className="day">
                    {getDayName(selectedDate)}
                  </div>
                  <div style={{ color: textColor }} className="time">
                    {startTime} to {endTime}
                  </div>
                </div>
                <div className="date_container">
                  <div
                    style={{
                      background: color1 || "#ff5c5c",
                      color: TextColor1,
                    }}
                    id="Month"
                  >
                    {getMonthName(selectedDate)}
                  </div>
                  <div
                    style={{
                      background: color2 || "#121212",
                      color: TextColor2,
                    }}
                    id="date"
                  >
                    {selectedDate.getDate()}
                  </div>
                </div>
              </div>

              <div className="speaker_container">
                <div className="image_container">
                  <img src={imageUrl} alt="" />
                </div>

                <h6 style={{ color: textColor }}>SPEAKER</h6>
                <h3 style={{ color: textColor }}>{speakerName}</h3>
                <h4 style={{ color: textColor }}>{speakerRole}</h4>
              </div>
            </div>
          </div>
        </div>
      );
      const Ig_mssg_posterContent = (
        <div
          style={{
            background:
              selectedColor ||
              "linear-gradient(180deg, #373737 0%, #0E001C 100%)",
          }}
          className="Igmssg"
        >
          <div className="imgComponentContainer">
            {/* <img className="imgComponent1" src="/Group 151.png" alt="" /> */}
            <Image1 textcolor={textColor} />
            {/* <img className="imgComponent2" src="/Group 177.png" alt="" /> */}
            <Image2 textcolor={textColor} />
            {/* <img className="imgComponent3" src="/Group 151.png" alt="" /> */}
            <div className="imgComponent3">
              <Image2 textcolor={textColor} />
            </div>
          </div>
          <div style={{ marginRight: "80px" }}>
            {/* <img className="imgComponent4" src="/Group 152.png" alt="" /> */}
            <Image4 textcolor={textColor} />
          </div>
          <h2 style={{ color: textColor }} className="event_type">
            {eventType}
          </h2>
          <h1 style={{ color: textColor }}>{eventName}</h1>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
            <div className="date_time">
              <div className="date_container">
                <div
                  style={{ background: color1 || "#ff5c5c", color: TextColor1 }}
                  id="Month"
                >
                  {getMonthName(selectedDate)}
                </div>
                <div
                  style={{ background: color2 || "#121212", color: TextColor2 }}
                  id="date"
                >
                  {selectedDate.getDate()}
                </div>
              </div>
              <div className="time_container">
                <div style={{ color: textColor }} className="day">
                  {getDayName(selectedDate)}
                </div>
                <div style={{ color: textColor }} className="time">
                  {startTime} to {endTime}
                </div>
              </div>
            </div>
            <div
              style={{ background: color1 || "#ff5c5c" }}
              className="few_seats"
            >
              {/* <img className="imgComponent5" src="/mdi_hot.png" alt="" /> */}
              <Image5 textcolor={TextColor1} />

              <div style={{ marginLeft: "30px", color: TextColor1 }}>
                ONLY FEW SEATS AVAILABLE
              </div>
            </div>
            </div>

            <div className="speaker_container">
              <div className="image_container">
                <img src={imageUrl} alt="" />
              </div>

              <h6 style={{ color: textColor }}>SPEAKER</h6>
              <h3 style={{ color: textColor }}>{speakerName}</h3>
              <h4 style={{ color: textColor }}>{speakerRole}</h4>
            </div>
          </div>
        </div>
      );
      const posterContents = [
        WAposterContent,
        IgposterContent,
        WA_mssg_posterContent,
        Linkedin_posterContent,
        Ig_mssg_posterContent,
        
      ];
      setUploadingImage(true);
      // Map through each poster content and render them all
      const imageContainer = imageContainerRef.current;
      imageContainer.innerHTML = "";
      for (let i = 0; i < posterContents.length; i++) {
        const content = posterContents[i];

        const rowContainer = document.createElement("div");
        rowContainer.className = "imageRow"; // Apply a class for styling if needed

        const tempDiv = document.createElement("div");
        const root = createRoot(posterRef.current);
        root.render(content);

        // Wait for rendering to complete
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Convert the rendered content to an image
        const dataURL = await htmlToImage.toPng(posterRef.current);

        // Create an image element for each poster
        const image = new Image();
        image.onload = () => {
          if (imageContainer) {
            // Create a container for each image and download button
            const imageButtonContainer = document.createElement("div");
            imageButtonContainer.className = "imageButtonContainer"; // Apply a class for styling if needed

            // Append the image to the container
            imageButtonContainer.appendChild(image);

            // Create download button
            const downloadButton = document.createElement("button");
            downloadButton.innerText = "Download";
            downloadButton.onclick = () => {
              // Use downloadjs to trigger the download
              download(dataURL, `poster_${i}.png`, "image/png");
            };

            // Append the download button to the container
            imageButtonContainer.appendChild(downloadButton);

            // Append the container to the row container
            rowContainer.appendChild(imageButtonContainer);
          }
        };
        // Set the image source
        image.src = dataURL;

        // Clean up: Remove the rendered content from the container
        root.unmount();

        // Append the row container to the main image container
        imageContainer.appendChild(rowContainer);
      }
      setShowColorButtons(true);
      setUploadingImage(false);
    } catch (error) {
      setUploadingImage(false);
      console.error("Error generating poster:", error);
    }
  };
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    setUploadingImage(true);
    formData.append("file", file);
    formData.append("upload_preset", "AnchorsSpeakers");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setUploadingImage(false);
        const data = await response.json();
        return data.secure_url; // Retrieve the uploaded image URL
      } else {
        setUploadingImage(false);
        throw new Error("Image upload failed");
      }
    } catch (error) {
      setUploadingImage(false);
      console.error("Error uploading image to Cloudinary:", error);
      return null;
    }
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setUploadingImage(true);
    const imageUrl = await uploadImageToCloudinary(file);
    setSelectedFile(imageUrl);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    generatePoster(
      selectedColor,
      TextColor,
      color1,
      color2,
      TextColor1,
      TextColor2
    );
  };

  return (
    <>
      <div className="PosterForm">
        <h1>Enter Poster Details</h1>
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="posterType">Select Poster Type</label>
        <select
          name="posterType"
          id="posterType"
          value={posterType}
          onChange={(e) => setPosterType(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Wttp_Story">WhatsApp Story</option>
          <option value="IG_Story">Instagram Story</option>
          <option value="Wttp_mssg">Whatsapp Message</option>
          <option value="Linkedin">Linkedin Post</option>
        </select> */}
          <label htmlFor="eventType">Select Event Type</label>
          <select
            name="eventType"
            id="eventType"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="">Select</option>
            <option value="WEBINAR">WEBINAR</option>
          </select>
          <label htmlFor="eventName">Event Name</label>
          <input
            id="eventName"
            placeholder="Event Name"
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <label htmlFor="datepicker">Select date</label>
          <DatePicker
            id="datepicker"
            placeholderText="dd/MM/yyyy"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
          />
          <div style={{ display: "flex", margin: "10px 0" }}>
            <label style={{ marginRight: "10px" }} htmlFor="starttime">
              Start Time
            </label>
            <input
              type="time"
              id="starttime"
              onChange={(e) => setStartTime(e.target.value)}
              value={startTime}
              placeholder="HH:MM"
            ></input>
            <label
              style={{ marginLeft: "30px", marginRight: "10px" }}
              htmlFor="endtime"
            >
              End Time
            </label>
            <input
              type="time"
              id="endtime"
              onChange={(e) => setEndTime(e.target.value)}
              value={endTime}
            ></input>
          </div>
          <label htmlFor="speakerName">Speaker Name</label>
          <input
            id="speakerName"
            placeholder="Speaker Name"
            type="text"
            value={speakerName}
            onChange={(e) => setSpeakerName(e.target.value)}
          />
          <div style={{ margin: "10px 0" }}>
            <label style={{ marginRight: "20px" }} htmlFor="image">
              Upload Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <label htmlFor="speakerjob">Speaker Designation</label>
          <input
            id="speakerjob"
            placeholder="e.g. Co-founder, Linkedin 24x7"
            type="text"
            value={speakerRole}
            onChange={(e) => setSpeakerRole(e.target.value)}
          />
          <button type="submit">Generate Posters</button>
        </form>
        <div className="imageContainer" ref={imageContainerRef}></div>
        {uploadingImage && (
          <div className="modal">
            <Loader />
            {/* <button onClick={closeModal}>Close</button> */}
          </div>
        )}
        <div
          className="color_selection"
          style={{ display: showColorButtons ? "flex" : "none" }}
        >
          <div className="colorButtons">
            <label htmlFor="colorPicker">Select Background Color:</label>
            {/* <SketchPicker
        color={selectedColor||"linear-gradient(180deg, #373737 0%, #0E001C 100%)"}
        onChange={(color) => handleColorChange(color)}/> */}
            <input
              type="color"
              id="colorPicker"
              value={
                selectedColor ||
                "linear-gradient(180deg, #373737 0%, #0E001C 100%);"
              } // Set default color here if needed
              onChange={(e) => handleColorChange(e.target.value)}
            />
            <label htmlFor="colorPicker1">Select Flag Color:</label>
            <input
              type="color"
              id="colorPicker1"
              value={color1 || "#ff5c5c"} // Set default color here if needed
              onChange={(e) => handleColorChange1(e.target.value)}
            />
            <label htmlFor="colorPicker2">Select Flag Color:</label>
            <input
              type="color"
              id="colorPicker2"
              value={color2 || "#121212"} // Set default color here if needed
              onChange={(e) => handleColorChange2(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div ref={posterRef}></div>
    </>
  );
};

export default PosterGenerator;
