import React, { useEffect } from 'react'
import { Table as NmTable } from 'ui-neumorphism'

type TItem = {
  projectName: string
  projectNameJsx: React.ReactNode
  removeProjectJsx: React.ReactNode
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
export const DenseTable = ({ items, headers }: IProps) => {
  useEffect(() => {
    console.log(items)
  }, [items])
  return (
    // @ts-ignore
    <NmTable inset dark dense items={items} headers={headers} />
  )
}

// const areEqual = (prev: IProps, next: IProps) => {
//   return prev.items === next.items
// }
// export const DenseTable = memo(DenseTable0, areEqual)
