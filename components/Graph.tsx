import React, { Component } from 'react';
import { Phenotype, Parser } from '../types';
import { Layer } from './Node';

class Graph extends Component<{ data: Phenotype[]; parser: Parser }> {
    private nodes: Layer[];
    private parser: Parser;

    constructor(props: { data: Phenotype[]; parser: Parser }) {
        super(props);
        this.parser = props.parser;
        this.parser.setProperties(800, 800);
        this.nodes = this.parser.parseData(props.data);
    }

    public render() {
        return (
            <svg id="graph" width={800} height={800}>
                {this.nodes}
            </svg>
        );
    }

    public componentDidMount() {}
}

export default Graph;
