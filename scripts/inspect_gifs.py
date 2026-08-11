from pathlib import Path
from collections import Counter
from PIL import Image

public = Path(__file__).resolve().parent.parent / 'public'
gif_files = sorted(public.glob('*.gif'))
print('GIF files found:', [p.name for p in gif_files])
for path in gif_files:
    with Image.open(path) as im:
        print('\n---', path.name)
        print('mode', im.mode)
        print('size', im.size)
        total_frames = getattr(im, 'n_frames', 1)
        print('frames', total_frames)
        durations = []
        edge_colors = Counter()
        has_transparency = False
        total_duration = 0
        for frame_index in range(total_frames):
            im.seek(frame_index)
            duration = im.info.get('duration', 0)
            durations.append(duration)
            total_duration += duration
            if 'transparency' in im.info:
                has_transparency = True
            if frame_index < 10:
                rgba = im.convert('RGBA')
                w, h = rgba.size
                for x, y in [
                    (0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1),
                    (w // 2, 0), (w // 2, h - 1), (0, h // 2), (w - 1, h // 2),
                ]:
                    edge_colors[rgba.getpixel((x, y))] += 1
        avg_duration = sum(durations) / len(durations) if durations else None
        print('durations sample', durations[:10], 'avg', avg_duration, 'total', total_duration)
        print('top edge colors', edge_colors.most_common(10))
        print('has_transparency', has_transparency)
