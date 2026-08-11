from pathlib import Path
from collections import Counter
from PIL import Image

public = Path(__file__).resolve().parent.parent / 'public'
paths = sorted(public.glob('*.gif'))
for path in paths:
    print('\n===', path.name)
    with Image.open(path) as im:
        frames = getattr(im, 'n_frames', 1)
        bg_pixels = Counter()
        frame_bg = []
        for i in range(frames):
            im.seek(i)
            rgba = im.convert('RGBA')
            w, h = rgba.size
            edge = []
            for x in range(w):
                for y in (0, h-1):
                    edge.append(rgba.getpixel((x, y)))
            for y in range(h):
                for x in (0, w-1):
                    edge.append(rgba.getpixel((x, y)))
            c = Counter(edge).most_common(5)
            frame_bg.append(c[0][0])
            bg_pixels.update(edge)
        total_counts = bg_pixels.most_common(20)
        print('most common edge colors across frames:', total_counts[:10])
        print('frame bg top 1 colors sample:', frame_bg[:10])
        print('unique top colors', len(set(frame_bg)))
