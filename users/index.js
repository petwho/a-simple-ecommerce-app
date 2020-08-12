const service = require('restana')();
const bodyParser = require('body-parser');
service.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://root:abcd1234@cluster0.njll1.mongodb.net/test', {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected...'));

const jwt = require('jsonwebtoken');
const User = require('./models/User');

service
    .post('/users/login', async(req, res) => {
        console.log("****************\n")
        try {
            const token = require('./models/Token');
            const { email, password } = req.body
            const user = await User.findByCredentials(email, password)
            if (!user) {
                return res.status(401).send({error: 'Invalid credentials!'})
            }
            const userId = user._id;
            const newToken = await token.generate(userId);
            res.send({ userId, newToken });
        } catch (error) {
            res.send(error);
        }
    })
    .get('/users/auth', async (req, res) => {
        const decoded = jwt.verify(req.token, process.env.JWT_KEY);
        if (!decoded || !decoded.id) {
            return res.status(401).send({error: 'Unauthorized!'});
        }
        res.status(200);
    });

service.get('/version', function (req, res) {
  res.body = {
    version: '1.0.0'
  };
  res.send();
})

service.start(3000).then((server) => {});