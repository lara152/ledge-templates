/**
 * Contrato de imagen compartido por ambos templates.
 * Cada app centraliza sus imágenes en su content.ts usando ESTA forma, así el
 * intercambio de fotos es siempre { src, alt, caption, neighborhood }.
 */
export type ImageAsset = {
  /** URL de la imagen. Déjala en '' para ver el placeholder con su descripción. */
  src: string;
  /** Texto alternativo (accesibilidad + SEO). Describe la foto REAL que va aquí. */
  alt: string;
  /** Pie de foto opcional (se muestra en galerías/lightbox). */
  caption?: string;
  /** Vecindario / ciudad opcional (ej. "Tarrytown, Austin"). */
  neighborhood?: string;
};

/** Relaciones de aspecto soportadas por ImageSlot (evita layout shift). */
export type AspectRatio =
  | '21/9'
  | '16/9'
  | '3/2'
  | '4/3'
  | '1/1'
  | '3/4'
  | '4/5'
  | '2/3';
