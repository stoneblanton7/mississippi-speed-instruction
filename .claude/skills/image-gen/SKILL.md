---
name: image-gen
description: "Generate images via Kie.ai API from an image queue file. Use this skill when Stone says 'generate images', 'process image queue', 'run the image queue', 'create the assets', or 'use the image-gen skill'. This skill reads a JSON queue file containing prompts, filenames, and model selections, then calls the Kie.ai API for each image, polls for completion, downloads the result, and saves it to the project's assets folder. Stone writes the prompts in Claude.ai — this skill only executes them."
---

# Image Generation Skill (Kie.ai)

Generate images from a queue file using the Kie.ai API. This skill does NOT write prompts — it only processes prompts that Stone has already written.

Read this entire file before processing any images.

---

## PREREQUISITES

1. **API Key** must be set in the project's `.env` file:
   ```
   KIE_API_KEY=your_key_here
   ```

2. **Image queue file** must exist at one of these locations:
   - `image-queue.json` (project root)
   - `context/image-queue.json`
   - Or a path specified by Stone

3. **Output directory** must exist (create if not):
   - Default: `frontend/src/assets/`
   - Subdirectories as specified in the queue (e.g., `frontend/src/assets/team/`)

---

## QUEUE FILE FORMAT

The queue file is a JSON array. Each entry has:

```json
[
  {
    "prompt": "The full image generation prompt",
    "filename": "hero-bg.jpg",
    "subfolder": "",
    "model": "google/nano-banana",
    "aspect_ratio": "16:9",
    "output_format": "png"
  }
]
```

**Fields:**
- `prompt` (required): The generation prompt
- `filename` (required): Output filename
- `subfolder` (optional): Subfolder inside `frontend/src/assets/`. Empty string = root assets folder.
- `model` (optional): Kie.ai model name. Defaults to `google/nano-banana`. Options:
  - `google/nano-banana` — fast, $0.02/image (Gemini 2.5 Flash)
  - `nano-banana-pro` — high quality, $0.12/image (Gemini 3.0 Pro)
  - `nano-banana-2` — best balance, $0.04/image (Gemini 3.1 Flash)
  - `gpt-image-1` — OpenAI 4o image, $0.03/image
  - `flux-kontext` — Flux model
- `aspect_ratio` (optional): Defaults to `16:9`. Options: `1:1`, `4:3`, `3:2`, `16:9`, `9:16`, `4:5`, `5:4`, `21:9`
- `output_format` (optional): `png` or `jpg`. Defaults to `png`.

---

## EXECUTION STEPS

### Step 1: Read the environment and queue

```bash
# Load API key
source .env 2>/dev/null || true
# If .env doesn't work, check if KIE_API_KEY is set
echo $KIE_API_KEY
```

Read the queue file and count total images.

### Step 2: Process each image

For each entry in the queue, run this flow:

#### 2a. Create the task

```bash
curl --silent --request POST \
  --url https://api.kie.ai/api/v1/jobs/createTask \
  --header "Authorization: Bearer $KIE_API_KEY" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "<model from queue>",
    "input": {
      "prompt": "<prompt from queue>",
      "image_size": "<aspect_ratio from queue>",
      "output_format": "<output_format from queue>"
    }
  }'
```

This returns a JSON response with a `task_id`:
```json
{
  "code": 200,
  "data": {
    "task_id": "abc123..."
  }
}
```

Save the `task_id`.

#### 2b. Poll for completion

Poll every 5 seconds until the task is complete:

```bash
curl --silent --request GET \
  --url "https://api.kie.ai/api/v1/jobs/recordInfo?task_id=<task_id>" \
  --header "Authorization: Bearer $KIE_API_KEY"
```

Response statuses:
- `waiting` — in queue, keep polling
- `queuing` — in queue, keep polling
- `generating` — processing, keep polling
- `completed` — done, get the image URL from the response
- `failed` — report error, skip this image

Max poll attempts: 60 (5 minutes). If still not complete, report timeout and move on.

#### 2c. Download the image

When status is `completed`, the response contains an image URL in `data.output.image_urls` (array) or similar field. Download the first image:

```bash
# Create subfolder if needed
mkdir -p frontend/src/assets/<subfolder>

# Download
curl --silent -o "frontend/src/assets/<subfolder><filename>" "<image_url>"
```

#### 2d. Verify and report

```bash
# Check file exists and has content
ls -la "frontend/src/assets/<subfolder><filename>"
```

Print: `✅ [1/8] hero-bg.jpg — saved (245 KB)`

If failed: `❌ [1/8] hero-bg.jpg — FAILED: <error message>`

### Step 3: Summary

After all images are processed, print a summary:

