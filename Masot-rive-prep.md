# Masot Rive Preparation

## Overview
This document describes the animation-ready separation and rig structure for the `public/Masot.png` Creative KIBO alien artwork.

The goal is to preserve the exact visual identity, proportions, silhouette, colors, facial appearance, clothing, accessories, and overall personality while preparing the asset for smooth, natural Rive animation.

---

## Recommended Separable Parts

1. `root` / `character`: top-level group
2. `body`: main torso and lower body shape
3. `head`: full round head shape
4. `neck`: attachment pivot area between head and body
5. `antenna_left`: left antenna stalk + bulb
6. `antenna_right`: right antenna stalk + bulb
7. `antenna_left_highlight`: optional separate sparkle/highlight on left antenna bulb
8. `antenna_right_highlight`: optional separate sparkle/highlight on right antenna bulb
9. `eye_left_outer`: left eye white/outline shape
10. `eye_right_outer`: right eye white/outline shape
11. `pupil_left`: left pupil/dark eye interior
12. `pupil_right`: right pupil/dark eye interior
13. `eye_highlight_left`: small bright highlight on left eye
14. `eye_highlight_right`: small bright highlight on right eye
15. `mouth`: smile curve
16. `cheek_left`: left blush circle
17. `cheek_right`: right blush circle
18. `left_shoulder`: left shoulder/upper arm root region
19. `left_arm_upper`: left upper arm segment
20. `left_elbow`: left elbow pivot region (implied)
21. `left_arm_lower`: left lower arm segment
22. `left_wrist`: left wrist pivot region
23. `left_hand`: left hand shape
24. `right_shoulder`: right shoulder/upper arm root region
25. `right_arm_upper`: right upper arm segment
26. `right_elbow`: right elbow pivot region (implied)
27. `right_arm_lower`: right lower arm segment
28. `right_wrist`: right wrist pivot region
29. `right_hand`: right hand shape
30. `left_leg_upper`: left upper leg/thigh
31. `left_knee`: left knee pivot region (implied)
32. `left_leg_lower`: left lower leg/shin
33. `left_ankle`: left ankle pivot region
34. `left_foot`: left foot boundary area / lower leg tip
35. `right_leg_upper`: right upper leg/thigh
36. `right_knee`: right knee pivot region (implied)
37. `right_leg_lower`: right lower leg/shin
38. `right_ankle`: right ankle pivot region
39. `right_foot`: right foot boundary area / lower leg tip
40. `body_shade` / `body_highlight`: optional internal shading/highlight shapes

> Note: `cheeks`, pupils, and highlights should remain separate to support facial expressions, blinking, and eye tracking.

---

## Suggested Rig Hierarchy

- `root`
  - `body`
    - `left_leg_upper`
      - `left_leg_lower`
        - `left_foot`
    - `right_leg_upper`
      - `right_leg_lower`
        - `right_foot`
    - `head`
      - `neck` (pivot point at base of head)
      - `antenna_left`
      - `antenna_right`
      - `eye_left_outer`
        - `pupil_left`
        - `eye_highlight_left`
      - `eye_right_outer`
        - `pupil_right`
        - `eye_highlight_right`
      - `mouth`
      - `cheek_left`
      - `cheek_right`
  - `left_arm_upper`
    - `left_arm_lower`
      - `left_hand`
  - `right_arm_upper`
    - `right_arm_lower`
      - `right_hand`

### Pivot Points

- Head / neck: at the base center of the head where it meets the body
- Shoulders: near the upper edge of the torso where arms connect
- Elbows: midpoints of each arm, positioned where a natural bend occurs
- Wrists: base of each hand
- Hips: top of each upper leg where it meets the body
- Knees: midpoints of each leg
- Ankles: bottom of each lower leg, near the foot tip
- Feet: bottommost points for planted and walking poses
- Antennae: base of each stalk on the head
- Eyes: center of each eye white group for rotation and tracking
- Pupils: center of each pupil to move inside the eye white

---

## Facial and Eye Requirements

The character should support:

