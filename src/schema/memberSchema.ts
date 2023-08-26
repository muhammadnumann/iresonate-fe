import { useMutation } from '@apollo/client'

import { clientAdmin } from 'pages/_app'
import { WSMessage } from 'src/component/common/message/WSMessage'
import {
  CHANGE_USER_STATUS,
  REGISTER_USER_ADMIN,
  UPDATE_USER,
  MAKE_PAYMENT,
  FORGOT_RESET_PASSWORD,
  RESET_PASSWORD_MEMBER,
  VERIFY_ACCOUNT,
  DELETE_CONTENT_WRITER,
  UPDATE_CONTENT_WRITER,
  CREATE_CONTENT_WRITER,
} from '../graphql/Mutations/mutation'

import { GET_ALL_USERS, GET_USER, CONTENT_WRITER_LIST } from 'src/graphql/Queries/queries'
import { useRouter } from 'next/router'
import messageHelper from '../utils/message'
import {
  getCurrentUser,
  removeDataInCache,
  setLocalStorageItem,
} from '../utils/helper'
import { Roles, Usertype } from '../typeGeneratedAdmin'
import { DateProps, SortProps } from 'src/types'

export function useDeleteRole(
  pageSize,
  current,
  Usertype: Roles,
  searchTerm,
  sortBy,
  dateBetween
) {
  const [mutate, { data, error, loading }] = useMutation(CHANGE_USER_STATUS, {
    client: clientAdmin,
    refetchQueries: ['getAllUsers'],
  })
  return { mutate, data, error, loading }
}

export function ContentWriterBlock(
  pageSize: any,
  current: any,
  searchTerm: any,
  dateBetween: any,
  sortBy: any
) {
  const [mutate, { data, error, loading }] = useMutation(CHANGE_USER_STATUS, {
    client: clientAdmin,
    update(cache, { data }) {
      const newCategoryFromResponce = data.changeUserStatus
      const exsistingUserList: any = cache.readQuery({
        query: CONTENT_WRITER_LIST,
        variables: {
          limit: pageSize,
          offset: current,
          searchTerm: searchTerm,
          ...dateBetween,
          ...sortBy,
        },
      })
      try {
        cache.writeQuery({
          query: CONTENT_WRITER_LIST,
          variables: {
            limit: pageSize,
            offset: current,
            searchTerm: searchTerm,
            ...dateBetween,
            ...sortBy,
          },
          data: {
            contentWriterList: exsistingUserList.contentWriterList.nodes.map(
              (dataExsisting: any) => {
                if (dataExsisting._id === newCategoryFromResponce._id) {
                  return {
                    ...dataExsisting,
                    status: !dataExsisting.status,
                  }
                }
                return null
              }
            ),
          },
        })
      } catch {
        console.log('No')
      }
    },
  })
  return { mutate, data, error, loading }
}

//admin
export function useRegisterUser(
  userTypeLocal?: string,
  onModalClose?: (() => void) | undefined
) {
  const router = useRouter()

  const [mutate, { data, error, loading }] = useMutation(REGISTER_USER_ADMIN, {
    client: clientAdmin,
    update(cache, { data: dataUpdate }: any) {
      {
        userTypeLocal === Usertype.Admin
          ? WSMessage({
              type: 'success',
              messageValue: 'Admin user has been added successfully',
            })
          : userTypeLocal === Usertype.Member
          ? WSMessage({
              type: 'success',
              messageValue: 'Member has been added successfully',
            })
          : WSMessage({
              type: 'success',
              messageValue: 'Vendor has been added successfully',
            })
      }
      const newAdminFromResponce = dataUpdate.registerUser.userInfo

      const exsistingUserList: any = cache.readQuery({
        query: GET_ALL_USERS,
        variables: {
          limit: 10,
          offset: 1,
          userType: userTypeLocal,
          searchTerm: '',
        },
      })

      const newData = exsistingUserList
        ? {
            getAllUsers: {
              nodes: [
                newAdminFromResponce,
                ...exsistingUserList?.getAllUsers?.nodes,
              ],
              totalCount: 10,
            },
          }
        : undefined

      cache.writeQuery({
        query: GET_ALL_USERS,
        variables: {
          limit: 10,
          offset: 1,
          userType: userTypeLocal,
          searchTerm: '',
        },
        data: newData,
      })
      onModalClose && onModalClose()
    },
  })
  return { mutate, data, error, loading }
}

// ADMIN Update Profile