```
=== IMAGE GENERATION COMPLETE ===
Total: 8
Success: 7
Failed: 1
Credits used: ~$0.16

Failed images:
  - service-rental.jpg: API timeout after 5 minutes

All images saved to: frontend/src/assets/
```

### Step 4: Git add

```bash
git add frontend/src/assets/
git status
```

Show Stone what was added. Do NOT commit — Stone will review the images first.

---

## IMPLEMENTATION SCRIPT

For efficiency, write a bash script or Node.js script that processes the entire queue rather than running curl commands one by one. Here's the recommended Node.js approach:

```javascript
// scripts/generate-images.js
const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = process.env.KIE_API_KEY;
const API_BASE = 'https://api.kie.ai/api/v1/jobs';
const ASSETS_DIR = path.join(__dirname, '..', 'frontend', 'src', 'assets');

// Read queue
const queue = JSON.parse(fs.readFileSync(process.argv[2] || 'image-queue.json', 'utf8'));

async function fetchJSON(url, options = {}) {
  // ... implementation
}

async function createTask(entry) {
  const body = {
    model: entry.model || 'google/nano-banana',
    input: {
      prompt: entry.prompt,
      image_size: entry.aspect_ratio || '16:9',
      output_format: entry.output_format || 'png'
    }
  };
  
  const response = await fetchJSON(`${API_BASE}/createTask`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  
  return response.data.task_id;
}

async function pollTask(taskId, maxAttempts = 60) {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(r => setTimeout(r, 5000)); // 5 second delay
    
    const response = await fetchJSON(`${API_BASE}/recordInfo?task_id=${taskId}`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });
    
    const status = response.data.status;
    if (status === 'completed') return response.data;
    if (status === 'failed') throw new Error(response.data.error || 'Task failed');
    
    process.stdout.write('.');
  }
  throw new Error('Timeout after 5 minutes');
}

async function downloadImage(url, filepath) {
  // Download file from URL to filepath
  // ... implementation
}

async function main() {
  console.log(`\n📸 Processing ${queue.length} images...\n`);
  
  let success = 0, failed = 0;
  const failures = [];
  
  for (let i = 0; i < queue.length; i++) {
    const entry = queue[i];
    const outputDir = path.join(ASSETS_DIR, entry.subfolder || '');
    const outputPath = path.join(outputDir, entry.filename);
    
    fs.mkdirSync(outputDir, { recursive: true });
    
    process.stdout.write(`[${i+1}/${queue.length}] ${entry.filename}`);
    
    try {
      const taskId = await createTask(entry);
      process.stdout.write(' → polling');
      const result = await pollTask(taskId);
      
      // Extract image URL from result
      const imageUrl = result.output?.image_urls?.[0] 
        || result.output?.image_url 
        || result.output?.url;
      
      if (!imageUrl) throw new Error('No image URL in response');
      
      await downloadImage(imageUrl, outputPath);
      
      const size = fs.statSync(outputPath).size;
      console.log(` ✅ (${Math.round(size/1024)} KB)`);
      success++;
    } catch (err) {
      console.log(` ❌ ${err.message}`);
      failures.push({ filename: entry.filename, error: err.message });
      failed++;
    }
  }
  
  console.log(`\n=== COMPLETE ===`);
  console.log(`Success: ${success} | Failed: ${failed}`);
  if (failures.length) {
    console.log('\nFailed:');
    failures.forEach(f => console.log(`  - ${f.filename}: ${f.error}`));
  }
}

main().catch(console.error);
```

Write the full working script, then run it:

```bash
KIE_API_KEY=$(cat .env | grep KIE_API_KEY | cut -d '=' -f2) node scripts/generate-images.js image-queue.json
```

---

## ERROR HANDLING

- **401 Unauthorized:** API key is wrong or missing. Check `.env`.
- **429 Rate Limited:** Too many requests. Add a 2-second delay between createTask calls.
- **Task failed:** Log the error, skip, continue to next image.
- **Timeout:** After 60 polls (5 min), skip and report.
- **Download failed:** Retry once, then skip and report.
- **Missing queue file:** Tell Stone which path you looked for and ask where it is.

---

## WHAT NOT TO DO

- Do NOT write or modify the prompts in the queue file — Stone writes those in Claude.ai
- Do NOT commit the images to git — Stone reviews them first
- Do NOT process more than 20 images in a single run without asking Stone (credit control)
- Do NOT expose the API key in any committed file — `.env` should be in `.gitignore`

---

## QUICK START

When Stone says "generate the images" or "process the image queue":

1. Read this skill
2. Check `.env` for `KIE_API_KEY`
3. Find the `image-queue.json` file
4. Write the generation script if it doesn't exist yet
5. Run it
6. Report results
7. Wait for Stone to review before committing
