import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from 'theme'
import PropTypes from 'prop-types'
import { ScrollView, Text } from 'native-base'
import StyledButton from 'components/StyledButton'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import StyledCard from '../StyledCard/StyledCard'
import { INDICATOR_TYPES } from '../../utils/constants'
import NumberBox from 'components/NumberBox'

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
  const ManageView =({
    languageName,
    languageDescription,
    unitsNumber,
    buttonText,
    rightIconName,
    unitsName,
    lessonNumber,
    statusTag,

  })
  const data = [
    {
      _id: 'abcdef',
      title: 'Unit 1',
      lessons: '2 Lessons',
      indicatorType: INDICATOR_TYPES.COMPLETE,
    },
    {
      _id: 'aenasdas',
      title: 'Unit 2',
      lessons: '7 Lessons',
      indicatorType: INDICATOR_TYPES.INCOMPLETE,
    },
    {
      _id: 'asdnemsa',
      title: 'Unit 3',
      lessons: '4 Lessons',
      indicatorType: INDICATOR_TYPES.COMPLETE,
    },
    {
      _id: 'mehjasjd',
      title: 'Unit 5',
      lessons: '3 Lessons',
      indicatorType: INDICATOR_TYPES.COMPLETE,
    },
    {
      _id: 'asdnemsa',
      title: 'Unit 3',
      lessons: '4 Lessons',
      indicatorType: INDICATOR_TYPES.COMPLETE,
    },
    {
      _id: 'mehjasjd',
      title: 'Unit 5',
      lessons: '3 Lessons',
      indicatorType: INDICATOR_TYPES.COMPLETE,
    },
    {
      _id: 'asdnemsa',
      title: 'Unit 3',
      lessons: '4 Lessons',
      indicatorType: INDICATOR_TYPES.COMPLETE,
    },
    {
      _id: 'mehjasjd',
      title: 'Unit 5',
      lessons: '3 Lessons',
      indicatorType: INDICATOR_TYPES.COMPLETE,
    },
    {
      _id: 'asdnemsa',
      title: 'Unit 3',
      lessons: '4 Lessons',
      indicatorType: INDICATOR_TYPES.COMPLETE,
    },
    {
      _id: 'mehjasjd',
      title: 'Unit 5',
      lessons: '3 Lessons',
      indicatorType: INDICATOR_TYPES.COMPLETE,
    },
    
  ]

  const CourseNavHome = ({navigation}) => {
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
      {languageName}
      </Text>
      <Text
      style={{
        fontFamily: 'GT_Haptik_bold',
        
      }}
            color="white.dark:alpha.40"
            fontSize={'xl'}
            lineHeight={20}
            paddingLeft={5}
            paddingRight={5}
            adjustsFontSizeToFit={true}
    >
      {languageDescription}
     </Text>

        </View>
<View
style={styles.manageBar}
>
    <Text
    style={{
        fontFamily: 'GT_Haptik_bold',
        
      }}
      fontSize={23}
      paddingTop={3}
      paddingLeft={5}
      >    
{unitsNumber} 4 Units
    </Text>
    <StyledButton
        title={buttonText}
        variant="manage"
        fontSize={15}
        rightIcon={<MaterialCommunityIcons
        name={rightIconName}
        color={colors.red.dark}
        size={20}
        > </MaterialCommunityIcons>}
        onPress={() => navigation.navigate('ManageUnits')}
    ></StyledButton>
</View>

<ScrollView>
<View
    
style={{
    display: 'flex',
    alignItems: 'center'
}}
    >
      {
        data.map((element, index) => 
        <StyledCard 
            key={index}
            leftIcon={<NumberBox
            number={index + 1}
            ></NumberBox>
               }
            titleText={element.title}
            bodyText={element.lessons}
            width='97%'
            height={75}
            indicatorType={element.indicatorType}
            rightIcon={<MaterialCommunityIcons
              name="pencil"
              color='black'
              size={20}
              > </MaterialCommunityIcons>}
        >
            </StyledCard>)
      }
    </View>
    </ScrollView>
    </>
      )
  }

  // Page Object Fields 
  ManageView.propTypes = {
    languageName: PropTypes.string,
    languageDescription: PropTypes.string,
    unitsNumber: PropTypes.number,
    buttonText: PropTypes.string,
    rightIcon: PropTypes.string,
  }

  ManageView.propTypes = {
    languageName: '',
    languageDescription: '',
    unitsNumber: 1,
    buttonText: '',
    rightIconName: '',
  }

  export default CourseNavHome