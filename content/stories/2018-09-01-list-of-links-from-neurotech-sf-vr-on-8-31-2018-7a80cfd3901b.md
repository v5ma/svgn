---
id: svgn-88471323
title: "Notes from Friday, September 14, 2018, micah@vrma.io wrote:"
date: "2018-09-01"
slug: "list-of-links-from-neurotech-sf-vr-on-8-31-2018-7a80cfd3901b"
canonical: "https://svgn.io/p/list-of-links-from-neurotech-sf-vr-on-8-31-2018-7a80cfd3901b"
source: "https://medium.com/@vrma/list-of-links-from-neurotech-sf-vr-on-8-31-2018-7a80cfd3901b"
audience: "everyone"
topics: ["https", "data", "join", "facebook", "time", "group", "event", "object"]
related: ["vrma-c7785a874e00", "vrma-f4962ab836fa", "vrma-dc6e07210187", "vrma-c67ca275dfc8"]
images: 0
---

# Notes from Friday, September 14, 2018, micah@vrma.io wrote:

*Meetup: Neurotech SF VR: WebXR, EEG, Tensor Flow, Oculus Rift*

We created a deep learning plan called Pipeline.

Pipeline:

// create an event every time the raycast bounces off an object indicating head position,

// time log that event so we can correlate it with eeg data

// Time log every object in line of sight (object, angle, …)

We managed to create an event each time the ray casting is pointed at an object.

Next up that data needs to be time locked to the eeg data so we can export both sets of data to tensor flow

So we can train tensor flow on both sets of data

Then tensor flow will try to predict what we are looking at based on only eeg data.

Next up: Export all raw data in JSON at the end of web session to create training databases.

Train the data in tensorflow-gpu

Export the inference files to tensorflow.js for live inference in the browser

Explore also using tensorflow light and tensorflow raspberry pi

// R (Aria) setup a mapping from our local host to the noisebridge.net web page so folks can view the website at home from http://pegasus.noisebridge.net/webvr_temp/

Must ask R (via slack) to turn it on, if it’s off, because R has only granted us permission to have it up temporary (upon request for a specified time-interval)

Other notes:

We also tried to figure out why the websocket isn’t multi-threading by default, some of our research suggested that the we need to change a variable to true to enable the websocket to serve the EEG data to each instance of the client for each person who accesses our webvr page. We experimented with some different variations of websocket technology but we didn’t figure it out and ended up reverting to the original server script.

### List of links from Neurotech SF VR on 8/31/2018

Our Github where you can download a copy of the code we built together as a community. It’s open source:

Micah1/neurotech Contribute to Micah1/neurotech development by creating an account on GitHub. github.com

Plasma Brain Dynamics Paper

Neural Lace Podcast S2 E1

Web VR code examples

https://aframe.io/examples/showcase/helloworld/ https://glitch.com/edit/#!/sparkling-talk?path=index.html:15:66

Hello, WebVR! * A-Frame Hello, WebVR! * A-Framesparkling-talk.glitch.me

One path to integrating multiple sensor streams, time locking them, and presenting them to tensor flow.

https://intheon.io/projects

https://www.youtube.com/watch?v=g3XPUdW9Ryg

https://www.youtube.com/watch?v=nMj6aQe6CLY

other links you should check out are as follows

Main RSVP page for the event: https://www.meetup.com/NeuroTechSF/

Join our Discord group http://www.neurohaxor.com

Join the Global Neurotech Slack http://neurotechx.herokuapp.com   Make sure to join the SF channel: #_san-francisco

Join this Facebook Group: Self Aware Networks: Computational Biology: Neural Lace https://www.selfawarenetworks.com

Join this Facebook Group: Neurophysics+ https://www.facebook.com/groups/IFLNeuro/

Join this Facebook Group: NeurotechSF https://www.facebook.com/groups/neurosf/

Join this Facebook Group: Neurohaxor https://www.facebook.com/groups/neurohaxor/

My business card is at http://vrma.work

---

**Connected stories:** [[Facebook unprofessionally retaliates against Group Admins and Journalists who write unfavorable…]] · [[House Intelligence releases data on Russian purchased social media ads, Facebook responds +…]] · [[Technically it’s a list of Facebook groups so far, I haven’t started on a list of Facebook pages.]] · [[A list of Women in VR, AR, or Tech groups on Facebook]]
