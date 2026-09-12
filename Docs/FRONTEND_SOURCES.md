# Frontend Capabilities Origins & Sourcing

The `design-engineering` skill in Thoth OS was constructed by synthesizing the best practices from three open-source frontend design and agent-skill repositories.

## 1. Impeccable
- **Repository**: [pbakaus/impeccable](https://github.com/pbakaus/impeccable)
- **License**: Apache 2.0
- **Extracted Capabilities**:
  - **Review Modes (Critique, Audit, Polish)**: Integrated into `workflows/review.md` to structure how the agent self-evaluates UI work.
  - **Design Registers (Persuade, Operate, Read, Experience)**: Integrated as the first step in Brief Inference.
  - **Anti-Patterns**: Constraints around spacing and component hierarchy.

## 2. Taste-Skill
- **Repository**: [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)
- **License**: MIT
- **Extracted Capabilities**:
  - **The Three Dials**: `DESIGN_VARIANCE`, `MOTION_INTENSITY`, and `VISUAL_DENSITY` used as global constraints to guide layout decisions.
  - **Typography & Layout Constraints**: Rules regarding "Serif discipline", the "Premium Palette Ban", anti-center bias, and bento grid layout limits.
  - **Brief Inference Strategy**: The practice of reading the project signals before executing any code.

## 3. Emil Kowalski's Design Engineering Skills
- **Repository**: [emilkowalski/skills](https://github.com/emilkowalski/skills)
- **Extracted Capabilities**:
  - **Animation Decision Framework**: Rules governing when and how to animate (e.g., UI animations under 300ms, using `ease-out`, never animating from `scale(0)`).
  - **Interaction Details**: Button responsiveness (`scale(0.97)` on `:active`), origin-aware popovers.
  - **Code Skeletons**: Provided canonical implementations of complex GSAP patterns (Sticky-Stack, Horizontal-Pan) and CSS popover animations, which are available in `patterns/animations.md`.

## Attribution Policy
The rules and heuristics from these repositories have been adapted into natural-language instructions for Thoth OS agents. We do not directly copy source code functionality but instead embed the *architectural knowledge* and *design constraints* into the system's cognitive process.
