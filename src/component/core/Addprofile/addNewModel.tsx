import React from 'react'
// component
import { WSButton } from 'src/component/common/Button/WSButton'
import { WSFormItem } from 'src/component/common/formItem/WSFormItem'
import { WSInput } from 'src/component/common/Input/WSInput'
import { WSModal } from 'src/component/common/modal/WSModal'
import { WSForm } from 'src/component/common/form/WSForm'
import { WSPassword } from 'src/component/common/password/WSPassword'
import WSLoader from 'src/component/common/loader/WSLoader'
//Style
import './addAdmin.less'

export interface AddFormProps {
  visible?: boolean
  form?: any
  onModalClose?: () => void
  handleSubmit?: () => void
  addFunc?: () => void
  type?: string
  loading?: boolean
  initData?: any
  modelTitle?: string
  resetForm?: () => void
  isLoading?: boolean
}

const AddNewModel: React.FC<AddFormProps> = (props: AddFormProps) => {
  const {
    visible,
    onModalClose,
    handleSubmit,
    loading,
    initData,
    resetForm,
    modelTitle,
    isLoading,
  } = props
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
  }

  const onCloseModal = () => {
    resetForm && resetForm()
    onModalClose && onModalClose()
  }

  return (
    <WSModal
      visible={visible}
      width='600px'
      className='add-new-item-model'
      closable
      onCancel={onCloseModal}
      title={modelTitle}
      footerFunction={[
        <>
          <WSButton type='primary' loading={loading} onClick={handleSubmit}>
            Submit
          </WSButton>
          <WSButton type='primary' onClick={onCloseModal}>
            Cancel
          </WSButton>
        </>,
      ]}
    >
      {isLoading ? (
        <WSLoader />
      ) : (
        <WSForm className='addForm' {...layout} labelAlign='left'>
          <WSFormItem required label='Name'>
            <WSInput name='name' placeholder='Name' />
          </WSFormItem>
          <WSFormItem required label='Email Address'>
            <WSInput name='email' placeholder='Email Address' />
          </WSFormItem>

          {!initData && (
            <WSFormItem required label='Password'>
              <WSPassword
                type='password'
                name='password'
                placeholder='Password'
              />
            </WSFormItem>
          )}
        </WSForm>
      )}
    </WSModal>
  )
}

export default AddNewModel
