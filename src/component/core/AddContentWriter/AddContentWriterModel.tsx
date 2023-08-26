import { useLazyQuery } from '@apollo/client'
import { clientAdmin } from 'pages/_app'
import React, { useEffect, useState } from 'react'

// components
import { WSButton } from 'src/component/common/Button/WSButton'
import { WSForm } from 'src/component/common/form/WSForm'
import { WSFormItem } from 'src/component/common/formItem/WSFormItem'
import { WSInput } from 'src/component/common/Input/WSInput'
import WSLoader from 'src/component/common/loader/WSLoader'
import { WSModal } from 'src/component/common/modal/WSModal'
import { GET_ALL_USERS } from 'src/graphql/Queries/queries'
import { UserListUnion, Usertype } from 'src/typeGeneratedAdmin'
import { NetworkOnly } from 'src/utils/enums'
import { constantPageSize } from 'src/utils/staticData'

// Style
import './addContentWriterModel.less'

import { AutoComplete } from 'antd';




export interface AddContentWriterProps {
  loading?: boolean
  visible?: boolean
  onModalClose?: () => void
  handleSubmit?: () => void
  addFunc?: () => void
  initData?: any
  setFieldValue?: any
  loadingstatus?: boolean
  modelTitle?: string
  isLoading?: boolean
  dateBetween: any
  sortBy: any
  resetForm?: () => void
  addNewContentWriter?: () => void
}

const AddContentWriterModel: React.FC<AddContentWriterProps> = (
  props: AddContentWriterProps
) => {
  const {
    visible,
    onModalClose,
    handleSubmit,
    resetForm,
    setFieldValue,
    loadingstatus,
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

  const [emailValue, setEmailValue] = useState('')
  const [firstNameinput, setFirstNameInput] = useState('')
  const [lastNameinput, setLastNameInput] = useState('')
  const [markUp, setMarkUp] = useState('')


  // Content Writer List Which are Available 
  const current = 1
  const pageSize = constantPageSize
  const [showSearch, setShowSearch] = useState<string>('')
  const dateBetween = {}
  const sortBy = {}


  const [getAdminList, { data: PaginatedTransactionListType, loading }] =
    useLazyQuery<{ getAllUsers: UserListUnion }>(GET_ALL_USERS, {
      fetchPolicy: NetworkOnly,
      client: clientAdmin,
    })

  useEffect(() => {
    getAdminList({
      variables: {
        limit: pageSize,
        offset: 2,
        userType: Usertype.ContentWriter,
        searchTerm: showSearch,
        ...sortBy,
        ...dateBetween,
      },
    })
  }, [showSearch, pageSize, current])

  const submit = () => {
    setFieldValue('email', emailValue);
    setFieldValue('firstName', firstNameinput);
    setFieldValue('lastName', lastNameinput);
    setFieldValue('markUp', markUp);
    handleSubmit()
  }

  let userdata;
  if (!loading) {
    userdata = PaginatedTransactionListType?.getAllUsers.contentWriter
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

          <WSButton type='primary' loading={loadingstatus} onClick={() => {

            submit();
          }}
          >
            Submit
          </WSButton>
          <WSButton type='primary' onClick={onCloseModal}>
            Cancel
          </WSButton>
        </>,
      ]}
    >
      {' '}
      {isLoading ? (
        <WSLoader />
      ) : (
        <WSForm className='addForm' {...layout} labelAlign='left'>
          <WSFormItem required label='Title'>
            <WSInput name='title' placeholder='Title' />
          </WSFormItem>
          <WSFormItem required label='First Name'>
            <WSInput name='firstName' placeholder='First Name' value={firstNameinput} onChange={(e) => setFirstNameInput(e.target.value)} />
          </WSFormItem>
          <WSFormItem required label='Last Name'>
            <WSInput name='lastName' placeholder='Last Name' value={lastNameinput} onChange={(e) => setLastNameInput(e.target.value)} />
          </WSFormItem>

          <WSFormItem required label='Email Address'>
            <WSInput name='email' parentClassName='d-none' placeholder='Email Address' value={emailValue}
              onChange={(e) => {
                setEmailValue(e.target.value)
              }}
            />
            <AutoComplete
              options={(userdata || []).map((d) => ({
                value: d?.email
              }))}
              placeholder="Email"
              filterOption={(inputValue, option) => {
                setEmailValue(inputValue)
                setShowSearch(inputValue)
                return option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
              }
            />

          </WSFormItem>
          <WSFormItem required label='Mark Up (%)'>
            <WSInput name='markUp' maxLength={2} placeholder='Mark Up' value={markUp} onChange={(e) => { setMarkUp(e.target.value) }} />
          </WSFormItem>
        </WSForm>
      )}
    </WSModal>
  )
}
export default AddContentWriterModel
