import React, { useState, useEffect } from 'react'
import { Text, Select, Input, Image } from 'native-base'
import StyledButton from 'components/StyledButton'
import { Alert, StyleSheet, View, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useErrorWrap } from 'hooks'
import PropTypes from 'prop-types'
import i18n from 'utils/i18n'
import DrawerLogoutButton from 'components/DrawerLogoutButton'
import { colors, images } from 'theme'
import { MaterialCommunityIcons } from '@expo/vector-icons'

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
    body: {
        marginHorizontal: '5%',
        width: '90%',
    },
    delete: {
        position: 'absolute',
        bottom: '0%',
        width: '90%',
    },
    bottomContiner: {
        position: 'absolute',
        bottom: 10,
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 10,
    },
    userInfoContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: 20,
        justifyContent: 'flex-end',
    },
    userName: {
        paddingLeft: 10,
        fontSize: 20,
    },
    userEmail: {
        fontSize: 15,
        paddingLeft: 10,
    },
    bottomDivider: {
        marginTop: '3%',
        height: 1,
        backgroundColor: '#EFEFEF',
        width: '90%',
    },
})

const AccountInfo = ({ navigation }) => {

    const { userEmail, profileUrl, userName } = useSelector((state) => state.auth)

    const goToAppLanguage = () => {
        navigation.navigate('AppLanguage');
    }

    return (
        <>
            <View style={styles.root}>
                <View style={styles.description}>
                    <Text
                        fontFamily="heading"
                        fontWeight="regular"
                        fontSize={'xl'}
                        color="gray.dark"
                        style={{ marginVertical: 10 }}
                    >
                        {i18n.t('dict.userInfo')}
                    </Text>
                    <Text
                        fontFamily="body"
                        fontWeight="normal"
                        fontSize="md"
                        color="gray.medium"
                    >
                        {i18n.t('dialogue.appSettingsDescription')}
                    </Text>
                </View>

                <TouchableOpacity onPress={goToAppLanguage} style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', alignItems: 'center', marginVertical: 6 }}>
                    <Text fontFamily="heading" fontWeight="regular" fontSize="lg">{i18n.t('dict.language')}</Text>
                    <MaterialCommunityIcons
                        name="chevron-right"
                        color="black"
                        size={40}
                    />
                </TouchableOpacity>

                <View style={styles.bottomDivider} />
            </View >

            <View style={styles.bottomContiner} >
                <View style={styles.profileContainer}>
                    <Image
                        source={profileUrl === ''
                            ? images.default_icon
                            : { uri: profileUrl }}
                        alt="Profile Icon"
                        size="sm"
                        resizeMode="contain"
                        borderRadius={100}
                    />
                    <View style={styles.userInfoContainer}>
                        <Text
                            style={styles.userName}
                            fontFamily="heading"
                            fontWeight="regular"
                            fontStyle="normal"
                        >
                            {userName}
                        </Text>
                        <Text style={styles.userEmail}>{userEmail}</Text>
                    </View>
                </View>
                <View style={styles.bottomDivider} />
                <DrawerLogoutButton />
            </View>
        </>
    )
}

AccountInfo.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
        goBack: PropTypes.func,
    }),
}

AccountInfo.defaultProps = {
    navigation: { navigate: () => null, goBack: () => null },
}

export default AccountInfo
