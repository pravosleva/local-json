import React from 'react'
// import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion'
import { PaddedLikeParagraph, ResponsiveBlock } from '~/common/components'

// interface IItem {
//   id: string
//   title: string
//   subtitle: string
// }

// type IStruct = {
//   [key: string]: any
// }
// const getStruct = (arr: IItem[]) => {
//   const result: IStruct = {}

//   arr.forEach((item: IItem) => {
//     result[item.id] = item
//   })

//   return result
// }

export const About: React.FC<any> = () => {
  return (
    <ResponsiveBlock isPaddedMobile hasAdditionalPadding>
      <PaddedLikeParagraph>
        <h1>About</h1>
        <p>In progress...</p>
      </PaddedLikeParagraph>
    </ResponsiveBlock>
  )
}
