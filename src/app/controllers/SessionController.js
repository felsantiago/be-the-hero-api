import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import connection from '../../config/database';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const ong = await connection('ongs')
      .where('email', email)
      .select('*')
      .first();

    if (!ong)
      return res.status(401).json({ error: 'invalid user or password' });

    if (!(await bcryptjs.compare(password, ong.password)))
      return res.status(401).json({ error: 'invalid user or password' });

    const { uuid, name } = ong;

    return res.json({
      ong: {
        uuid,
        name,
        email,
      },
      token: jwt.sign({ uuid }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
