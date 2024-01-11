import React, { useState } from 'react';
function Square({value,onSquareClick}) {
 
  
  return <button  
    className="bg-blue-500 hover:bg-blue-700 
    text-white font-bold py-2 px-4 rounded" onClick={onSquareClick}>{value}</button>
}
  
const ChatMessage = () => {

  
  let [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  }
  else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
  }
  
  function handleClick(i) {
    const nextSquares = squares.slice();
   if (squares[i] || calculateWinner(squares)) {
    return;
  }
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }
  return (
    <>
      <div className="text-4xl font-bold mb-6">{status}</div>
       <div className="container mx-auto p-4 flex flex-col items-center justify-center">
      
      <div className="grid grid-cols-3 gap-4">
        <div className="grid grid-cols-3 gap-4">
        
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      </div>
      </div>
      <div className="container mx-auto p-4 flex flex-col items-center justify-center">
    
      <div className="grid grid-cols-3 gap-4">
        <div className="grid grid-cols-3 gap-4">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      </div>
      </div>
      <div className="container mx-auto p-4 flex flex-col items-center justify-center">
      
      <div className="grid grid-cols-3 gap-4">
        <div className="grid grid-cols-3 gap-4">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      </div>
    </div>
    
  
  </>);
}
 
export default ChatMessage;
