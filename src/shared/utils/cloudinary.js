export const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'oiaig120';
export const CLOUDINARY_FOLDER = import.meta.env.VITE_CLOUDINARY_FOLDER || 'osdiagnostic';

/**
 * Returns an optimized Cloudinary delivery URL for an asset.
 * - mp4: video/upload/q_auto
 * - svg: image/upload (raw vector preserved)
 * - raster images: image/upload/f_auto,q_auto
 */
export const getCloudinaryUrl = (assetPath, options = {}) => {
  if (!assetPath) return '';
  if (assetPath.startsWith('http://') || assetPath.startsWith('https://')) {
    return assetPath;
  }

  const cleanPath = assetPath.replace(/^\/?(assets\/)?/, '');
  const ext = cleanPath.split('.').pop().toLowerCase();

  if (ext === 'mp4') {
    return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/q_auto/${CLOUDINARY_FOLDER}/${cleanPath}`;
  }

  if (ext === 'svg') {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${CLOUDINARY_FOLDER}/${cleanPath}`;
  }

  const widthParam = options.width ? `w_${options.width},` : '';
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${widthParam}f_auto,q_auto/${CLOUDINARY_FOLDER}/${cleanPath}`;
};
