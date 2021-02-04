import React from 'react'
import styled from 'styled-components'
import { Link, useRouteMatch } from 'react-router-dom'
import clsx from 'clsx'
import { PaddedLikeParagraph, ResponsiveBlock } from '~/common/components'

const InternalBox = styled('div')`
  width: 100%;
  margin: 0 auto;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

export const Header: React.FC<any> = () => {
  return (
    <ResponsiveBlock isPaddedMobile>
      <PaddedLikeParagraph>
        <InternalBox>
          <OldSchoolMenuLink to="/" label="Home" isActiveOnlyWhenExact />
          <OldSchoolMenuLink
            to="/add-structure"
            label="Add structure"
            isActiveOnlyWhenExact
          />
          <OldSchoolMenuLink to="/about" label="About" isActiveOnlyWhenExact />
        </InternalBox>
      </PaddedLikeParagraph>
    </ResponsiveBlock>
  )
}

function OldSchoolMenuLink({ label, to, isActiveOnlyWhenExact }: any) {
  const currentRouteMatch = useRouteMatch({
    path: to,
    exact: isActiveOnlyWhenExact,
  })

  return (
    <div className={clsx({ link_active: currentRouteMatch })}>
      {currentRouteMatch && '> '}
      <Link to={to}>{label}</Link>
    </div>
  )
}
