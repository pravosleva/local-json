/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useMemo, useState } from 'react'
import { Tabs, Tab, TabItems, TabItem } from 'ui-neumorphism'
// @ts-ignore
import Icon from '@mdi/react'
import { mdiFile } from '@mdi/js'
import { TextField } from '~/common/components/TextField'
import { ResponsiveBlock, DenseTable } from '~/common/components'
import { useJsonEditorContext } from '~/common/hooks'
import { Box } from '~/common/components/Box'
import { Tab0Content } from './components/Tab0Content'

export const AddStructure: React.FC = () => {
  const {
    state,
    onChangeProjectName,
    getStructureByProjectName,
  } = useJsonEditorContext()
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0)
  const handleChange = (e: any) => {
    // console.log(e) // {event, id, valid, value }
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
      {/* <ResponsiveBlock bgColor="#3E3D42" isFullWidth></ResponsiveBlock> */}
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
              <Tab>Structure</Tab>
              <Tab>
                Projects
                {projectList.length > 0 ? ` (${projectList.length})` : ''}
              </Tab>
              <Tab>Analysis</Tab>
            </Tabs>
            <TabItems value={activeTabIndex}>
              <TabItem>
                <Tab0Content />
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
              <TabItem>In progress...</TabItem>
            </TabItems>
          </>
        </>
      </ResponsiveBlock>
    </>
  )
}
