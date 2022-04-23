import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from 'theme'
import PropTypes from 'prop-types'
import { ScrollView, Text } from 'native-base'
import StyledButton from 'components/StyledButton'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import StyledCard from 'components/StyledCard'
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
        minHeight: 100,
        overflow: 'hidden',
        display: 'flex',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    manageBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
  })

  const LanguageHome = ({
    navigation,
    languageName,
    languageDescription,
    valueName,
    buttonText,
    rightIconName,
    toNavigate,
    toNext,
    data,
  }) => {
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
            paddingBottom={1}
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
            paddingBottom={5}
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
{data.length} {valueName}
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
        onPress={() => navigation.navigate(toNavigate)}
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
              onPress={() => navigation.navigate(toNext)} // ????
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
  LanguageHome.propTypes = {
    languageName: PropTypes.func,
    languageDescription: PropTypes.func,
    valueName: PropTypes.string,
    buttonText: PropTypes.string,
    rightIconName: PropTypes.string,
    toNavigate: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),

  }

  // Page Default Fields 
  LanguageHome.propTypes = {
    languageName: {},
    languageDescription: {},
    valueName: '',
    buttonText: '',
    rightIconName: '',
    toNavigate: '',
    toNext: '',
    data: [],
  }

  export default LanguageHome