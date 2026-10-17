import { useState } from 'react'
import './App.css'
const WinningPatterns =
  [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
function CheckWinner(board) {
  for (const pattern of WinningPatterns) {
    const [a, b, c] = pattern;
    if (board[a] != "" && board[a] == board[b] && board[b] == board[c]) {
      return board[a];
    }
  }
  return null;
}
function App() {
  const [winner, setWinner] = useState(null);
  const [board, setBoard] = useState([
    "", "", "",
    "", "", "",
    "", "", "",
  ]);
  const [turn, setTurn] = useState("X");
let message;
if(winner){
    if(winner === "draw"){
        message = "Draw!";
    }else{
        message = `Winner is ${winner}`;
    }
}else{
    message = `Turn : ${turn}`;
}
function HandleClick(i){
  if(board[i] != "" || winner){
    return;
  }
  const newboard = [...board];
  newboard[i] = turn;
  setBoard(newboard);
  const result = CheckWinner(newboard);
  if(result){
    setWinner(result);
    return;
  }
  for(const a of newboard){
    if(a == ""){
      setTurn(turn == "X" ? "O" : "X");
      return;
    }
  }
  setWinner("draw");
}
function restart(){
  setBoard([
    "", "", "",
    "", "", "",
    "", "", "",
  ]);
  setWinner(null);
  setTurn("X");
}
  return (
    <>
      <div className='min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-8'>
        <h1 className="text-4xl font-bold text-white">
          Tic Tac Toe
        </h1>
        <h2 className='text-2xl font-bold text-white'>
          {message}
        </h2>
        <div className='grid grid-cols-3 grid-rows-3 gap-2'>
            {board.map((value,index)=>
              <button key = {index} onClick={()=>HandleClick(index)} 
                className='w-24 h-24 bg-gray-800 text-white text-5xl font-bold cursor-pointer'>
                {value}
              </button>
            )
            }
        </div>
        <button onClick={restart} className='px-6 py-3 bg-white text-black rounded-lg cursor-pointer'>
            Restart
        </button>
      </div>
    </>
  )
}
export default App
