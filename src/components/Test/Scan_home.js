import React, { Component } from "react";
import Scanner from "./Scanner";

class Scan_home extends Component {
    state = {
        scanning: false,
        status: "",
        results: [],
    };

    _scan = () => {
        console.log("hey");
        this.setState({ scanning: !this.state.scanning, status: "" });
    };

    _onDetected = (result) => {
        console.log(result);
        this.setState(
            {
                results: [result],
                scanning: false,
                status: "waiting",
            },
            () => {
                setTimeout(() => {
                    this.setState({
                        scanning: true,
                        status: "scanning",
                        results: [],
                    });
                }, 1000);
            }
        );
    };

    render() {
        console.log("Results: ", this.state.results);
        return (
            <div>
                <div className="header">
                    <div>Status: {this.state.status}</div>
                    <div onClick={this._scan}>{this.state.scanning ? "Stop" : "Start"}</div>
                    <ul className="results">
                        {this.state.results.map((result, i) => (
                            <div key={result.codeResult.code + i}>
                                {result?.codeResult?.code} [{result?.codeResult?.format}]
                            </div>
                        ))}
                    </ul>
                </div>
                {this.state.scanning ? <Scanner onDetected={this._onDetected} /> : null}
            </div>
        );
    }
}

export default Scan_home;
