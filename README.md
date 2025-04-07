# wastelands
## https://mrtrebron.github.io/wastelands/
## description
Incremental Idle Game in (Vanilla) JS, HTML, CSS

Simple as can be, no fancy frameworks or anything, all pure Vanilla JS. Sure, all of this could be nicer, prettier, niftier.
It (mostly) does, what I wanted it to, so it's fine for me.

Known issues:
* with one of the later changes I broke the low level unlocks somehow, haven't figured out yet, how and where
* minor oopsies (tiny display errors or silent fails of functions, nothing too severe floating around)

Concept:
Your regular old citybuilder (non-graphic) with micro management elements for various resources.
RT-RL weather based events and effects, using Openweather API.
Effects include: 
* solar panels have different efficiency based on cloud cover
* windmills don't produce electricity if wind < 3 m/s
* several rain vs. sun vs. snow vs. wind based buffs/debuffs

Features:
* event system
* expedition system
* random timed events
* milestone-based unlocks (have building x at level y to unlock building z etc.)
* random timed base raids (your community gets attacked)
* various boosters and reducers in the buildings to boost income/reduce maluses
* technically no endgame, though one can question how much fun you can derive from it anymore, once you reached the last unlocked building and upgraded that 400+ times...
* mostly responsive (there may be certain artefacts where I couldn't be bothered to really sit down and think of every odd occult resolution/window sizing people might come up with but it mostly scales just fine)

Usage is fairly straight forward. Throw all files in the same folder and open index.html with a browser of your choice.

Have fun.