- `look left`, `look right`, `look up`, `look down`
  - `pupil_left` and `pupil_right` move inside their eye outer shapes.
  - optional subtle head tilt with `head` / `neck` pivot.
- `blink`
  - requires additional eyelid artwork or separate closed-eye path(s).
  - can be implemented with opacity toggles or morphing shapes in Rive.
- `happy`, `surprised`, `curious`
  - mouth shape can swap or be animated.
  - cheeks should scale/opacity for expression.
  - eye size or pupil position can change.
- `talk`
  - mouth has a separate shape or multiple mouth poses for lip-sync animation.
- `sleep` / `wake`
  - eyelid shapes and subtle head / arm adjustments.

> Because the original artwork is a simple smiling face, a small set of additional expression frames is needed rather than a full redesign.

---

## Animation States & Inputs

Use the following state names and boolean inputs in Rive:

- `idle`
- `hover`
- `wave`
- `dance`
- `talk`
- `happy`
- `surprised`
- `sleep`
- `wake`
- `lookX` / `lookY`
- `isWalking`
- `isFlying`
- `isTalking`
- `isHappy`
- `isCurious`
- `isTeleporting`
- `isInUFO`

Possible motion blending:

- head tilt + eye tracking under `lookX` / `lookY`
- arm pose blending between idle/wave/point
- body sway for `idle`, `dance`, and `hover`
- leg movement for `isWalking`, `isFlying`, and `jump`

---

## Practical Rive Import Notes

1. Convert the image to vector artwork in a design tool with separate named layers.
2. Export as an SVG with each separable part retained as an individual object.
3. Import the SVG into Rive and preserve the object names in the layer tree.
4. Use Rive groups to establish the hierarchies above.
5. Use mesh deformation or bones for organic limb bending rather than hard hinge motion.
6. Keep the original silhouette and color palette intact.

---

## Artwork Gaps / Reconstruction Needs

The original raster artwork is clean, but it does not include explicit joint separations or eyelid shapes. To prepare for a robust Rive rig, the following should be created or reconstructed:

- `left_arm_upper` / `left_arm_lower` / `left_hand` as distinct segments for smooth waving and pointing.
- `right_arm_upper` / `right_arm_lower` / `right_hand` for natural wave motion.
- `left_leg_upper` / `left_leg_lower` / `left_foot` and equivalent right leg pieces for walking/running/jumping.
- `left_eyelid` and `right_eyelid` or closed-eye versions for blinking and sleep states.
- `mouth` pose variants for talking, surprised, and happy expressions.
- `pupil` and `eye_highlight` separated from the eye white.
- optional `foot` shapes at each leg bottom if not available in the current silhouette.

If exact visual information is not present for a knee or ankle boundary, use the existing limb silhouette to place pivots and create minimal hidden joint shapes that preserve the original look.

---

## Recommended Naming Conventions

- `masot_root`
- `masot_body`
- `masot_head`
- `masot_neck`
- `masot_left_arm_upper`
- `masot_left_arm_lower`
- `masot_left_hand`
- `masot_right_arm_upper`
- `masot_right_arm_lower`
- `masot_right_hand`
- `masot_left_leg_upper`
- `masot_left_leg_lower`
- `masot_left_foot`
- `masot_right_leg_upper`
- `masot_right_leg_lower`
- `masot_right_foot`
- `masot_eye_left_outer`
- `masot_pupil_left`
- `masot_eye_right_outer`
- `masot_pupil_right`
- `masot_mouth`
- `masot_cheek_left`
- `masot_cheek_right`
- `masot_antenna_left`
- `masot_antenna_right`

---

## Final Recommendation

This asset is ready for Rive preparation as long as the raster artwork is converted into vector layers and the identified joint/face pieces are separated.

The final Rive rig should be clean, hierarchical, and organic, with natural pivots at shoulders, elbows, wrists, hips, knees, ankles, and neck.

An interactive React website can then drive this character through a state machine using inputs like `lookX`, `isWalking`, `isHappy`, `wave`, and `isInUFO`.
