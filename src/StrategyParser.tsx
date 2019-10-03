import { StrategyPoint, StrategyLine, Parser, StrategyData } from '../types';

export class StrategyParser implements Parser<StrategyPoint, StrategyData> {
    private width: number;
    private height: number;

    static mean(data: StrategyPoint[]): number {
        return (
            data.reduce((accumulator, item: StrategyPoint) => accumulator + item.equity, 0) /
            data.length
        );
    }

    static volatility(data: StrategyPoint[]): number {
        const mean = StrategyParser.mean(data);
        return Math.sqrt(
            data.reduce(
                (accumulator, item: StrategyPoint) =>
                    accumulator + (item.equity - mean) ** 2 / (data.length - 1),
                0
            )
        );
    }

    static sharpe(data: StrategyPoint[]): number {
        const ret = (data[data.length - 1].equity - data[0].equity) / data[0].equity;
        const vol = StrategyParser.volatility(data);
        return (ret - 0.02) / vol;
    }

    static max(data: StrategyPoint[], key: string): number {
        return data.reduce(
            (accumulator, point: StrategyPoint) =>
                accumulator > point[key] ? accumulator : point[key],
            -Infinity
        );
    }

    static min(data: StrategyPoint[], key: string): number {
        return data.reduce(
            (accumulator, point: StrategyPoint) =>
                accumulator < point[key] ? accumulator : point[key],
            Infinity
        );
    }

    public setProperties(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public parseData(data: StrategyPoint[]): StrategyData {
        const { length } = data;
        const lines: StrategyLine[] = [];
        const valueMax = StrategyParser.max(data, 'value');
        const valueMin = StrategyParser.min(data, 'value');

        const equityMax = StrategyParser.max(data, 'equity');
        const equityMin = StrategyParser.min(data, 'equity');

        const value0 = data[0].value;
        const equity0 = data[0].equity;

        const valueReturnMax = (valueMax - value0) / value0;
        const equityReturnMax = (equityMax - equity0) / equity0;

        const valueReturnMin = (valueMin - value0) / value0;
        const equityReturnMin = (equityMin - equity0) / equity0;

        const _max = valueReturnMax > equityReturnMax ? valueReturnMax : equityReturnMax;
        const _min = valueReturnMin < equityReturnMin ? valueReturnMin : equityReturnMin;
        const scale = this.height / (_max - _min) / Math.abs(_max / _min);

        const halfHeight = this.height * 0.5;

        for (let i = 0; i < length - 1; ++i) {
            lines.push({
                valuey1: halfHeight - ((data[i].value - value0) / value0) * scale,
                valuey2: halfHeight - ((data[i + 1].value - value0) / value0) * scale,
                valuex1: (i * this.width) / length,
                valuex2: ((i + 1) * this.width) / length,
                equityy1: halfHeight - ((data[i].equity - equity0) / equity0) * scale,
                equityy2: halfHeight - ((data[i + 1].equity - equity0) / equity0) * scale,
                equityx1: (i * this.width) / length,
                equityx2: ((i + 1) * this.width) / length
            });
        }
        const sharpe = StrategyParser.sharpe(data);

        return {
            lines,
            maxPercentage: _max,
            minPercentage: _min,
            scale,
            sharpe
        };
    }
}
