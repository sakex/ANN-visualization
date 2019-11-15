import { isArray } from 'util';
import { NodeData } from './NodeData';
import { Phenotype, Parser, Point } from '../types';
import { Layer } from '../components/Node';

export class PhenotypeParser implements Parser<Phenotype, Layer[]> {
    private width: number;
    private height: number;
    private readonly nodesData: NodeData[][] = [];

    public setProperties(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public parseData(data: Phenotype[]): Layer[] {
        this.generateNodesData(data);
        this.generateLayers();
        return this.nodesData.reverse().map((layer: NodeData[], layerIndex: number) => {
            return layer.map((node: NodeData, nodeIndex: number) =>
                node.getElement(`${layerIndex},${nodeIndex}`)
            );
        });
    }

    private generateNodesData(data: Phenotype[]): void {
        this.nodesData.length = 0;
        data.forEach(({ disabled, input, output, input_weight }: Phenotype) => {
            if (disabled) return;

            const merged_input: NodeData = this.mergePhenotype(input[0], input[1]);
            const merged_output: NodeData = this.mergePhenotype(output[0], output[1]);
            merged_input.addConnection(input_weight, merged_output);
        });
    }

    private mergePhenotype(layer: number, position: number): NodeData {
        if (layer >= this.nodesData.length) {
            this.nodesData.length = layer + 1;
        }
        if (!isArray(this.nodesData[layer])) {
            this.nodesData[layer] = new Array(position);
            this.nodesData[layer][position] = new NodeData();
        } else if (!this.nodesData[layer][position]) {
            this.nodesData[layer][position] = new NodeData();
        }
        return this.nodesData[layer][position];
    }

    private generateLayers(): void {
        const maxPerLayer = this.nodesData.reduce(
            (previous: number, { length }: NodeData[]) => (previous > length ? previous : length),
            0
        );
        const totalNodeHeight = this.height / maxPerLayer;
        const nodeHeight = totalNodeHeight * 0.5;
        this.nodesData.forEach((layer: NodeData[], layerIndex: number) => {
            const layerLength = layer.length;
            const spaceHeight = this.height / layerLength - nodeHeight;
            const x = layerIndex * nodeHeight * 2 + nodeHeight;
            layer.forEach((nodeData: NodeData, index: number) => {
                const point: Point = {
                    x,
                    y: (nodeHeight + spaceHeight) * index + (nodeHeight + spaceHeight) / 2,
                    radius: nodeHeight / 2
                };
                nodeData.point = point;
            });
        });
    }
}
