import React from 'react'
//  React.ReactElement 是jsx类型
type FallbackRender = ( props: {error: Error | null}) => React.ReactElement
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender:FallbackRender}>, { error: Error| null }> {
  state = {error: null}

  static getDerivedStateFormError(error: Error) {
    return { error }
  }

  render(){
    const { error } = this.state
    const { children, fallbackRender } = this.props
    if(error) {
      return fallbackRender({error})
    }
    return children
  }
}