const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function assertConfigured() {
  const required = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
  const missing = required.filter((name) => !process.env[name]);
  if (missing.length > 0) {
    throw new Error(`Missing Cloudinary configuration: ${missing.join(', ')}`);
  }
}

function uploadBuffer(file) {
  assertConfigured();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'kibo-portfolio',
        resource_type: file.mimetype.startsWith('video/') ? 'video' : 'image',
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );

    stream.end(file.buffer);
  });
}

function getAssetDetails(url) {
  const match = url.match(/\/([^/]+)\/upload\/(?:v\d+\/)?(.+)$/);
  if (!match) return null;

  const resourceType = match[1];
  const publicIdWithExtension = decodeURIComponent(match[2]);
  const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, '');

  return {
    publicId,
    resourceType: resourceType === 'video' ? 'video' : 'image',
  };
}

async function deleteAssetUrl(url) {
  const asset = getAssetDetails(url);
  if (!asset) return;

  const result = await cloudinary.uploader.destroy(asset.publicId, {
    resource_type: asset.resourceType,
    invalidate: true,
  });

  if (result.result !== 'ok' && result.result !== 'not found') {
    throw new Error(`Cloudinary could not delete ${asset.publicId}`);
  }
}

module.exports = { uploadBuffer, deleteAssetUrl };
