#!/usr/bin/env python3

from flask import Flask
from flask import render_template
from flask import url_for
from glob import glob
from pathlib import Path
from flask import send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    resources = {}
    for resource_type in ['video', 'music']:
        resources[resource_type] = [Path(resource).stem for resource in glob('static/{0}/*'.format(resource_type))]
    return render_template('index.html', **resources)

@app.route('/video/<name>')
def video(name):
    return render_template('video.html', name=name)

@app.route('/music/<name>')
def music(name):
    return render_template('music.html', name=name)

@app.route('/admin')
def admin():
    return render_template('admin.html')

state = None

@app.route('/api/<command>')
def api(command):
    global state
    if command in ['video', 'music', 'reset']:
        state = command
        return state
    if command == 'status':
        return 'init' if state is None else state
