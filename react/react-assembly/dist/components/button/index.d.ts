import { PropsWithChildren } from 'react';
import { ButtonProps } from './ButtonProps';
declare function Button(props: PropsWithChildren<ButtonProps>): JSX.Element;
declare namespace Button {
    var defaultProps: {
        isLoading: boolean;
        loadingText: null;
        isLink: boolean;
        appearance: "primary" | "primaryOutline" | "secondary" | "secondaryOutline" | "tertiary" | "outline" | "inversePrimary" | "inverseSecondary" | "inverseOutline";
        isDisabled: boolean;
        isUnclickable: boolean;
        containsIcon: boolean;
        size: "small" | "medium";
        ButtonWrapper: undefined;
    };
}
export default Button;
