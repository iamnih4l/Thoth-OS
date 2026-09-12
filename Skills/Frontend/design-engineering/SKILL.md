---
name: Frontend Design Engineering
description: Comprehensive frontend design, architecture, and interaction skill enforcing impeccable craft, anti-slop visuals, and purposeful motion. Use this skill when generating UI, landing pages, web apps, dashboards, or performing a frontend redesign.
---

# Frontend Design Engineering

## Purpose
Elevate frontend code from "functional but generic" to "impeccably crafted and deeply intentional". This skill applies trained design-engineering instincts to typography, layout, animation, and interaction. It ensures the UI is responsive, accessible, performs well, and rejects templated "AI slop" defaults.

## When to Activate
- Creating a new website or landing page
- Building a React interface or Next.js application
- Designing a product interface, dashboard, or app shell
- Generating UI components
- Redesigning an existing frontend
- Evaluating or auditing a UI design

## When NOT to Activate
- Backend-only tasks (API design, databases, infrastructure)
- CLI tools or terminal applications
- Non-frontend scripts (e.g., Python data processing)

## Workflow

1. **Understand the Product (Brief Inference)**
   Determine the page kind (landing, portfolio, redesign, editorial), the audience, and the vibe.
2. **Define the Experience (Design Modes & Dials)**
   - Mode: Persuade, Operate, Read, or Experience.
   - Set Dials (1-10): `DESIGN_VARIANCE`, `MOTION_INTENSITY`, `VISUAL_DENSITY`.
3. **Define Interface Architecture (Design System Map)**
   Pick the right stack and foundation. Do not reinvent standard components if an official system (e.g., Radix, shadcn, Fluent) is a better fit.
4. **Build the Visual System (Layout & Typography Discipline)**
   - Apply strict layout rules (e.g., Anti-Center Bias, Bento Grid rhythms).
   - Enforce typography constraints (e.g., Serif discipline, Display pairings).
5. **Add Interaction (Motion Framework)**
   - Only animate with purpose (spatial consistency, state indication, feedback).
   - Use custom `ease-out` curves for UI, never `ease-in`.
   - Use spring physics for interruptible interactions.
6. **Validate & Polish (Quality Checks)**
   Review contrast, responsiveness, touch targets, and CTA text wraps.
   
## Core Principles

### 1. The Three Dials
Every layout, motion, and density decision is gated by these dials (scale 1-10):
- **DESIGN_VARIANCE**: 1 = Perfect Symmetry, 10 = Artsy Chaos. (Default: 8 for creative, 4 for public-sector).
- **MOTION_INTENSITY**: 1 = Static, 10 = Cinematic/Physics. (Default: 6).
- **VISUAL_DENSITY**: 1 = Art Gallery/Airy, 10 = Cockpit/Packed Data. (Default: 4).

### 2. Typography & Color Guardrails
- **Serif Discipline**: Do not default to Serif for display fonts unless explicitly requested or for an editorial/vintage brand. Use geometric or grotesque sans-serifs.
- **Premium Palette Ban**: Do not default to the "AI Beige/Brass" palette (e.g., `#f5f1ea` + `#b08947`). Pick distinct, monochromatic, or cool-luxury palettes instead.
- **Eyebrow Restraint**: Max 1 eyebrow (small uppercase tracking label) per 3 sections. Do not put an eyebrow over every single section headline.

### 3. Layout Discipline
- **Hero Constraints**: Hero must fit in the initial viewport. Headline max 2 lines. Subtext max 20 words.
- **No Data Dumps**: Break long spec sheets into bento grids, grouped chunks, or scroll-snap pills.
- **Visual Assets**: Never use text-only sections when a visual is needed. Generate images or use descriptive placeholders.

### 4. Animation & Interaction
- **UI Animation Speed**: Keep UI animations under 300ms. 
- **Easing**: Use `ease-out` for enters, `ease-in-out` for on-screen movement. **Never use `ease-in` for UI animations** (it feels sluggish).
- **Never animate from `scale(0)`**: Start from `scale(0.95)` with `opacity: 0`. Nothing in the real world appears from nothing.
- **Buttons**: Must feel responsive. Add `transform: scale(0.97)` on `:active`.

## Checklists & References
- See `workflows/review.md` for the critique, audit, and polish checklists.
- See `patterns/animations.md` for canonical code skeletons (Sticky-Stack, Horizontal-Pan).
