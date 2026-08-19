from PIL import Image
import os

gif_path = 'public/alien/processed/Teleportation-1.gif'
webp_path = 'public/alien/processed/alien-teleport.webp'

# Open GIF and extract frames
img = Image.open(gif_path)
frames = []
durations = []

for frame_idx in range(img.n_frames):
    img.seek(frame_idx)
    # Convert to RGBA to preserve any transparency
    frame = img.convert('RGBA')
    frames.append(frame)
    durations.append(img.info.get('duration', 30))

print(f"Extracted {len(frames)} frames")
print(f"Durations: {durations[:5]}... (first 5)")

# Save as animated WebP
if frames:
    frames[0].save(
        webp_path,
        'WebP',
        save_all=True,
        append_images=frames[1:],
        duration=durations,
        loop=0,
        method=6,  # slower but better quality
        quality=90
    )
    
    file_size = os.path.getsize(webp_path)
    print(f"Saved: {webp_path} ({file_size} bytes)")
    print(f"Total duration: {sum(durations)}ms")
