import { useState, useEffect } from 'react'
import { getImages } from '../services/webpartServices'

function useForm() {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState('')
  const [gallery, setGallery] = useState([])

  useEffect(() => {
    setLoading(true)

    getImages()
      .then(items => {
        setGallery(items)
      })
      .catch(({ status, data }) => {
        setLoading(false)
        setErrors(data.responseBody['odata.error'].message.value)
        console.log({
          status,
          data,
        })
      })
  }, [])

  return {
    images: gallery,
    fail: errors,
    isLoading: loading,
  }
}

export default useForm
