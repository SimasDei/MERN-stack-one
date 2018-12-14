const express = require('express');
const router = express.Router();

// Bring in the Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @ Get all Items C<R>UD
router.get('/', (req,res) => {
  Item.find()
  // Sort using Mongoose. -1 will return Descending order
    .sort({date: -1})
    .then(items => res.json(items))
});

//@route POST api/items
//@desc post item on DB <C>RUD
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    input: req.body.input
  });
  // Save to the DB
  newItem.save()
    .then(item => res.json(item));
});

//@route DELETE api/items/:id
//@ Delete an item by fetching the id
//@ CRU<D>
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
      .then(item => item.remove()
        .then(() => res.json({success: true}))
        .catch(err => res.status(404)
          .json({success: false})))
  });


module.exports = router;