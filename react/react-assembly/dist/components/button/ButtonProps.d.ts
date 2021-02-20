import { SizesTypes } from "../shared/SizesTypes";
import { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { AppearancesTypes } from "../shared/AppearancesTypes";
export interface CustomButtonProps {
    /** 是否禁用 */
    disabled?: boolean;
    /** 是否加载中 */
    isLoading?: boolean;
    /** 是否是a标签 */
    isLink?: boolean;
    /** 是否替换加载中文本 */
    loadingText?: ReactNode;
    /** 按钮大小 */
    size?: SizesTypes;
    /** 按钮类型 */
    appearance?: AppearancesTypes;
    /** 无效点击 */
    isUnclickable?: boolean;
}
export declare type ButtonProps = CustomButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>;
