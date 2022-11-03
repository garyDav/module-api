import { AcademicosServiceDB } from 'module-db'

const academicosServiceDB = new AcademicosServiceDB()

class AcademicosService {
  listAcademicos() {
    return academicosServiceDB.findAll()
  }

  async getOneAcademicoByUserId(id) {
    const data = await academicosServiceDB.findByUserId(id)
    if (!data) throw new Error('The Academico does not exist')

    return data
  }

  async getOneAcademico(id) {
    const data = await academicosServiceDB.findById(id)
    if (!data) throw new Error('The Academico does not exist')

    return data
  }

  async deleteOneAcademico(id) {
    const data = await academicosServiceDB.findById(id)
    if (!data) throw new Error('The Academico does not exist')

    return academicosServiceDB.deleteById(id)
  }

  createAcademico(data) {
    return academicosServiceDB.create(data)
  }
}

export default AcademicosService
