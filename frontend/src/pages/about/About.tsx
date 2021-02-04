import React from 'react'
import { PaddedLikeParagraph, ResponsiveBlock } from '~/common/components'

export const About: React.FC<any> = () => {
  return (
    <ResponsiveBlock isPaddedMobile>
      <PaddedLikeParagraph>
        <h1>About</h1>
        <p>In progress...</p>
      </PaddedLikeParagraph>
    </ResponsiveBlock>
  )
}
