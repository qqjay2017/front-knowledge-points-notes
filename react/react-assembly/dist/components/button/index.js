var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { color, typography } from "../shared/styles";
import { rgba } from "polished";
import { easing } from '../shared/animation';
import { SIZES } from '../shared/SizesTypes';
import { APPEARANCES } from '../shared/AppearancesTypes';
var Text = styled.span(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: inline-block;\n    vertical-align:top;\n"], ["\n    display: inline-block;\n    vertical-align:top;\n"])));
var Loading = styled.span(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    position:absolute;\n    top:50%;\n    left:0;\n    right:0;\n    opacity:0;\n"], ["\n    position:absolute;\n    top:50%;\n    left:0;\n    right:0;\n    opacity:0;\n"])));
var StyledButton = styled.button(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  border: 0;\n  border-radius: 3em;\n  cursor: pointer;\n  display: inline-block;\n  overflow: hidden;\n  padding: ", ";\n  position:relative;\n  text-align: center;\n  text-decoration: none;\n  transition: all 150ms ease-out;\n  transform: translate3d(0,0,0);\n  vertical-align: top;\n  white-space: nowrap;\n  user-select: none;\n  opacity: 1;\n  margin: 0;\n  background: transparent;\n  font-size: ", "px;\n  font-weight: ", ";\n  line-height: 1;\n\n  ", "\n\n    ", " {\n    transform: scale3d(1,1,1) translate3d(0,0,0);\n    transition: transform 700ms ", ";\n    opacity: 1;\n  }\n\n  ", " {\n    transform: translate3d(0, 100%, 0);\n  }\n\n\n"], ["\n  border: 0;\n  border-radius: 3em;\n  cursor: pointer;\n  display: inline-block;\n  overflow: hidden;\n  padding: ", ";\n  position:relative;\n  text-align: center;\n  text-decoration: none;\n  transition: all 150ms ease-out;\n  transform: translate3d(0,0,0);\n  vertical-align: top;\n  white-space: nowrap;\n  user-select: none;\n  opacity: 1;\n  margin: 0;\n  background: transparent;\n  font-size: ",
    "px;\n  font-weight: ", ";\n  line-height: 1;\n\n  ",
    "\n\n    ", " {\n    transform: scale3d(1,1,1) translate3d(0,0,0);\n    transition: transform 700ms ", ";\n    opacity: 1;\n  }\n\n  ", " {\n    transform: translate3d(0, 100%, 0);\n  }\n\n\n"])), function (props) { return props.size === SIZES.small ? '8px 16px' : '12px 18px'; }, function (props) {
    return props.size === SIZES.small ? typography.size.s1 : typography.size.s2;
}, typography.weight.extrabold, function (props) {
    return !props.isLoading && css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      &:hover {\n        transform: translate3d(0, -2px, 0);\n        box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;\n      }\n\n      &:active {\n        transform: translate3d(0, 0, 0);\n      }\n\n      &:focus {\n        box-shadow: ", " 0 1px 9px 2px;\n      }\n\n      &:focus:hover {\n        box-shadow: ", " 0 8px 18px 0px;\n      }\n    "], ["\n      &:hover {\n        transform: translate3d(0, -2px, 0);\n        box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;\n      }\n\n      &:active {\n        transform: translate3d(0, 0, 0);\n      }\n\n      &:focus {\n        box-shadow: ", " 0 1px 9px 2px;\n      }\n\n      &:focus:hover {\n        box-shadow: ", " 0 8px 18px 0px;\n      }\n    "])), rgba(color.primary, 0.4), rgba(color.primary, 0.2));
}, Text, easing.rubber, Loading);
function Button(props) {
    var isLoading = props.isLoading, loadingText = props.loadingText, isLink = props.isLink, children = props.children;
    var buttonInner = (React.createElement(React.Fragment, null,
        React.createElement(Text, null, children),
        isLoading && React.createElement(Loading, null, loadingText || "Loading...")));
    var btnType = useMemo(function () {
        if (isLink) {
            return "a";
        }
    }, [isLink]);
    return (React.createElement(StyledButton, __assign({ as: btnType }, props), buttonInner));
}
Button.defaultProps = {
    isLoading: false,
    loadingText: null,
    isLink: false,
    appearance: APPEARANCES.tertiary,
    isDisabled: false,
    isUnclickable: false,
    containsIcon: false,
    size: SIZES.medium,
    ButtonWrapper: undefined,
};
export default Button;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
