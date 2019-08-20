import { Phenotype } from '../types';
import { Layer } from '../components/Node';

export interface Parser {
    parseData(data: Phenotype[]): Layer[];
    setProperties(width: number, height: number);
}
