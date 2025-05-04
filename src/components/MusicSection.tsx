import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MusicCard from "./MusicCard";
import { tracks } from "../data/tracks";
import { MusicTrack } from "../types";
import { Filter } from "lucide-react";

interface MusicSectionProps {
  onPlayTrack: (track: MusicTrack) => void;
  currentTrackId?: string;
  isPlaying?: boolean;
  currentTime?: number;
}

const MusicSection: React.FC<MusicSectionProps> = ({
  onPlayTrack,
  currentTrackId,
  isPlaying,
  currentTime,
}) => {
  const [filteredTracks, setFilteredTracks] = useState(tracks);
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique genres
  const genres = Array.from(new Set(tracks.map((track) => track.genre)));

  useEffect(() => {
    let result = tracks;

    // Apply genre filter
    if (activeGenre) {
      result = result.filter((track) => track.genre === activeGenre);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (track) =>
          track.title.toLowerCase().includes(query) ||
          track.artist.toLowerCase().includes(query) ||
          track.genre.toLowerCase().includes(query)
      );
    }

    setFilteredTracks(result);
  }, [activeGenre, searchQuery]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-950 to-secondary-900 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className="font-serif text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Discover <span className="text-gold-400">Music</span>
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-gold-500 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
          ></motion.div>
          <motion.p
            className="text-white/80 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Explore our curated collection of music across various genres. Click
            on a track to learn more about its philosophy or play it instantly.
          </motion.p>
        </motion.div>

        {/* Search and filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title, artist or genre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-secondary-800/50 border border-secondary-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-400/50"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50">
                  ⌕
                </span>
              </div>
            </div>

            <div className="relative w-full md:w-auto">
              <motion.button
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                className="flex items-center justify-between w-full md:w-auto space-x-2 bg-secondary-800/50 border border-secondary-800 text-white rounded-md px-4 py-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Filter size={16} />
                <span>{activeGenre || "All Genres"}</span>
                <span className="ml-2">{isFilterMenuOpen ? "▲" : "▼"}</span>
              </motion.button>

              <AnimatePresence>
                {isFilterMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-20 mt-2 w-full bg-secondary-900 border border-secondary-800 rounded-md shadow-lg overflow-hidden"
                  >
                    <motion.button
                      onClick={() => {
                        setActiveGenre(null);
                        setIsFilterMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        !activeGenre
                          ? "bg-gold-400/10 text-gold-400"
                          : "text-white/90 hover:bg-secondary-800"
                      }`}
                      whileHover={{ backgroundColor: "rgba(218,165,32,0.1)" }}
                    >
                      All Genres
                    </motion.button>

                    {genres.map((genre) => (
                      <motion.button
                        key={genre}
                        onClick={() => {
                          setActiveGenre(genre);
                          setIsFilterMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          activeGenre === genre
                            ? "bg-gold-400/10 text-gold-400"
                            : "text-white/90 hover:bg-secondary-800"
                        }`}
                        whileHover={{ backgroundColor: "rgba(218,165,32,0.1)" }}
                      >
                        {genre}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Music grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {filteredTracks.length > 0 ? (
            filteredTracks.map((track) => (
              <MusicCard
                key={track.id}
                track={track}
                onPlay={onPlayTrack}
                isPlaying={isPlaying && currentTrackId === track.id}
                currentTrackId={currentTrackId}
                currentTime={currentTime}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-white/70 text-lg mb-4">
                  No tracks found matching your criteria
                </p>
                <button
                  onClick={() => {
                    setActiveGenre(null);
                    setSearchQuery("");
                  }}
                  className="text-gold-400 hover:text-gold-300 underline"
                >
                  Clear filters
                </button>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MusicSection;
