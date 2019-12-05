const router = require('express').Router();
const Search = require('../Model/Search');

router.post('/search', async (req, res) => {
   const search = new Search({
       email: req.body.email,
       beforeTransaction: req.body.beforeTransaction,
       afterTransaction: req.body.afterTransaction,
       type: req.body.type,
       change: req.body.change,
       date: req.body.date
   });
   try {
        const savedTransaction = await search.save();
        res.send(savedTransaction);
   }catch(err) {
       res.status(400).send(err);
   }
});

router.get('/search/:email', async (req, res) => {
    try {
        console.log(req.params.email);
        const transactions = await Search.find({email: req.params.email});
        await res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;