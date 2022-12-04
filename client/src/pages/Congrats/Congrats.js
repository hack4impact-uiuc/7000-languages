import React from 'react'
import StyledButton from 'components/StyledButton'
import i18n from 'utils/i18n'
import PropTypes from 'prop-types'
import { View } from 'native-base'
import Congratulations from '../../../assets/images/congrats.svg'

const Congrats = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>
    <Congratulations
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: '50%',
      }}
    />
    <StyledButton
      variant="congratulations"
      style={{ position: 'absolute', bottom: 30 }}
      title={i18n.t('actions.exitActivity')}
      onPress={() => navigation.navigate('Drawer', { screen: 'LearnerHome' })}
    />
  </View>
)

Congrats.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Congrats.defaultProps = {
  navigation: {
    navigate: () => null,
  },
}

export default Congrats
