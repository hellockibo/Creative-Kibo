# Masot Rive State Machine Blueprint

## Purpose
This document defines the complete Rive character state machine for the Creative KIBO mascot, based on the prepared `Masot.png` artwork and rig separation.

The intent is to provide a production-ready animation design that can be implemented directly in Rive and remotely controlled from React.

---

## Recommended Rive File Structure

### Groups / Bones
- `masot_root`
  - `masot_body`
    - `masot_left_leg_upper`
      - `masot_left_leg_lower`
        - `masot_left_foot`
    - `masot_right_leg_upper`
      - `masot_right_leg_lower`
        - `masot_right_foot`
    - `masot_neck`
      - `masot_head`
        - `masot_antenna_left`
        - `masot_antenna_right`
        - `masot_eye_left_outer`
          - `masot_pupil_left`
          - `masot_eye_highlight_left`
        - `masot_eye_right_outer`
          - `masot_pupil_right`
          - `masot_eye_highlight_right`
        - `masot_mouth`
        - `masot_cheek_left`
        - `masot_cheek_right`
    - `masot_left_arm_upper`
      - `masot_left_arm_lower`
        - `masot_left_hand`
    - `masot_right_arm_upper`
      - `masot_right_arm_lower`
        - `masot_right_hand`

### Naming Conventions
- Use clear developer-friendly names.
- Prefix layers and bones with `masot_` to avoid collisions.
- Keep eye and mouth shapes separate from the head for expressions.

---

## Inputs

Use the following Rive inputs to drive states and blends.

### Boolean Inputs
- `isIdle`
- `isHappy`
- `isTalking`
- `isCurious`
- `isSleeping`
- `isFlying`
- `isInUFO`
- `isTeleporting`

### Trigger Inputs
- `triggerWave`
- `triggerDance`
- `triggerCelebrate`
- `triggerSurprise`
- `triggerTeleport`

### Numerical Inputs
- `lookX` — range `[-1, 1]`
- `lookY` — range `[-1, 1]`

> `lookX` and `lookY` should be treated as continuous values for eye/head tracking and subtle pose blending.

---

## Animation List

Create named Rive animations for each core behavior.

### Base Animations
- `Idle_Breath` — gentle breathing and subtle body sway.
- `Blink` — natural blink animation.
- `Look` — eye and head movement responding to `lookX` / `lookY`.

### Action Animations
- `Wave` — arm wave, head turn toward viewer.
- `Curious` — leaning or head tilt with intrigued eyes.
- `Happy` — cheerful bounce and smiling expression.
- `Surprised` — short exaggerated widen-eyes reaction.
- `Sleep` — sleepy eyelids, small bounce, subtle breathing.
- `Wake` — rising head/eyes and awakening expression.
- `Dance` — playful short dance loop.
- `Talk` — mouth movement + subtle body sway.
- `Point` — arm extends to point at a UI target.
- `Celebrate` — small jump / fist-pump style animation.
- `Walk` — natural walking cycle if legs are segmented.
- `Fly` — floating motion with gentle hovering.
- `Enter_UFO` — move toward and into a UFO.
- `Exit_UFO` — emerge from UFO position.
- `Teleport` — charged prep, blink/flash, disappear.

---

## State Machine Architecture

This character is best built with a layered state machine architecture.

### Layer 1: Core Behavior Layer
- States: `Idle`, `Happy`, `Curious`, `Sleeping`, `Flying`, `InUFO`, `Teleporting`
- Transitions:
  - `Idle` is default when no other boolean is active.
  - `isHappy` → `Happy`
  - `isCurious` → `Curious`
  - `isSleeping` → `Sleeping`
  - `isFlying` → `Flying`
  - `isInUFO` → `InUFO`
  - `isTeleporting` or `triggerTeleport` → `Teleporting`
- Use blend trees for `Idle` + `Flying` to allow soft motion between states.

### Layer 2: One-shot Actions Layer
- Transition using trigger inputs.
- Each trigger plays the corresponding animation once.
- Return to the prior base state after completion.

### Layer 3: Expression / Look Layer
- Driven by `lookX`, `lookY`, and `Blink`.
- Should blend with all base states so the character can look around while idle, happy, or sleeping.
- Use a state or blend animation that maps `lookX`, `lookY` to:
  - pupil translation
  - eye orientation
  - small head tilt
  - antenna subtle follow motion

