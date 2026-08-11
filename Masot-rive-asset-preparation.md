# Masot Rive Asset Preparation

## Current status

- The project currently has the artwork file: `public/Masot.png`.
- `public/Masot.riv` is missing.
- The React website already includes the integration and expects a valid Rive file at `public/Masot.riv`.
- The current Rive wrapper uses state machine name: `AlienStateMachine`.
- The current React integration expects the following inputs:
  - booleans: `isIdle`, `isTalking`, `isHappy`, `isCurious`, `isSleeping`, `isFlying`, `isInUFO`, `isTeleporting`
  - numbers: `lookX`, `lookY`
  - triggers: `triggerWave`, `triggerDance`, `triggerCelebrate`, `triggerSurprise`, `triggerTeleport`, `triggerJump`, `triggerGoodbye`, plus optional `triggerPoint`, `triggerEnterUFO`, `triggerExitUFO`.

## Existing alien artwork

- File: `public/Masot.png`
- Description: single flattened mascot illustration with a round head, two antennae, big eyes, simple smile, body, arms, and legs.
- The artwork is the exact Creative KIBO alien and must be preserved visually.
- The current image is the source reference for the Rive asset.

## Artwork preparation requirements

1. Convert the artwork to vector artwork in a design tool.
   - Recommended tools: Adobe Illustrator, Figma, Affinity Designer, Inkscape.
   - Start by tracing or recreating the shapes with vector paths.
   - Preserve the exact colors, outlines, shading, highlights, and silhouette.
   - Do not redesign the character.

2. Keep the final visual identity unchanged:
   - round head and antennae
   - large dark eyes with white highlights
   - simple smiling mouth
   - pink cheeks
   - single-piece body with subtle belly shading
   - left arm raised and right arm down
   - rounded legs and feet
   - overall soft, friendly personality

3. Create separate layers for animation-ready parts.
   - Do not flatten the asset once separated.
   - Use names that match the exact rig structure below.
   - Keep outlines consistent across grouped shapes.

4. If the artwork is not already separated, manually separate parts along natural boundaries.
   - The head should be separated from the body along the neck curve.
   - Eyes, pupils, mouth, and cheeks should be separate layers.
   - Each arm should be separated into upper arm, lower arm, and hand.
   - Each leg should be separated into upper leg, lower leg, and foot.
   - Antennae should be separate objects attached to the head.
   - Body highlights and shading may remain part of the body if that preserves the look.

5. Avoid splitting shapes in a way that introduces visible seams.
   - Use overlapping artwork or hidden joint shapes if necessary.
   - Preserve the outline thickness and shape continuity.

## Recommended layer structure

Adapted to the current artwork, the layer tree should look like this:

- `Alien`
  - `Alien_Body`
    - `Alien_Shading` (optional shading/highlight within body)
  - `Alien_Neck`
  - `Alien_Head`
    - `Alien_Antenna_Left`
    - `Alien_Antenna_Right`
    - `Alien_Eye_Left`
      - `Alien_Pupil_Left`
      - `Alien_EyeHighlight_Left`
    - `Alien_Eye_Right`
      - `Alien_Pupil_Right`
      - `Alien_EyeHighlight_Right`
    - `Alien_Mouth`
    - `Alien_Cheek_Left`
    - `Alien_Cheek_Right`
  - `Alien_Left_Arm`
    - `Alien_Left_Upper_Arm`
    - `Alien_Left_Forearm`
    - `Alien_Left_Hand`
  - `Alien_Right_Arm`
    - `Alien_Right_Upper_Arm`
    - `Alien_Right_Forearm`
    - `Alien_Right_Hand`
  - `Alien_Left_Leg`
    - `Alien_Left_Upper_Leg`
    - `Alien_Left_Lower_Leg`
    - `Alien_Left_Foot`
  - `Alien_Right_Leg`
    - `Alien_Right_Upper_Leg`
    - `Alien_Right_Lower_Leg`
    - `Alien_Right_Foot`
  - `Alien_Accessories` (optional, if the artwork has any accent pieces)

### Notes on this structure

