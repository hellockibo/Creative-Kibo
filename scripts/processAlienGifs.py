from pathlib import Path
from collections import Counter
import json
import numpy as np
from PIL import Image

SCRIPT_DIR = Path(__file__).resolve().parent
ROOT = SCRIPT_DIR.parent
SOURCE_DIR = ROOT / 'public'
OUTPUT_DIR = ROOT / 'public' / 'alien' / 'processed'
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

ANIMATIONS = {
    'eggHatching': 'egg-hatching.gif',
    'idle': 'alien-idle.gif',
    'wave': 'alien-wave.gif',
    'talk': 'alien-talk.gif',
    'lookAround': 'alien-look-around.gif',
    'teleport': 'alien-teleport.gif',
}

# The background palette is determined from edge pixels and should be stable.
BACKGROUND_CONFIG = {
    'eggHatching': {'threshold': 34, 'fade': 40, 'max_colors': 4},
    'idle': {'threshold': 34, 'fade': 40, 'max_colors': 4},
    'wave': {'threshold': 34, 'fade': 40, 'max_colors': 4},
    'talk': {'threshold': 34, 'fade': 40, 'max_colors': 4},
    'lookAround': {'threshold': 34, 'fade': 40, 'max_colors': 4},
    'teleport': {'threshold': 34, 'fade': 40, 'max_colors': 4},
}


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
    most_common = [color for color, _ in counter.most_common(max_colors)]
    return most_common


def distance_sq(a, b):
    return float((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2)


def build_background_palette(path, config):
    with Image.open(path) as im:
        frames = getattr(im, 'n_frames', 1)
        palette_counter = Counter()
        for frame_index in range(min(frames, 20)):
            im.seek(frame_index)
            palette_counter.update(get_edge_palette(im, max_colors=config['max_colors']))
        top_colors = [color for color, _ in palette_counter.most_common(config['max_colors'])]
    print(f"{path.name} background palette: {top_colors}")
    return top_colors


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


def process_animation(name, source_filename, config):
    source_path = SOURCE_DIR / source_filename
    output_path = OUTPUT_DIR / f'{source_path.stem}.webp'
    if not source_path.exists():
        raise FileNotFoundError(f"Missing source GIF: {source_path}")

    bg_palette = build_background_palette(source_path, config)
    with Image.open(source_path) as im:
        frames = getattr(im, 'n_frames', 1)
        processed_frames = []
        durations = []
        for frame_index in range(frames):
            im.seek(frame_index)
            rgba = im.convert('RGBA')
            frame_np = np.asarray(rgba).copy()
            alpha = alpha_from_distance(frame_np, bg_palette, config['threshold'], config['fade'])
            frame_np[..., 3] = alpha
            frame = Image.fromarray(frame_np, mode='RGBA')
            processed_frames.append(frame)
            durations.append(im.info.get('duration', 40))

        save_kwargs = {
            'save_all': True,
            'append_images': processed_frames[1:],
            'duration': durations,
            'loop': 0,
            'lossless': True,
        }
        processed_frames[0].save(output_path, format='WEBP', **save_kwargs)
    print(f'Processed {name}: {output_path.name} ({output_path.stat().st_size} bytes)')


def main():
    report = {}
    for name, filename in ANIMATIONS.items():
        try:
            config = BACKGROUND_CONFIG[name]
            process_animation(name, filename, config)
            report[name] = 'processed'
        except Exception as exc:
            report[name] = f'error: {exc}'
            print(f'ERROR processing {name}: {exc}')

    report_path = OUTPUT_DIR.parent / 'alien-processing-report.json'
    with report_path.open('w', encoding='utf-8') as fh:
        json.dump(report, fh, indent=2)
    print('Report written to', report_path)


if __name__ == '__main__':
    main()
