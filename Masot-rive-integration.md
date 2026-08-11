# Creative KIBO Masot Rive Integration

This guide describes how to implement the Creative KIBO mascot as a fully interactive Rive character and how to embed it in the React website.

## Asset Requirements

- `public/Masot.riv` — final Rive file exported from the Rive editor.
- The Rive file should include:
  - `AlienStateMachine`
  - boolean inputs: `isIdle`, `isHappy`, `isTalking`, `isCurious`, `isSleeping`, `isFlying`, `isInUFO`, `isTeleporting`
  - trigger inputs: `triggerWave`, `triggerDance`, `triggerCelebrate`, `triggerSurprise`, `triggerTeleport`
  - numeric inputs: `lookX`, `lookY`
  - named animations: `Anim_Idle_Breath`, `Anim_Blink`, `Anim_Look`, `Anim_Wave`, `Anim_Curious`, `Anim_Happy`, `Anim_Surprised`, `Anim_Sleep`, `Anim_Wake`, `Anim_Dance`, `Anim_Talk`, `Anim_Point`, `Anim_Celebrate`, `Anim_Walk`, `Anim_Fly`, `Anim_Enter_UFO`, `Anim_Exit_UFO`, `Anim_Teleport`

## Recommended State Machine Structure

### Base layer
- Idle state with breathing and subtle body movement.
- Happy state with cheerful expression.
- Curious state with head lean.
- Sleep state with small breathing and closed eyelids.
- Fly state with floating motion.
- InUFO state for the character docked in the UFO.
- Teleport state with disappearance.

### Action layer
- One-shot actions triggered by `triggerWave`, `triggerDance`, `triggerCelebrate`, `triggerSurprise`, `triggerTeleport`.
- Each action returns smoothly to the current base state.

### Look / Eyes layer
- Responsive `lookX` and `lookY` input drives eye tracking and subtle head orientation.
- Blink is layered so it can occur during other states.

### Talk layer
- `isTalking` controls mouth movement while preserving the base state.
- Should blend additively with idle or happy so the character can speak while alive.

## React Integration

A React wrapper component has been added at `src/components/masot/MasotRive.jsx`.

### Example usage

```jsx
import { useState } from 'react';
import { MasotRive } from '../components/masot/MasotRive';

export function HomeMasot() {
  const [wave, setWave] = useState(false);
  const [lookX, setLookX] = useState(0);
  const [lookY, setLookY] = useState(0);

  return (
    <div className="masot-wrapper">
      <MasotRive
        src="/Masot.riv"
        className="masot-rive"
        isIdle={true}
        isHappy={false}
        isTalking={false}
        isCurious={false}
        isSleeping={false}
        isFlying={false}
        isInUFO={false}
        isTeleporting={false}
        lookX={lookX}
        lookY={lookY}
        triggerWave={wave}
        onReady={() => setWave(false)}
      />
    </div>
  );
}
```

### Input behavior

- `isIdle`: default idle mode.
- `isHappy`: cheerful state.
- `isTalking`: activates talk animation.
- `isCurious`: triggers curiosity posture.
- `isSleeping`: triggers sleep pose.
- `isFlying`: triggers floating animation.
- `isInUFO`: toggles the UFO state.
- `isTeleporting`: toggles teleport pose.
- `lookX`, `lookY`: continuous values between `-1` and `1`.
- `triggerWave`, `triggerDance`, `triggerCelebrate`, `triggerSurprise`, `triggerTeleport`: one-shot triggers.

## Recommended React control pattern

- Use pointer movement over the Masot canvas to update `lookX` and `lookY`, or supply explicit values from page tracking.
- Fire one-shot triggers in response to UI events such as hover, click, or success messages.
- Set boolean state values for longer-lived conditions like sleeping or flying.

## Performance Notes

- Keep the vector artwork clean and avoid unnecessary mesh complexity.
- Use a single Rive file for the mascot and reuse it across pages.
- Avoid using multiple large state machines when one layered machine is sufficient.
- Use `autoplay` and event triggers rather than continuous rerender loops.

## Implementation instruction

1. Build the Rive character in the Rive editor using the prepared artwork and rig.
2. Export the `.riv` file as `public/Masot.riv`.
3. Ensure the state machine and inputs match the names above.
4. Install the Rive runtime dependency:

```bash
npm install @rive-app/react-canvas
```

5. Import `MasotRive` into your page or hero section.
6. Drive the character from React using the provided input contract.

## Notes

The final `.riv` file must be created in the Rive editor. This repository now includes the React integration and state machine blueprint so the character is ready to become a production-ready web mascot.
