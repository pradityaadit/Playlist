import React from "react";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

interface HeroSectionProps {
  setCurrentSection: (section: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ setCurrentSection }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-secondary-950 to-secondary-900 overflow-hidden flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(138,93,214,0.15),transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(218,165,32,0.1),transparent_40%)]"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.h1
              className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Dari Ku <span className="text-gold-400">Untuk Mu</span> Yang tak
              terucap
            </motion.h1>
            <motion.p
              className="text-white/80 text-lg mb-8 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Kadang, yang paling tulus justru nggak pernah diucap. Hanya
              diputar, didengar, dan diam-diam… ditujukan.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.button
                onClick={() => setCurrentSection("music")}
                className="bg-gold-600 hover:bg-gold-500 text-secondary-950 font-medium px-8 py-3 rounded-md flex items-center justify-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlayCircle size={20} className="group-hover:animate-pulse" />
                Explore Music
              </motion.button>
              <motion.button
                onClick={() => setCurrentSection("about")}
                className="border border-white/20 hover:border-gold-400 text-white hover:text-gold-400 font-medium px-8 py-3 rounded-md transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                About Us
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <motion.div
              className="aspect-square relative z-10 rounded-full overflow-hidden border-8 border-gold-400/20 shadow-2xl"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
              <img
                src="https://images.pexels.com/photos/1021876/pexels-photo-1021876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Vinyl record"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gold-400 z-20"
              animate={{
                boxShadow: [
                  "0 0 20px 5px rgba(218,165,32,0.3)",
                  "0 0 30px 10px rgba(218,165,32,0.5)",
                  "0 0 20px 5px rgba(218,165,32,0.3)",
                ],
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            ></motion.div>

            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 bg-primary-600/20 rounded-full blur-3xl"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            ></motion.div>

            <motion.div
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold-400/20 rounded-full blur-3xl"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 1,
              }}
            ></motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <p className="text-white/50 text-sm mb-2">Scroll to explore</p>
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2"
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <motion.div className="w-1.5 h-1.5 bg-gold-400 rounded-full"></motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
