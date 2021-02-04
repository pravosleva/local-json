import React from 'react'
// @ts-ignore
import JSONInput from 'react-json-editor-ajrm'
// @ts-ignore
import locale from 'react-json-editor-ajrm/locale/en'

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

const App: React.FC = () => {
  const handleChange = (e: IEvent) => {
    const {
      // error,
      jsObject,
    } = e

    // if (error) {
    //   console.log(error)
    //   return
    // }
    if (jsObject) {
      console.log(jsObject)
    }
  }
  return (
    <div style={{ border: '1px solid red' }}>
      <JSONInput
        id="a_unique_id"
        placeholder={{
          a: 1,
        }}
        theme="light_mitsuketa_tribute"
        colors={{
          string: 'red', // overrides theme colors with whatever color value you want
        }}
        locale={locale}
        height="550px"
        onChange={handleChange}
      />
    </div>
  )
}

export default App
