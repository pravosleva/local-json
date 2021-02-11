import React from 'react'
// @ts-ignore
import locale from 'react-json-editor-ajrm/locale/ru'
// @ts-ignore
import JSONInput from 'react-json-editor-ajrm'
import { Button } from 'ui-neumorphism'
import Icon from '@mdi/react'
import { mdiContentSave, mdiLoading } from '@mdi/js'
import { ErrorBoundary } from '~/common/hocs/ErrorBoundary'
import { PaddedLikeParagraph } from '~/common/components'
// @ts-ignore
import { useJsonEditorContext } from '~/common/hooks'
// @ts-ignore
import { Box } from '~/common/components/Box'
import { defaultBoxHeight } from '~/common/components/layout/constants'

const AddStructure0: React.FC = () => {
  const { onChangeStructureEditor, state } = useJsonEditorContext()

  return (
    <JSONInput
      id="a_unique_id"
      placeholder={state.structure || {}}
      colors={{
        // NOTE: overrides theme colors with whatever color value you want
        keys: '#e63946',
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
      theme="dark_vscode_tribute"
      // theme="light_mitsuketa_tribute"
      locale={locale}
      height={`${defaultBoxHeight}px`}
      onChange={onChangeStructureEditor}
      waitAfterKeyPress={2000}
    />
  )
}

export const Tab0Content: React.FC = () => {
  const {
    onSendStructure,
    state,
    isValidParams,
    // makeRandomProjectName,
    resetState,
    getStructureByProjectName,
  } = useJsonEditorContext()
  const handleGetStructure = () => {
    getStructureByProjectName(state.projectName, true)
  }
  const handleSave = () => {
    onSendStructure()
  }
  const handleReset = () => {
    resetState()
  }

  return (
    <>
      <ErrorBoundary>
        <PaddedLikeParagraph>
          <AddStructure0 />
        </PaddedLikeParagraph>
      </ErrorBoundary>
      <PaddedLikeParagraph>
        <Box isRight>
          {/* <Button
            dark
            disabled={isValidParams}
            onClick={() => {
              makeRandomProjectName()
            }}
          > Random Project Name</Button> */}
          <Button
            dark
            disabled={state.isLoading || state.isFound || !state.projectName}
            onClick={handleGetStructure}
          >
            Get structure by project name {state.isLoading && <span>...</span>}
          </Button>
          <Button
            dark
            disabled={!isValidParams || state.isLoading || state.isCreated}
            onClick={handleSave}
            bordered
          >
            <>
              <Icon
                path={state.isLoading ? mdiLoading : mdiContentSave}
                spin={state.isLoading ? 1 : false}
                size={0.7}
                style={{ marginRight: '10px' }}
              />
              <span>Save</span>
            </>
          </Button>
          {state.isCreated && (
            <Button dark onClick={handleReset}>
              Reset
            </Button>
          )}
        </Box>
      </PaddedLikeParagraph>
    </>
  )
}
