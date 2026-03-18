import React from 'react';
import Card from './Card';

function GameBoard({ cards, flippedCards, matchedCards, onFlip }) {
  return (
    <div
      className="mx-auto grid w-full grid-cols-4 justify-items-center"
      style={{ gap: 'clamp(0.95rem, 1.35vw, 1.2rem)' }}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          isFlipped={flippedCards.includes(card.id)}
          isMatched={matchedCards.includes(card.id)}
          onFlip={onFlip}
        />
      ))}
    </div>
  );
}

export default GameBoard;
