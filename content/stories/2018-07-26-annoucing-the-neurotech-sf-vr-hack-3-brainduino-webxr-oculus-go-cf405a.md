---
id: svgn-88471647
title: "Annoucing the Neurotech SF VR Hack #3: Brainduino WebXR Oculus Go."
date: "2018-07-26"
slug: "annoucing-the-neurotech-sf-vr-hack-3-brainduino-webxr-oculus-go-cf405a2b6cd2"
canonical: "https://svgn.io/p/annoucing-the-neurotech-sf-vr-hack-3-brainduino-webxr-oculus-go-cf405a2b6cd2"
source: "https://medium.com/@vrma/annoucing-the-neurotech-sf-vr-hack-3-brainduino-webxr-oculus-go-cf405a2b6cd2"
audience: "everyone"
topics: ["facebook", "https", "data", "brainduino", "join", "neurotech", "github", "webxr"]
related: ["vrma-e3e8ac4e9805", "vrma-cf405a2b6cd2", "vrma-f4962ab836fa", "vrma-1fdda1f17137"]
images: 11
---

# Annoucing the Neurotech SF VR Hack #3: Brainduino WebXR Oculus Go.

*It’s free but it’s not a party or a presentation. You come to hack, to work on technology, to do something new, if hacking sounds like fun…*

![](/wiki/svgn/articles/media/svgn-88471647/000.jpg)

Written by Neurotech & SF VR organizer Micah Blumberg http://vrma.io

We are going to combine a new EEG sensor device that has improved signal processing and noise cancellation over previous EEG technologies with code from Mozilla called Aframe.io that is a front end for WebXR an API developed by multipled companies including Google, Microsoft and more that is then going to run in the WebVR browser of an Oculus Go which is a Virtual Reality headset that costs $199 and has one of the clearest lens available on any VR headset.

I’ve been organizing NeurotechSF meetups since January 2018 and San Francisco Virtual Reality meetups since September 2017, and I’ve been organizing these as a joint meetup at Noisebridge since January because I believe the future of Virtual Reality and Augmented Reality glasses as one that is converging with Brain Computer Interfaces or Brain Machine Interface devices, and also converging with artificial neural networks.

In the first Neurotech SF VR Brainduino WebXR Oculus Go meetup which took place on June 29th we connected the Brainduino board to the collaboration station (a Desktop Computer) at Noisebridge with it’s Debian distro over bluetooth, we created a simple server in python 2.0 and we used ajax inside an aframe.io page we created to pull the table of numbers that was being created by the brainduino into the WebVR page but we were stopped by the fact that our Python server had no web security and that doesn’t work when our aframe page uses ssh and https.

We were able to see our webvr page inside the Oculus Go via the built in web browser but obviously our sphere, cube, and tetrahedron were not moving up and down because we could not important the brainwave data.

So in the Neurotech SF VR Brainduino WebXR Oculus Go part 2, that took place on July 6th, we attempted to connect the brainduino to a mac instead of linux. We ended up going around the http/https incompatibility by serving the brainduino data over http on linux using pythons built in simple server and then using a vpn tunnelling trick via the vpn called ngrok which had https. That enabled us to bring some of the brainduino sensor data into a webvr page but it was static data instead of streaming data. At that point we ran out of time.

I think we were attempting to use the Fetch API from Javascript to access the data on the desktop on the linux machine at Noisebridge called the collaboration station, skipping the use of a mac and skipping the use of a vpn for tunnelling.

So then we had three weeks with no meetups, but during that time I explained where we were having trouble to the Neuroscience Dream Team that meets on Wednesday at Noisebridge between 8pm and 10pm, and they wrote some new software while I was there and they created new documentation for operating the Brainduino device that I was able to follow successfully in a test last night. So now I am able to get the brainduino data into a local webpage hosted on the Debian Linux Collaboration Station at Noisebridge. That’s part of the way there.

During the 2nd meetup some awesome linux hackers helped me to create a new project on my github where we pushed the previous work, to this github now the Dreamteam have contributed documentation for the software update they created for the Brainduino.

This reduces the amount of work we have to do but it doesn’t solve everything. The good news is that the numbers are streaming live into the webpage. The challenge is that is that the html page is currently hosted locally not on the world wide web.

We still need to integrate the data from the local web page with our webvr code, and we need to have our code running so that it can be accessed by the browser on the Oculus Go which is supposed to be worn by the person wearing the sensors.

Once we are able to important the streaming numbers in aframe we can instruct the webpage to do things with those numbers to for example update the position, orientation, rotation, colors or other physical attributes and properties of our objects in Webxr.

