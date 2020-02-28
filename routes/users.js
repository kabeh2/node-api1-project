const yup = require("yup");
const users = require("../data/db");
const express = require("express");
const router = express.Router();

// Get ALL users
router.get("/", (req, res) => {
  users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      debug(error);
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

// Get SPECIFIC user
router.get("/:id", (req, res) => {
  const userIndex = req.params.id;
  users
    .findById(userIndex)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      debug("Error: ", error);
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

// ADD USER
router.post("/", async (req, res) => {
  const user = {
    name: req.body.name,
    bio: req.body.bio
  };

  const validation = await validateUser(user);

  try {
    if (validation) {
      users.insert(user).then(response => {
        if (response) {
          res.status(201).json(response);
        }
      });
    } else {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    }
  } catch (error) {
    debug(error);
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database"
    });
  }
});

// DELETE USER
router.delete("/:id", (req, res) => {
  const userId = req.params.id;
  users
    .remove(userId)
    .then(response => {
      if (response) {
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      debug(err);
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

// UPDATE USER
router.put("/:id", async (req, res) => {
  const userId = req.params.id;

  const user = {
    name: req.body.name,
    bio: req.body.bio
  };

  const validation = await validateUser(user);
  const findUser = await users.findById(userId);

  try {
    if (findUser) {
      if (validation) {
        users.update(userId, user).then(response => {
          res.status(200).json(response);
        });
      } else {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
      }
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    debug(error);
    res
      .status(500)
      .json({ errorMessage: "The user information could not be modified." });
  }
});

// VALIDATION SCHEMA FUNCTION
const validateUser = async user => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    bio: yup.string().required()
  });

  try {
    const response = await schema.isValid(user);
    return response;
  } catch (error) {
    debug(error);
  }
};

module.exports = router;
