import React from 'react'
// @ts-ignore
import JSONInput from 'react-json-editor-ajrm'
// @ts-ignore
import locale from 'react-json-editor-ajrm/locale/ru'
import { Button } from 'ui-neumorphism'
import { ErrorBoundary } from '~/common/hocs/ErrorBoundary'
import { PaddedLikeParagraph, ResponsiveBlock } from '~/common/components'
import { useJsonEditorContext } from '~/common/hooks'

export const AddStructure0: React.FC = () => {
  const { onChangeStructureEditor, state } = useJsonEditorContext()

  return (
    <JSONInput
      id="a_unique_id"
      placeholder={state.structure || {}}
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
      height="400px"
      onChange={onChangeStructureEditor}
    />
  )
}

export const AddStructure: React.FC = () => {
  const { state, onSendStructure } = useJsonEditorContext()
  return (
    <>
      <ResponsiveBlock bgColor="#3E3D42" isFullWidth>
        <ErrorBoundary>
          <PaddedLikeParagraph>
            <AddStructure0 />
          </PaddedLikeParagraph>
        </ErrorBoundary>
      </ResponsiveBlock>
      <ResponsiveBlock>
        <PaddedLikeParagraph>
          <Button
            dark
            onClick={() => {
              if (state?.structure) {
                onSendStructure(JSON.stringify(state.structure))
              }
            }}
          >
            Save
          </Button>
        </PaddedLikeParagraph>
      </ResponsiveBlock>
    </>
  )
}
