import React from "react";
import { Square } from "./Square";

interface IProps {
    squares: string[],
    winner: number[] | null
    onClick: (i: number) => void
}

class Board extends React.Component<IProps, {}> {
    renderSquare(i: number) {
        let winningSquare = this.props.winner && this.props.winner.includes(i) ? true : false;
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                winningSquare={winningSquare}
            />
        );
    }

    render() {
        let boardRows = []
        for (let i = 0; i < 3; i++) {
            boardRows.push(
                <div className="board-row">
                    {this.renderSquare(0 + 3 * i)}
                    {this.renderSquare(1 + 3 * i)}
                    {this.renderSquare(2 + 3 * i)}
                </div>
            )
        }
        return (
            <div>
                {boardRows}
            </div>
        );
    }
}

export { Board }