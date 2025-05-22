// Daft Punk inspired Techno Pattern
const bpm = 130
const filterCutoff = 1200

// Drums - TR-909 style
const drums = stack(
  s("bd*2, [~ bd]*2").bank("tr909").gain(0.8).vis(),
  s("[~ hh]*4").bank("tr909").gain(0.6).vis(),
  s("[~ sn:2]*2").bank("tr909").gain(0.7).vis()
)

// Funky bassline
const bass = note("c1 [~ c2] eb1 [~ bb1]")
  .sound("sawtooth")
  .cutoff(filterCutoff)
  .gain(0.7)
  .slow(2)
  .vis()

// Chords with filter movement
const chords = note("Cm7 Fm7 Gm7 Bb7")
  .sound("square")
  .cutoff("<2000 800 3000 1200>")
  .gain(0.4)
  .slow(4)
  .vis()

// Arpeggiated melody
const arp = note("c4 [eb4 g4] bb4 [c5 g4]")
  .sound("triangle")
  .cutoff(3000)
  .gain(0.5)
  .echo(0.25, 0.4, 4)
  .fast(2)
  .vis()

// Robot voice synth
const voice = note("c3,eb3,g3")
  .sound("sine")
  .gain(0.6)
  .freq(time => Math.sin(time * 8) * 100 + 440)
  .vis()

// Sections
const intro = stack(drums, bass).slow(2)
const main = stack(drums, bass, chords, arp)
const break1 = stack(chords, voice).slow(2)
const drop = stack(drums, bass, chords, arp, voice)

// Arrangement
const music = cat([
  intro.loop(2),
  main.loop(2),
  break1.loop(1),
  drop.loop(2)
])

// Final output with effects
stack(
  music
    .room(0.2)
    .lpf(filterCutoff)
    .gain(0.8)
).slow(60/130) 