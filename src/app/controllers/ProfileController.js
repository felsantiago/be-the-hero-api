import connection from '../../config/database';

class ProfileController {
  async index(req, res) {
    const ong_uuid = req.userUuid;

    const incidents = await connection('incidents')
      .where('ong_uuid', ong_uuid)
      .select('*');

    return res.json(incidents);
  }
}

export default new ProfileController();
