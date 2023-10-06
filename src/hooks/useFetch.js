import axios from 'axios'

export const useFetch = async (url, options = {}) => {
  try {
    const response = await axios({
      url, 
      method: options?.method || "get",
      data: options?.data     || {} 
    })
    return response
  } catch (error) {
    return error
  }
}