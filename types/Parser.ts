export interface Parser<InputType, OutputType> {
    parseData(data: InputType[]): OutputType;
    setProperties(width: number, height: number);
}