I would like to see if we can turn the table of numbers from the brainduino into something that could make a circles and cylindars of computer graphics rotate, change colors, and morph in interesting ways reflecting the mind waves.

Links to the github, slack, discord, and facebook groups will be below the images. The images represent a concept for how the user might experience cylinder’s in VR that are rotating or otherwise moving as a result of the table of numbers streaming from their own brainwaves.

After we accomplish this goal we also have access to an AI server with 4 Nvidia Titan XV cards that we can access through Keras. We are going to attempt to use AI to create or enhance the data visualization of our brainwaves, or the intepretation of biofeedback data again towards improving the visualization created by the users own bio data.

Beyond that future meetups will incorporate new technologies, new XR headsets with AR capabilities, updates to webxr, including AR applications, new sensor data like ECG (heart rate) EMG (muscle) near infrared brain imagine (OpenWater), open electrical impedance tomography (OpenEIT), volumetric video, pointclouds, object segmentation, 3D convolutional neural networks, and much more.

This meetup this Sunday is scheduled for 4 hours because 2 hours was not enough the previous two times, however participants are not expected to show up for the entire 4 hours. Feel free to come in for 1 or 2 hours, or more, and I will catch you up on what has been done and what we step we are attempting to take next. Or if you want come for all four hours. I hope to have another meetup scheduled next Friday so if you can’t make this one, that’s when you can expect the next one to be scheduled. Thereafter I hope we will be doing one every Friday.

![](/wiki/svgn/articles/media/svgn-88471647/001.jpg)

![](/wiki/svgn/articles/media/svgn-88471647/003.jpg)

![](/wiki/svgn/articles/media/svgn-88471647/005.jpg)

![](/wiki/svgn/articles/media/svgn-88471647/007.jpg)

![](/wiki/svgn/articles/media/svgn-88471647/009.jpg)

![](/wiki/svgn/articles/media/svgn-88471647/011.jpg)

![](/wiki/svgn/articles/media/svgn-88471647/013.jpg)

![](/wiki/svgn/articles/media/svgn-88471647/015.jpg)

![](/wiki/svgn/articles/media/svgn-88471647/017.jpg)

![](/wiki/svgn/articles/media/svgn-88471647/019.jpg)

RSVP Link https://www.meetup.com/NeuroTechSF/events/253173721/

Neurotech Hack: Brain Duino, WebXR, Oculus Go Part 3 Neurotech Hack: Brain Duino, WebXR, Oculus Go Part 3 Read the full description here:… www.meetup.com

Join our Github https://github.com/Micah1/neurotech

Micah1/neurotech GitHub is where people build software. More than 28 million people use GitHub to discover, fork, and contribute to over… github.com

Join our Discord group

http://www.neurohaxor.com

Discord - Free voice and text chat for gamers Step up your game with a modern voice & text chat app. Crystal clear voice, multiple server and channel support, mobile… www.neurohaxor.com

Join the Global Neurotech Slack

http://neurotechx.herokuapp.com

Join NeuroTechX on Slack! neurotechx.herokuapp.com

Make sure to join the SF channel: #_san-francisco

Join this Facebook Group: Self Aware Networks: Computational Biology: Neural Lace

https://www.selfawarenetworks.com

https://www.selfawarenetworks.com

Join this Facebook Group: Neurophysics+

https://www.facebook.com/groups/IFLNeuro/

Neurophysics+ Neurophysics is an umbrella topic. Covering a broad range of discussions related to the nervous system, from molecular… www.facebook.com

Join this Facebook Group: NeurotechSF

https://www.facebook.com/groups/neurosf/

Log into Facebook | Facebook Log into Facebook to start sharing and connecting with your friends, family, and people you know. www.facebook.com

Join this Facebook Group: Neurohaxor

https://www.facebook.com/groups/neurohaxor/

Log into Facebook | Facebook Log into Facebook to start sharing and connecting with your friends, family, and people you know. www.facebook.com

Links to videos my friend Sheridan shot at Hack #1

Sheridan Tatsuno More on brain interfaces to VR headsets m.facebook.com

https://m.facebook.com/story.php?story_fbid=10155585014090737&id=719545736&ref=content_filter&notif_t=feedback_reaction_generic

https://www.facebook.com/sheridan.tatsuno/videos/10155585003850737/

---

**Connected stories:** [[Neurotech SF VR Hacknight: Brainduino+WebXR+OculusGo #4]] · [[Annoucing the Neurotech SF VR Hack #3: Brainduino WebXR Oculus Go.]] · [[House Intelligence releases data on Russian purchased social media ads, Facebook responds +…]] · [[Facebook Horizon: The long awaited massive multiplayer virtual reality online social network from…]]
