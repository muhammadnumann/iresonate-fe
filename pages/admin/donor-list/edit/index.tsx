import React, { useEffect } from 'react'
import layout from 'antd/lib/layout'
import { withRouter } from 'next/router'
import { FormikProps } from 'formik'
import { compose } from 'recompose'
import { MutateProps } from '@apollo/react-hoc'
import { useLazyQuery } from '@apollo/client'

// Components
import SliderComponent from 'src/layouts/MainLayout'
import { WSForm, WSLoader} from 'src/component/common'
import AddMemberForm  from 'src/form/admin/adminDonor-edit-form/editDonor'
import { HeadElement } from 'src/component/core/headElement'

// constants
import { UserRoleType, WithRouterProps } from 'src/types'
import metaTitle from 'src/utils/metaTitle'
import { withAuth } from 'src/routecheck'
import { withAddMemberForm, withUpdateMemberMutation } from 'src/hoc'
import { IAddMemberForm } from 'src/hoc/AddMemberFormFormik'
import { MutationRegisterUserArgs, DonorWithToken } from 'src/typeGenerated'
import { clientAdmin } from 'pages/_app'
import { DonorDetail } from 'src/typeGeneratedAdmin'
import { cardTitle, completeProfileField, formLabelName, NetworkOnly } from 'src/utils/enums'

// schema
import { GET_USER } from 'src/graphql/Queries/queries'

interface IProps {}

const MemberAdd: React.FC<
  IProps &
    MutateProps<{ login: DonorWithToken }, MutationRegisterUserArgs> &
    FormikProps<IAddMemberForm> &
    WithRouterProps
> = ({ result, handleSubmit, setFieldValue, router, setValues, errors }) => {
  const { id } = router.query
  const [getMember, { data, loading }] = useLazyQuery<{ getUser: DonorDetail }>(
    GET_USER,
    {
      fetchPolicy: NetworkOnly,
      client: clientAdmin,
      variables: {
        id,
      },
    }
  )

  useEffect(() => {
    id && getMember()
  }, [id])

  useEffect(() => {
    setFieldValue('id', id)
    if (data?.getUser) {
      const user = data.getUser

      const address = user?.address?.length ? user.address[0] : null
      setFieldValue(formLabelName.firstName, user.firstName)
      setFieldValue(formLabelName.title, user.title)
      setFieldValue(formLabelName.lastName, user.lastName)
      setFieldValue(formLabelName.email, user.email)
      setFieldValue(formLabelName.mobileNumber, user.mobileNumber)
      setFieldValue(completeProfileField.mStreetAddress, address?.street || '')
      setFieldValue(completeProfileField.mCity, address?.city || '')
      setFieldValue(completeProfileField.mState, address?.state || '')
      setFieldValue(completeProfileField.mPostalCode, address?.postalCode || '')
      setFieldValue(completeProfileField.mCountry, address?.country || '')
      setFieldValue(formLabelName.password, '')
      setFieldValue(formLabelName.confirm_password, '')
    }
  }, [data?.getUser])

  return (
    <SliderComponent>
      <HeadElement title={metaTitle.EditDonor} />
      {loading ? (
        <WSLoader className="d-flex justify-content-center align-items-center h-100" />
      ) : (
        <WSForm className='addForm' {...layout} labelAlign='left'>
          <AddMemberForm
            onSubmit={() => handleSubmit()}
            loading={result.loading}
            isEdit={Boolean(id)}
            mainCardTitle={cardTitle.editDonor}
          />
        </WSForm>
      )}
    </SliderComponent>
  )
}

export default compose(
  withRouter,
  withUpdateMemberMutation,
  withAddMemberForm
)(withAuth(MemberAdd, UserRoleType.Admin))
