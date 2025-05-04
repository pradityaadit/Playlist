import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Volume1,
  VolumeX,
} from "lucide-react";
import { MusicTrack } from "../types";

interface MusicPlayerProps {
  track: MusicTrack | null;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  onClose: () => void;
  onTimeUpdate: (time: number) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  track,
  isPlaying,
  setIsPlaying,
  onClose,
  onTimeUpdate,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const previousVolume = useRef(volume);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, track, setIsPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime;
      setCurrentTime(time);
      setDuration(audioRef.current.duration);
      onTimeUpdate(time);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume.current);
      setIsMuted(false);
    } else {
      previousVolume.current = volume;
      setVolume(0);
      setIsMuted(true);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const VolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={18} />;
    if (volume < 0.5) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };

  if (!track) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-secondary-950/95 backdrop-blur-md border-t border-secondary-800 ${
          isMinimized ? "h-16" : "md:h-24 h-auto"
        }`}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <audio
          ref={audioRef}
          src={track.audioSrc}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onLoadedMetadata={handleTimeUpdate}
        />

        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-16 md:h-full">
            {/* Track info */}
            <div className="flex items-center">
              <img
                src={track.cover}
                alt={track.title}
                className="w-12 h-12 rounded-md object-cover"
              />
              <div className="ml-3  xs:block">
                <h4 className="text-white font-medium text-sm">
                  {track.title}
                </h4>
                <p className="text-white/60 text-xs">{track.artist}</p>
              </div>
            </div>

            {/* Player controls */}
            <div className="flex items-center space-x-3">
              <motion.button
                className="text-white/70 hover:text-white hidden md:block"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SkipBack size={20} />
              </motion.button>

              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center text-secondary-950"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? (
                  <Pause size={20} />
                ) : (
                  <Play size={20} className="ml-1" />
                )}
              </motion.button>

              <motion.button
                className="text-white/70 hover:text-white hidden md:block"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SkipForward size={20} />
              </motion.button>
            </div>

            {/* Progress and volume (expanded view) */}
            {!isMinimized && (
              <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
                <span className="text-white/70 text-xs mr-2">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeekChange}
                  className="flex-1 h-1 bg-secondary-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold-500"
                />
                <span className="text-white/70 text-xs ml-2">
                  {formatTime(duration)}
                </span>
              </div>
            )}

            {/* Volume control */}
            <div className="hidden md:flex items-center space-x-2">
              <motion.button
                onClick={toggleMute}
                className="text-white/70 hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <VolumeIcon />
              </motion.button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-secondary-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold-500"
              />
            </div>

            {/* Minimize/expand button */}
            <motion.button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white/70 hover:text-white transform rotate-90 hidden md:block"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMinimized ? "›" : "‹"}
            </motion.button>

            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="text-white/70 hover:text-white text-sm md:ml-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>
          </div>

          {/* Mobile progress bar */}
          {!isMinimized && (
            <div className="md:hidden pt-1 pb-4">
              <div className="flex items-center mb-1">
                <span className="text-white/70 text-xs">
                  {formatTime(currentTime)}
                </span>
                <span className="flex-1"></span>
                <span className="text-white/70 text-xs">
                  {formatTime(duration)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeekChange}
                className="w-full h-1 bg-secondary-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold-500"
              />
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MusicPlayer;
