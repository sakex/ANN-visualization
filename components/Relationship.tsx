import React, { Component } from 'react';
import { Point } from '../types';
import { randomRGBA } from '../src/utils';

interface propTypes {
    input: Point;
    output: Point;
    weight: number;
}

export class Relationship extends Component<propTypes> {
    private input: Point;
    private output: Point;
    private weight: number;

    constructor(props: propTypes) {
        super(props);
        const { input, output, weight } = props;
        this.input = input;
        this.output = output;
        this.weight = Math.abs(weight);
        if (this.weight > 30) this.weight = 30;
        else if (this.weight < 1) this.weight = 1;
        else this.weight /= 3;
    }

    public render() {
        return (
            <line
                x1={this.input.x}
                y1={this.input.y}
                x2={this.output.x}
                y2={this.output.y}
                stroke={randomRGBA(0.8)}
                strokeWidth={this.weight}
                fill="red"
            />
        );
    }
}

export type Layer = JSX.Element[];
