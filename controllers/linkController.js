import Link from '../models/linkModel.js';

// Create or Update link
export const upsertLink = async (req, res) => {
  const { type, url } = req.body;

  const link = await Link.findOneAndUpdate(
    { type },
    { url },
    { new: true, upsert: true }
  );

  res.json({
    message: "Link updated",
    data: link
  });
};

// Get all links
export const getLinks = async (req, res) => {
  const links = await Link.find();
  res.json(links);
};

// Get single link by type
export const getLinkByType = async (req, res) => {
  const { type } = req.params;

  const link = await Link.findOne({ type });

  res.json(link);
};

// Redirect API (IMPORTANT 🔥)
export const redirectLink = async (req, res) => {
  const { type } = req.params;

  const link = await Link.findOne({ type });

  if (!link) {
    return res.status(404).json({ message: "Link not found" });
  }

  res.redirect(link.url);
};