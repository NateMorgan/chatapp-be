import { Dialogue } from '../models/dialogue.js';

function index(req, res) {
  Dialogue.find({})
    .then((dialogues) => res.json(dialogues))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

function create(req, res) {
  req.body.messages = [];
  Dialogue.create(req.body)
    .then((dialogue) => {
      res.status(201).json(dialogue);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

function createMessage(req, res) {
  req.body.sender = req.user.profile;
  Dialogue.findById(req.params.id)
    .then((dialogue) => {
      dialogue.messages.unshift(req.body);
      dialogue.save()
      .then((saved) => {
        res.status(200).json(saved);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

export { index, create, createMessage };
