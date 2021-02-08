import React from 'react'
import styled from 'styled-components'
import { mdiLoading } from '@mdi/js'
import Icon from '@mdi/react'
import { motion } from 'framer-motion'
import { defaultBoxHeight } from '~/common/components/layout/constants'
// @ts-ignore
import { useJsonEditorContext } from '~/common/hooks'

const Wrapper = styled(motion.div)`
  // height: ${defaultBoxHeight}px !important;
  z-index: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  background-color: transparent;

  display: flex;
  justify-content: center;
  align-items: center;
`

const variants = {
  visible: {
    opacity: 1,
    // x: 0,
  },
  invisible: {
    opacity: 0,
    // x: '-100%',
  },
}

export const LoaderBlock: React.FC<any> = () => {
  const { state } = useJsonEditorContext()

  return (
    <Wrapper
      animate={state.isLoading ? 'visible' : 'invisible'}
      variants={variants}
    >
      <Icon path={mdiLoading} spin={state.isLoading ? 1 : false} size={2} />
    </Wrapper>
  )
}
