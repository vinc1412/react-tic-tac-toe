import React from "react";
import { Board } from "./Board";

interface IProps {
}
interface IState {
    history: IHistory[],
    stepNumber: number,
    xIsNext: boolean,
    isMoveListAscending: boolean
}
interface IHistory {
    squares: string[]
    location: number[]
}

class Game extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    location: []
                }
            ],
            stepNumber: 0,
            xIsNext: true,
            isMoveListAscending: true
        };
    }

    handleClick(i: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    location: this.getLocation(i)
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    getLocation(i: number) {
        if (i === 0) return [0, 0]
        if (i === 1) return [0, 1]
        if (i === 2) return [0, 2]
        if (i === 3) return [1, 0]
        if (i === 4) return [1, 1]
        if (i === 5) return [1, 2]
        if (i === 6) return [2, 0]
        if (i === 7) return [2, 1]
        if (i === 8) return [2, 2]
        return [0, 0]
    }

    jumpTo(step: number) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    changeSort() {
        this.setState({
            isMoveListAscending: !this.state.isMoveListAscending
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                `Go to move # ${move} ( ${step.location[0]} , ${step.location[1]})` :
                'Go to game start';
            return (
                <li key={move}>
                    <button
                        onClick={() => this.jumpTo(move)}
                        style={move === this.state.stepNumber ? { fontWeight: 'bold' } : {}}
                    >
                        {desc}
                    </button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = "Winner: " + winner.winner;
        } else if (!winner && current.squares.every((i) => { return i !== null })) {
            status = "Draw";
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                        winner={winner && winner.winningSquare}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{this.state.isMoveListAscending ? moves : moves.reverse()}</ol>
                    <button onClick={() => this.changeSort()}>Toggle Sort Order</button>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares: string[]) {
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
            return {
                winner: squares[a],
                winningSquare: lines[i]
            }
        }
    }
    return null;
}


export { Game }