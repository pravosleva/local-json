import React from 'react'
import { PaddedLikeParagraph, ResponsiveBlock } from '~/common/components'

export const Home: React.FC<any> = () => {
  return (
    <ResponsiveBlock isPaddedMobile>
      <PaddedLikeParagraph>
        <h1>Home</h1>
        <p>In progress...</p>
      </PaddedLikeParagraph>
    </ResponsiveBlock>
  )
}
