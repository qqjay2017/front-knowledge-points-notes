/**
 * Obtain the parameters of a function type in a tuple
 * infer 最早出现在此 PR 中，表示在 extends 条件语句中待推断的类型变量。
 */
type Parameters1<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

type ReturnType1<T> = T extends (...args: any[]) => infer P ? P : any;

// 获取参数类型
type ConstructorParameters1<T extends new (...args: any[]) => any> =
  T extends new (...args: infer P) => any ? P : never;

// 获取实例类型
type InstanceType1<T extends new (...args: any[]) => any> = T extends new (
  ...args: any[]
) => infer R
  ? R
  : any;
