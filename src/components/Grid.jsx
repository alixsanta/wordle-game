import React, { useState } from 'react';
  // Rendu de la grille de jeu
  const Grid = () => {
    return (
        <div className= "grid grid-rows-6 gap-2">
            {Array(6).fill(null).map((_, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-5 gap-2">
                    {Array(5).fill(null).map((_, colIndex) => {
                        const letter = guesses[rowIndex][colIndex] || '';
                        const status = results[rowIndex] ? results[rowIndex][colIndex] : '';
          
                        return ( 
                            <div 
                                key={colIndex} 
                                className={`w-14 h-14 flex items-center justify-center text-3xl font-bold rounded
                                    ${status === 'correct' ? 'bg-green-500 text-white' : 
                                      status === 'present' ? 'bg-yellow-500 text-white' : 
                                      status === 'absent' ? 'bg-gray-500 text-white' : 
                                      'border-gray-300'}
                                `}
                            >
                                {letter}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Grid;