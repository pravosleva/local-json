import React, { useState } from 'react'
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion'
import { PaddedLikeParagraph, ResponsiveBlock } from '~/common/components'

interface IItem {
  id: string
  title: string
  subtitle: string
}

type IStruct = {
  [key: string]: any
}
const getStruct = (arr: IItem[]) => {
  const result: IStruct = {}

  arr.forEach((item: IItem) => {
    result[item.id] = item
  })

  return result
}

export const About: React.FC<any> = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const items: IItem[] = [
    {
      id: 'a',
      title: '1',
      subtitle: 'subt 1',
    },
    {
      id: 'b',
      title: '2',
      subtitle: 'subt 2',
    },
  ]
  const struct = getStruct(items)

  return (
    <ResponsiveBlock isPaddedMobile hasAdditionalPadding>
      <PaddedLikeParagraph>
        <h1>About</h1>
        <AnimateSharedLayout type="crossfade">
          <div style={{ display: 'flex' }}>
            {items.map((item: IItem) => (
              <motion.div
                layoutId={item.id}
                onClick={() => setSelectedId(item.id)}
              >
                <motion.h5>{item.subtitle}</motion.h5>
                <motion.h2>{item.title}</motion.h2>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {selectedId && (
              <motion.div layoutId={selectedId}>
                <motion.h5>{struct[selectedId].subtitle}</motion.h5>
                <motion.h2>{struct[selectedId].title}</motion.h2>
                <div>Подробное</div>
                <motion.button onClick={() => setSelectedId(null)} />
              </motion.div>
            )}
          </AnimatePresence>
        </AnimateSharedLayout>
      </PaddedLikeParagraph>
    </ResponsiveBlock>
  )
}
