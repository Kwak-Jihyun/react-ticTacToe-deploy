import "./App.css"
import Board from "./components/Board";
import {useState} from "react";


function App() {

  const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
  const [isNextX, setisNextX] = useState(true)

  const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

const current = history[history.length - 1];
const winner  = calculateWinner(current.squares);

let status;
if(winner){
    status = 'Winner : ' + winner;
}else{
    status = 'Next Player : ' + (isNextX ? 'X' : 'O');
}

const handleClick = (i) => {
  const new_squares = current.squares.slice();
  if (calculateWinner(new_squares) || current.squares[i]) {
      return;
  }

  new_squares[i] = isNextX ? 'X' : 'O';
  setHistory([...history, {squares: new_squares}]);
  // setisNextX(!isNextX)  // 함수안에서는 isNextX의 값이 바뀌지 않는다
  setisNextX(isNextX => !isNextX);
}

// const reFresh = () =>{
//   setHistory([{squares: Array(9).fill(null)}]);
// }

const jumpTo = (move) =>{
  setHistory(history.slice(0, move + 1));
  setisNextX(move % 2 === 0);
}

const moves = () =>{
  return history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button className = "move" onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

}

  return (
    <div className = "game">
      <h1>Tic Tac Toe</h1>
      <div className = "game-board">
      <Board squares = {current.squares}
             handleClick={handleClick}
             status = {status}
      />
      </div>
      <div className = "game-info">
        <div className="status"> {status} </div>
        {/* <button onClick={()=>reFresh()}>Refresh</button> */}
        <ol style={{listStyle:'none'}}>{moves()}</ol>
      </div>
    </div>
  );
}

export default App;
