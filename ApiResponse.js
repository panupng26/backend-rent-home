const ApiResponse = () => {
    return {
        error: (data, message = "this is error") => {
            return {
                error: true,
                data: data,
                message: message
            }
        }, 
        success: (data) => {
            return {
                error: false,
                data: data,
            }
        }
    }
}

export default ApiResponse