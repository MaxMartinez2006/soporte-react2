
import axios from 'axios'

// URL de ejemplo. Debe coincidir con tu API real.
const API_URL = 'http://localhost:8080/api/solicitudes'

export async function obtenerSolicitudes() {
    const respuesta = await axios.get(API_URL)
    return respuesta.data
}
