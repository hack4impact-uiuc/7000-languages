import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import LanguageHome from 'pages/LanguageHome'
import { INDICATOR_TYPES } from '../../utils/constants'
import { useSelector, useDispatch } from 'react-redux'
import { setField } from 'slices/language.slice'
import { getCourse } from 'api'
import useErrorWrap from 'hooks/useErrorWrap'


const CourseHome = ({ navigation }) => {
  const { currentCourseId } = useSelector((state) => state.language)

  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()

  const [data, setData] = useState([])
  const [courseDescription, setCourseDescription] = useState('')
  const [courseName, setCourseName] = useState('')

  useEffect(() => {
    const getCourseData = async () => {
      
      errorWrap(async () => {
        const { result } = await getCourse(currentCourseId)
        const { course, units } = result

        setCourseDescription(course.details.description)
        setCourseName(course.details.name)

        navigation.setOptions({
          title: 'Course Home',
        })
        dispatch(setField({ key: 'courseDetails', value: course.details }))
        dispatch(setField({ key: 'allUnits', value: units }))

        const formattedUnitData = []

        for (let i = 0; i < units.length; i += 1) {
          const item = units[i]

          const formattedItem = {
            _id: item._id,
            name: item.name,
            body: `${item.num_lessons} ${
              item.num_lessons === 1 ? 'Lesson' : 'Lessons'
            }`,
            indicatorType: INDICATOR_TYPES.COMPLETE,
          }
          formattedUnitData.push(formattedItem)
        }

        setData(formattedUnitData)
      })
    }
    getCourseData()
  }, [currentCourseId])


  const navigateToManage = () => {
    navigation.navigate('ManageUnits')
  }

  const goToNextPage = () => {
    navigation.navigate('UnitHome')
  }

  return (
    <LanguageHome
      languageName={courseName}
      languageDescription={courseDescription}
      valueName="Units"
      buttonText="Manage Units"
      rightIconName="pencil"
      buttonCallback={navigateToManage}
      nextPageCallback={goToNextPage}
      data={data}
    />
  )
}

CourseHome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }),
}

CourseHome.defaultProps = {
  navigation: { navigate: () => null, goBack: () => null },
}

export default CourseHome
