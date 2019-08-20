import React, { Component } from 'react';
import { Point } from '../types';

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
                stroke="black"
                strokeWidth="3"
                fill="red"
            />
        );
    }
}

export type Layer = JSX.Element[];
