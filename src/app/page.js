'use client';

import React, { useEffect, useState } from 'react';
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';
import { BsEmojiNeutralFill, BsEmojiSmileFill } from 'react-icons/bs';
import {
  FaAppleAlt,
  FaBolt,
  FaFireAlt,
  FaGem,
  FaHeart,
  FaLemon,
  FaMoon,
  FaSkullCrossbones,
  FaStar,
} from 'react-icons/fa';

const MemoryCardLogoIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M14.2 5.8h16.4c2.35 0 4.25 1.9 4.25 4.25v25.9c0 2.35-1.9 4.25-4.25 4.25H14.2c-2.35 0-4.25-1.9-4.25-4.25v-25.9c0-2.35 1.9-4.25 4.25-4.25Z"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinejoin="round"
    />
    <path
      d="M15.9 10.2h13"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
    />
    <circle cx="22.4" cy="23.6" r="7" stroke="currentColor" strokeWidth="2.4" />
    <circle cx="19.7" cy="21.3" r="1.15" fill="currentColor" />
    <circle cx="25.1" cy="21.3" r="1.15" fill="currentColor" />
    <path
      d="M18.9 25.25c.95 1.45 2.16 2.16 3.5 2.16 1.34 0 2.55-.71 3.5-2.16"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M11.2 14.2l1.15.35.38 1.13.37-1.13 1.15-.35-1.15-.35-.37-1.13-.38 1.13-1.15.35Z"
      fill="currentColor"
    />
    <path
      d="M30.95 31.85l1.25.37.4 1.22.4-1.22 1.24-.37-1.24-.38-.4-1.22-.4 1.22-1.25.38Z"
      fill="currentColor"
    />
  </svg>
);

const ALL_ICONS = [
  { icon: FaAppleAlt, color: '#ef4444' },
  { icon: FaLemon, color: '#eab308' },
  { icon: FaHeart, color: '#ec4899' },
  { icon: FaStar, color: '#f97316' },
  { icon: FaBolt, color: '#60a5fa' },
  { icon: FaGem, color: '#8b5cf6' },
  { icon: FaMoon, color: '#94a3b8' },
  { icon: FaFireAlt, color: '#f59e0b' },
];

const DIFFICULTY_OPTIONS = {
  easy: { label: 'Easy', pairs: 4, icon: BsEmojiSmileFill },
  medium: { label: 'Medium', pairs: 6, icon: BsEmojiNeutralFill },
  hard: { label: 'Hard', pairs: 8, icon: FaSkullCrossbones },
};

const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

const createRandomId = () => Math.random().toString(36).slice(2, 10);

const createCards = (pairCount) => {
  const selectedIcons = ALL_ICONS.slice(0, pairCount);

  return shuffleArray(
    selectedIcons.flatMap((item, index) => [
      {
        id: `${index}-a-${createRandomId()}`,
        icon: item.icon,
        color: item.color,
        pairId: index,
      },
      {
        id: `${index}-b-${createRandomId()}`,
        icon: item.icon,
        color: item.color,
        pairId: index,
      },
    ])
  );
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
};

export default function Home() {
  const [difficulty, setDifficulty] = useState('easy');
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [round, setRound] = useState(0);

  const totalPairs = DIFFICULTY_OPTIONS[difficulty].pairs;
  const matchedCount = matchedCards.length / 2;
  const isGameComplete = cards.length > 0 && matchedCount === totalPairs;

  useEffect(() => {
    setCards(createCards(totalPairs));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTime(0);
  }, [difficulty, totalPairs, round]);

  useEffect(() => {
    if (cards.length === 0 || isGameComplete) {
      return undefined;
    }

    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [cards, difficulty, round, isGameComplete]);

  useEffect(() => {
    if (flippedCards.length !== 2) {
      return undefined;
    }

    const [firstId, secondId] = flippedCards;
    const firstCard = cards.find((card) => card.id === firstId);
    const secondCard = cards.find((card) => card.id === secondId);

    if (!firstCard || !secondCard) {
      return undefined;
    }

    setMoves((prev) => prev + 1);

    if (firstCard.pairId === secondCard.pairId) {
      setMatchedCards((prev) => [...prev, firstId, secondId]);
      setFlippedCards([]);
      return undefined;
    }

    const timeout = setTimeout(() => {
      setFlippedCards([]);
    }, 800);

    return () => clearTimeout(timeout);
  }, [flippedCards, cards]);

  const handleCardFlip = (id) => {
    if (flippedCards.length === 2) {
      return;
    }

    if (flippedCards.includes(id) || matchedCards.includes(id)) {
      return;
    }

    setFlippedCards((prev) => [...prev, id]);
  };

  const handleReset = () => {
    setRound((prev) => prev + 1);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#1b1452] px-4 py-6 text-white sm:px-6 sm:py-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full bg-[#4c2fff]/18 blur-[120px]" />
        <div className="absolute right-[-12%] top-1/2 h-[38rem] w-[38rem] -translate-y-1/2 rounded-full bg-[#7c2cff]/22 blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#1a1450_0%,#25185f_48%,#300d76_100%)]" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl items-start justify-center pt-3 sm:pt-5">
        <div className="flex w-full max-w-[46rem] flex-col items-center">
          <header className="mb-6 flex items-center gap-4 sm:mb-7 sm:gap-5">
            <div className="flex h-[3.1rem] w-[3.1rem] items-center justify-center rounded-[0.8rem] bg-[#ffd21f] shadow-[0_10px_24px_rgba(255,210,31,0.18)] sm:h-[3.35rem] sm:w-[3.35rem]">
              <MemoryCardLogoIcon className="h-[1.9rem] w-[1.9rem] text-[#161616] sm:h-[2rem] sm:w-[2rem]" />
            </div>

            <h1 className="bg-gradient-to-r from-[#ffe2b8] via-[#f0b7d9] to-[#d3adff] bg-clip-text text-[clamp(3.05rem,5.7vw,5.45rem)] font-black leading-none tracking-[-0.02em] text-transparent">
              Memory Card
            </h1>
          </header>

          <ScoreBoard
            difficulty={difficulty}
            difficultyOptions={DIFFICULTY_OPTIONS}
            onDifficultyChange={setDifficulty}
            time={formatTime(time)}
            moves={moves}
            matchedCount={matchedCount}
            totalPairs={totalPairs}
            isGameComplete={isGameComplete}
            onReset={handleReset}
          />

          <div
            className="mt-4 w-full rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_60px_rgba(6,7,28,0.26)] sm:mt-5 sm:p-7"
            style={{ maxWidth: 'min(100%, 32rem)' }}
          >
            <GameBoard
              cards={cards}
              flippedCards={flippedCards}
              matchedCards={matchedCards}
              onFlip={handleCardFlip}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
