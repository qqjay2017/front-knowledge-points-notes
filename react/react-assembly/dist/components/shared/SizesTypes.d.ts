export declare type SizesTypes = keyof typeof SIZES;
declare type sizeType = "small" | "medium";
declare type sizeObj = {
    [key in sizeType]: sizeType;
};
export declare const SIZES: sizeObj;
export {};
