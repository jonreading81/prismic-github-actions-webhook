const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/:user/:repo', function (req, res, next) {
  const { user, repo } = req.params;
  const { type, secret } = req.body;

  axios
    .post(
      `https://api.github.com/repos/${user}/${repo}/dispatches`,
      {
        event_type: type,
      },
      {
        headers: {
          Authorization: `token ${secret}`,
          Accept: 'Accept: application/vnd.github.everest-preview+json',
        },
      }
    )
    .then(() => {
      res.send('success');
    })
    .catch((err) => {
      next(err);
    });
});

module.exports.handler = serverless(app);
