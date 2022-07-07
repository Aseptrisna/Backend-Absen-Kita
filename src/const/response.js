module.exports = {
    errorResponse: (message) => {
      return {
        status: false,
        message: message
      }
    },
    successResponse: (message) => {
      return {
        status: true,
        message: message
      }
    },
    successResult: (data) => {
      return {
        status: true,
        message: 'Successfully Get Data',
        result: data
      }
    },
    nullResult: () => {
      return {
        success: false,
        message: 'No Data',
        result: null
      }
    },
    errorResult: () => {
      return {
        success: false,
        message: 'Failed to Get Data',
        data: []
      }
    }
  }