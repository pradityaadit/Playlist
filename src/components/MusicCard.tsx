import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, X, Music } from "lucide-react";
import { MusicTrack, LyricLine } from "../types";

interface MusicCardProps {
  track: MusicTrack;
  onPlay: (track: MusicTrack) => void;
  isPlaying?: boolean;
  currentTrackId?: string;
  currentTime?: number;
}

const MusicCard: React.FC<MusicCardProps> = ({
  track,
  onPlay,
  isPlaying = false,
  currentTrackId,
  currentTime = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentLyric, setCurrentLyric] = useState<LyricLine | null>(null);
  const isCurrentTrack = currentTrackId === track.id;

  useEffect(() => {
    if (isCurrentTrack && isPlaying) {
      const currentIndex = track.lyrics.findIndex(
        (lyric, index) =>
          currentTime >= lyric.time &&
          (!track.lyrics[index + 1] ||
            currentTime < track.lyrics[index + 1].time)
      );

      if (currentIndex !== -1) {
        setCurrentLyric(track.lyrics[currentIndex]);
      } else {
        setCurrentLyric(null);
      }
    } else {
      setCurrentLyric(null);
    }
  }, [currentTime, isCurrentTrack, isPlaying, track.lyrics]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      layoutId={`music-card-${track.id}`}
      className={`bg-secondary-900/80 backdrop-blur-sm rounded-lg overflow-hidden ${
        isExpanded ? "absolute inset-4 z-40 md:w-auto md:h-auto" : "h-full"
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {!isExpanded ? (
        // Collapsed view
        <div className="h-full flex flex-col">
          <div className="relative aspect-square overflow-hidden group">
            <img
              src={track.cover}
              alt={track.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
              <motion.button
                onClick={() => onPlay(track)}
                className="w-14 h-14 rounded-full bg-gold-500 text-secondary-950 flex items-center justify-center shadow-lg transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isCurrentTrack && isPlaying ? (
                  <Pause size={24} />
                ) : (
                  <Play size={24} className="ml-1" />
                )}
              </motion.button>
              <motion.button
                onClick={toggleExpand}
                className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Music size={20} />
              </motion.button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 text-xs rounded-full bg-gold-500/20 text-gold-400 font-medium">
                  {track.genre}
                </span>
                <span className="text-white/60 text-xs">{track.year}</span>
              </div>
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-medium text-white mb-1 line-clamp-1">
              {track.title}
            </h3>
            <p className="text-white/70 text-sm mb-2 line-clamp-1">
              {track.artist}
            </p>
            {isCurrentTrack && currentLyric && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-gold-400 text-sm mt-auto font-medium"
              >
                {currentLyric.text}
              </motion.p>
            )}
          </div>
        </div>
      ) : (
        // Expanded view
        <motion.div
          className="h-full overflow-y-auto relative bg-secondary-900 flex flex-col md:flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            onClick={toggleExpand}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary-800/80 text-white/80 flex items-center justify-center z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={16} />
          </motion.button>

          <div className="md:w-1/3 p-6">
            <div className="rounded-lg overflow-hidden shadow-xl mb-4 relative group">
              <img
                src={track.cover}
                alt={track.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <motion.button
                  onClick={() => onPlay(track)}
                  className="w-16 h-16 rounded-full bg-gold-500 text-secondary-950 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isCurrentTrack && isPlaying ? (
                    <Pause size={28} />
                  ) : (
                    <Play size={28} className="ml-1" />
                  )}
                </motion.button>
              </div>
            </div>
            <div className="bg-secondary-800/50 rounded-md p-4">
              <h4 className="text-white/80 text-xs uppercase tracking-wider mb-3">
                Track Info
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Artist</span>
                  <span className="text-white font-medium">{track.artist}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Genre</span>
                  <span className="text-gold-400">{track.genre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Year</span>
                  <span className="text-white/90">{track.year}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-2/3 p-6">
            <h2 className="font-serif text-2xl md:text-3xl text-white mb-2">
              {track.title}
            </h2>
            <p className="text-gold-400 text-lg mb-6">{track.artist}</p>

            <div className="mb-8">
              <h3 className="text-white/90 font-medium mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400">
                  <Music size={16} />
                </span>
                Musical Philosophy
              </h3>
              <div className="bg-secondary-800/30 backdrop-blur-sm rounded-md p-5 border border-secondary-800">
                <p className="text-white/80 leading-relaxed">
                  {track.philosophy}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-white/90 font-medium mb-4">Lyrics</h3>
              <div className="space-y-3">
                {track.lyrics.map((line, index) => (
                  <motion.p
                    key={index}
                    className={`text-lg transition-colors duration-300 ${
                      isCurrentTrack && currentLyric?.time === line.time
                        ? "text-gold-400 font-medium"
                        : "text-white/60"
                    }`}
                  >
                    {line.text}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MusicCard;
