EXT=mp3
ALTS:=$(patsubst %.ogg,%.$(EXT),$(wildcard *.ogg))

.PHONY: all

all: $(ALTS)

%.$(EXT): %.ogg
	ffmpeg -i $< $@
