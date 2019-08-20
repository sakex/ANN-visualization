import React, { Component } from 'react';
import { Point } from '../types';
import { randomRGBA } from '../src/utils';

interface propTypes {
    input: Point;
    output: Point;
}

export class Relationship extends Component<propTypes> {
    private input: Point;
    private output: Point;

    constructor(props: propTypes) {
        super(props);
        const { input, output } = props;
        this.input = input;
        this.output = output;
    }

    public render() {
        return (
            <line
                x1={this.input.x}
                y1={this.input.y}
                x2={this.output.x}
                y2={this.output.y}
                stroke={randomRGBA(1)}
                strokeWidth="3"
                fill="red"
            />
        );
    }
}

export type Layer = JSX.Element[];
