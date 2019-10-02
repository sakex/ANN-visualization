import { StrategyPoint, StrategyLine, Parser } from '../types';

export class StrategyParser implements Parser<StrategyPoint, StrategyLine> {
    private width: number;
    private height: number;

    public setProperties(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public parseData(data: StrategyPoint[]): StrategyLine[] {
        const { length } = data;
        const output: StrategyLine[] = [];
        const max = data.reduce(
            (accumulator, point: StrategyPoint) =>
                accumulator > point.value ? accumulator : point.value,
            0
        );
        const min = data.reduce(
            (accumulator, point: StrategyPoint) =>
                accumulator < point.value ? accumulator : point.value,
            max
        );
        const equityMax = data.reduce(
            (accumulator, point: StrategyPoint) =>
                accumulator > point.equity ? accumulator : point.equity,
            0
        );
        const equityMin = data.reduce(
            (accumulator, point: StrategyPoint) =>
                accumulator < point.equity ? accumulator : point.equity,
            equityMax
        );
        const scale = this.height / (max - min);
        const equityScale = this.height / (equityMax - equityMin);
        const equityMultiplier = data[0].equity / scale;
        for (let i = 0; i < length - 1; ++i) {
            output.push({
                valuey1: this.height - (data[i].value - min) * scale,
                valuey2: this.height - (data[i + 1].value - min) * scale,
                valuex1: (i * this.width) / length,
                valuex2: ((i + 1) * this.width) / length,
                equityy1: this.height - (data[i].equity - equityMin) * equityScale,
                equityy2: this.height - (data[i + 1].equity - equityMin) * equityScale,
                equityx1: (i * this.width) / length,
                equityx2: ((i + 1) * this.width) / length
            });
        }
        return output;
    }
}
