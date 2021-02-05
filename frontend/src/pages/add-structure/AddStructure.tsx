/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useMemo, useState } from 'react'
// @ts-ignore
import JSONInput from 'react-json-editor-ajrm'
// @ts-ignore
import locale from 'react-json-editor-ajrm/locale/ru'
import { Button, Tabs, Tab, TabItems, TabItem } from 'ui-neumorphism'
import styled, { css } from 'styled-components'
// @ts-ignore
import Icon from '@mdi/react'
import { mdiFile } from '@mdi/js'
import { TextField } from '~/common/components/TextField'
import { ErrorBoundary } from '~/common/hocs/ErrorBoundary'
import {
  PaddedLikeParagraph,
  ResponsiveBlock,
  DenseTable,
} from '~/common/components'
import { useJsonEditorContext } from '~/common/hooks'

interface IBoxProps {
  isCentered?: boolean
  isRight?: boolean
  noMarginBottom?: boolean
}
const Box = styled('div')<IBoxProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  ${({ isCentered }) =>
    isCentered &&
    css`
      justify-content: center;
    `}
  ${({ isRight }) =>
    isRight &&
    css`
      justify-content: flex-end;
    `}
  ${({ noMarginBottom }) =>
    !noMarginBottom &&
    css`
      & > * {
        margin-bottom: 10px;
      }
    `}
  & > *:not(:first-child) {
    margin-left: 10px;
  }
`

export const AddStructure0: React.FC = () => {
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
      height="310px"
      onChange={onChangeStructureEditor}
      waitAfterKeyPress={2000}
    />
  )
}

export const AddStructure: React.FC = () => {
  const {
    onSendStructure,
    state,
    onChangeProjectName,
    isValidParams,
    // makeRandomProjectName,
    resetState,
    getStructureByProjectName,
  } = useJsonEditorContext()
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0)
  const handleChange = (e: any) => {
    // console.log(e) // {event, id, valid, value }
    // console.log('---')
    onChangeProjectName(e.value)
  }
  const projectName = useMemo(() => state.projectName, [state.projectName])
  const projectList = useMemo(
    () =>
      state.projectList.map((props) => {
        const { fileName } = props
        const handleClick = (e: any) => {
          onChangeProjectName(fileName)
          setActiveTabIndex(0)
          setTimeout(() => getStructureByProjectName(fileName), 2000)
        }

        return {
          ...props,
          jsx: (
            <div key={fileName} className="file-name" onClick={handleClick}>
              <Icon path={mdiFile} size={0.7} /> <span>{props.fileName}</span>
            </div>
          ),
        }
      }),
    [
      state.projectList,
      onChangeProjectName,
      setActiveTabIndex,
      getStructureByProjectName,
    ]
  )

  return (
    <>
      {/* <ResponsiveBlock bgColor="#3E3D42" isFullWidth>
        
      </ResponsiveBlock> */}
      <ResponsiveBlock isPaddedMobile>
        <>
          <Box isCentered noMarginBottom>
            <TextField
              loading={state.isLoading}
              // key={projectName}
              // autofocus
              type="text"
              name="projectName"
              rules={[
                (value: string) => {
                  return !value ? 'Should not be empty' : true
                },
              ]}
              label="Project name"
              value={projectName}
              onChange={handleChange}
            />
          </Box>
          <>
            <Tabs
              dark
              value={activeTabIndex}
              onChange={({ active }: any) => setActiveTabIndex(active)}
            >
              <Tab>Item 1</Tab>
              <Tab>
                Projects
                {projectList.length > 0 ? ` (${projectList.length})` : ''}
              </Tab>
            </Tabs>
            <TabItems value={activeTabIndex}>
              <TabItem>
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
                      >
                        Random Project Name
                      </Button> */}
                      <Button
                        dark
                        disabled={
                          state.isLoading || state.isFound || !state.projectName
                        }
                        onClick={() => {
                          getStructureByProjectName(state.projectName)
                        }}
                      >
                        Get structure by project name{' '}
                        {state.isLoading && <span>...</span>}
                      </Button>
                      <Button
                        dark
                        disabled={
                          !isValidParams || state.isLoading || state.isCreated
                        }
                        onClick={() => {
                          onSendStructure()
                        }}
                      >
                        Save {state.isLoading && <span>...</span>}
                      </Button>
                      {state.isCreated && (
                        <Button
                          dark
                          onClick={() => {
                            resetState()
                          }}
                        >
                          Reset
                        </Button>
                      )}
                    </Box>
                  </PaddedLikeParagraph>
                </>
              </TabItem>
              <TabItem>
                {projectList.length > 0 && (
                  <ResponsiveBlock isPaddedMobile>
                    <DenseTable
                      items={projectList}
                      headers={[
                        {
                          text: 'Could be interested',
                          value: 'jsx',
                        },
                        // { text: 'test val', value: 'tstVal' },
                      ]}
                    />
                  </ResponsiveBlock>
                )}
              </TabItem>
            </TabItems>
          </>
        </>
      </ResponsiveBlock>
    </>
  )
}
