import { NodeData } from '../src/NodeData';

export interface Point {
    readonly x: number;
    readonly y: number;
    readonly radius: number;
}

export interface Phenotype {
    readonly input: number[];
    readonly output: number[];
    readonly weight: number;
    readonly disabled: boolean;
}

export interface NodeConnection {
    readonly weight: number;
    readonly outbound: NodeData;
}
