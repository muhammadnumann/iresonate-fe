import React from 'react';
import layout from 'antd/lib/layout';
import { withRouter } from 'next/router'
import { FormikProps } from 'formik';
import { compose } from 'recompose'
import { MutateProps } from "@apollo/react-hoc";

// Components
import SliderComponent from 'src/layouts/MainLayout';
import { WSForm } from 'src/component/common';
import AddMemberForm  from 'src/form/admin/adminDonor-edit-form/editDonor'
import { HeadElement } from 'src/component/core';

// constants
import { UserRoleType } from 'src/types'
import { withAuth } from 'src/routecheck'
import metaTitle from 'src/utils/metaTitle';
import { withAddMemberForm, withAddMemberMutation } from 'src/hoc';
import { IAddMemberForm } from 'src/hoc/AddMemberFormFormik';
import { MutationRegisterUserArgs, DonorWithToken } from 'src/typeGenerated';
import { cardTitle } from 'src/utils/enums';


interface IProps { }

const MemberAdd: React.FC<
  IProps &
  MutateProps<{ login: DonorWithToken }, MutationRegisterUserArgs> &
  FormikProps<IAddMemberForm>
> = ({ result, handleSubmit }) => {
  return (<>
    <SliderComponent>
      <HeadElement title={metaTitle.AddDonor} />

      <WSForm className='addForm' {...layout} labelAlign='left'>
        <AddMemberForm
          onSubmit={() => handleSubmit()}
          loading={result.loading}
          mainCardTitle={cardTitle.donors}
        />
      </WSForm>
    </SliderComponent>
  </>)
}

export default compose(
  withRouter,
  withAddMemberMutation,
  withAddMemberForm,
)(withAuth(MemberAdd, UserRoleType.Admin))