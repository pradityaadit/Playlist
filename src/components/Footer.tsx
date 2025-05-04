import React from "react";
import { motion } from "framer-motion";
import { Instagram, Twitter, Facebook, Youtube, Mail } from "lucide-react";

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: <Instagram size={20} />, url: "#", label: "Instagram" },
    { icon: <Twitter size={20} />, url: "#", label: "Twitter" },
    { icon: <Facebook size={20} />, url: "#", label: "Facebook" },
    { icon: <Youtube size={20} />, url: "#", label: "Youtube" },
  ];

  const footerLinks = [
    { label: "Privacy Policy", url: "#" },
    { label: "Terms of Service", url: "#" },
    { label: "Contact Us", url: "#" },
    { label: "FAQ", url: "#" },
  ];

  return (
    <footer className="bg-secondary-950 text-white/80 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <motion.h3
              className="text-gold-400 font-serif text-2xl font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Harmonia
            </motion.h3>
            <motion.p
              className="text-sm mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Experience the perfect harmony of sound and emotion. Discover new
              music and immerse yourself in the philosophy behind each
              composition.
            </motion.p>
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  aria-label={link.label}
                  className="text-white/70 hover:text-gold-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          <div>
            <motion.h4
              className="text-white font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Quick Links
            </motion.h4>
            <motion.ul
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.url}
                    className="text-white/70 hover:text-gold-400 transition-colors text-sm"
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </motion.ul>
          </div>

          <div>
            <motion.h4
              className="text-white font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Newsletter
            </motion.h4>
            <motion.p
              className="text-sm mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Subscribe to our newsletter to receive updates on new music and
              events.
            </motion.p>
            <motion.div
              className="flex"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <input
                type="email"
                placeholder="Your email"
                className="bg-secondary-900 border border-secondary-800 text-white/90 px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gold-400 text-sm w-full"
              />
              <motion.button
                className="bg-gold-600 hover:bg-gold-500 text-secondary-950 font-medium px-4 py-2 rounded-r-md flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={16} />
              </motion.button>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="border-t border-secondary-800 pt-6 text-center text-xs text-white/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Made With ❤️ by Me
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
