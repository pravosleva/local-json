import React from 'react'
import styled from 'styled-components'
import { Link, useRouteMatch } from 'react-router-dom'
import clsx from 'clsx'
import { Divider } from 'ui-neumorphism'
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
      <div className="draggable-in-electron">
        <PaddedLikeParagraph>
          <InternalBox>
            <OldSchoolMenuLink to="/" label="Home" isActiveOnlyWhenExact />
            <OldSchoolMenuLink
              to="/add-structure"
              label="Add structure"
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
  )
}

function OldSchoolMenuLink({ label, to, isActiveOnlyWhenExact }: any) {
  const match = useRouteMatch({
    path: to,
    exact: isActiveOnlyWhenExact,
  })

  console.log(match)

  return (
    <div className={clsx({ link_active: match?.isExact })}>
      {match?.isExact && '👉 '}
      <Link to={to}>{label}</Link>
    </div>
  )
}
