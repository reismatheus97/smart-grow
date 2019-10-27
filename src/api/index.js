import http from '../plugins/http'

function getData () {
    return http.get()
    .then(response => response.data)
}

export default { getData }