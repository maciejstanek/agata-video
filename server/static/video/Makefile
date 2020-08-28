EXT=mp4
ALTS:=$(patsubst %.ogg,%.$(EXT),$(wildcard *.ogg))

.PHONY: all clean

all: $(ALTS)

%.$(EXT): %.ogg
	ffmpeg -i $< $@

clean:
	rm -f *.$(EXT)

# ffmpeg -i ixxx.mp4 -c:v libtheora -c:a libvorbis -q:v 10 -q:a 10 xxx.ogg
