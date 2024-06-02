const Link = require('../models/Link');
const User = require('../models/User');

exports.createLink = async (req, res) => {
  try {
    const link = new Link(req.body);
    await link.save();

    const user = await User.findById(req.body.userId);
    if (user) {
      user.links.push(link._id);
      await user.save();
    }

    res.status(201).send(link);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getLink = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) {
      return res.status(404).send();
    }
    res.send(link);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getAllLinks = async (req, res) => {
  try {
    const links = await Link.find();
    res.send(links);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.redirectLink = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) {
      return res.status(404).send();
    }

    const targetParamValue = req.query[link.targetParamName] || '';
    link.clicks.push({
      ipAddress: req.ip,
      targetParamValue
    });

    await link.save();
    res.redirect(link.originalUrl);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getLinkClicks = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) {
      return res.status(404).send();
    }

    const clicksByTarget = link.clicks.reduce((acc, click) => {
      const target = click.targetParamValue || 'unknown';
      if (!acc[target]) {
        acc[target] = 0;
      }
      acc[target]++;
      return acc;
    }, {});

    res.send(clicksByTarget);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateLink = async (req, res) => {
  try {
    const link = await Link.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!link) {
      return res.status(404).send();
    }
    res.send(link);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.deleteLink = async (req, res) => {
  try {
    const link = await Link.findByIdAndDelete(req.params.id);
    if (!link) {
      return res.status(404).send();
    }
    res.send(link);
  } catch (error) {
    res.status(500).send(error);
  }
};
