import { FormikErrors } from 'formik'
import React, { useState } from 'react'
// Component
import {
  WSInput,
  WSButton,
  WSCol,
  WSImage,
  WSRow,
  WSSwitch,
  WSTable,
  WSTitle,
} from 'src/component/common'
import { EditAdminWebHostFormProps } from 'src/form/admin/webhost-edit-page/web-Host-edit'
// constant 
import { formLabelName } from 'src/utils/enums'
import { images } from 'src/utils/image'
// styles
import "../../admin/webHostList-edit-form/editWebHost.less"

interface IProps {
  websiteIntitialValue: EditAdminWebHostFormProps
  errors: FormikErrors<EditAdminWebHostFormProps>
  setFieldValue?: (name: string, event: (string | undefined)[] | string) => void
}
const WebsiteSteps: React.FC<IProps> = ({
  websiteIntitialValue,
  errors,
  setFieldValue,
}) => {

  const [editData, setEditData] = useState({
    index:0,
    clickMe: false,
  })
  const dataSource = websiteIntitialValue?.websites || []
  const columns = [
    {
      title: 'Website',
      dataIndex:'url',
      render: (temp, record, index) => {
        return <WSImage src={images?.edit} width='15px' className="cursor-pointer"
        onClick={ async () => {
          setEditData({ clickMe:true, index:index })
          setFieldValue(formLabelName?.websiteTitle,record?.url)
        }}
        />
      },
      width: 100,
    },
    {
      dataIndex: 'url',
    },
    {
      title: 'Add Click Tip',
      render: (temp,record,index) => {
        return (
          <WSSwitch
            checked={record?.clickTip}
            onClick={async (e) => {
              const newState = dataSource
              newState[index].clickTip = e
              await setFieldValue(formLabelName?.websites, newState)
            }}
          />
        )
      },
      width: 150,
    },
  ]

  
  
  return (
    <div className='add-website-form'>
      <WSTitle level={5}> {formLabelName?.addYourWebsite} </WSTitle>
      <div className='main-form'>
        <WSRow gutter={[16, 10]}>
          <WSCol span={24}>
            <label className='form-label'>{formLabelName?.websiteURL}</label>
          </WSCol>
          <WSCol span={10}>
            <WSInput
              type='text'
              name='websiteTitle'
              placeholder={formLabelName?.enterYourWebsiteURL}
              className='form-control'
            />
          </WSCol>
          <WSCol span={2}>
            <WSButton
              type='primary'
              onClick={(e) => {
                if (!Object.keys(errors).length && websiteIntitialValue?.websiteTitle !== '' && !editData?.clickMe) {
                  setFieldValue(formLabelName.websites, [
                    ...websiteIntitialValue?.websites,
                    { url: websiteIntitialValue?.websiteTitle, clickTip: true },
                  ])
                  setFieldValue(formLabelName.websiteTitle,'')
                } if(!Object.keys(errors).length && editData?.clickMe){
                  const init = websiteIntitialValue?.websites
                  init[editData?.index].url = websiteIntitialValue?.websiteTitle
                    setFieldValue(formLabelName.websites, init)
                    setEditData({clickMe: false,index:null})
                    setFieldValue(formLabelName.websiteTitle,'')
                  }
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
              dataSource={dataSource}
            />
          </WSCol>
        </WSRow>
      </div>
    </div>
  )
}

export default WebsiteSteps
