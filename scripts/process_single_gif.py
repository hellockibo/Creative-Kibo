from pathlib import Path
from collections import Counter
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE_DIR = ROOT / 'public'
OUTPUT_DIR = ROOT / 'public' / 'alien' / 'processed'
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

BACKGROUND_CONFIG = {
    'threshold': 34,
    'fade': 40,
    'max_colors': 4,
}

SOURCE_FILE = 'alien-teleport.gif'
OUTPUT_FILE = SOURCE_FILE.replace('.gif', '.webp')


def get_edge_palette(image, max_colors=4):
    rgba = image.convert('RGBA')
    w, h = rgba.size
    pixels = []
    for x in range(w):
        pixels.append(rgba.getpixel((x, 0)))
        pixels.append(rgba.getpixel((x, h - 1)))
    for y in range(h):
        pixels.append(rgba.getpixel((0, y)))
        pixels.append(rgba.getpixel((w - 1, y)))
    counter = Counter(pixels)
    return [color for color, _ in counter.most_common(max_colors)]


def alpha_from_distance(arr, bg_palette, threshold, fade):
    rgb = arr[..., :3].astype(np.float32)
    best = np.full(rgb.shape[:2], np.inf, dtype=np.float32)
    for bg_color in bg_palette:
        bg = np.array(bg_color[:3], dtype=np.float32)
        dist2 = np.sum((rgb - bg) ** 2, axis=-1)
        best = np.minimum(best, dist2)
    best = np.sqrt(best)
    alpha = np.clip((best - threshold) / fade, 0.0, 1.0)
    return (alpha * 255.0).astype(np.uint8)


def main():
    source_path = SOURCE_DIR / SOURCE_FILE
    output_path = OUTPUT_DIR / OUTPUT_FILE
    with Image.open(source_path) as im:
        palette = get_edge_palette(im.convert('RGBA'), BACKGROUND_CONFIG['max_colors'])
        print('bg palette', palette)
        frames = getattr(im, 'n_frames', 1)
        processed = []
        durations = []
        for i in range(frames):
            im.seek(i)
            rgba = im.convert('RGBA')
            arr = np.asarray(rgba).copy()
            alpha = alpha_from_distance(arr, palette, BACKGROUND_CONFIG['threshold'], BACKGROUND_CONFIG['fade'])
            arr[..., 3] = alpha
            processed.append(Image.fromarray(arr, mode='RGBA'))
            durations.append(im.info.get('duration', 40))
        processed[0].save(output_path, format='WEBP', save_all=True, append_images=processed[1:], duration=durations, loop=0, lossless=True)
    print('saved', output_path, output_path.stat().st_size)

if __name__ == '__main__':
    main()
