// src/pages/api/users.js
import connectDB from "../lib/db.js"
import User from '../models/user.js';

const handler = async (req, res) => {
  await connectDB();

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case 'GET':
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default handler;
