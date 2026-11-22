"""Inline the static export (CSS, fonts, JS and images) into ONE file: static-site/index.html.
Usage: python3 scripts/inline-static.py <export-out-dir> <dest-dir>"""
import re, base64, sys, os, shutil
out, dest = sys.argv[1], sys.argv[2]
html = open(os.path.join(out, 'index.html'), encoding='utf-8').read()
def read(p): return open(os.path.join(out, p.lstrip('/')), encoding='utf-8').read()
def font_uri(m):
    path = m.group(1)
    name = os.path.basename(path)
    data = open(os.path.join(out, '_next/static/media', name), 'rb').read()
    return 'url(data:font/woff2;base64,' + base64.b64encode(data).decode() + ')'
# preload links for fonts/scripts are not needed once inlined
html = re.sub(r'<link rel="preload"[^>]*href="/_next/[^"]*"[^>]*/>', '', html)
# stylesheets -> inline <style> with embedded fonts
def css(m):
    c = read(m.group(1))
    c = re.sub(r'url\(([^)]*?/media/[^)]+?\.woff2)\)', font_uri, c)
    return '<style>' + c + '</style>'
html = re.sub(r'<link rel="stylesheet" href="([^"]+)"[^>]*/>', css, html)
# scripts -> inline, runtime first
scripts = re.findall(r'<script src="([^"]+)"([^>]*)></script>', html)
html = re.sub(r'<script src="[^"]+"[^>]*></script>', '', html)
# runtime first, every app chunk next, and the bootstrap (main-app) last so all
# chunks are already registered when the app starts (no extra network requests)
order = sorted(scripts, key=lambda s: (0 if 'polyfills' in s[0] else 1 if 'webpack' in s[0] else 3 if 'main-app' in s[0] else 2))
blob = ''
for src, attrs in order:
    js = read(src).replace('</script', '<\\/script')
    nomod = ' noModule=""' if 'noModule' in attrs else ''
    blob += f'<script{nomod}>{js}</script>'
html = html.replace('</body>', blob + '</body>', 1)
html = re.sub(r':HL\[\\"/_next/.*?\\n', '', html)
html = re.sub(r'/_next/static/css/[a-z0-9]+\.css', 'data:text/css,', html)
html = html.replace('href="/favicon.ico"', 'href="images/sopc-logo.webp"').replace('type="image/x-icon" sizes="16x16"', 'type="image/webp"')
# embed every image as a data URI (downsized copies; originals stay untouched)
from io import BytesIO
from PIL import Image
LIMITS = {'sopc-logo-hd': 900, 'sopc-logo': 360, 'hero-': 1800, 'services-': 1600, 'service-': 1400}
cache = {}
def data_uri(name):
    if name not in cache:
        im = Image.open(os.path.join(out, 'images', name))
        limit = next((v for k, v in LIMITS.items() if name.startswith(k)), 1100)
        im.thumbnail((limit, limit * 2))
        buf = BytesIO()
        im.save(buf, 'WEBP', quality=88 if name.startswith('sopc-logo') else 74, method=6)
        cache[name] = 'data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode()
    return cache[name]
html = re.sub(r'(?<![/\w])images/([\w.-]+\.webp)', lambda m: data_uri(m.group(1)), html)

os.makedirs(dest, exist_ok=True)
for leftover in ('images', '_next'):
    if os.path.exists(os.path.join(dest, leftover)): shutil.rmtree(os.path.join(dest, leftover))
open(os.path.join(dest, 'index.html'), 'w', encoding='utf-8').write(html)
print('single file written:', os.path.join(dest, 'index.html'), f'{len(html)/1048576:.1f} MB')
