
// linear interpolation
export const lerp = (current, target, factor) =>
    current * (1 - factor) + target * factor;
