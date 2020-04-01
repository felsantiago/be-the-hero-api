import connection from '../../config/database';

class ProfileController {
  async index(req, res) {
    try {
      const ong_uuid = req.userUuid;

      const incidents = await connection('incidents')
        .where('ong_uuid', ong_uuid)
        .select('*');

      return res.json(incidents);
    } catch (err) {
      return res.status(500).json({ erro: 'Erro inesperado.' });
    }
  }
}

export default new ProfileController();
