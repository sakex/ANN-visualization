import React, { Component } from 'react';
import { Point } from '../types';
import { randomRGBA } from '../src/utils';

export class Node extends Component<{ point: Point }> {
    private position: Point;

    constructor(props: { point: Point }) {
        super(props);
        this.position = props.point;
    }

    public render() {
        return (
            <circle
                cx={this.position.x}
                cy={this.position.y}
                r={this.position.radius}
                stroke={randomRGBA(1)}
                strokeWidth={5}
                fill={randomRGBA(7)}
            />
        );
    }
}

export type Layer = JSX.Element[];
