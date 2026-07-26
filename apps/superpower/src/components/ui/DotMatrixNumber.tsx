
import { motion } from 'framer-motion';

const DIGIT_MAP: Record<string, number[][]> = {
  '0': [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  '1': [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  '2': [
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
  ],
  '3': [
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  '4': [
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  '5': [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  '6': [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  '7': [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 1, 0],
    [0, 1, 0],
  ],
  '8': [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  '9': [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  '-': [
    [0, 0, 0],
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
    [0, 0, 0],
  ],
  '.': [
    [0],
    [0],
    [0],
    [0],
    [1],
  ],
};

interface DotMatrixNumberProps {
  value: string | number;
  className?: string;
  dotSize?: number;
  gap?: number;
  color?: string;
  inactiveColor?: string;
  pulse?: boolean;
}

export default function DotMatrixNumber({
  value,
  className = '',
  dotSize = 3,
  gap = 2,
  color = 'currentColor',
  inactiveColor = 'transparent',
  pulse = false,
}: DotMatrixNumberProps) {
  const strValue = String(value);
  const rows = 5;

  return (
    <motion.div
      key={strValue} // Re-trigger assemble animation on value change
      initial="hidden"
      animate="visible"
      className={`flex items-end ${className}`}
      style={{ gap: gap * 2 }}
    >
      {strValue.split('').map((char, charIndex) => {
        const matrix = DIGIT_MAP[char];
        if (!matrix) return null;

        const cols = matrix[0].length;
        const width = cols * dotSize + (cols - 1) * gap;
        const height = rows * dotSize + (rows - 1) * gap;

        return (
          <motion.svg
            key={`${char}-${charIndex}`}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className="overflow-visible"
            animate={pulse ? {
              scale: [1, 1.05, 1],
              opacity: [1, 0.8, 1]
            } : undefined}
            transition={pulse ? {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            } : undefined}
          >
            {matrix.map((row, rIdx) =>
              row.map((isOn, cIdx) => {
                if (!isOn && inactiveColor === 'transparent') return null;

                const randomOffsetX = (Math.random() - 0.5) * 20;
                const randomOffsetY = (Math.random() - 0.5) * 20;

                return (
                  <motion.circle
                    key={`${rIdx}-${cIdx}`}
                    cx={cIdx * (dotSize + gap) + dotSize / 2}
                    cy={rIdx * (dotSize + gap) + dotSize / 2}
                    r={dotSize / 2}
                    fill={isOn ? color : inactiveColor}
                    variants={{
                      hidden: { 
                        opacity: 0, 
                        x: isOn ? randomOffsetX : 0, 
                        y: isOn ? randomOffsetY : 0,
                        scale: 0 
                      },
                      visible: { 
                        opacity: 1, 
                        x: 0, 
                        y: 0,
                        scale: 1,
                        transition: {
                          type: "spring",
                          damping: 12,
                          stiffness: 150,
                          delay: charIndex * 0.05 + (rIdx * cols + cIdx) * 0.005,
                        }
                      }
                    }}
                  />
                );
              })
            )}
          </motion.svg>
        );
      })}
    </motion.div>
  );
}
