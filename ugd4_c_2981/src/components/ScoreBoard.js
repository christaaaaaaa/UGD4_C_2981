import React from 'react';
import {
  FaCheck,
  FaClock,
  FaMousePointer,
  FaRedo,
  FaSyncAlt,
  FaTrophy,
} from 'react-icons/fa';

function ScoreBoard({
  difficulty,
  difficultyOptions,
  onDifficultyChange,
  time,
  moves,
  matchedCount,
  totalPairs,
  isGameComplete,
  onReset,
}) {
  return (
    <div className="flex w-full max-w-[33rem] flex-col items-center">
      <div className="flex w-full flex-wrap items-center justify-center gap-3.5 sm:gap-4">
        {Object.entries(difficultyOptions).map(([key, value]) => {
          const isActive = difficulty === key;
          const IconComponent = value.icon;

          return (
            <button
              key={key}
              type="button"
              onClick={() => onDifficultyChange(key)}
              className={
                'inline-flex min-w-[9.2rem] items-center justify-center gap-2.5 rounded-full border px-5 py-[0.95rem] text-[1.05rem] font-semibold transition-all duration-300 sm:min-w-[9.6rem] ' +
                (isActive
                  ? 'border-yellow-300 bg-[#ffc400] text-[#181818] shadow-[0_14px_28px_rgba(255,196,0,0.24)]'
                  : 'border-white/12 bg-[#4b3c82]/72 text-white/82 hover:-translate-y-0.5 hover:bg-[#56458f]/82')
              }
            >
              <IconComponent className={isActive ? 'h-[0.96rem] w-[0.96rem] shrink-0 text-[#181818]' : 'h-[0.96rem] w-[0.96rem] shrink-0 text-white/72'} />
              <span className="leading-none">
                {value.label} ({value.pairs})
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid w-full grid-cols-3 gap-3.5 sm:gap-4">
        <div className="rounded-[1.35rem] border border-white/10 bg-[#46397c]/80 px-3.5 py-3.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm sm:px-4 sm:py-3.5">
          <p className="mb-1.5 flex items-center justify-center gap-1.5 text-[0.74rem] font-medium uppercase tracking-[0.09em] text-[#a8abff] sm:text-[0.83rem]">
            <FaClock className="text-[#8b8fff]" /> Waktu
          </p>
          <p className="text-[1.78rem] font-bold leading-none text-white sm:text-[1.82rem]">{time}</p>
        </div>

        <div className="rounded-[1.35rem] border border-white/10 bg-[#46397c]/80 px-3.5 py-3.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm sm:px-4 sm:py-3.5">
          <p className="mb-1.5 flex items-center justify-center gap-1.5 text-[0.74rem] font-medium uppercase tracking-[0.09em] text-[#a8abff] sm:text-[0.83rem]">
            <FaMousePointer className="text-[#8b8fff]" /> Percobaan
          </p>
          <p className="text-[1.78rem] font-bold leading-none text-white sm:text-[1.82rem]">{moves}</p>
        </div>

        <div className="rounded-[1.35rem] border border-white/10 bg-[#46397c]/80 px-3.5 py-3.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm sm:px-4 sm:py-3.5">
          <p className="mb-1.5 flex items-center justify-center gap-1.5 text-[0.74rem] font-medium uppercase tracking-[0.09em] text-[#a8abff] sm:text-[0.83rem]">
            <FaCheck className="text-[#8b8fff]" /> Ditemukan
          </p>
          <p className="text-[1.78rem] font-bold leading-none text-white sm:text-[1.82rem]">
            {matchedCount}/{totalPairs}
          </p>
        </div>
      </div>

      {isGameComplete && (
        <div className="mt-5 w-full rounded-[1.35rem] border border-[#c78f2c]/30 bg-[#6e5431]/72 px-4 py-3 text-center shadow-[0_14px_35px_rgba(0,0,0,0.18)] animate-message-pop">
          <p className="flex items-center justify-center gap-2 text-[0.98rem] font-bold text-[#ffd670] sm:text-[1rem]">
            <FaTrophy className="text-[#ffcf4a]" />
            Selamat! Selesai dalam waktu {time} dengan {moves} percobaan!
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex min-w-[13.6rem] items-center justify-center gap-2.5 rounded-full bg-[#ffc400] px-8 py-3.5 text-[1.05rem] font-semibold text-[#191919] shadow-[0_14px_28px_rgba(255,196,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-[#ffd026] hover:shadow-[0_20px_42px_rgba(255,196,0,0.34)] active:scale-[0.98]"
      >
        {isGameComplete ? <FaRedo /> : <FaSyncAlt />}
        {isGameComplete ? 'Main Lagi' : 'Acak Ulang'}
      </button>
    </div>
  );
}

export default ScoreBoard;
