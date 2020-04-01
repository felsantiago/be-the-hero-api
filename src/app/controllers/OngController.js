import { v4 as uuidv4 } from 'uuid';
import bcryptjs from 'bcryptjs';
import connection from '../../config/database';

class OngController {
  async index(req, res) {
    try {
      const ongs = await connection('ongs').select('*');

      return res.json(ongs);
    } catch (err) {
      return res.status(500).json({ erro: 'Erro inesperado.' });
    }
  }

  async store(req, res) {
    try {
      const { name, email, password, whatsapp, city, uf } = req.body;

      const uuid = uuidv4();

      const passwordHash = await bcryptjs.hash(password, 8);

      await connection('ongs').insert({
        uuid,
        name,
        email,
        password: passwordHash,
        whatsapp,
        city,
        uf,
      });

      return res.status(201).json({ uuid });
    } catch (err) {
      return res.status(500).json({ erro: 'Erro inesperado.' });
    }
  }
}

export default new OngController();
