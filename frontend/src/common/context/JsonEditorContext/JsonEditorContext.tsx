/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { createContext, useContext, ReactNode, useState } from 'react'

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
interface IState {
  structure: any
}

const initialState: IState = {
  structure: null,
}

export const JsonEditorContext = createContext({
  onSendStructure: (jsonString: string): void => {
    throw new Error('onSendStructure method should be implemented')
  },
  onChangeStructureEditor: (event: IEvent): void => {
    throw new Error('onChangeStructureEditor method should be implemented')
  },
  state: initialState,
})

interface IProps {
  children: ReactNode
}

export const JsonEditorContextProvider: React.FC<IProps> = ({ children }) => {
  const onSendStructure = (jsonString: string) => {
    // eslint-disable-next-line no-alert
    alert(jsonString)
  }
  const [state, setState] = useState(initialState)
  const onChangeStructureEditor = (e: IEvent) => {
    const { error, jsObject } = e

    if (!error && !!jsObject) {
      setState((prevState) => ({
        ...prevState,
        structure: jsObject,
      }))
    }
  }

  return (
    <JsonEditorContext.Provider
      value={{
        // addDefaultNotif,
        onSendStructure,
        onChangeStructureEditor,
        state,
      }}
    >
      {children}
    </JsonEditorContext.Provider>
  )
}

export const useJsonEditorContext = () => {
  const jsonEditorContext = useContext(JsonEditorContext)

  return jsonEditorContext
}
