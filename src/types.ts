import { NextRouter } from "next/router"

export interface PaginationProps {
  current: number
  pageSize: number
  total?: number
}

export const MODULE_NAME_ENUM = {
  succeeded: 'Success',
}

export const AUDIT_LOG_TYPE_ENUM = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
}

export enum UserRoleType {
  Admin = 'Admin',
  Member = 'Member',
  Vendor = 'Vendor',
  ContentWriter = 'Content Writer',
}

export enum DataSelection {
  Daily = 'DAILY',
  Weekly = 'WEEKLY',
  Monthly = 'MONTHLY',
  Yearly = 'YEARLY',
}

export interface SortProps {
  order?: string
  field?: string
}
export interface DateProps {
  fromDate: string
  toDate: string
}

export interface WithRouterProps {
  router: NextRouter
} 