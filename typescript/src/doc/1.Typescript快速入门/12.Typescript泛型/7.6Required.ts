interface PullDownRefreshConfig {
    threshold:number;
    stop:number;
}

// type PullDownRefreshOptions = {
//     threshold?: number | undefined;
//     stop?: number | undefined;
// }
type PullDownRefreshOptions = Partial<PullDownRefreshConfig>




// type PullDownRefresh = {
//     threshold: number;
//     stop: number;
// }
type PullDownRefresh = Required<Partial<PullDownRefreshConfig>>




// Required定义
// 通过 -? 移除了可选属性中的 ? ，使得属性从可选变为必选的
// type Required<T> = {
//     [P in keyof T]-?: T[P];
// };
export{}