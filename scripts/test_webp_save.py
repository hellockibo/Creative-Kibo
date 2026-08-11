from pathlib import Path
from PIL import Image

public = Path(__file__).resolve().parent.parent / 'public'
source = public / 'alien-idle.gif'
out = public / 'test-idle-frame.webp'
with Image.open(source) as im:
    im.seek(0)
    rgba = im.convert('RGBA')
    rgba.save(out, format='WEBP')
print('saved', out.exists(), out.stat().st_size)
