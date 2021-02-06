import React from 'react'
import clsx from 'clsx'
import styled, { css } from 'styled-components'
import { useStyles } from './styles'
import { defaultTheme } from '~/common/theme'

const {
  breakpoints: {
    values: { md },
  },
} = defaultTheme

interface IWrapperProps {
  bgColor?: string
  desktopOnly?: boolean
  mobileOnly?: boolean
  hasRedBorder?: boolean
}

const Wrapper = styled('div')<IWrapperProps>`
  ${({ hasRedBorder }) =>
    hasRedBorder &&
    css`
      border: 1px dashed red;
    `}
  ${({ bgColor }) =>
    bgColor &&
    css`
      background-color: ${bgColor};
    `}
  ${({ desktopOnly }) =>
    desktopOnly &&
    css`
      @media (max-width: ${md}px) {
        display: none;
      }
    `}
  ${({ mobileOnly }) =>
    mobileOnly &&
    css`
      @media (min-width: ${md + 1}px) {
        display: none;
      }
    `}
    hasRedBorder
  
  & h1 {
    margin-bottom: 20px;
  }
`

interface IProps {
  isFullWidth?: boolean
  bgColor?: string
  desktopOnly?: boolean
  mobileOnly?: boolean
  isPaddedMobile?: boolean
  hasRedBorder?: boolean
  hasAdditionalPadding?: boolean

  children: JSX.Element
}

export const ResponsiveBlock: React.FC<IProps> = ({
  children,
  isFullWidth,
  bgColor,
  desktopOnly,
  mobileOnly,
  isPaddedMobile,
  hasRedBorder,
  hasAdditionalPadding,
}) => {
  const classes = useStyles()

  return (
    <Wrapper
      hasRedBorder={hasRedBorder}
      className={clsx({
        [classes.limited]: !isFullWidth,
        [classes.unlimited]: isFullWidth,
        [classes.isPaddedMobile]: isPaddedMobile,
        [classes.specialPaddingHeader]: hasAdditionalPadding,
      })}
      bgColor={bgColor}
      desktopOnly={desktopOnly}
      mobileOnly={mobileOnly}
    >
      {children}
    </Wrapper>
  )
}
