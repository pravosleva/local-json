/* eslint-disable react/button-has-type */
import React from 'react'
import styled from 'styled-components'
import { Link, useRouteMatch } from 'react-router-dom'
import clsx from 'clsx'
import { Divider } from 'ui-neumorphism'
import Icon from '@mdi/react'
import {
  mdiCellphone,
  mdiClose,
  mdiFullscreen,
  mdiWindowMaximize,
  mdiWindowRestore,
} from '@mdi/js'
// See also: https://materialdesignicons.com/
import { PaddedLikeParagraph, ResponsiveBlock } from '~/common/components'
import { useAppApiContext } from '~/common/hooks'

const InternalBox = styled('div')`
  width: 100%;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Header: React.FC<any> = () => {
  const {
    onCloseApp,
    onMaximizeApp,
    onSetMobileSize,
    onFullScreenApp,
    onRestoreApp,
    appMode,
  } = useAppApiContext()

  return (
    <>
      <button
        className="app-actions-btn"
        id="close-app-btn"
        onClick={onCloseApp}
      >
        <Icon path={mdiClose} size={0.7} />
      </button>
      <button
        className={clsx('app-actions-btn', { active: appMode.isMobile })}
        id="mobile-size-app-btn"
        onClick={onSetMobileSize}
      >
        <Icon path={mdiCellphone} size={0.7} />
      </button>
      <button
        className={clsx('app-actions-btn', { active: appMode.isMaximized })}
        id="maximize-app-btn"
        onClick={onMaximizeApp}
      >
        <Icon path={mdiWindowMaximize} size={0.7} />
      </button>
      <button
        className={clsx('app-actions-btn', { active: appMode.isFullscreen })}
        id="fullscreen-app-btn"
        onClick={onFullScreenApp}
      >
        <Icon path={mdiFullscreen} size={0.7} />
      </button>
      <button
        className={clsx('app-actions-btn', { active: appMode.isNormal })}
        id="restore-app-btn"
        onClick={onRestoreApp}
      >
        <Icon path={mdiWindowRestore} size={0.7} />
      </button>
      <ResponsiveBlock isPaddedMobile hasAdditionalPadding>
        <div className="draggable-in-electron">
          <PaddedLikeParagraph>
            <InternalBox>
              <OldSchoolMenuLink to="/" label="Home" isActiveOnlyWhenExact />
              <OldSchoolMenuLink
                to="/add-structure"
                label="Cart"
                isActiveOnlyWhenExact
              />
              <OldSchoolMenuLink
                to="/about"
                label="About"
                isActiveOnlyWhenExact
              />
            </InternalBox>
          </PaddedLikeParagraph>
          <Divider dark dense />
        </div>
      </ResponsiveBlock>
    </>
  )
}

function OldSchoolMenuLink({ label, to, isActiveOnlyWhenExact }: any) {
  const match = useRouteMatch({
    path: to,
    exact: isActiveOnlyWhenExact,
  })

  return (
    <div className={clsx({ link_active: match?.isExact })}>
      {match?.isExact && '👉 '}
      <Link to={to}>{label}</Link>
    </div>
  )
}