export function updateAdminProfile() {
  const currentUser = getCurrentUser()
  const [mutate, { data, error, loading }] = useMutation(UPDATE_USER, {
    client: clientAdmin,
    update(cache, { data: dataUpdate }) {
      const newUpdateUserResponse = dataUpdate.updateUser
      cache.readQuery({
        query: GET_USER,
        variables: {
          id: currentUser?._id,
        },
      })
      cache.writeQuery({
        query: GET_USER,
        variables: {
          id: currentUser?._id,
        },
        data: {
          getUser: {
            newUpdateUserResponse,
          },
        },
      })
      setLocalStorageItem('currentUser', JSON.stringify(newUpdateUserResponse))
      WSMessage({
        type: 'success',
        messageValue: 'Your profile has been updated successfully',
      })
    },
  })
  return { mutate, data, error, loading }
}

// Update all Profiles
export function updateAdminAllProfileDetails(
  userTypeLocal?: string,
  onModalClose?: (() => void) | undefined
) {
  const [mutate, { data, error, loading }] = useMutation(UPDATE_USER, {
    client: clientAdmin,
    update(cache, { data: dataUpdate }) {
      const newUpdateUserResponse = dataUpdate.updateUser

      {
        newUpdateUserResponse?.role?.name === 'end-user'
          ? WSMessage({
              type: 'success',
              messageValue: 'Member has been updated successfully',
            })
          : newUpdateUserResponse?.role?.name === 'admin'
          ? WSMessage({
              type: 'success',
              messageValue: 'Admin user has been updated successfully',
            })
          : WSMessage({
              type: 'success',
              messageValue: 'Vendor has been updated successfully',
            })
      }
      const existingUserData: any = cache.readQuery({
        query: GET_ALL_USERS,
        variables: {
          offset: 1,
          limit: 10,
          userType: userTypeLocal,
          searchTerm: '',
        },
      })

      const newData = existingUserData
        ? {
            getAllUsers: {
              ...existingUserData.getAllUsers,
              nodes: existingUserData.getAllUsers.nodes.map((val) => {
                return newUpdateUserResponse._id === val._id
                  ? {
                      ...val,
                      ...newUpdateUserResponse,
                    }
                  : val
              }),
            },
          }
        : undefined

      existingUserData &&
        cache.writeQuery({
          query: GET_ALL_USERS,
          variables: {
            offset: 1,
            limit: 10,
            userType: Usertype.Admin,
            searchTerm: '',
          },
          data: newData,
        })
      onModalClose && onModalClose()
    },
  })
  return { mutate, data, error, loading }
}

// MEMBER Update Profile
export function updateMemberProfileDetails() {
  const currentUser = getCurrentUser()

  const [mutate, { data, error, loading }] = useMutation(UPDATE_USER, {
    update(cache, { data: dataUpdate }) {
      const newUpdateUserResponse = dataUpdate.updateUser
      cache.readQuery({
        query: GET_USER,
        variables: {
          id: currentUser?._id,
        },
      })
      cache.writeQuery({
        query: GET_USER,
        variables: {
          id: currentUser?._id,
        },
        data: {
          getUser: {
            newUpdateUserResponse,
          },
        },
      })
      WSMessage({
        type: 'success',
        messageValue: 'Your profile has been updated successfully',
      })
      setLocalStorageItem('currentUser', JSON.stringify(newUpdateUserResponse))
    },
  })
  return { mutate, data, error, loading }
}

//member
export function makePaymentDetails() {
  const [mutate, { data, error, loading }] = useMutation(MAKE_PAYMENT, {
    update(cache, { data: dataUpdate }) {
      WSMessage({
        type: 'success',
        messageValue: 'Payment Successfully',
      })
    },
  })
  return { mutate, data, error, loading }
}

//Client Reset Password
export function ResetPasswordMemberMutation() {
  const router = useRouter()

  const [mutate, { data, error, loading }] = useMutation(
    RESET_PASSWORD_MEMBER,
    {
      update(cache, { data: dataUpdate }) {
        WSMessage({
          type: 'success',
          messageValue: messageHelper.PasswordChanged,
        })
        router.back()
      },
    }
  )
  return { mutate, data, error, loading }
}

//Admin Reset Password
export function ResetPasswordAdminMutation() {
  const router = useRouter()

  const [mutate, { data, error, loading }] = useMutation(
    RESET_PASSWORD_MEMBER,

    {
      client: clientAdmin,
      update(cache, { data: dataUpdate }) {
        WSMessage({
          type: 'success',
          messageValue: messageHelper.PasswordChanged,
        })
        router.back()
      },
    }
  )
  return { mutate, data, error, loading }
}

//admin
// export function forgotPasswordMutation() {
//   const router = useRouter();

//   const [mutate, { data, error, loading }] = useMutation(FORGOT_PASSWORD, {
//     client: clientAdmin,
//     update(cache, { data: dataUpdate }) {
//       WSMessage({
//         type: "success",
//         messageValue: "Link Send",
//       });
//     },
//   });
//   return { mutate, data, error, loading };
// }

