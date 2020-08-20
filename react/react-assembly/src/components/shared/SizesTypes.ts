export type SizesTypes = keyof typeof SIZES;


type sizeType = "small" | "medium";

type sizeObj = {
    [key in sizeType]:sizeType
}


export const SIZES:sizeObj={
    small:"small",
    medium:"medium"
}




