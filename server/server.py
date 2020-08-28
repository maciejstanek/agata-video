#!/usr/bin/env python3

from flask import Flask
from flask import render_template
from flask import url_for
from glob import glob
from pathlib import Path
from flask import send_from_directory
import os
import socket
from flask import request
from pytimeparse.timeparse import timeparse
import threading
import sched
import time

app = Flask(__name__)

@app.route('/')
def index():
    resources = {}
    for resource_type in ['video', 'music']:
        resources[resource_type] = set([Path(resource).stem for resource in glob('static/{0}/*'.format(resource_type))])
        try:
            resources[resource_type].remove('Makefile')
        except:
            pass
    return render_template('index.html', **resources)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico')

@app.route('/video/<name>')
def video(name):
    return render_template('video.html', name=name)

@app.route('/music/<name>')
def music(name):
    return render_template('music.html', name=name)

@app.route('/admin')
def admin():
    ip = socket.gethostbyname(socket.gethostname())
    return render_template('admin.html', ip=ip)

state = 'reset'

@app.route('/api/<command>')
def api(command):
    global state
    if command in ['video', 'music', 'reset']:
        state = command
        return state
    if command == 'status':
        return 'init' if state is None else state

automation_audio_time = None
automation_period = None
automation_timer = None
automation_timer2 = None

def automation_period_action():
    print("TIMER START AUDIO")
    global state
    global automation_timer
    global automation_period
    global automation_timer2
    global automation_audio_time
    automation_timer = threading.Timer(automation_period, automation_period_action)
    automation_timer.start()
    automation_timer2 = threading.Timer(automation_audio_time, automation_audio_time_action)
    automation_timer2.start()
    state = 'music'

def automation_audio_time_action():
    print("TIMER START VIDEO")
    global state
    state = 'video'

@app.route('/automation/<command>')
def automation(command):
    global state
    global automation_period
    global automation_audio_time
    global automation_timer
    global automation_timer2
    result = {}
    if command == 'status':
        result = {
            'audio_time': str(automation_audio_time),
            'period': str(automation_period),
        }
    elif command == 'start':
        audio_time_string = request.args.get('audio_time', default='5s')
        period_string = request.args.get('period', default='10s')
        automation_audio_time = timeparse(audio_time_string)
        automation_period = timeparse(period_string)
        print("automation_audio_time {}".format(automation_audio_time))
        print("automation_period {}".format(automation_period))
        if automation_timer:
            automation_timer.cancel()
        if automation_timer2:
            automation_timer2.cancel()
        automation_period_action()
    else:
        automation_period = None
        if automation_timer:
            automation_timer.cancel()
            automation_timer = None
        automation_audio_time = None
        if automation_timer2:
            automation_timer2.cancel()
            automation_timer2 = None
        state = 'reset'
    return result

