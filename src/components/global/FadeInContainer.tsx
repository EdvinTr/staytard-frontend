import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";
interface FadeInContainerProps extends HTMLMotionProps<"div"> {
  /**
   * @param duration Default 0.7s
   *  */
  duration?: number;
}

export const FadeInContainer: React.FC<FadeInContainerProps> = ({
  children,
  duration = 0.7,
  ...props
}) => {
  return (
    <motion.div
      {...props}
      animate={{ opacity: [0, 1] }}
      transition={{
        duration,
      }}
    >
      {children}
    </motion.div>
  );
};
