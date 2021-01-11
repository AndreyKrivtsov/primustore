// по сути это интерфейс

export class BaseApi {
  async getApiItem (id) { throw new Error('это метод интерфейса, переопредели его') }
  async getApiItems () { throw new Error('это метод интерфейса, переопредели его') }
  async getApiList (limit = null, offset = null) { throw new Error('это метод интерфейса, переопредели его') }
  async updateApiItem (obj) { throw new Error('это метод интерфейса, переопредели его') }
  async createApiItem (obj) { throw new Error('это метод интерфейса, переопредели его') }
  async deleteApiItem (id) { throw new Error('это метод интерфейса, переопредели его') }
}
