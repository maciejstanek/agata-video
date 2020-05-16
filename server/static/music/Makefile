EXT=mp3
ALTS:=$(patsubst %.ogg,%.$(EXT),$(wildcard *.ogg))

.PHONY: all clean

all: $(ALTS)

%.$(EXT): %.ogg
	ffmpeg -i $< $@

clean:
	rm -f *.$(EXT)
