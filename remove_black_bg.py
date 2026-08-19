from PIL import Image
import os

gif_path = 'public/alien/processed/Teleportation-1.gif'
webp_path = 'public/alien/processed/alien-teleport.webp'

img = Image.open(gif_path)
frames = []
durations = []

for frame_idx in range(img.n_frames):
    img.seek(frame_idx)
    frame = img.convert('RGBA')
    data = frame.getdata()
    new_data = []
    for pixel in data:
        if pixel[0] <= 10 and pixel[1] <= 10 and pixel[2] <= 10:
            new_data.append((0, 0, 0, 0))
        else:
            new_data.append(pixel)
    frame.putdata(new_data)
    frames.append(frame)
    durations.append(img.info.get('duration', 30))

print(f"Processed {len(frames)} frames with transparency")

if frames:
    frames[0].save(
        webp_path,
        'WebP',
        save_all=True,
        append_images=frames[1:],
        duration=durations,
        loop=0,
        method=6,
        lossless=True
    )
    file_size = os.path.getsize(webp_path)
    print(f"Saved: {webp_path} ({file_size:,} bytes)")
