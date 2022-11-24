import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { colors } from 'theme'
import { INDICATOR_TYPES } from 'utils/constants'
import i18n from 'utils/i18n'

const Indicator = ({ indicatorType }) => {
  switch (indicatorType) {
    case INDICATOR_TYPES.COMPLETE:
      return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: 105 }}>
          <FontAwesome
            name="circle"
            size={20}
            color={colors.green.medium_light}
          />
          <Text fontFamily="body" fontWeight="regular" color={colors.gray.medium} fontSize="md">
            {i18n.t('dict.completed')}
          </Text>
        </View>
      )
    case INDICATOR_TYPES.INCOMPLETE:
      return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: 105 }}>
          <FontAwesome
            name="circle-o"
            size={20}
            color={colors.gray.medium}
          />
          <Text fontFamily="body" fontWeight="regular" color={colors.gray.medium} fontSize="md">
            {i18n.t('dict.inProgress')}
          </Text>
        </View>
      )
    case INDICATOR_TYPES.NONE:
      return null
    default:
      return null
  }
}

// Button object fields
Indicator.propTypes = {
  indicatorType: PropTypes.number,
}

Indicator.defaultProps = {
  indicatorType: INDICATOR_TYPES.COMPLETE,
}

export default Indicator
