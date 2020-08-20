export type AppearancesTypes = keyof typeof APPEARANCES;


/**
 * 同时，使用字面量类型对传参进行约束。这里可能有人奇怪为什么写2次类型，
 * 因为ts的字面量类型与string类型转换有bug，默认会先去匹配string类型而非字面量类型，
 * 并且，类型无法进行循环引用，所以需要单独写出来再定义上。
 */
type btnType = 
    | "primary"
	| "primaryOutline"
	| "secondary"
	| "secondaryOutline"
	| "tertiary"
	| "outline"
	| "inversePrimary"
	| "inverseSecondary"
	| "inverseOutline";

type AppearancesObj = {
    [key in btnType]:btnType
}

export const APPEARANCES :AppearancesObj = {
    primary:"primary",
    primaryOutline: "primaryOutline",
	secondary: "secondary",
	secondaryOutline: "secondaryOutline",
	tertiary: "tertiary",
	outline: "outline",
	inversePrimary: "inversePrimary",
	inverseSecondary: "inverseSecondary",
	inverseOutline: "inverseOutline",
}