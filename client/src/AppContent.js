import React from 'react'
import 'utils/ignore'
import LoadingSpinner from 'components/LoadingSpinner'

// assets
import { useSelector } from 'react-redux'
import Navigator from './navigator'

/**
 * Handles the logic when the app needs to display loading indicator
 */
const AppContent = () => {
  const { isLoading } = useSelector((state) => state.app)

  if (isLoading) {
    return (
      <>
        <Navigator />
        <LoadingSpinner />
      </>
    )
  }

  return <Navigator />
}

export default AppContent
