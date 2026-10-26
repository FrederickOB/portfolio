const CLOUDINARY_UPLOAD = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)/;

/**
 * Asks Cloudinary for a copy no wider than `width`, in the best format the
 * browser supports (WebP/AVIF) at automatic quality. Images hosted anywhere
 * else are returned unchanged.
 */
export function sizedImage(url: string, width: number): string {
  return url.replace(CLOUDINARY_UPLOAD, `$1f_auto,q_auto,c_limit,w_${width}/`);
}
