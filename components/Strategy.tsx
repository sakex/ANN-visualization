import React, { Component } from 'react';
import { StrategyPoint, StrategyLine } from '../types/strategy';
import { StrategyParser } from '../src/StrategyParser';

interface propTypes {
    data: StrategyPoint[];
    width: number;
    height: number;
}

class Strategy extends Component<propTypes> {
    private lines: StrategyLine[];
    private width: number;
    private height: number;
    private parser: StrategyParser = new StrategyParser();

    constructor(props: propTypes) {
        super(props);
        this.width = props.width;
        this.height = props.height;
        this.parser.setProperties(this.width, this.height);
        this.lines = this.parser.parseData(props.data);
    }

    public render() {
        return (
            <svg width={this.width} height={this.height}>
                {this.lines.map((line: StrategyLine, index: number) => (
                    <>
                        <line
                            x1={line.valuex1}
                            x2={line.valuex2}
                            y1={line.valuey1}
                            y2={line.valuey2}
                            key={index}
                            style={{ stroke: 'rgb(255, 0, 0)', strokeWidth: 2 }}></line>
                        <line
                            x1={line.equityx1}
                            x2={line.equityx2}
                            y1={line.equityy1}
                            y2={line.equityy2}
                            key={index + 1 + this.lines.length}
                            style={{ stroke: 'rgb(0, 0, 255)', strokeWidth: 2 }}></line>
                    </>
                ))}
            </svg>
        );
    }

    public componentDidMount() {}
}

export default Strategy;
