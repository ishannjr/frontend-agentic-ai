'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface FemaleAvatarProps {
  isSpeaking?: boolean;
  size?: number;
  className?: string;
}

export function FemaleAvatar({
  isSpeaking = false,
  size = 120,
  className = '',
}: FemaleAvatarProps) {
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    if (isSpeaking) {
      setPulseKey((prev) => prev + 1);
    }
  }, [isSpeaking]);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {isSpeaking && (
        <motion.div
          key={pulseKey}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{
            scale: [1, 1.3, 1.5],
            opacity: [0.6, 0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      )}

      {isSpeaking && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{
            scale: [1, 1.2],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      )}

      <motion.div
        className="relative flex items-center justify-center rounded-full border-4 border-purple-400/30 bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 shadow-2xl"
        style={{ width: size, height: size }}
        animate={
          isSpeaking
            ? {
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 10px 40px rgba(139, 92, 246, 0.5)',
                  '0 15px 50px rgba(99, 102, 241, 0.7)',
                  '0 10px 40px rgba(139, 92, 246, 0.5)',
                ],
              }
            : {
                boxShadow: '0 10px 40px rgba(139, 92, 246, 0.4)',
              }
        }
        transition={{
          duration: 1.5,
          repeat: isSpeaking ? Infinity : 0,
          ease: 'easeInOut',
        }}
      >
        <svg
          width={size * 0.65}
          height={size * 0.65}
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white drop-shadow-lg"
        >
          <circle cx="40" cy="30" r="16" fill="currentColor" />

          <path
            d="M24 25C24 18 28 14 40 14C52 14 56 18 56 25C56 27 55 28 55 28C55 28 52 20 48 18C45 16.5 42 16 40 16C38 16 35 16.5 32 18C28 20 25 28 25 28C25 28 24 27 24 25Z"
            fill="currentColor"
          />

          <path
            d="M16 62C16 54 22 48 28 45C31 43.5 35 42 40 42C45 42 49 43.5 52 45C58 48 64 54 64 62C64 68 62 72 62 72H18C18 72 16 68 16 62Z"
            fill="currentColor"
          />

          <path
            d="M22 30C22 28 23 26 25 26C27 26 28 28 28 32C28 36 27 38 25 38C23 38 22 36 22 32Z"
            fill="currentColor"
          />
          <path
            d="M58 30C58 28 57 26 55 26C53 26 52 28 52 32C52 36 53 38 55 38C57 38 58 36 58 32Z"
            fill="currentColor"
          />

          <motion.ellipse
            cx="33"
            cy="28"
            rx="2.5"
            ry="3"
            fill="#1e1b4b"
            animate={isSpeaking ? { scaleY: [1, 0.3, 1] } : {}}
            transition={{ duration: 0.2, repeat: isSpeaking ? Infinity : 0, repeatDelay: 3 }}
          />
          <motion.ellipse
            cx="47"
            cy="28"
            rx="2.5"
            ry="3"
            fill="#1e1b4b"
            animate={isSpeaking ? { scaleY: [1, 0.3, 1] } : {}}
            transition={{ duration: 0.2, repeat: isSpeaking ? Infinity : 0, repeatDelay: 3 }}
          />

          <path
            d="M28 22C30 21 34 21 36 22"
            stroke="#1e1b4b"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M44 22C46 21 50 21 52 22"
            stroke="#1e1b4b"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          <motion.path
            d="M32 36C34 38 37 39 40 39C43 39 46 38 48 36"
            stroke="#1e1b4b"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            animate={
              isSpeaking
                ? {
                    d: [
                      'M32 36C34 38 37 39 40 39C43 39 46 38 48 36',
                      'M32 35C34 39 37 40 40 40C43 40 46 39 48 35',
                      'M32 36C34 38 37 39 40 39C43 39 46 38 48 36',
                    ],
                  }
                : {}
            }
            transition={{
              duration: 0.6,
              repeat: isSpeaking ? Infinity : 0,
              ease: 'easeInOut',
            }}
          />
        </svg>

        <motion.div
          className="absolute right-2 bottom-2 h-5 w-5 rounded-full border-2 border-white shadow-lg"
          animate={
            isSpeaking
              ? {
                  backgroundColor: ['#4ade80', '#22c55e', '#4ade80'],
                  scale: [1, 1.1, 1],
                }
              : {
                  backgroundColor: '#10b981',
                }
          }
          transition={{
            duration: 1,
            repeat: isSpeaking ? Infinity : 0,
          }}
        />
      </motion.div>

      {isSpeaking && (
        <motion.div
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-sm font-semibold text-purple-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <motion.span
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            RoadBuddy is speaking...
          </motion.span>
        </motion.div>
      )}
    </div>
  );
}
