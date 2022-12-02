import React from 'react'
import 'utils/ignore'
import LoadingSpinner from 'components/LoadingSpinner'

import { useEffect, useState } from 'react'
import i18n from 'utils/i18n'

// assets
import { useSelector } from 'react-redux'
import Navigator from './navigator'

/**
 * Handles the logic when the app needs to display loading indicator
 */
const AppContent = () => {
  const { isLoading, language } = useSelector((state) => state.app)

  const [appLanguage, setLanguage] = useState(language);

  useEffect(() => {
    setLanguage(language)
    // Update actual language on the app
  }, [language])

  console.log("we here")

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
