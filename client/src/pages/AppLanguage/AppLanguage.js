import React, { useState, useEffect } from 'react'
import { Text, Select, Input, Image } from 'native-base'
import StyledButton from 'components/StyledButton'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useErrorWrap } from 'hooks'
import PropTypes from 'prop-types'
import i18n from 'utils/i18n'
import DrawerLogoutButton from 'components/DrawerLogoutButton'
import { colors, images } from 'theme'
import { AntDesign } from '@expo/vector-icons'
import { ENGLISH, FRENCH } from 'utils/constants'
import { storeLanguage, retrieveLanguage } from 'utils/i18n/utils'
import * as Updates from 'expo-updates';
import { updateLanguage } from 'slices/app.slice'

const styles = StyleSheet.create({
    root: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    description: {
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: '3%',
        width: '92%',
        height: 'auto',
    },
    languageContainer: {
        height: 80,
        padding: 10,
        flexDirection: 'row',
        width: '92%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    }
})

const AppLanguage = () => {
    const [language, setLanguage] = useState(ENGLISH);
    const dispatch = useDispatch()

    useEffect(() => {

        const getCurrentSavedLanguage = async () => {
            const savedLanguage = await retrieveLanguage();
            setLanguage(savedLanguage);
        }

        getCurrentSavedLanguage();
    }, [setLanguage, retrieveLanguage])

    const changeLanguage = async (newLanguage) => {
        setLanguage(newLanguage);

        // Save in Async Storage
        await storeLanguage(newLanguage);

        // Update actual language on the app
        i18n.locale = newLanguage

        dispatch(updateLanguage({ language: newLanguage }))
    }

    return (
        <>
            <View style={styles.root}>
                <View style={styles.description}>
                    <Text
                        fontFamily="body"
                        fontWeight="normal"
                        fontSize="md"
                        color="gray.medium"
                        style={{ marginTop: 15 }}
                    >
                        {i18n.t('dict.availableLanguages')}
                    </Text>
                </View>

                <TouchableOpacity onPress={() => changeLanguage(ENGLISH)}
                    style={{
                        ...styles.languageContainer,
                        backgroundColor: language === ENGLISH ? colors.gray.light : 'white'
                    }
                    }>
                    <View>
                        <Text fontFamily="heading" fontWeight="regular" fontSize="lg">English</Text>
                        <Text fontFamily="body" fontWeight="regular" fontSize="md" color="gray.medium">Default</Text>
                    </View>
                    {
                        language === ENGLISH && <AntDesign
                            name="check"
                            color="black"
                            size={30}
                        />
                    }
                </TouchableOpacity>

                <TouchableOpacity onPress={() => changeLanguage(FRENCH)}
                    style={{
                        ...styles.languageContainer,
                        backgroundColor: language === FRENCH ? colors.gray.light : 'white'
                    }}>
                    <View>
                        <Text fontFamily="heading" fontWeight="regular" fontSize="lg">Français</Text>
                        <Text fontFamily="body" fontWeight="regular" fontSize="md" color="gray.medium">French</Text>
                    </View>
                    {
                        language === FRENCH && <AntDesign
                            name="check"
                            color="black"
                            size={30}
                        />
                    }
                </TouchableOpacity>

                <View style={styles.bottomDivider} />
            </View >
        </>
    )
}

AppLanguage.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
        goBack: PropTypes.func,
    }),
}

AppLanguage.defaultProps = {
    navigation: { navigate: () => null, goBack: () => null },
}

export default AppLanguage
