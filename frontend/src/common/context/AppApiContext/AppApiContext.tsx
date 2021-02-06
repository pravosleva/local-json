/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-destructuring */
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
} from 'react'

interface IAppMode {
  isMaximized: boolean
  isMinimized: boolean
  isFullscreen: boolean
  isMobile: boolean
  isNormal: boolean
}

const initialAppMode: IAppMode = {
  isMaximized: false,
  isMinimized: false,
  isFullscreen: false,
  isMobile: false,
  isNormal: false,
}

export const AppApiContext = createContext({
  onCloseApp: (): void => {
    throw new Error('onCloseApp method should be implemented')
  },
  onMaximizeApp: (): void => {
    throw new Error('onMaximizeApp method should be implemented')
  },
  onMinimizeApp: (): void => {
    throw new Error('onMinimizeApp method should be implemented')
  },
  onSetMobileSize: (): void => {
    throw new Error('onSetMobileSize method should be implemented')
  },
  onFullScreenApp: (): void => {
    throw new Error('onFullScreenApp method should be implemented')
  },
  onRestoreApp: (): void => {
    throw new Error('onRestoreApp method should be implemented')
  },
  appMode: initialAppMode,
})

interface IProps {
  children: ReactNode
}

export const AppApiContextProvider: React.FC<IProps> = ({ children }) => {
  const [appMode, setAppMode] = useState({ ...initialAppMode, isNormal: true })
  const onCloseApp = () => {
    // @ts-ignore
    if (window?.close) window.close()
  }
  const onMaximizeApp = useCallback(() => {
    // @ts-ignore
    if (window?.maximize) {
      // @ts-ignore
      window.maximize()
      setAppMode(() => ({
        ...initialAppMode,
        isMaximized: true,
      }))
    }
  }, [])
  const onMinimizeApp = useCallback(() => {
    // @ts-ignore
    if (window?.minimize) {
      // @ts-ignore
      window.minimize()
      setAppMode(() => ({
        ...initialAppMode,
        isMinimized: true,
      }))
    }
  }, [])
  const onSetMobileSize = () => {
    // @ts-ignore
    if (window?.mobileSize) {
      // @ts-ignore
      window.mobileSize({ width: 400, height: 700 })
      setAppMode(() => ({
        ...initialAppMode,
        isMobile: true,
      }))
    }
  }
  const onFullScreenApp = () => {
    // @ts-ignore
    if (window?.fullscreen) {
      // @ts-ignore
      window.fullscreen()
      setAppMode(() => ({
        ...initialAppMode,
        isFullscreen: true,
      }))
    }
  }
  const onRestoreApp = () => {
    // @ts-ignore
    if (window?.restore) {
      // @ts-ignore
      window.restore()
      setAppMode(() => ({
        ...initialAppMode,
        isNormal: true,
      }))
    }
  }

  return (
    <AppApiContext.Provider
      value={{
        onCloseApp,
        onMaximizeApp,
        onMinimizeApp,
        onSetMobileSize,
        onFullScreenApp,
        onRestoreApp,
        appMode,
      }}
    >
      {children}
    </AppApiContext.Provider>
  )
}

export const useAppApiContext = () => {
  const appApiContext = useContext(AppApiContext)

  return appApiContext
}
