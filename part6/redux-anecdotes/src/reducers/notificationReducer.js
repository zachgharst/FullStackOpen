let timeout

const reducer = (state = null, action) => {
  switch(action.type) {
    case 'NOTIFICATION/UPDATE':
      return action.data
    case 'NOTIFICATION/RESET':
      return null
    default:
      return state
  }
}

export const updateNotification = (content, timer) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION/UPDATE',
      data: content
    })
    
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      dispatch(resetNotification())
    }, timer * 1000)
  }
}

export const resetNotification = () => {
  return {
    type: 'NOTIFICATION/RESET'
  }
}

export default reducer