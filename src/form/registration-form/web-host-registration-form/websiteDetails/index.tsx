import React, { useEffect, useState } from 'react'
// Component
import {
  WSButton,
  WSCol,
  WSRow,
  WSTitle,
  WSTable,
  WSSwitch,
  WSImage,
  WSInput,
} from 'src/component/common'
// constant
import { formLabelName, stepFormDetails } from 'src/utils/enums'
import { images } from 'src/utils/image'
// Style
import './websiteDetails.less'

interface IProps {
  initialData: any
  setFieldValue?: (name: string, event: (string | undefined)[] | string) => void
  errors: string
}
const WebsiteDetails: React.FC<IProps> = (
  {
    setFieldValue,
    initialData,
    errors,
  }) => {
  const [state, setState] = useState(initialData?.websiteDemo)
  const [editData, setEditData] = useState({
    index: 0,
    clickMe: false,
  })

  useEffect(() => {
    setState(initialData?.websiteDemo)
  }, [initialData?.websiteDemo])

  const columns = [
    {
      title: 'Website',
      dataIndex: 'url',
      render: (temp, record, index) => {
        return <WSImage src={images.edit} className="cursor-pointer"
          onClick={async () => {
            setEditData({ clickMe: true, index: index })
            setFieldValue(formLabelName.websiteTitle, record?.url?.replace('https://', ''))
          }
          }
          width='15px'
        />
      },
      width: 100,
    },
    {
      dataIndex: 'url',
    },
    {
      title: 'Add Click Tip',
      render: (temp, record, index) => {
        return (
          <WSSwitch
            checked={record?.clickTip}
            onClick={async (e) => {
              const newState = state
              newState[index].clickTip = e
              await setFieldValue(formLabelName.websiteDemo, newState)
              // setFieldValue(formLabelName.websiteDemo, [ TODO:Need this code
              //   ...initialData?.websiteDemo.map((item) =>
              //     item?.url === record?.url ? { ...item,clickTip:!item?.clickTip } : { ...item }
              //   ),
              // ])
            }}
          />
        )
      },
    },
  ]

  return (
    <div className='add-website-main-details'>
      <div className='add-website-main-details-form'>
        <WSTitle level={2} className='details-title'>
          {stepFormDetails.webHostAddWebsite}
        </WSTitle>
        <p className='content'>
          {stepFormDetails.webHostAddWebsiteContent}
        </p>
        <div className='add-website-main-form'>
          <WSRow>
            <WSCol span={24}>
              <label className='form-label'>{formLabelName.websiteURL}</label>
            </WSCol>
            <WSCol xs={24} sm={24} md={19} lg={17} xl={19} xxl={19}>
              <WSInput
                type='text'
                name='websiteTitle'
                placeholder={formLabelName.enterYourWebsiteURL}
                className='form-control website-input'
                addonBefore="https://"
              />
            </WSCol>
            <WSCol xs={24} sm={24} md={5} lg={7} xl={5} xxl={5}>
              <WSButton
                type='primary'
                onClick={(e) => {
                  if (!errors && initialData?.websiteTitle !== '' && !editData?.clickMe) {
                    setFieldValue(formLabelName.websiteDemo, [
                      ...initialData?.websiteDemo,
                      { url: `https://${initialData?.websiteTitle}`, clickTip: true },
                    ])
                  }
                  if (!errors && editData?.clickMe) {
                    const init = initialData?.websiteDemo
                    init[editData?.index].url = `https://${initialData?.websiteTitle}`
                    setFieldValue(formLabelName.websiteDemo, init)
                    setEditData({ clickMe: false, index: null })
                  }
                  setFieldValue(!errors && formLabelName.websiteTitle, '')
                }}
                className='add-website-btn'
              >
                {editData?.clickMe
                  ? formLabelName.editWebsiteBtn
                  : formLabelName.addWebsiteBtn}
              </WSButton>
            </WSCol>
          </WSRow>
          <WSRow>
            <WSCol span={24}>
              <WSTable
                className='add-website-table'
                columns={columns}
                dataSource={state}
              />
            </WSCol>
          </WSRow>
        </div>
      </div>
    </div>
  )
}

export default WebsiteDetails
