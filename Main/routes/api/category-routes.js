const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      //include its associated product data
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      //include its associated product data
      include: [{ model: Product }],
    });
    // returns a message if the id dne 
    if (!categoryData) {
      res.status(400).json({ message: '┐(⎚ ꞈ ⎚)┌ no category found with this id...' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // returns a message if the id dne 
    if (!categoryData[0]) {
      res.status(400).json({ message: '┐(⎚ ꞈ ⎚)┌ no category found with this id...' });
      return;
    }
    // else tell the user that the process was successful
    res.status(200).json({ message: 'ᕙ[⎚◡⎚]ᕗ success' });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    // returns a message if the id dne 
    if (!categoryData) {
      res.status(400).json({ message: '┐(⎚ ꞈ ⎚)┌ no category found with this id...' });
      return;
    }
    // else tell the user that the process was successful
    return res.status(200).json({ message: 'ᕙ[⎚◡⎚]ᕗ success' });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;