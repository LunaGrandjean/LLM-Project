import React from 'react';
import bgVideo from './home-video.mp4';
import './App.css';           // make sure App.css is bundled

export default function HomePage() {
  console.log('Video URL:', bgVideo);  // check that webpack is resolving it
  return (
    <>
      <div className="full-screen-video">
        <video
          className="full-screen-video__media"
          autoPlay
          muted
          loop
          playsInline
          controls            // <-- show controls so you can test playback
        >
          <source src={bgVideo} type="video/mp4" />
          Your browser doesn’t support HTML5 video.
        </video>
      </div>

      <div className="video-content">
        <h1>Welcome to Griffith AI</h1>
        <p>Your virtual guide to Griffith College information.</p>
        <button className="home-btn">
          Get Started
        </button>
      </div>
    </>
  );
}
