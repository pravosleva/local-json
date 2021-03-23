/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-destructuring */
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react'
import axios from 'axios'
import { getRandomId } from '~/utils/getRandomId'
import { useNotifsContext, useDebounce } from '~/common/hooks'

const REACT_APP_ENDPOINT = process.env.REACT_APP_ENDPOINT

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
interface IProject {
  projectName: string
  readableName: string
}
interface IState {
  structure: any
  projectName: string
  isLoading: boolean
  isCreated: boolean
  isFound: boolean
  projectList: IProject[]
}

const initialState: IState = {
  structure: {},
  projectName: '',
  isLoading: false,
  isCreated: false,
  isFound: false,
  projectList: [],
}

export const JsonEditorContext = createContext({
  onSendStructure: (): void => {
    throw new Error('onSendStructure method should be implemented')
  },
  getStructureByProjectName: (
    text: string,
    isUiMessageRequired?: boolean
  ): void => {
    throw new Error('getStructureByProjectName method should be implemented')
  },
  removeRemoteStructure: (projectName: string): void => {
    throw new Error('removeRemoteStructure method should be implemented')
  },
  onChangeStructureEditor: (event: IEvent): void => {
    throw new Error('onChangeStructureEditor method should be implemented')
  },
  state: initialState,
  onChangeProjectName: (text: string): void => {
    throw new Error('onChangeProjectName method should be implemented')
  },
  isValidParams: false,
  makeRandomProjectName: (): void => {
    throw new Error('makeRandomProjectName method should be implemented')
  },
  resetState: (): void => {
    throw new Error('resetState method should be implemented')
  },
})

interface IProps {
  children: ReactNode
}

