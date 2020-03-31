import connection from '../../config/database';
import Cache from '../../lib/Cache';

class IncidentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const limitPage = 5;

    const cached = await Cache.get(`incidents:page:${page}`);
    if (cached) {
      res.header('X-Total-Count', cached.length);
      return res.json(cached);
    }

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ongs', 'ong_uuid', '=', 'incidents.ong_uuid')
      .limit(limitPage)
      .offset((page - 1) * limitPage)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ]);

    await Cache.set(`incidents:page:${page}`, incidents);

    res.header('X-Total-Count', count['count(*)']);

    return res.status(200).json(incidents);
  }

  async store(req, res) {
    const { title, description, value } = req.body;

    const ong_uuid = req.userUuid;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_uuid,
    });

    await Cache.invalidadePrefix(`incidents:page`);

    return res.status(201).json({ id });
  }

  async delete(req, res) {
    const { id } = req.params;
    const ong_uuid = req.userUuid;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_uuid')
      .first();

    if (!incident)
      return res.status(400).json({ error: 'Operation not found.' });

    if (incident.ong_uuid !== ong_uuid)
      return res.status(401).json({ error: 'Operation not permitted.' });

    await connection('incidents').where('id', id).delete();

    return res.status(204).send();
  }
}

export default new IncidentController();
