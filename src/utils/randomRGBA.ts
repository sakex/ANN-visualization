const { random } = Math;

export const randomRGBA = (opacity: number = 0.3): string => {
    const r1 = random() * 255;
    const r2 = random() * 255;
    const r3 = random() * 255;
    return `rgba(${r1},${r2},${r3},${opacity})`;
};
