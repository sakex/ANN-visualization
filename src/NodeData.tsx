import { NodeConnection, Point } from '../types/data';
import { Node } from '../components/Node';
import { Relationship } from '../components/Relationship';
import { Fragment } from 'react';

export class NodeData {
    private connections: NodeConnection[] = [];
    private _point: Point;

    public set point(_point: Point) {
        this._point = _point;
    }

    public get point(): Point {
        return this._point;
    }

    public addConnection(weight: number, outbound: NodeData): void {
        this.connections.push({ weight, outbound });
    }

    public getElement(key: string): JSX.Element {
        const lines = this.createLineConnections();
        return (
            <Fragment key={key}>
                {lines}
                <Node point={this._point} />
            </Fragment>
        );
    }

    private createLineConnections(): JSX.Element[] {
        const lines: JSX.Element[] = [];
        this.connections.forEach((connection: NodeConnection, index: number) => {
            lines.push(
                <Relationship input={this._point} output={connection.outbound.point} key={index} />
            );
        });
        return lines;
    }
}
