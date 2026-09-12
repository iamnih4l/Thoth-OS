# Frontend Review Workflows

When performing a review on a frontend implementation, conduct checks based on the following three lenses: **Critique**, **Audit**, and **Polish**.

## 1. Critique (UX & Visual Hierarchy)
Evaluate whether the UI communicates its purpose efficiently and cleanly.
- **Copy Self-Audit**: Are there grammatically broken strings? Are there AI-hallucinated metaphors or fake-precise numbers? Does the hero clearly state the value-prop in less than 20 words?
- **Layout Rhythm**: Is the "Zigzag Alternation Cap" respected (max 2 sections of alternating left-image/right-text)? Do Bento grids have visual rhythm rather than empty/blank tiles?
- **Hierarchy Checks**: Is there an over-reliance on nested cards? Is the "Anti-Center Bias" appropriately applied when variance is high? 
- **Duplicated Intent**: Are there multiple CTAs with the exact same intent but different wording (e.g. "Try free" and "Get started")? 

## 2. Audit (Technical & Accessibility Quality)
Evaluate the resilience and performance of the codebase.
- **Responsive Behavior**: Is `min-h-[100dvh]` used instead of `h-screen` to prevent layout jumping on mobile Safari? Is the navigation bar properly collapsing on small viewports without breaking?
- **Accessibility & Contrast**: Does the CTA text pass WCAG AA contrast (4.5:1)? Are placeholders on forms legible against their backgrounds? 
- **Reduced Motion**: If animations are used, are they gated behind `useReducedMotion()` or `@media (prefers-reduced-motion: reduce)`?
- **Touch States**: Are hover states appropriately gated with `@media (hover: hover) and (pointer: fine)` so they don't break on touch devices?

## 3. Polish (Animation & Interaction Polish)
Focus on the invisible details that make the software feel premium.
- **The "scale(0)" Ban**: No element should animate from `scale(0)`. Fix it to start from `scale(0.95)` and `opacity: 0`.
- **Easing Curve Verification**: Check all transitions. If `ease-in` is used on an entrance animation, flag it and replace it with `ease-out` (e.g., `cubic-bezier(0.23, 1, 0.32, 1)`).
- **Button Responsiveness**: Does the button include `transform: scale(0.97)` on `:active`?
- **Interruptibility**: Are CSS `transition`s used instead of `@keyframes` for interactions that users can interrupt (like toasts or popovers)?

## Output Format
When reviewing UI code, you MUST use a markdown table with Before/After columns. Do NOT use a list.

| Before | After | Why |
| --- | --- | --- |
| `transition: all 300ms` | `transition: transform 200ms ease-out` | Specify exact properties; avoid `all` |
| `transform: scale(0)` | `transform: scale(0.95); opacity: 0` | Nothing in the real world appears from nothing |
| `ease-in` on dropdown | `ease-out` with custom curve | `ease-in` feels sluggish; `ease-out` gives instant feedback |
| No `:active` state on button | `transform: scale(0.97)` on `:active` | Buttons must feel responsive to press |