- The character does not have separate clothing items; the body is a single main shape.
- The hands should be separate from the forearms to allow waving and pointing.
- The legs should be segmented if possible for walk/jump dance movement.
- The head and neck should be separate so the head can tilt and rotate slightly.
- The eyes and pupils must be separate to support look-follow and blink.

## Rig structure for Rive

### Root hierarchy

- `Alien_Root`
  - `Alien_Body_Node`
    - `Alien_Left_Leg_Node`
      - `Alien_Left_Foot_Node`
    - `Alien_Right_Leg_Node`
      - `Alien_Right_Foot_Node`
    - `Alien_Neck_Node`
      - `Alien_Head_Node`
        - `Alien_Antenna_Left_Node`
        - `Alien_Antenna_Right_Node`
        - `Alien_Eye_Left_Node`
        - `Alien_Eye_Right_Node`
        - `Alien_Mouth_Node`
        - `Alien_Cheek_Left_Node`
        - `Alien_Cheek_Right_Node`
    - `Alien_Left_Arm_Node`
      - `Alien_Left_Forearm_Node`
        - `Alien_Left_Hand_Node`
    - `Alien_Right_Arm_Node`
      - `Alien_Right_Forearm_Node`
        - `Alien_Right_Hand_Node`

### Pivot points

- `Neck`: at the base of the head where it meets the body.
- `Shoulders`: at the top of each arm connection to the torso.
- `Elbows`: at the middle of each arm twist/bend.
- `Wrists`: at the base of each hand.
- `Hips`: at the top connection of each leg to the body.
- `Knees`: mid-leg for natural bending.
- `Ankles`: at the foot connection.
- `Head`: center of the head for small rotations.
- `Antennae`: at their bases.

### Bones and constraints

- Use bones or deformers for the arms and legs.
- Use inverse kinematics (IK) for at least one arm chain, ideally both.
  - This makes waving and pointing feel natural.
- Use IK or a simple bone chain for legs if walking/dancing is desired.
- Use a body/root bone to drive breathing, floating, and squash/stretch.
- Use a separate head bone for subtle look/head tilt.
- Add a `lookX`/`lookY` control that can drive eye/pupil movement and small head rotation.

### Face controls

- `Blink`: create eyelid shapes or a closed-eye layer that can animate over the eye whites.
- `Pupil` movement: pupils must move independently inside each eye.
- `Mouth` control: separate the mouth so it can animate open/closed and express talking.
- `Expression`: use cheek and mouth animation for happy/surprised/curious states.
- `lookX`/`lookY`: should affect both pupils and a small head turn.

## Animation list

### First milestone (required before continuing)

1. `IDLE`
   - subtle breathing
   - slightly moving body/head
   - gentle sway
2. `BLINK`
   - natural blink cycle
3. `LOOK`
   - eyes and head adjust based on cursor or state input
4. `WAVE`
   - look toward visitor and wave right hand
5. `TALK`
   - subtle mouth movement and body sway
6. `DANCE`
   - short playful signature movement

### Secondary animations

7. `HAPPY`
8. `SURPRISED`
9. `CURIOUS`
10. `SLEEP`
11. `WAKE`
12. `WALK`
13. `RUN`
14. `JUMP`
15. `POINT`
16. `CELEBRATE`
17. `FLY`
18. `ENTER_UFO`
19. `EXIT_UFO`
20. `TELEPORT`
21. `GOODBYE`

### Recommended animation strategy

- Build the rig and base pose first.
- Create the `IDLE` loop and `BLINK` animation before any action animations.
- Add `LOOK`/`LOOK_AT_CURSOR` as a layered blend using `lookX`/`lookY`.
- Add action triggers (`WAVE`, `TALK`, `DANCE`) after `IDLE` works.
- Keep motion subtle and organic.
- Avoid mechanical hinge movement by using bones with smooth deformation.

## Rive State Machine requirements

### State Machine name

- `AlienStateMachine`

### Inputs

#### Boolean inputs
- `isIdle`
- `isTalking`
- `isHappy`
- `isCurious`
- `isSleeping`
- `isFlying`
- `isInUFO`
- `isTeleporting`

