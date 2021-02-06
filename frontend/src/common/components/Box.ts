import styled, { css } from 'styled-components'

interface IBoxProps {
  isCentered?: boolean
  isRight?: boolean
  noMarginBottom?: boolean
}

export const Box = styled('div')<IBoxProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  ${({ isCentered }) =>
    isCentered &&
    css`
      justify-content: center;
    `}
  ${({ isRight }) =>
    isRight &&
    css`
      justify-content: flex-end;
    `}
  ${({ noMarginBottom }) =>
    !noMarginBottom &&
    css`
      & > * {
        margin-bottom: 10px;
      }
    `}
  & > *:not(:first-child) {
    margin-left: 10px;
  }
`
