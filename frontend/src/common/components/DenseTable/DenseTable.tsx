import React from 'react'
import { Table as NmTable } from 'ui-neumorphism'

type TItem = {
  fileName: string
  jsx: React.ReactNode
  // tstVal: string
}
type THeader = {
  text: string
  value: string
  className?: string
  verticalAlign?: 'top' | 'middle' | 'bottom'
  align?: 'inherit' | 'center' | 'left' | 'right' | 'justify'
}

interface IProps {
  items: TItem[]
  headers: THeader[]
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const DenseTable = ({ items, headers }: IProps) => (
  // @ts-ignore
  <NmTable inset dark dense items={items} headers={headers} />
)
