import { animate } from "framer-motion";
import React, { useEffect, useState } from "react";

interface RampingCounterProps {
  to: number;
  from: number;
  duration?: number;
}
export const RampingCounter: React.FC<RampingCounterProps> = ({
  from,
  to,
  duration = 1,
  children,
}) => {
  const [value, setValue] = useState(from);
  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        setValue(+value.toFixed(0));
      },
    });
    return () => controls.stop();
  }, [from, to]);

  return (
    <div>
      {value}
      {children}
    </div>
  );
};