#### Number inputs
- `lookX`
- `lookY`

#### Trigger inputs
- `triggerWave`
- `triggerDance`
- `triggerSurprise`
- `triggerCelebrate`
- `triggerTeleport`
- `triggerJump`
- `triggerGoodbye`
- `triggerPoint` (optional but recommended)
- `triggerEnterUFO` (optional but recommended)
- `triggerExitUFO` (optional but recommended)

### State machine behavior

- `IDLE` is the default base state.
- `WAVE`, `DANCE`, `SURPRISE`, `CELEBRATE`, `TELEPORT`, `JUMP`, and `GOODBYE` are one-shot trigger states that return to the active base state.
- `TALK` should be a layered or additive animation driven by `isTalking` so it can overlay `IDLE`.
- `LOOK` should use `lookX`/`lookY` as continuous directed controls and blend with base states.
- `SLEEP` and `WAKE` should transition smoothly from/to `IDLE`.
- `FLY` and `IN_UFO` should be base states or blend states with floating motion.
- `isFlying` and `isInUFO` may be combined to support different travel behaviors.
- Do not hardcode animation names into React. Expose behavior through the inputs above.

### Transitions

- `IDLE → WAVE → IDLE`
- `IDLE → TALK → IDLE`
- `IDLE → DANCE → IDLE`
- `IDLE → SURPRISED → IDLE`
- `IDLE → SLEEP → WAKE → IDLE`
- `IDLE → TELEPORT`
- base states should always be able to return to `IDLE` unless a persistent mode is active.

### Animation blending

- Allow `IDLE` breathing while `LOOK` and `TALK` are active.
- Blink should be able to trigger while other transitions are playing.
- `lookX`/`lookY` should drive eye movement continuously.
- Keep transitions short and smooth.

## Exact export requirements

- Export the file from Rive as `Masot.riv`.
- Place it in the repository at: `public/Masot.riv`.
- The file must contain a valid artboard, the specified `AlienStateMachine`, and the listed inputs.
- The file must load cleanly in the current React wrapper.
- No fake placeholder file should be created.

## Exact React integration requirements

The existing React integration already requires:

- `src/components/masot/MasotRive.jsx` uses `useRive` with `stateMachines: 'AlienStateMachine'`.
- `MasotRive` should receive these props:
  - `src='/Masot.riv'`
  - boolean states: `isIdle`, `isHappy`, `isTalking`, `isCurious`, `isSleeping`, `isFlying`, `isInUFO`, `isTeleporting`
  - numeric states: `lookX`, `lookY`
  - triggers: `triggerWave`, `triggerDance`, `triggerCelebrate`, `triggerSurprise`, `triggerPoint`, `triggerEnterUFO`, `triggerExitUFO`, `triggerTeleport`
- The wrapper should fire triggers only when the prop transitions from false to true.
- The `AlienCharacter` component should remain a dedicated layer overlay and not block core UI.
- The asset should be lazy loaded by the browser from `public/Masot.riv`.
- The React app should support reduced motion and pause animation on tab hidden.
- The existing integration is ready for a valid `Masot.riv` file.

## What to do next

1. Open `public/Masot.png` in a vector editor or import it into a tool that can reconstruct vector shapes.
2. Separate the artwork into the layer structure above.
3. Import the separated artwork into Rive.
4. Build the bones, pivots, and IK rig exactly as described.
5. Create the `AlienStateMachine` and inputs above.
6. Implement the first milestone animations: `IDLE`, `BLINK`, `LOOK`, `WAVE`, `TALK`, `DANCE`.
7. Export `public/Masot.riv`.
8. Load the site and verify the file loads, the canvas appears, and the inputs are recognized.

## Important limitation

I cannot create a valid `.riv` file in this environment because the necessary vector/Rive editor tools are not available here.

This document provides the exact preparation, layer structure, rig structure, animation list, state machine name, inputs, export requirements, placement path, and React integration details needed to build the real asset.

Do not consider the alien system complete until `public/Masot.riv` exists and successfully renders in the site.
