import React, { PropsWithChildren, ButtonHTMLAttributes,useMemo } from 'react'

import styled ,{css}from 'styled-components';

import { color, typography } from "../shared/styles";
import { darken, rgba, opacify } from "polished";
import {easing}from '../shared/animation'
import { SIZES } from '../shared/SizesTypes';
import { ButtonProps } from './ButtonProps';
import { APPEARANCES } from '../shared/AppearancesTypes';


const Text = styled.span`
    display: inline-block;
    vertical-align:top;
`

const Loading = styled.span`
    position:absolute;
    top:50%;
    left:0;
    right:0;
    opacity:0;
`

const StyledButton = styled.button<ButtonProps>`
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  padding: ${(props)=>props.size === SIZES.small ? '8px 16px':'12px 18px'};
  position:relative;
  text-align: center;
  text-decoration: none;
  transition: all 150ms ease-out;
  transform: translate3d(0,0,0);
  vertical-align: top;
  white-space: nowrap;
  user-select: none;
  opacity: 1;
  margin: 0;
  background: transparent;
  font-size: ${(props) =>
		props.size === SIZES.small ? typography.size.s1 : typography.size.s2}px;
  font-weight: ${typography.weight.extrabold};
  line-height: 1;

  ${(props) =>
		!props.isLoading &&
		css`
      &:hover {
        transform: translate3d(0, -2px, 0);
        box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;
      }

      &:active {
        transform: translate3d(0, 0, 0);
      }

      &:focus {
        box-shadow: ${rgba(color.primary, 0.4)} 0 1px 9px 2px;
      }

      &:focus:hover {
        box-shadow: ${rgba(color.primary, 0.2)} 0 8px 18px 0px;
      }
    `}

    ${Text} {
    transform: scale3d(1,1,1) translate3d(0,0,0);
    transition: transform 700ms ${easing.rubber};
    opacity: 1;
  }

  ${Loading} {
    transform: translate3d(0, 100%, 0);
  }


`






function Button(props: PropsWithChildren<ButtonProps>) {

    const { isLoading, loadingText, isLink, children} = props
    const buttonInner = (
        <>
        <Text>{children}</Text>
        {isLoading && <Loading>{loadingText || "Loading..."}</Loading>}
        </>
    )

    const btnType = useMemo(()=>{
        if(isLink){
            return "a";
        }
    },[isLink])

    return (
       <StyledButton as={btnType}  {...props}>
           {buttonInner}
       </StyledButton>
    )
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