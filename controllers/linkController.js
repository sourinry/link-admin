import Link from '../models/linkModel.js';

// ================= HELPER =================
const formatLink = (link) => {
  return {
    type: link.type,
    [`${link.type}_url`]: link.url
  };
};


// ================= CREATE / UPDATE =================
export const upsertLink = async (req, res) => {
  try {
    const { type, url } = req.body;

    // validation
    if (!type || !url) {
      return res.status(400).json({
        status: false,
        message: "type and url are required"
      });
    }

    const allowedTypes = ['whatsapp', 'download', 'getLink'];
    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        status: false,
        message: "Invalid link type"
      });
    }

    const link = await Link.findOneAndUpdate(
      { type },
      { url },
      {
        new: true,
        upsert: true,
        runValidators: true 
      }
    );

    return res.status(200).json({
      status: true,
      message: "Link updated successfully",
      data: formatLink(link)
    });

  } catch (error) {
    console.error("Upsert Link Error:", error);

    return res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
};


export const bulkUpsertLinks = async (req, res) => {
  try {
    const links = req.body; // expect array

    // validation
    if (!Array.isArray(links) || links.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Array of links is required"
      });
    }

    const allowedTypes = ['whatsapp', 'download', 'getLink'];

    const result = {};

    for (const item of links) {
      const { type, url } = item;

      if (!type || !url) continue; 

      if (!allowedTypes.includes(type)) continue;

      const link = await Link.findOneAndUpdate(
        { type },
        { url },
        {
          new: true,
          upsert: true,
          runValidators: true
        }
      );

      result[`${link.type}_url`] = link.url;
    }

    return res.status(200).json({
      status: true,
      message: "Bulk links updated successfully",
      data: result
    });

  } catch (error) {
    console.error("Bulk Upsert Error:", error);

    return res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
};

// ================= GET ALL =================
export const getLinks = async (req, res) => {
  try {
    const links = await Link.find().lean();

    const formattedLinks = {};

    links.forEach(link => {
      formattedLinks[`${link.type}_url`] = link.url;
    });

    return res.status(200).json({
      status: true,
      data: formattedLinks
    });

  } catch (error) {
    console.error("Get Links Error:", error);

    return res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
};


// ================= GET BY TYPE =================
export const getLinkByType = async (req, res) => {
  try {
    const { type } = req.params;

    const link = await Link.findOne({ type }).lean();

    if (!link) {
      return res.status(404).json({
        status: false,
        message: "Link not found"
      });
    }

    return res.status(200).json({
      status: true,
      data: formatLink(link)
    });

  } catch (error) {
    console.error("Get Link By Type Error:", error);

    return res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
};


// ================= REDIRECT =================
export const redirectLink = async (req, res) => {
  try {
    const { type } = req.params;

    const link = await Link.findOne({ type }).lean();

    if (!link) {
      return res.status(404).json({
        status: false,
        message: "Link not found"
      });
    }

    return res.redirect(link.url);

  } catch (error) {
    console.error("Redirect Error:", error);

    return res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
};