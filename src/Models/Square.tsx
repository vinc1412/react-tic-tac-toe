import React from "react";

interface IProps {
    winningSquare: boolean,
    value: string
    onClick: () => void
}

class Square extends React.Component<IProps, {}> {
    render() {
        return (
            <button
                className={`square ${this.props.winningSquare ? "winning" : ""}`}
                onClick={this.props.onClick}
            >
                {this.props.value}
            </button>
        );
    }
}

export { Square }