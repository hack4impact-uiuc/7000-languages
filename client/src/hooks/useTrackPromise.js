import { useDispatch } from 'react-redux'
import { setLoading } from 'slices/app.slice'

const useTrackPromise = () => {
  const dispatch = useDispatch()

  const trackPromise = async (promise) => {
    if (promise) {
      dispatch(setLoading({ isLoading: true }))
      const value = await promise
      dispatch(setLoading({ isLoading: false }))
      return value
    }
    return null
  }

  return trackPromise
}

export default useTrackPromise