//admin
export function ResetPasswordMutation() {
  const [mutate, { data, error, loading }] = useMutation(
    FORGOT_RESET_PASSWORD,
    {
      client: clientAdmin,
      update(cache, { data: dataUpdate }) {
        WSMessage({
          type: 'success',
          messageValue: messageHelper.PasswordChanged,
        })
        window.location.replace('/')
      },
    }
  )
  return { mutate, data, error, loading }
}

//verify account

const redirectToHome = () => {
  window.location.replace('/')
}
export function VerifyAccountMutation() {
  const [mutate, { data, error, loading }] = useMutation(VERIFY_ACCOUNT, {
    update(cache, { data: dataUpdate }) {
      WSMessage({
        type: 'success',
        messageValue: 'Your account has been verified successfully',
        duration: 5,
        onClose: redirectToHome,
      })
    },
  })
  return { mutate, data, error, loading }
}

// ADD CONTENT WRITER

export function NewContentWriter(
  dateBetween: DateProps,
  sortBy: SortProps,
  onModalClose?: (() => void) | undefined
) {
  const [mutate, { data, error, loading }] = useMutation(
    CREATE_CONTENT_WRITER,
    {
      client: clientAdmin,
      update(cache, { data: dataUpdate }) {
        WSMessage({
          type: 'success',
          messageValue: 'Content writer has been added successfully',
          duration: 5,
        })
        const newResponceData = dataUpdate

        const exsistingCacheData: any = cache.readQuery({
          query: CONTENT_WRITER_LIST,
          variables: {
            offset: 1,
            limit: 10,
            searchTerm: '',
            ...dateBetween,
            ...sortBy,
          },
        })

        const newData = exsistingCacheData
          ? {
              contentWriterList: {
                nodes: [
                  newResponceData.createContentWriter.userInfo,
                  ...exsistingCacheData?.contentWriterList?.nodes,
                ],
                totalCount: 10,
              },
            }
          : undefined

        cache.writeQuery({
          query: CONTENT_WRITER_LIST,
          variables: {
            offset: 1,
            limit: 10,
            searchTerm: '',
          },
          data: newData,
        })
        onModalClose && onModalClose()
      },
    }
  )
  return { mutate, data, error, loading }
}

// CONTENT WRITER DELETE
export function DeleteContentWriter(
  pageSize: number,
  current: number,
  showSearch: string,
  dateBetween: any,
  sortBy: any
) {
  const [mutate, { data, error, loading }] = useMutation(
    DELETE_CONTENT_WRITER,
    {
      client: clientAdmin,
      update(cache, { data: APIResponse }) {
        const existingData: any = cache.readQuery({
          query: CONTENT_WRITER_LIST,
          variables: {
            limit: pageSize,
            offset: current,
            searchTerm: showSearch,
            ...dateBetween,
            ...sortBy,
          },
        })
        const newResponceData = APIResponse
        cache.writeQuery({
          query: CONTENT_WRITER_LIST,
          variables: {
            limit: pageSize,
            offset: current,
            searchTerm: showSearch,
            ...dateBetween,
            ...sortBy,
          },
          data: {
            contentWriterList: {
              nodes: removeDataInCache(
                existingData?.contentWriterList?.nodes._id,
                newResponceData._id
              ),
            },
          },
        })
        WSMessage({
          type: 'success',
          messageValue: 'Content Writer has been deleted',
        })
      },
    }
  )
  return { mutate, data, error, loading }
}

// CONTENT WRITER UPDATE

export function updateContentWriter(
  dataBetween: DateProps,
  sortBy: SortProps,
  onModalClose?: (() => void) | undefined
) {
  const [mutate, { data, error, loading }] = useMutation(
    UPDATE_CONTENT_WRITER,
    {
      client: clientAdmin,
      update(cache, { data: dataUpdate }) {
        const newUpdateUserResponse = dataUpdate.updateContentWriter

        WSMessage({
          type: 'success',
          messageValue: 'Content Writer has been updated successfully',
        })
        const exsistingCacheData: any = cache.readQuery({
          query: CONTENT_WRITER_LIST,
          variables: {
            offset: 1,
            limit: 10,
            searchTerm: '',
            ...dataBetween,
            ...sortBy,
          },
        })

        const newData = exsistingCacheData
          ? {
              contentWriterList: {
                ...exsistingCacheData.contentWriterList,
                nodes: exsistingCacheData.contentWriterList.nodes.map((val) => {
                  return newUpdateUserResponse._id === val._id
                    ? {
                        ...val,
                        ...newUpdateUserResponse,
                      }
                    : val
                }),
              },
            }
          : undefined

        exsistingCacheData &&
          cache.writeQuery({
            query: CONTENT_WRITER_LIST,
            variables: {
              offset: 1,
              limit: 10,
              searchTerm: '',
            },
            data: newData,
          })

        onModalClose && onModalClose()
      },
    }
  )
  return { mutate, data, error, loading }
}
