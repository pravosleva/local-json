/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { memo } from 'react'
import { TextField as NmTextField } from 'ui-neumorphism'

type TRule = (text: string) => void
interface IProps {
  value: string
  onChange: (text: string) => void
  loading?: boolean
  type?: string
  rules?: TRule[]
  name?: string
  label?: string
}

const CustomTextField = ({
  loading,
  type,
  rules,
  name,
  label,
  value,
  onChange,
}: IProps) => {
  return (
    <NmTextField
      autofocus
      key={value}
      dark
      loading={loading}
      // key={projectName}
      // autofocus
      type={type || 'text'}
      name={name}
      rules={rules}
      label={label}
      value={value}
      onChange={onChange}
    />
  )
}

function areEqual(prevProps: { value: string }, nextProps: { value: string }) {
  /*
  возвращает true, если nextProps рендерит
  тот же результат что и prevProps,
  иначе возвращает false
  */
  // console.log(prevProps.value === nextProps.value)
  return prevProps.value === nextProps.value
}

export const TextField = memo(CustomTextField, areEqual)
