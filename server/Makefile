.PHONY: run clean music video

run: server.py music video
	FLASK_APP=$< flask run --port=2137 --host=0.0.0.0

music:
	# (cd static/music && make)

video:
	# (cd static/video && make)

clean:
	rm -rf __pycache__
	(cd static/music && make clean)
	(cd static/video && make clean)
