/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useMemo, useState } from 'react'
import { Tabs, Tab, TabItems, TabItem } from 'ui-neumorphism'
// @ts-ignore
import Icon from '@mdi/react'
import { mdiFile, mdiDelete } from '@mdi/js'
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
    removeRemoteStructure,
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
        const { projectName } = props
        const handleClick = (e: any) => {
          onChangeProjectName(projectName)
          setActiveTabIndex(0)
          setTimeout(() => getStructureByProjectName(projectName), 2000)
        }
        const handleRemove = (e: any) => {
          removeRemoteStructure(projectName)
        }

        return {
          ...props,
          projectNameJsx: (
            <div
              key={projectName}
              className="file-name tbody-item_red-on-hover"
              onClick={handleClick}
            >
              <Icon path={mdiFile} size={0.7} />{' '}
              <span>{props.projectName}</span>
            </div>
          ),
          removeProjectJsx: (
            <div
              key={projectName}
              className="tbody-item_red-on-hover"
              onClick={handleRemove}
            >
              <Icon path={mdiDelete} size={0.7} />
            </div>
          ),
        }
      }),
    [
      state.projectList,
      onChangeProjectName,
      setActiveTabIndex,
      getStructureByProjectName,
      removeRemoteStructure,
    ]
  )

  return (
    <>
      {/* <ResponsiveBlock bgColor="#3E3D42" isFullWidth></ResponsiveBlock> */}
      <ResponsiveBlock>
        <>
          <Box isCentered noMarginBottom>
            <TextField
              // loading={state.isLoading}
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
            <ResponsiveBlock isPaddedMobile>
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
                <Tab>Local state</Tab>
              </Tabs>
            </ResponsiveBlock>
            <TabItems value={activeTabIndex}>
              <TabItem>
                <ResponsiveBlock isPaddedMobile>
                  <Tab0Content />
                </ResponsiveBlock>
              </TabItem>
              <TabItem>
                {projectList.length > 0 ? (
                  <ResponsiveBlock isPaddedMobile>
                    <DenseTable
                      items={projectList}
                      headers={[
                        {
                          text: 'Could be interested',
                          value: 'projectNameJsx',
                        },
                        {
                          text: 'Remove',
                          value: 'removeProjectJsx',
                          align: 'right',
                        },
                      ]}
                    />
                  </ResponsiveBlock>
                ) : (
                  <ResponsiveBlock isPaddedMobile>
                    <div>No items.</div>
                  </ResponsiveBlock>
                )}
              </TabItem>
              <TabItem>
                <ResponsiveBlock isPaddedMobile>
                  <pre style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}>
                    {JSON.stringify(state, null, 2)}
                  </pre>
                </ResponsiveBlock>
              </TabItem>
            </TabItems>
          </>
        </>
      </ResponsiveBlock>
    </>
  )
}
