const { checkBody } = require('../modules/checkBody');
const bcrypt = require('bcrypt');
const { createUser, checkUser} = require('../repository/users');

const signUp = async (req, res) => {
  const data = checkBody(req.body, ['username', 'email', 'password']);
  if (!data.isValid) {
    res.json({ result: false, error: data.errors });
    return;
  }

  const check = await checkUser(req.body.username, req.body.email);

  if (!check) {
    res.json({ result: false, msg: "Nom d'utilisateur ou email déjà utilisé" });
    return;
  } else {
    const newUser = await createUser(req.body.username, req.body.email, req.body.password)
    res.json({ result: true, token: newUser.token});
  }
}

const signIn = async (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Des champs sont vides ou manquants...' });
    return;
  }

  User.findOne({ username: req.body.username }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'Utilisateur inexistant ou mauvais mot de passe.' });
    }
  });
}

module.exports = {signIn, signUp};