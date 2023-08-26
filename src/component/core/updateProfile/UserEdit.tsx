import React from 'react'
import { WSButton } from 'src/component/common/Button/WSButton'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { WSToolTip } from 'src/component/common/toolTip/WSToolTip'

interface UserProps {
  onEdit?: () => void
  eye?:boolean
}

export const UserEdit: React.FC<UserProps> = ({ onEdit,eye }) => {
  return (
    <WSToolTip title={eye?"View":"Edit"}>
      <WSButton type='primary' icon={eye ? <EyeOutlined /> : <EditOutlined />} onClick={onEdit} />
    </WSToolTip>
  )
}
