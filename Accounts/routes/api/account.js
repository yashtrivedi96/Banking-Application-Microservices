const express = require('express');
const router = express.Router();
const Account = require('../../models/Account');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route    POST api/account
// @desc     Create Account route
// @access   Public
router.post('/', async (req, res) => {
  const { type, email, balance } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Please Register!' }] });
    }

    let userEmail = await Account.find({ email: email, type: type });
    console.log(userEmail);
    if (userEmail.length > 0) {
      return res.status(400).json({
        errors: [{ msg: `Account ${userEmail[0].type} type already exists` }]
      });
    }

    account = new Account({
      type,
      email,
      balance
    });
    await account.save();
    res.status(200).json({ msg: 'Account Created' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/account/:id/:type
// @desc     Get Account Balance route
// @access   Public
router.get('/:id/:type', async (req, res) => {
  try {
    const type = req.params.type;
    console.log(req.params.id);
    const user = await User.find({ email: req.params.id }).select('-password');
    if (user.length == 0) {
      return res.status(400).json({
        errors: [{ msg: `${req.params.id} does not have an account` }]
      });
    }
    console.log(user);
    const account = await Account.find({ email: user[0].email, type: type });
    console.log(account);
    if (account.length == 0) {
      return res.status(404).json({
        errors: [{ msg: `${req.params.id} does not have ${type} account` }]
      });
    }
    res.status(200).json({ balance: account[0].balance });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    DELETE api/account/:id/:type
// @desc     Delete Account route
// @access   Public
router.delete('/:id/:type', async (req, res) => {
  try {
    console.log(req.params);
    console.log(req.params.id);
    const user = req.params.id;
    const type = req.params.type;

    const account = await Account.deleteOne({ email: user, type: type });
    console.log(account);
    if (account.deletedCount == 0) {
      return res
        .status(404)
        .json({ Errors: [{ msg: `Account ${type} does not exist` }] });
    }

    res.status(200).json({ msg: `Account ${type} is deleted` });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
