import { InscripcionServiceDB } from 'module-db'

const inscripcionServiceDB = new InscripcionServiceDB()

class InscripcionService {
  listInscripciones() {
    return inscripcionServiceDB.findAll()
  }

  async getOneInscripcion(id) {
    const data = await inscripcionServiceDB.findById(id)
    if (!data) throw new Error('The Inscripcion does not exist')

    return data
  }

  async getOneInscripcionByIdUser(id) {
    const data = await inscripcionServiceDB.findByUserId(id)
    if (!data) throw new Error('The Inscripcion does not exist')

    return data
  }

  async deleteOneInscripcion(id) {
    const data = await inscripcionServiceDB.findById(id)
    if (!data) throw new Error('The Inscripcion does not exist')

    return inscripcionServiceDB.deleteById(id)
  }

  createInscripcion(data) {
    return inscripcionServiceDB.create(data)
  }

  updateInscripcion(data) {
    return inscripcionServiceDB.update(data)
  }
}

export default InscripcionService
