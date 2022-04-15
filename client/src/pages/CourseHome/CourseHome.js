import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from 'theme'
import { Text } from 'native-base'
import StyledButton from 'components/StyledButton'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import StyledCard from '../../components/StyledCard/StyledCard'
import { FontAwesome } from '@expo/vector-icons'
import { INDICATOR_TYPES } from '../../utils/constants'

const styles = StyleSheet.create({
    root: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.red.dark,
    },
    top: {
        backgroundColor: colors.red.dark,
        height: 160,
        display: 'flex',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    manageBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    selected: {

    }
  })

  const CourseHome = ({navigation}) => {
    return (
        <>
        <View
        style={styles.top}
        >
            <Text
           style={{
            fontFamily: 'GT_Haptik_bold',
            
          }}
            color="white.dark"
            fontSize={35}
            paddingLeft={5}
            paddingTop={5}
    >
      Spanish
      </Text>
      <Text
      style={{
        fontFamily: 'GT_Haptik_bold',
        
      }}
            color="white.dark:alpha.40"
            fontSize={23}
            lineHeight={27}
            paddingLeft={5}
            paddingRight={5}
    >
      Spanish is a wonderful language that prides itself in its world reach and rich, diverse cultures.
      </Text>

        </View>
<View
style={styles.manageBar}
>
    <Text
    style={{
        fontFamily: 'GT_Haptik_bold',
        
      }}
      fontSize={25}
      paddingTop={3}
      paddingLeft={5}
      >    
4 Units
    </Text>
    <StyledButton
        title="Manage Units"
        variant="manage"
        rightIcon={<MaterialCommunityIcons
        name="pencil"
        color={colors.red.dark}
        size={20}
        > </MaterialCommunityIcons>}
        onPress={() => navigation.navigate('ManageUnits')}
    ></StyledButton>
</View>
<View
    
style={{
    display: 'flex',
    alignItems: 'center'
}}
    >
    <StyledCard 
        leftIcon={<MaterialCommunityIcons
            name="numeric-1-box"
            size={45}
            color={colors.red.dark}
          />}
        titleText='Initial Phrases'
        bodyText='2 Lessons'
        width='90%'
        height={75}
        indicatorType={INDICATOR_TYPES.COMPLETE}
           
    >
        </StyledCard>
    </View>
    </>
      )
  }

  export default CourseHome