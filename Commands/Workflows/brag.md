# /brag Command

## Description
Turn the project you just created into a short, shareable launch video with one command using Hyperframes.

## Trigger Actions
Activates the Brag Launch Media skill to analyze the project, create a storyboard, and compose a video.

## Usage Example
Type `/brag` in the chat to execute.
Options:
- `/brag --tone chaotic`
- `/brag --voice`
- `/brag --title "My Cool Project"`

## Required Agents/Skills
- `Skills/Media/brag/SKILL.md` (Brag Skill)
- Node.js (22+)
- FFmpeg (on PATH)
- Hyperframes CLI (`npx hyperframes`)

## Expected Output
A `brag-output/` folder containing the launch video plan, composition brief, share copy, and rendered `brag.mp4`.
