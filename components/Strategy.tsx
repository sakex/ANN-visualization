import React, { Component, Fragment } from 'react';
import { StrategyPoint, StrategyLine } from '../types/strategy';
import { StrategyParser } from '../src/StrategyParser';

const LEGEND_COUNT = 5;

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
    private minPercentage: number;
    private maxPercentage: number;
    private scale: number;
    private sharpe: number;

    constructor(props: propTypes) {
        super(props);
        this.width = props.width;
        this.height = props.height;
        this.parser.setProperties(this.width, this.height);
        const output = this.parser.parseData(props.data);
        this.lines = output.lines;
        this.maxPercentage = output.maxPercentage;
        this.minPercentage = output.minPercentage;
        this.scale = output.scale;
        this.sharpe = output.sharpe;
    }

    public render() {
        const points = [];
        const maxPoint = this.height / 2 - this.maxPercentage * this.scale;
        const minPoint = this.height / 2 - this.minPercentage * this.scale;
        const spread = minPoint - maxPoint;
        const percentagePerIteration = (this.maxPercentage - this.minPercentage) / LEGEND_COUNT;
        for (let it = maxPoint, j = 0; it <= minPoint; it += spread / LEGEND_COUNT, j++) {
            points.push(
                <text x="10" y={it} key={it}>
                    {((this.maxPercentage - j * percentagePerIteration) * 100).toFixed(2)}%
                </text>
            );
        }

        return (
            <svg width={this.width} height={this.height}>
                <line
                    x1={0}
                    x2={this.width}
                    y1={this.height / 2}
                    y2={this.height / 2}
                    key="0line"
                    style={{ stroke: 'rgb(0, 255, 0)', strokeWidth: 1 }}></line>
                <line
                    x1={0}
                    x2={this.width}
                    y1={maxPoint}
                    y2={maxPoint}
                    key="maxline"
                    style={{ stroke: 'rgb(0, 0, 0)', strokeWidth: 1 }}></line>
                <line
                    x1={0}
                    x2={this.width}
                    y1={minPoint}
                    y2={minPoint}
                    key="minline"
                    style={{ stroke: 'rgb(0, 0, 0)', strokeWidth: 1 }}></line>
                {points}
                {this.lines.map((line: StrategyLine, index: number) => (
                    <Fragment key={index ** 2}>
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
                            key={index + 2 + this.lines.length}
                            style={{ stroke: 'rgb(0, 0, 255)', strokeWidth: 2 }}></line>
                    </Fragment>
                ))}
                <text x={this.width / 2} y={10} key={'Sharpe'}>
                    Sharpe: {this.sharpe}
                </text>
            </svg>
        );
    }

    public componentDidMount() {}
}

export default Strategy;
