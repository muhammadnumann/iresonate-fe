import React from 'react'
import { Steps } from 'antd'
import { StepProps, StepsProps } from 'antd/lib/steps'
//styles
// import './WSStep.scss'

export const WSSteps: React.FC<StepsProps> = ({ children, ...props }) => {
  return <Steps {...props}>{children}</Steps>
}

export const WSStep: React.FC<StepProps> = ({ children, ...props }) => {
  return <Steps.Step {...props}>{children}</Steps.Step>
}