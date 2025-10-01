import React, { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";
import "./App.css";

function App() {
  const [fired, setFired] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerHeight = window.innerHeight * 0.6;

      if (scrollY > triggerHeight && !fired) {
        launchConfetti();
        setFired(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fired]);

  const launchConfetti = () => {
    const logo = document.querySelector(".google-logo");
    if (!logo) return;

    const rect = logo.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 250,
      spread: 150,
      startVelocity: 100,
      scalar: 1.4,
      origin: { x, y },
      colors: ["#4285F4", "#EA4335", "#FBBC05", "#34A853"],
    });
  };

  const handleOverlayClick = () => {
    const video = videoRef.current;
    if (!video) return;

    video.play();
    setIsPlaying(true);
    setShowOverlay(false);
  };

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="App">
      {/* Intro Section */}
      <section className="section intro">
        {/* Local Video */}
        <div className="intro-video-wrapper">
          {showOverlay && (
            <div className="video-overlay" onClick={handleOverlayClick}>
              <div className="video-overlay-text">▶ Play Video</div>
            </div>
          )}
          <video
            className="intro-video"
            src="/intro-video.mp4"
            ref={videoRef}
            playsInline
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          />
          {!showOverlay && (
            <button
              className="video-toggle-button"
              onClick={toggleVideoPlayback}
            >
              {isPlaying ? "⏸️ Pause Video" : "▶️ Play Video"}
            </button>
          )}
        </div>

        <h1>
          👋 Hi, I'm <span className="highlight-name">Dhairya Sansi</span>!
        </h1>
        <p className="ambassador-line">
          And here's why I'd be a perfect{" "}
          <span className="highlight-role">
            <img
              src="https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png"
              alt="Google Logo"
              className="google-logo"
            />{" "}
            Google Student Ambassador
          </span>{" "}
          🚀
        </p>

        {/* Confetti Button */}
        <div className="confetti-button-container">
          <button onClick={launchConfetti} className="confetti-button">
            🎉 More Confetti
          </button>
          <div className="arrow-text">Press for more confetti ➤</div>
        </div>
      </section>

      {/* Good Things Section */}
      <div className="good-things">
        <div className="strip strip-1 align-left">🌟 I'm a good leader</div>
        <div className="strip strip-2 align-right">🤝 I'm a good collaborator</div>
        <div className="strip strip-3 align-left">
          🗣️ Good at writing, speaking and debating
        </div>
        <div className="strip strip-4 align-right">💪 I'm confident</div>
      </div>

      {/* Final Statement Section */}
      <section className="section closing-line">
        <div className="closing-content">
          <h2 className="closing-title">
            I feel like I have the qualities of being a Student Ambassador here at Manipal University Jaipur.
          </h2>
          <p className="closing-text">
            I've always aspired to work with Google. I've been using Google’s incredible tools like Gemini — in fact, even this very website was built with its help. I’ve proudly represented my college as a student ambassador during major events. I’m confident in my ability to serve as the Google Student Ambassador at Manipal University Jaipur — and even bring something extra to the table. I've done 2 internships till now and gained hands-on experience with software and hardware projects closely integrating artificial intelligence.
          </p>
        </div>
      </section>

      {/* Why Me Section */}
      <section className="section why-me">
        <h2>💡 Why You Should Choose Me</h2>
        <p>
          I'm a tech enthusiast, a leader, and a curious mind who loves helping people grow and learn together. I believe in empowering communities and using technology to solve real-world problems.
        </p>
      </section>

      {/* Contact Section */}
      <section className="section contact">
        <h2>📬 Let’s Connect!</h2>
        <p>
          Email me at <strong>sansidhairya11@gmail.com</strong>
        </p>
      </section>
    </div>
  );
}

export default App;