export const JsonEditorContextProvider: React.FC<IProps> = ({ children }) => {
  const { addDangerNotif, addInfoNotif, addSuccessNotif } = useNotifsContext()
  const [state, setState] = useState<IState>(initialState)
  const setStateDelta = useCallback(
    (delta: Partial<IState>) => {
      setState((prevState: IState) => ({
        ...prevState,
        ...delta,
      }))
    },
    [setState]
  )
  const onChangeStructureEditor = useCallback(
    (e: IEvent) => {
      const { error, jsObject } = e

      if (!error && !!jsObject) {
        setStateDelta({ structure: jsObject })
      }
    },
    [setStateDelta]
  )
  const onChangeProjectName = useCallback(
    (text: string) => {
      setStateDelta({ projectName: text, isFound: false })
    },
    [setStateDelta]
  )
  const makeRandomProjectName = useCallback(() => {
    setStateDelta({ projectName: getRandomId({ length: 5 }) })
  }, [setStateDelta])
  const isValidParams = useMemo(
    () => Object.keys(state.structure).length > 0 && !!state.projectName,
    [state.structure, state.projectName]
  )
  const onSendStructure = useCallback(async () => {
    // eslint-disable-next-line no-alert
    // alert(JSON.stringify(state))
    const fetcher = async () => {
      if (!state.projectName) {
        return { isOk: false, message: 'Заполните все поля', result: null }
      }
      setStateDelta({ isLoading: true })

      const params = new URLSearchParams()
      params.append('structure', JSON.stringify(state.structure))
      params.append('projectName', state.projectName)

      const data = {}

      // @ts-ignore
      for (const pair of params.entries()) {
        // @ts-ignore
        data[pair[0]] = pair[1]
      }

      const response = await axios
        // .get(`${REACT_APP_ENDPOINT}/save-structure?${params.toString()}`)
        .post(`${REACT_APP_ENDPOINT}/save-structure`, {
          ...data,
        })
        .then((res) => {
          setStateDelta({ isCreated: true })
          return {
            isOk: true,
            result: res.data,
            message: 'Ok',
          }
        })
        .catch((err) => {
          return { isOk: false, message: err.message || 'No msg', result: null }
        })
        .finally(() => {
          setStateDelta({ isLoading: false })
        })
      return response
    }

    const r = await fetcher()
    if (r.isOk) {
      addSuccessNotif({ message: r.message || 'Saved' })
    } else if (r.message) {
      addDangerNotif({ message: r.message })
    }
  }, [
    setStateDelta,
    addSuccessNotif,
    addDangerNotif,
    state.structure,
    state.projectName,
  ])
  const getStructureByProjectName = async (
    projectName: string,
    isUiMessageRequired?: boolean
  ) => {
    const fetcher = async () => {
      if (!state.projectName) {
        return { isOk: false, message: 'Заполните все поля', result: null }
      }
      setStateDelta({ isLoading: true })

      const params = new URLSearchParams()
      // params.append('structure', JSON.stringify(state.structure))
      params.append('projectName', projectName)

      const response = await axios
        .get(`${REACT_APP_ENDPOINT}/get-structure?${params.toString()}`)
        .then((res) => {
          setStateDelta({ isFound: true })
          return {
            isOk: true,
            result: res.data,
            message: 'Ok',
          }
        })
        .catch((err) => {
          return { isOk: false, message: err.message || 'No msg', result: null }
        })
        .finally(() => {
          setStateDelta({ isLoading: false })
        })
      return response
    }

    const r = await fetcher()
    if (r.isOk) {
      if (isUiMessageRequired) addInfoNotif({ message: 'Found' })
      setStateDelta({ structure: r.result.json })
    } else if (r.message) {
      addDangerNotif({ message: r.message || 'No message' })
    }
  }

  const _removeProjectFromLocalState = (removedProjectName: string) => {
    // @ts-ignore
    setState(({ projectList, ...rest }: IState) => {
      const newProjectList = projectList.filter(
        ({ projectName }: IProject) => projectName !== removedProjectName
      )

      return { ...rest, projectList: newProjectList }
    })
  }
  const removeRemoteStructure = async (projectName: string) => {
    const fetcher = async () => {
      if (!projectName) {
        return { isOk: false, message: 'projectName is required', result: null }
      }
      setStateDelta({ isLoading: true })

      const params = new URLSearchParams()
      // params.append('structure', JSON.stringify(state.structure))
      params.append('projectName', projectName)

      const response = await axios
        .get(`${REACT_APP_ENDPOINT}/remove-project?${params.toString()}`)
        .then((res) => {
          return {
            isOk: true,
            result: res.data,
            message: 'Ok',
          }
        })
        .catch((err) => {
          return { isOk: false, message: err.message || 'No msg', result: null }
        })
        .finally(() => {
          setStateDelta({ isLoading: false })
        })
      return response
    }

    const r = await fetcher()
    if (r.isOk) {
      addSuccessNotif({ message: r.message || 'Removed' })

      // TODO: Change local state...
      _removeProjectFromLocalState(projectName)
    } else if (r.message) {
      addDangerNotif({ message: r.message || 'No mesage' })
    }
  }
  const resetState = useCallback(() => {
    setState(initialState)
  }, [setState])
  const debouncedProjectName = useDebounce(state.projectName, 1000)

  useEffect(() => {
    if (!debouncedProjectName) return
    const fetcher = async () => {
      setStateDelta({ isLoading: true })

      const params = new URLSearchParams()
      params.append('q', debouncedProjectName)

      const response = await axios
        .get(`${REACT_APP_ENDPOINT}/search-project?${params.toString()}`)
        .then((res) => {
          // addInfoNotif({ message: 'Found' })
          return {
            isOk: true,
            result: res.data,
            message: 'Ok',
          }
        })
        .catch((err) => {
          return {
            isOk: false,
            message: err.message || 'No mesage',
            result: null,
          }
        })
        .finally(() => {
          setStateDelta({ isLoading: false })
        })

      if (response.isOk) {
        setStateDelta({ projectList: response.result.json })
      } else {
        addDangerNotif({ message: response.message })
        setStateDelta({ projectList: [] })
        // if (response.message) addDangerNotif({ message: response.message })
      }
    }
    fetcher()
  }, [debouncedProjectName, addDangerNotif, setStateDelta, addInfoNotif])

  return (
    <JsonEditorContext.Provider
      value={{
        // addDefaultNotif,
        onSendStructure,
        onChangeStructureEditor,
        state,
        onChangeProjectName,
        isValidParams,
        makeRandomProjectName,
        resetState,
        getStructureByProjectName,
        removeRemoteStructure,
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
