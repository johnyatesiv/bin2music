# bin2music
Arbitrary binary to music converter for funsies.

# algorithm

1. read in the binary and break into 4 pieces sequentially
2. for each piece, convert to hexadecimal
3. 0-B are A-B in musical order
4. C and D designate key changes
5. E and F designate groove changes
6. determine the tempo and time signature by the length of the input
7. rework this algorithm, especially 4 and 5 if key or tempo changes too much

# feature list

v0. read in binary and output musical notes with their tempo and duration
v1. read in binary and output to 4 separate tracks
v2. render the output as MIDI
v3. stream to MIDI

# notes

5/11/2015 - realizing now that chunking the input buffer into 8bit pieces may not be sufficient for
making the MIDI decisions, might need to switch to 12bit or 16bit