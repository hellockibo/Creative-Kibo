# Masot Rive Final Specification

## Purpose
This file contains the exact Rive asset specification needed to complete the Creative KIBO alien system.

## Final asset path
- `public/Masot.riv`

## State Machine
- Name: `AlienStateMachine`

## Required inputs

### Boolean inputs
- `isIdle`
- `isTalking`
- `isHappy`
- `isCurious`
- `isSleeping`
- `isFlying`
- `isInUFO`
- `isTeleporting`

### Number inputs
- `lookX`
- `lookY`

### Trigger inputs
- `triggerWave`
- `triggerDance`
- `triggerSurprise`
- `triggerCelebrate`
- `triggerTeleport`
- `triggerJump`
- `triggerGoodbye`
- optional: `triggerPoint`
- optional: `triggerEnterUFO`
- optional: `triggerExitUFO`

## Required animations

### First milestone
- `Idle`
- `Blink`
- `Look`
- `Wave`
- `Talk`
- `Dance`

### Secondary animations
- `Happy`
- `Surprised`
- `Curious`
- `Sleep`
- `Wake`
- `Walk`
- `Run`
- `Jump`
- `Point`
- `Celebrate`
- `Fly`
- `EnterUFO`
- `ExitUFO`
- `Teleport`
- `Goodbye`

## Layer / rig structure

- `Alien`
  - `Alien_Body`
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

## Notes about the artwork
- Preserve the existing head shape, antennae, eyes, mouth, cheeks, arms, and leg proportions.
- Use the original shading and outline style.
- Do not redesign the mascot.
- Only reconstruct separations that are necessary for clean rigging.

## Verification checklist
- [ ] `public/Masot.riv` exists.
- [ ] The file opens in Rive.
- [ ] `AlienStateMachine` is present.
- [ ] `lookX` and `lookY` inputs exist.
- [ ] All required boolean inputs exist.
- [ ] All required trigger inputs exist.
- [ ] `Idle`, `Blink`, `Look`, `Wave`, `Talk`, and `Dance` animations exist.
- [ ] The asset loads in the React app without runtime errors.
- [ ] The character appears in the homepage overlay.
- [ ] The character can respond to `lookX` and `lookY`.
- [ ] Trigger inputs fire once and return to idle.

## Limitations
- This environment cannot generate a `.riv` file.
- The final file must be created in the Rive editor using the above spec.
