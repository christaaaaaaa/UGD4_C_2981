import React from 'react';
import { FaQuestion } from 'react-icons/fa';

function Card({ card, isFlipped, isMatched, onFlip }) {
  const isOpen = isFlipped || isMatched;
  const IconComponent = card.icon;

  const handleClick = () => {
    if (!isOpen) {
      onFlip(card.id);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        'relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[1.35rem] border transition-all duration-300 ' +
        (isOpen
          ? 'animate-card-reveal bg-[#f4f4f7] text-slate-800 shadow-[0_18px_34px_rgba(0,0,0,0.16)]'
          : 'bg-[linear-gradient(135deg,#d92cf6_0%,#ab55ff_55%,#6f6fff_100%)] text-white shadow-[0_14px_30px_rgba(168,85,247,0.38)] hover:-translate-y-1.5 hover:scale-[1.035] hover:border-white/35 hover:brightness-110 hover:shadow-[0_22px_42px_rgba(168,85,247,0.58)] active:scale-[0.98]') +
        (isMatched ? ' matched-card border-white/40' : ' border-white/12')
      }
      style={
        isOpen
          ? {
              borderColor: 'rgba(255,255,255,0.65)',
            }
          : undefined
      }
    >
      <span className="pointer-events-none absolute inset-[1px] rounded-[1.25rem] bg-white/5" />

      {isOpen ? (
        <span className="relative z-10 animate-card-reveal text-[clamp(2rem,3.4vw,2.7rem)]">
          <IconComponent style={{ color: card.color }} />
        </span>
      ) : (
        <FaQuestion className="relative z-10 text-[clamp(1.95rem,3.15vw,2.55rem)] text-white/76" />
      )}
    </button>
  );
}

export default Card;
