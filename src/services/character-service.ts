import AppService from './app-service';

class CharacterService extends AppService {
  async getAllCharacters() {
    return await this.db.query('SELECT $1::text as message', ['Hello world!']);
  }
}

export default CharacterService;