### Layer 4: Talk / Facial Layer
- `Talk` is a semi-independent layer controlled by `isTalking`.
- Can blend with base states and allow idle breathing + talking simultaneously.
- Mouth shape animation should be additive and subtle.

---

## Recommended Input Behavior

### `isIdle`
- Default idle behavior.
- If `isIdle` is false and no other states are active, fallback to `Idle` anyway.

### `lookX` / `lookY`
- Range values should be clamped to `[-1, 1]`.
- Use a small amount of head rotation and pupil translation.
- Keep motion subtle to avoid the eyes feeling mechanical.

### `triggerWave`
- One-shot wave animation.
- The character should turn slightly toward the viewer before waving.

### `triggerDance`
- Play a short dance sequence, then return to base.

### `triggerCelebrate`
- Play a simple celebratory gesture with a pleasant return to base.

### `triggerSurprise`
- Brief surprise reaction and return to the current base state.

### `triggerTeleport`
- Starts teleport animation with a smooth disappearance.
- After completion, the character may remain hidden or transition to `isInUFO` / `isIdle` depending on site logic.

---

## Suggested Transitions

Use smooth transitions and blending rather than hard cuts.

### Examples
- `Idle` → `Happy`: blend body up / eyes brighten over 0.2s
- `Idle` → `Sleeping`: soften gaze and lower head over 0.3s
- `Sleeping` → `Wake`: quick eye open + slight body lift
- `Idle` → `Flying`: float out with a gentle ease-in
- `Wave` → `Idle`: return to idle with the ending pose as the start of the transition
- `Talk` (layered) should use additive blending with idle/happy

### One-shot Actions
- Play `Wave`, `Dance`, `Celebrate`, `Surprise`, `Teleport` with a short exit blend to the active base state.
- Keep triggers exclusive when appropriate, but allow `Blink` and `Look` to continue during these actions.

---

## React Control API

Create a simple React control contract for the Rive state machine.

### Input mapping:
- `isIdle` → boolean
- `isHappy` → boolean
- `isTalking` → boolean
- `isCurious` → boolean
- `isSleeping` → boolean
- `isFlying` → boolean
- `isInUFO` → boolean
- `isTeleporting` → boolean
- `lookX` → number between `-1` and `1`
- `lookY` → number between `-1` and `1`
- `triggerWave` → trigger
- `triggerDance` → trigger
- `triggerCelebrate` → trigger
- `triggerSurprise` → trigger
- `triggerTeleport` → trigger

### Developer-friendly usage:
- When mouse or pointer moves inside the hero area, update `lookX` / `lookY`.
- Use `triggerWave` on hover or CTA focus.
- Use `triggerCelebrate` after a successful form submission or milestone event.
- Use `triggerTeleport` when transitioning between sections or for a surprise effect.

---

## Naming Guidelines for Rive Animations

- `Anim_Idle_Breath`
- `Anim_Blink`
- `Anim_Look`
- `Anim_Wave`
- `Anim_Curious`
- `Anim_Happy`
- `Anim_Surprised`
- `Anim_Sleep`
- `Anim_Wake`
- `Anim_Dance`
- `Anim_Talk`
- `Anim_Point`
- `Anim_Celebrate`
- `Anim_Walk`
- `Anim_Fly`
- `Anim_Enter_UFO`
- `Anim_Exit_UFO`
- `Anim_Teleport`

### State Machine names
- `StateMachine_Masot_Behavior`
- `StateMachine_Masot_Look`
- `StateMachine_Masot_Talk`

---

## Optimization Recommendations

- Keep the imported vector artwork clean and minimal.
- Use single shared shapes for symmetrical elements where possible.
- Avoid unnecessarily complex meshes unless a specific motion requires it.
- Use Rive bones for smooth organic motion instead of rigid layer-by-layer rotation.
- Limit total frame count by reusing the same look, blink, and breathing loops across multiple states.

---

## Implementation Notes

- Import the separated artwork into Rive as individual objects.
- Create bone chains for each limb and attach geometry.
- Use a `lookX` / `lookY` blend animation to drive eye and head positions.
- Build the `Idle` state with breathing and subtle idle drift.
- Layer `Blink` and `Talk` so they can occur while the character is not fully static.
- Use trigger states for one-time expressive actions.

---

## Final Result
This blueprint is designed to produce a fully interactive Creative KIBO character in Rive with:

- smooth transitions,
- layered behavior blending,
- cursor-aware eye/head tracking,
- reusable developer-triggered states,
- expressive but tasteful motion,
- a clean API for React.
