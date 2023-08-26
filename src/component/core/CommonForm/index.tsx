import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'
// Component
import { WSButton, WSCard, WSSpace } from 'src/component/common'
// constant
// Style
import './commonForm.less'

export interface IProps {
  cardTile?: string
  addBankAccount?: boolean
  addBankButtonName?: string
  bankBtnSubmit?:(e) => void
  bankBtnLoading?: boolean
  copyScriptClickURL?:ReactNode
}

const CommonForm: React.FC<IProps> = ({
  cardTile,
  children,
  addBankAccount,
  addBankButtonName,
  bankBtnSubmit,
  bankBtnLoading,
  copyScriptClickURL
}) => {
  const router = useRouter()
  return (
    <>
      <WSCard
        title={cardTile}
        className='common-card-details'
        extra={
          <div className='d-flex card-button-extra'>
            <WSSpace>
              {copyScriptClickURL && <div>
              {copyScriptClickURL}
              </div> }
              <WSButton type='default' onClick={() => router.back()}>
                Back
              </WSButton>
              {/* {!disabledFieldView && (
                TODO:Need this code
                <WSButton
                  type='primary'
                  onClick={handleSubmit}
                  loading={submitLoading}
                >
                  {submitLoading ? formLabelName.submitting : formLabelName.submit}
                </WSButton>
              )} */}
              {addBankAccount && <WSButton
                  type='primary'
                  onClick={bankBtnSubmit}
                  loading={bankBtnLoading}
                >
                  {addBankButtonName}
                </WSButton>}
            </WSSpace>

          </div>
        }
      >
        <div className='member-edit-form'>{children}</div>
      </WSCard>
    </>
  )
}

export default CommonForm
