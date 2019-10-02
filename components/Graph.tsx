import React, { Component } from 'react';
import { Phenotype, Parser } from '../types';
import { Layer } from './Node';

interface propTypes {
    data: Phenotype[];
    parser: Parser<Phenotype, Layer>;
    width: number;
    height: number;
}

class Graph extends Component<propTypes> {
    private nodes: Layer[];
    private parser: Parser<Phenotype, Layer>;
    private width: number;
    private height: number;

    constructor(props: propTypes) {
        super(props);
        this.width = props.width;
        this.height = props.height;
        this.parser = props.parser;
        this.parser.setProperties(this.width, this.height);
        this.nodes = this.parser.parseData(props.data);
    }

    public render() {
        return (
            <svg id="graph" width={this.width} height={this.height}>
                {this.nodes}
            </svg>
        );
    }

    public componentDidMount() {}
}

export default Graph;
