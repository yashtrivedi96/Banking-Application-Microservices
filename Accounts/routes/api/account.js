const express = require('express');
const router = express.Router();
const Account = require('../../models/Account');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route    POST api/account
// @desc     Test route
// @access   Public
router.post('/', async (req, res) => {
  const { type, email, balance } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Please Register!' }] });
    }

    let userEmail = await Account.find({ email: email });
    if (userEmail) {
      if (userEmail.type == type) {
        return res
          .status(400)
          .json({
            errors: [{ msg: `Account ${userEmail.type} type already exists` }]
          });
      }
    }

    account = new Account({
      type,
      email,
      balance
    });
    await account.save();
    res.status(200).json({ msg: "Account Created"});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/:type', auth, async (req, res) => {
  try {
    const type = req.params.type;
    const user = await User.findById(req.user.id).select('-password');
    const account = await Account.find({ email: user.email, type: type });
    res.status(200).json({ balance: account[0].balance });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
