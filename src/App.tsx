import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import MusicSection from "./components/MusicSection";
import MusicPlayer from "./components/MusicPlayer";
import Footer from "./components/Footer";
import { MusicTrack } from "./types";

function App() {
  const [currentSection, setCurrentSection] = useState("home");
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlayTrack = (track: MusicTrack) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const handleClosePlayer = () => {
    setIsPlaying(false);
    setCurrentTrack(null);
    setCurrentTime(0);
  };

  return (
    <div className="bg-secondary-950 min-h-screen">
      <Navbar
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />

      <AnimatePresence mode="wait">
        {currentSection === "home" && (
          <HeroSection setCurrentSection={setCurrentSection} key="home" />
        )}

        {currentSection === "about" && <AboutSection key="about" />}

        {currentSection === "music" && (
          <MusicSection
            onPlayTrack={handlePlayTrack}
            currentTrackId={currentTrack?.id}
            isPlaying={isPlaying}
            currentTime={currentTime}
            key="music"
          />
        )}
      </AnimatePresence>

      <Footer />

      <MusicPlayer
        track={currentTrack}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onTimeUpdate={handleTimeUpdate}
        onClose={handleClosePlayer}
      />
    </div>
  );
}

export default App;
