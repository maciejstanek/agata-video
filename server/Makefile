.PHONY: run clean

run: server.py
	export FLASK_APP=$<
	flask run --port=2137

clean:
	rm -rf __pycache__
