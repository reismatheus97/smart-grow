import http from '../plugins/http'

function getData (path) {
    return http.get(path)
    .then(response => response.data)
}

export default { getData }