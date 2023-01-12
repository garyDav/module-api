import { EstudiantesServiceDB } from 'module-db'

const estudiantesServiceDB = new EstudiantesServiceDB()

class EstudiantesService {
  listEstudiantes() {
    return estudiantesServiceDB.findAll()
  }

  async getOneEstudiante(id) {
    const data = await estudiantesServiceDB.findById(id)
    if (!data) throw new Error('The Estudiante does not exist')

    return data
  }

  async getOneEstudianteByIdUser(id) {
    const data = await estudiantesServiceDB.findByUserId(id)
    if (!data) throw new Error('The Estudiante does not exist')

    return data
  }

  async deleteOneEstudiante(id) {
    const data = await estudiantesServiceDB.findById(id)
    if (!data) throw new Error('The Estudiante does not exist')

    return estudiantesServiceDB.deleteById(id)
  }

  createEstudiante(data) {
    return estudiantesServiceDB.create(data)
  }
}

export default EstudiantesService
