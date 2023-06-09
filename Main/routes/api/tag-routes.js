const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      //include its associated product data
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      //include its associated product data
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tagData) {
      res.status(404).json({ message: '┐(⎚ ꞈ ⎚)┌ no tags found with this id...' })
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // returns a message if the id dne
    if (!tagData[0]) {
      res.status(404).json({ message: '┐(⎚ ꞈ ⎚)┌ no tag found with this id...' });
      return;
    }
    // else tell the user that the process was successful
    res.status(200).json({ message: 'ᕙ[⎚◡⎚]ᕗ success' });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    // returns a message if the id dne 
    if (!tagData) {
      res.status(404).json({ message: '┐(⎚ ꞈ ⎚)┌ no tag found with this id...' });
      return;
    }
    // else tell the user that the process was successful
    return res.status(200).json({ message: 'ᕙ[⎚◡⎚]ᕗ success' });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;