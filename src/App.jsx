
import { useState, useEffect } from 'react'
import SolicitudCard from './componentes/SolicitudCard'
import { obtenerSolicitudes } from './services/solicitudesService'

function App() {
  const [solicitudes, setSolicitudes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let activo = true

    async function cargarSolicitudes() {
      try {
        const datos = await obtenerSolicitudes()

        if (activo) {
          setSolicitudes(datos)
        }
      } catch (err) {
        if (activo) {
          setError('No se pudieron cargar las solicitudes.')
          console.error(err)
        }
      } finally {
        if (activo) {
          setCargando(false)
        }
      }
    }

    cargarSolicitudes()

    return () => {
      activo = false
    }
  }, [])

  return (
      <main>
        <h1>Sistema de Soporte Técnico</h1>
        <h2>Solicitudes registradas</h2>

        {cargando && (
            <p role="status">Cargando solicitudes...</p>
        )}

        {error && (
            <p role="alert">{error}</p>
        )}

        {!cargando && !error && (
            <>
              <p>Total de solicitudes: {solicitudes.length}</p>

              {solicitudes.length === 0 ? (
                  <p>No hay solicitudes registradas.</p>
              ) : (
                  solicitudes.map(solicitud => (
                      <SolicitudCard
                          key={solicitud.id}
                          {...solicitud}
                      />
                  ))
              )}
            </>
        )}
      </main>
  )
}

export default App
