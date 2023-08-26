import { graphql } from '@apollo/client/react/hoc';
import { ADD_MEMBER_MUTATION } from 'src/graphql/Mutations/mutation';
import { MutationRegisterUserArgs, DonorWithToken } from 'src/typeGenerated';

export const withAddMemberMutation = graphql<any, {login: DonorWithToken}, MutationRegisterUserArgs>(ADD_MEMBER_MUTATION, {
    options: { ignoreResults: false },
  }
);