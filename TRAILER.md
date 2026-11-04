# The Seven Hellgates — Teaser Trailer

**Format:** 60 seconds, 16:9, 24 fps  
**Working tone:** oppressive, mythic, then violently kinetic  
**Logline:** Azrael crosses a dying world to confront the seven gates between it and damnation.

This is a first-pass trailer treatment based only on the current project description. Replace any action beat that does not match the finished game with representative gameplay.

## Timed edit

| Time | Picture | Audio and edit |
| --- | --- | --- |
| 00:00–00:04 | Black. A faint horizon appears through drifting ash. One enormous sealed gate is barely visible in the distance. | Wind and low stone resonance. No music yet. Let the first impact land at 00:03. |
| 00:04–00:09 | Wide silhouette of Azrael on a broken ridge. Slow push toward the figure; ash crosses the lens. | A restrained pulse enters under the wind. A whisper, nearly lost: “Seven gates.” Use an original or cleared voice performance. |
| 00:09–00:15 | Tight details: gauntlet closing, weapon catching a line of firelight, Azrael looking toward the gate. Keep the face partly obscured. | Metal and cloth foley. The score adds a low string note with each cut. |
| 00:15–00:22 | The gate begins to open. Cut between its grinding seam and a hostile light spilling through. Azrael steps forward, small against the structure. | Stone groan builds into a hard musical hit. Cut to near-silence for the first glimpse beyond the gate. |
| 00:22–00:32 | Three fast action fragments: an approach, a defensive beat, and a decisive strike. Favor readable silhouettes and distinct shot sizes. Use actual combat capture if available; otherwise treat these as placeholders. | Percussion begins. Sync cuts to impacts, not every beat. Keep enough frame time to read the action. |
| 00:32–00:40 | A short traversal passage across a ruined causeway as the environment shifts around Azrael. End on a distant shape moving behind smoke. | Pull the music back. Wind returns, then a short rising texture as the shape moves. |
| 00:40–00:50 | Reveal a towering enemy or threat in two stages: first its shadow across the ground, then a partial silhouette. Azrael enters the foreground and raises their weapon. | One breath of silence, followed by a bass impact and the score's largest rise. Avoid showing a full boss fight unless that fight is in the game. |
| 00:50–00:55 | One final attack image, interrupted at the moment of impact. Hard cut to black. | Sharp transient, then a brief tail. Leave the final half-second clean for the title. |
| 00:55–01:00 | Title: **THE SEVEN HELLGATES**. Optional small line: **AZRAEL'S JOURNEY BEGINS**. End on black. | Let the title resolve over a low, sustained note. Add release date, platform, and studio marks only when confirmed. |

## UE5 sequence plan

1. Create a dedicated `L_TheSevenHellgates_Teaser` level and `LS_TheSevenHellgates_Teaser` Level Sequence. Set the sequence to 24 fps with a 0–1440 frame range.
2. Block each beat with CineCameraActors before detailed lighting. Use one establishing wide, two or three close details, restrained action coverage, and a final threat reveal. Keep camera movement slow until the action passage.
3. Build the ridge, gate, and causeway from project environment assets. Use Nanite for suitable dense static meshes, Lumen for dynamic bounce lighting where the target hardware supports it, and Niagara for ash or embers. Keep particles away from faces and key silhouettes.
4. Light for clear subject separation: cool, low-fill surroundings; a controlled warm source beyond the gate; and a readable rim on Azrael. Preserve shadow detail in the final grade.
5. Animate the gate and character with existing rigs and animations. If final gameplay animation is not ready, use restrained camera movement and environmental motion rather than inventing combat mechanics.
6. Add temporary dialogue, score, and effects on separate Sequencer audio tracks. Replace temp audio with original or licensed material before public release; mix for intelligibility on both headphones and phone speakers.
7. Render a low-resolution preview through Movie Render Queue and review timing, silhouettes, motion blur, and title legibility. Then render the final master at the delivery resolution and bitrate required by the release platform. Keep a clean title-free master for localized end cards.

## Asset checklist

- Azrael character model, rig, and approved locomotion/combat animations
- Gate, ridge, ruined causeway, and distant environment kit
- Enemy or threat model for the partial reveal, if one is approved
- Niagara ash/ember systems and any required fog volumes
- Original or licensed score, foley, impacts, and voice performance
- Final title lockup, studio mark, release date, and platform marks, when confirmed

## Editorial guardrails

- Use actual gameplay where a shot implies a specific mechanic; label cinematic-only footage where the final campaign needs that distinction.
- Avoid showing unapproved story reveals, named enemies, or specific gate lore.
- Keep the title on screen long enough to read, and leave legal or platform marks off until they are verified.
- The current README confirms only the dark-fantasy action genre and Azrael as the star; all other story details in this treatment are optional staging, not established canon.
