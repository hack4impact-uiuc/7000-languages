import { View, Text, Box, Pressable } from 'native-base'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { colors } from 'theme'
import i18n from 'utils/i18n'
import StyledButton  from 'components/StyledButton'

const styles = StyleSheet.create({
})

const SearchResultCard = (
{languageName,
learnerLanguage,
creatorName,
unitNumber,
languageDescription,
}) => {
  // later we will move this to be a prop passed in
  // and guaranteeing it is unique will be handled by learnerSearch
  const [isClicked, setIsClicked] = useState(false)
  return (
    <Pressable
        onPress={() => setIsClicked(!isClicked)}
        bg={isClicked ? "blue.light" : "gray.light"}
        borderColor={isClicked ? "blue.medium" : "gray.medium"} 
        borderWidth="2" 
        alignSelf="center" 
        rounded="lg" 
        width="90%" 
        paddingTop="1" 
        paddingLeft="3" 
        paddingBottom="3"
        paddingRight="3"
        marginBottom="3"
        isPressed={setIsClicked}
        >
        <View
        display="flex"
        flexDirection="row"
        alignItems="center"
        >
        <Text
            fontFamily="heading"
            fontSize="3xl"
        >{languageName}
        </Text>
        <Text
        color="gray.dark"
        fontSize="sm"
        > {i18n.t("dict.taughtIn")} {learnerLanguage}</Text>
      </View>
        <Text
        fontSize="lg"
        >{i18n.t('dict.creator')}: {creatorName}</Text>
        {isClicked ? (
          <>
           <Text
           fontSize="lg"
           color="gray.dark"
           >{unitNumber} Units available</Text>
           <Text
           fontSize="lg"
           >{i18n.t('dict.learnerSearchDescription')} {languageDescription}</Text>
          <StyledButton 
          title="Join Now"
          fontSize={20}
          variant="learner_primary"
            />
            </>
        ) : ( ''
        )}
    </Pressable>
  )
}


SearchResultCard.propTypes = {
    languageName: PropTypes.string,
    learnerLanguage: PropTypes.string,
    creatorName: PropTypes.string,
    unitNumber: PropTypes.number,
    languageDescription: PropTypes.string,
}

SearchResultCard.defaultProps = {
    languageName: '',
    learnerLanguage: '',
    creatorName: '',
    unitNumber: 0,
    languageDescription: '',
  }
export default SearchResultCard
