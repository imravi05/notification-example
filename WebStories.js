import React, { useRef, useEffect } from "react";
import Stories from "react-insta-stories";

const WebStories = () => {
  const audioRef = useRef(null);

  // Reusable story template
  const StoryContent = (image, title, audioSrc) => () => {
    useEffect(() => {
      // Stop old audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      // Play new audio
      const audio = new Audio(audioSrc);
      audioRef.current = audio;
      audio.play();

      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }, [audioSrc]);

    return (
      <div style={storyStyle}>
        <img src={image} alt={title} style={imageStyle} />
        <h2 style={textStyle}>{title}</h2>
      </div>
    );
  };

  // 🎵 10 Stories
  const stories = [
    { content: StoryContent("/images/english.jpg", "English", "/audio/english.mp3") },
    { content: StoryContent("/images/spanish.jpg", "Spanish", "/audio/spanish.mp3") },
    { content: StoryContent("/images/french.jpg", "French", "/audio/french.mp3") },
    { content: StoryContent("/images/german.jpg", "German", "/audio/german.mp3") },
    { content: StoryContent("/images/japanese.jpg", "Japanese", "/audio/japanese.mp3") },
    { content: StoryContent("/images/chinese.jpg", "Chinese", "/audio/chinese.mp3") },
    { content: StoryContent("/images/hindi.jpg", "Hindi", "/audio/hindi.mp3") },
    { content: StoryContent("/images/arabic.jpg", "Arabic", "/audio/arabic.mp3") },
    { content: StoryContent("/images/russian.jpg", "Russian", "/audio/russian.mp3") },
    { content: StoryContent("/images/italian.jpg", "Italian", "/audio/italian.mp3") },
  ];

  return (
    <div style={pageStyle}>
      {/* Header */}
      <header style={headerStyle}>
        <img src="/logo.png" alt="Logo" style={logoStyle} />
        <h1 style={{ marginLeft: "10px" }}>Language Web Stories</h1>
      </header>

      {/* Stories */}
      <main style={mainStyle}>
        <Stories stories={stories} defaultInterval={6000} width="100%" height="100%" />
      </main>

      {/* Footer */}
      <footer style={footerStyle}>
        <p>© 2025 Your Website | Built with ❤️ in React</p>
      </footer>
    </div>
  );
};

/* 🎨 Styles */
const pageStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  padding: "10px 20px",
  background: "#222",
  color: "white",
};

const logoStyle = { height: "40px" };

const mainStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#000",
};

const footerStyle = {
  padding: "10px",
  textAlign: "center",
  background: "#222",
  color: "white",
};

const storyStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "#000",
  height: "100%",
};

const imageStyle = { maxHeight: "70%", width: "auto", objectFit: "contain" };

const textStyle = { color: "white", marginTop: "20px" };

export default WebStories;
