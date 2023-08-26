import { graphql } from '@apollo/client/react/hoc';
import { clientAdmin } from 'pages/_app';
import { UPDATE_MEMBER_MUTATION } from 'src/graphql/Mutations/mutation';
import { MutationUpdateDonorArgs, Response } from 'src/typeGeneratedAdmin';

export const withUpdateMemberMutation = graphql<any, {updateDonor: Response}, MutationUpdateDonorArgs>(UPDATE_MEMBER_MUTATION, 
  {
    options: { ignoreResults: false ,client:clientAdmin },
  }
);