import React from "react";
import { motion } from "framer-motion";
import { Music2, Headphones, Radio, Heart } from "lucide-react";
import about from "../img/about.jpeg";

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: <Music2 size={24} />,
      title: "Curated Selection",
      description:
        "Our team of experts carefully selects each piece of music, ensuring a diverse and high-quality collection.",
    },
    {
      icon: <Headphones size={24} />,
      title: "Superior Sound",
      description:
        "Experience music in crystal clear quality with our high-definition audio streaming technology.",
    },
    {
      icon: <Radio size={24} />,
      title: "Musical Philosophy",
      description:
        "Discover the deeper meaning behind each composition with our detailed philosophical analysis.",
    },
    {
      icon: <Heart size={24} />,
      title: "Personalized Experience",
      description:
        "Our platform adapts to your preferences, creating a unique journey through the world of music.",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-secondary-950 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
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
            About <span className="text-gold-400">Harmonia</span>
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
          ></motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative h-full">
              <div className="aspect-[4/5] rounded-lg overflow-hidden">
                <img
                  src={about}
                  alt="Music producer in studio"
                  className="w-[full] h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute -bottom-6 -right-6 w-48 h-48 bg-gold-400/10 rounded-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              ></motion.div>
              <motion.div
                className="absolute -top-6 -left-6 w-48 h-48 bg-primary-600/10 rounded-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              ></motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col justify-center"
          >
            <h3 className="font-serif text-3xl font-bold text-white mb-6">
              Dari Ku untuk Mu
            </h3>
            <p className="text-white/80 mb-6">
              Ada momen-momen tertentu yang terlalu rumit buat dijelaskan, tapi
              anehnya… bisa dijelaskan lewat lagu. Kadang, ada seseorang yang
              nggak pernah disebut, tapi selalu jadi alasan kenapa satu lagu
              bisa terasa begitu dekat.
            </p>
            <p className="text-white/80 mb-6">
              Setiap lagu di sini dipilih bukan cuma karena enak didengar, tapi
              karena ada rasa yang ikut tertinggal di dalamnya. Rasa yang nggak
              pernah sempat diceritakan. Rasa yang cuma bisa diem-diem dirasain.
            </p>
            <p className="text-white/80">
              Mungkin buat orang lain ini cuma playlist biasa. Tapi buat
              seseorang — entah siapa — ini mungkin cara paling diam buat
              bilang, “Kalau kamu dengerin ini… semoga kamu ngerti
            </p>
            <p className="text-white/80">
              Karena nggak semua perasaan harus dijelaskan. Kadang, cukup
              diperdengarkan. Lewat nada. Lewat lirik. Lewat lagu-lagu yang
              diam-diam nyimpan nama.
            </p>

            <motion.div
              className="mt-8 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="/"
                className="text-gold-400 font-medium flex items-center group"
              >
                Balik ke permukaan
                <svg
                  className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.h3
          className="text-center font-serif text-3xl font-bold text-white mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          What Sets Us Apart
        </motion.h3>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-secondary-900/50 backdrop-blur-sm rounded-lg p-6 border border-secondary-800 hover:border-gold-400/30 transition-colors"
            >
              <div className="w-12 h-12 bg-gold-400/10 rounded-lg flex items-center justify-center text-gold-400 mb-4">
                {feature.icon}
              </div>
              <h4 className="text-white font-medium text-xl mb-2">
                {feature.title}
              </h4>
              <p className="text-white/70 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
