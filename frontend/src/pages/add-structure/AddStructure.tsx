import React, { useCallback } from 'react'
// @ts-ignore
import JSONInput from 'react-json-editor-ajrm'
// @ts-ignore
import locale from 'react-json-editor-ajrm/locale/ru'

import { Button } from 'ui-neumorphism'

type TError =
  | false
  | {
      token: number
      line: number
      reason: string
    }
type TObject = {
  [key: string]: any
}
interface IEvent {
  error: TError
  jsObject: undefined | TObject
  json: string
  lines: number
  markupText: string
  plainText: string
}

export const AddStructure: React.FC = () => {
  const handleChange = useCallback((e: IEvent) => {
    const { error, jsObject } = e

    if (!error) {
      console.log(jsObject)
    }
  }, [])

  return (
    <div>
      <JSONInput
        id="a_unique_id"
        placeholder={{}}
        colors={{
          // NOTE: overrides theme colors with whatever color value you want
          keys: '#e76f51',
          string: '#2a9d8f',
          number: '#f4a261',
        }}
        style={
          {
            // errorMessage: {
            //   backgroundColor: '#e76f51',
            //   color: '#fff',
            // },
            // warningBox: {
            //   backgroundColor: '#e76f51',
            //   color: '#fff',
            // },
          }
        }
        // theme="dark_vscode_tribute"
        theme="light_mitsuketa_tribute"
        locale={locale}
        height="550px"
        onChange={handleChange}
      />
      <Button
        onClick={() => {
          console.log('tst')
        }}
      >
        Test
      </Button>
    </div>
  )
}
