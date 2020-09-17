export function imageExists(image_url) {
  return new Promise(resolve => {
    const img = new Image();
    img.src = image_url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
}
