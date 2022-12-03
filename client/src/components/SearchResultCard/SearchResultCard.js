import {
  View, Text, Pressable, Modal, Input,
} from 'native-base'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import i18n from 'utils/i18n'
import StyledButton from 'components/StyledButton'
import { joinCourse } from 'api'

const styles = StyleSheet.create({
  privateJoinButton: {
    width: '30%',
    marginLeft: '2%',
  },
  privateCancelButton: {
    width: '30%',
  },
})

const SearchResultCard = ({
  languageName,
  learnerLanguage,
  creatorName,
  unitNumber,
  languageDescription,
  isPrivate,
  courseId,
}) => {
  // later we will move this to be a prop passed in
  // and guaranteeing it is unique will be handled by learnerSearch
  const [isClicked, setIsClicked] = useState(false)
  const [joinModalVisible, setJoinModalVisible] = useState(false)
  const [joinCode, setJoinCode] = useState('')

  return (
    <>
      <Modal
        isOpen={joinModalVisible}
        onClose={() => setJoinModalVisible(false)}
        width="100%"
      >
        <Modal.Content>
          <Modal.Body>
            <Text fontFamily="heading">
              {i18n.t('actions.joinPrivateCourse')}
            </Text>
            <Text fontFamily="body" fontSize="md">
              {i18n.t('dialogue.getJoinCode')}
            </Text>
            <Input
              placeholder={i18n.t('actions.enterCode')}
              value={joinCode}
              onChangeText={setJoinCode}
              width="100%"
              my="2"
            />
            <View
              display="flex"
              flexDirection="row-reverse"
              justifyContent="right"
            >
              <StyledButton
                title="Join"
                style={styles.privateJoinButton}
                variant="learner_primary"
                onPress={() => {
                  joinCourse(courseId, joinCode)
                  setJoinModalVisible(false)
                }}
              />
              <StyledButton
                title={i18n.t('dict.cancel')}
                style={styles.privateCancelButton}
                variant="learner_cancel"
                onPress={() => {
                  setJoinModalVisible(false)
                }}
              />
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Pressable
        onPress={() => setIsClicked(!isClicked)}
        bg={isClicked ? 'blue.light' : 'gray.light'}
        borderColor={isClicked ? 'blue.medium' : 'gray.medium'}
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
        <View display="flex" flexDirection="row" alignItems="center">
          <Text fontFamily="heading" fontSize="3xl">
            {languageName}
          </Text>
          <Text color="gray.dark" fontSize="sm">
            {' '}
            {i18n.t('dict.taughtIn')} {learnerLanguage}
          </Text>
        </View>
        <Text fontSize="lg">
          {i18n.t('dict.creator')}: {creatorName}
        </Text>
        {isClicked ? (
          <>
            <Text fontSize="lg" color="gray.dark">
              {unitNumber} Units available
            </Text>
            <Text fontSize="lg">
              {i18n.t('dict.learnerSearchDescription')} {languageDescription}
            </Text>
            <StyledButton
              title={i18n.t('actions.joinNow')}
              fontSize={20}
              variant="learner_primary"
              onPress={
                isPrivate ? setJoinModalVisible(true) : joinCourse(courseId, '')
              }
            />
          </>
        ) : (
          ''
        )}
      </Pressable>
    </>
  )
}

SearchResultCard.propTypes = {
  languageName: PropTypes.string,
  learnerLanguage: PropTypes.string,
  creatorName: PropTypes.string,
  unitNumber: PropTypes.number,
  languageDescription: PropTypes.string,
  isPrivate: PropTypes.bool,
  courseId: PropTypes.string,
}

SearchResultCard.defaultProps = {
  languageName: '',
  learnerLanguage: '',
  creatorName: '',
  unitNumber: 0,
  languageDescription: '',
  isPrivate: true,
  courseId: '',
}
export default SearchResultCard
