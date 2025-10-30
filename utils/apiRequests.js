const axios = require('axios');


exports.postRequest = async ({ url = null, data = null, header = 'json' }) => {
    try {
        const response = await axios({
            method: 'post',
            url: url,
            headers: {
                'Content-Type': header == 'json' ? 'application/json' : 'multipart/form-data'
            },
            data: data
        })

        if (response.data) {
            return response.data
        }
        return null

    } catch (e) {
        console.log(e)
        return null
    }
}

exports.getRequest = async ({ url = null, data = null }) => {
    try {
        const response = await axios({
            method: 'get',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.data) {
            return response.data
        }
        return null

    } catch (e) {
        console.log(e)
        return null
    }
}

