import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { colors } from 'theme'
import PropTypes from 'prop-types'
import { ScrollView, Text, Pressable } from 'native-base'
import StyledButton from 'components/StyledButton'
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import StyledCard from 'components/StyledCard'
import NumberBox from 'components/NumberBox'
import { useErrorWrap } from 'hooks'
import i18n from 'utils/i18n'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blue.medium,
    },
    top: {
        backgroundColor: colors.blue.medium,
        minHeight: 100,
        overflow: 'hidden',
        display: 'flex',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    edit: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    manageBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10
    }
})

const LearnerHome = ({
    languageDescription,
    languageName,
    singularItemText,
    pluralItemText,
    nextPageCallback,
    data,
}) => {
    const errorWrap = useErrorWrap()

    const [renderData, setRenderData] = useState(data)

    useEffect(() => {
        setRenderData(data)
    }, [data])

    const extraSpaceView = <View style={{ height: 100 }} />

    const itemTitle = renderData.length === 1 ? singularItemText : pluralItemText

    // Generates the Course or Unit Home Page
    return (
        <>
            <View style={styles.top}>
                <View style={styles.edit}>
                    <Text
                        fontFamily="heading"
                        fontWeight="regular"
                        fontStyle="normal"
                        color="white.dark"
                        fontSize={35}
                        paddingLeft={5}
                        paddingTop={5}
                        paddingBottom={1}
                    >
                        {languageName}
                    </Text>
                </View>
                <Text
                    fontFamily="heading"
                    fontWeight="regular"
                    fontStyle="normal"
                    color="white.dark:alpha.40"
                    fontSize="xl"
                    lineHeight={20}
                    paddingLeft={5}
                    paddingRight={5}
                    paddingBottom={5}
                    adjustsFontSizeToFit
                >
                    {languageDescription}
                </Text>
            </View>

            <View style={styles.manageBar}>
                <Text
                    fontFamily="heading"
                    fontWeight="regular"
                    fontStyle="normal"
                    fontSize={23}
                    paddingTop={3}
                    paddingLeft={5}
                >
                    {`${renderData.length} ${itemTitle}`}
                </Text>
            </View>

            <View style={styles.cardContainer}>
                <ScrollView>
                    {renderData.map((element) => (
                        <StyledCard
                            key={element._id}
                            titleText={element.name}
                            bodyText={element.body}
                            width={width * 0.95}
                            height={95}
                            backgroundColor={colors.gray.light}
                            indicatorType={element.indicatorType}
                            containerStyle={{
                                borderWidth: 2,
                                borderColor: colors.gray.semi_light,
                                borderRadius: 12,
                                margin: 4
                            }}
                            rightIcon={(
                                <MaterialCommunityIcons
                                    name="chevron-right"
                                    color="black"
                                    size={35}
                                    onPress={() => nextPageCallback(element)}
                                />
                            )}
                        />
                    ))}
                    {extraSpaceView}
                </ScrollView>
            </View>
        </>
    )
}

// Page Object Fields
LearnerHome.propTypes = {
    languageName: PropTypes.string,
    languageDescription: PropTypes.string,
    singularItemText: PropTypes.string,
    pluralItemText: PropTypes.string,
    nextPageCallback: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
}

// Page Default Fields
LearnerHome.defaultProps = {
    languageName: '',
    languageDescription: '',
    singularItemText: '',
    pluralItemText: '',
    nextPageCallback: () => { },
    data: [],
}

export default LearnerHome
