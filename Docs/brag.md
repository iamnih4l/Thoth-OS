# Brag Integration Guide

## What is Brag?
Brag is an integrated Thoth OS skill that turns any project you just created into a short, shareable launch video. It handles project analysis, scriptwriting, audio selection, and video rendering using a single command. 

## What does it do?
When invoked, Brag:
1. Analyzes the current project (README, UI structure, metadata) via Thoth's Context Manager.
2. Writes a storyboard and a custom launch script based on the project's features.
3. Generates a composition brief and uses `Hyperframes` to compose the video.
4. Renders a final MP4 video, selects an idle thumbnail (poster), and writes a shareable social media caption.

## How is it integrated?
Brag operates as a native Thoth OS skill under the `Media` domain.
- **Skill Location:** `Skills/Media/brag/`
- **Command:** `Commands/Workflows/brag.md`
- **Scripts & Assets:** The upstream audio and parsing scripts are bundled directly in the `Skills/Media/brag/assets` and `scripts` directories to ensure seamless offline access without needing symlinks on Windows.

## How do I invoke it?
From any project directory within your agent environment, type:
```
/brag
```
You can also steer the tone or toggle voiceovers using flags:
```
/brag --tone chaotic
/brag --voice
/brag --title "My Next Big Thing"
```

## What dependencies are required?
For the Brag skill to render properly, your local environment must have:
1. **Node.js** (v22+)
2. **FFmpeg** (installed and added to `PATH`)
3. **Hyperframes CLI** (available via `npx hyperframes`)

If any of these dependencies are missing, the skill will gracefully abort and report actionable steps.

## How does Hyperframes fit in?
While Thoth's Brag skill owns the story, script, and music cues, **Hyperframes** acts as the rendering engine. The agent passes a detailed composition brief to Hyperframes, which manages the exact visual timing, rendering logic, and layout composition. 

## Where are generated artifacts stored?
All artifacts are written to a `brag-output/` folder in your project's root directory. If a previous run exists, it creates a timestamped folder (e.g., `brag-output-2026-05-04-143022/`). 

The output includes:
- `brag.mp4` (Final Video)
- `brag.jpg` (Thumbnail / Poster frame)
- `brag-plan.md` (Storyboard)
- `composition-brief.md` (Handoff brief)
- `share-copy.txt` (Social media copy)

## How do I troubleshoot failures?
- **Missing Commands:** Verify that `ffmpeg -version` and `node -v` run in your terminal.
- **Hyperframes Error:** If Hyperframes fails to render, run `npx hyperframes doctor` inside your project directory to diagnose CLI issues.
- **Windows File Paths:** Ensure your environment allows execution of PowerShell scripts if manually extracting audio using `analyze_music_cues.py`.

## How do I update the upstream Brag skill?
To update Brag, copy the latest `SKILL.md`, `assets/`, and `scripts/` from the upstream [Latent Spaces Brag Repository](https://github.com/latent-spaces/brag) into `Thoth-OS/Skills/Media/brag/`. Re-apply the **Thoth OS Dependency Check** block in `SKILL.md` to ensure proper environment validation.

## Example Invocation
**User:** I just finished this project. Brag it.

**Thoth:** 
Analyzing project...
✓ Project identified
✓ Core features identified
✓ Visual moments selected
✓ Launch narrative created

Starting Brag...
✓ Video plan created
✓ Composition generated
✓ Rendering started

Output: `brag-output/brag.mp4`
