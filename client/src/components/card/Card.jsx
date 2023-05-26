import "./card.css";
import { motion } from "framer-motion";

export const Card = ({ img, delay }) => {
  return (
    <motion.div
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: "0", opacity: 1 }}
      transition={{ delay }}
      className="card"
    >
      <img src={img} alt="" />
    </motion.div>
  );
};
