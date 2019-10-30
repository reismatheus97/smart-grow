import axios from 'axios'

// Sets the default url used by all of this axios instance's requests

let ESP32URL = 'http://192.168.43.25'
// ESP32URL = 'http://192.168.0.25'

axios.defaults.baseURL = ESP32URL


export default axios