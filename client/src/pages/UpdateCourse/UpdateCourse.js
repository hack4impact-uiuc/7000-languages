import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import Drawer from 'components/Drawer'
import { colors } from 'theme'
import { Input, Text, TextArea } from 'native-base'
import { Foundation } from '@expo/vector-icons'
import { patchSelectedLesson } from 'slices/language.slice'
import { updateSingleLesson } from 'api'
import { useSelector, useDispatch } from 'react-redux'
import { useErrorWrap } from 'hooks'
import RequiredField from 'components/RequiredField'

const styles = StyleSheet.create({
    container: {
        borderRadius: 2,
        borderWidth: 0.5,
        padding: 8,
        marginBottom: 10,
        backgroundColor: colors.blue.light,
        borderColor: colors.blue.light,
    },
    textRow: {
        flexDirection: 'row',
    },
})

const UpdateCourse = ({ navigation }) => {
    const close = () => {
        navigation.goBack()
    }

    const errorWrap = useErrorWrap()
    const dispatch = useDispatch()
    const { currentLessonId, currentCourseId, allLessons } = useSelector((state) => state.language)

    const [name, setName] = useState('');
    const [purpose, setPurpose] = useState('');

    // checks if all fields are filled
    // otherwise, the submit button is disabled
    const areRequiredFieldsFilled = name !== '' && purpose !== '';

    /**
     * Posts a new unit to the API and saves the new unit in state
     */
    const success = async () => {
        errorWrap(
            async () => {
                let updatedLessonItem = null;
                const updates = {
                    name: name,
                    description: purpose,

                }

                const lessonItemResponse = await updateSingleLesson(currentLessonId, currentCourseId, updates)
                updatedLessonItem = lessonItemResponse.result;

                // Update lesson in Redux store
                dispatch(patchSelectedLesson({ lesson: updatedLessonItem }));
            },
            () => {
                // on success, close the modal
                close()
            },
        )
    }

    const body = (
        <>
            <View
                style={{
                    width: '97%',
                    marginHorizontal: '1%',
                    justifyContent: 'center',
                }}
            >
                <View style={styles.container}>
                    <View style={styles.textRow}>
                        <Foundation name="lightbulb" size={20} color={colors.blue.dark} />
                        <Text
                            fontSize="md"
                            paddingBottom={2}
                            fontFamily="heading"
                            fontWeight="regular"
                            fontStyle="normal"
                            color={colors.blue.dark}
                        >
                            {' '}
                            Suggestion{' '}
                        </Text>
                    </View>
                    <Text color={colors.blue.dark} fontSize="md">
                        When updating a course, think about how it will be used.
                    </Text>
                </View>

                <RequiredField title="Change your course name" fontSize={'md'} />
                <Input
                    size="xl"
                    placeholder=""
                    returnKeyType="done"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

                <RequiredField title="Change the alternative name" fontSize={'md'} />
                <TextArea
                    size="xl"
                    h={40}
                    placeholder=""
                    keyboardType="default"
                    returnKeyType="done"
                    blurOnSubmit
                    value={purpose}
                    onChangeText={(text) => setPurpose(text)}
                />
            </View>
        </>
    )

    return (
        <Drawer
            titleText="Edit Course"
            successText="Confirm Edit"
            successCallback={success}
            closeCallback={close}
            isDisabled={!areRequiredFieldsFilled}
            body={body}
        />
    )
}

UpdateCourse.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
        goBack: PropTypes.func,
    }),
}

UpdateCourse.defaultProps = {
    navigation: { navigate: () => null, goBack: () => null },
}

export default UpdateCourse
