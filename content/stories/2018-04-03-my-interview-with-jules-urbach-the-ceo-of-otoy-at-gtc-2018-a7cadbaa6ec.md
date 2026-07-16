---
id: svgn-88471643
title: "AI Lighting, AI Denoising, Scene AI, using AI to fix 360 video, using AI to predict holograms from…"
date: "2018-04-03"
slug: "my-interview-with-jules-urbach-the-ceo-of-otoy-at-gtc-2018-a7cadbaa6ec3"
canonical: "https://svgn.io/p/my-interview-with-jules-urbach-the-ceo-of-otoy-at-gtc-2018-a7cadbaa6ec3"
source: "https://medium.com/@vrma/my-interview-with-jules-urbach-the-ceo-of-otoy-at-gtc-2018-a7cadbaa6ec3"
audience: "everyone"
topics: ["unity", "octane", "scene", "rendering", "otoy", "time", "cinematic", "real"]
related: ["vrma-839b73aab882", "vrma-b5ef97a45687", "vrma-a673d2063c5", "vrma-f38834dce635"]
images: 10
---

# AI Lighting, AI Denoising, Scene AI, using AI to fix 360 video, using AI to predict holograms from…

*A podcast interview featuring Jules Urbach the CEO of OTOY from March 2018*

![](/wiki/svgn/articles/media/svgn-88471643/000.jpg)

Written and hosted by Micah Blumberg, Silicon Valley Global News SVGN.io and the Neural Lace Podcast VRMA.io (the new interview is near the bottom)

Jules Urbach is the CEO of OTOY, his company has been working with Unity for a while now since Unity 2017.1

Home * OTOY OTOY Inc. and Mattel today announced its partnership that will bring original episodic content, powered by OTOY's… home.otoy.com

![](/wiki/svgn/articles/media/svgn-88471643/001.jpg)

![](/wiki/svgn/articles/media/svgn-88471643/003.jpg)

![](/wiki/svgn/articles/media/svgn-88471643/005.jpg)

Note that some of the paragraphs below are in italics with ‘this in front of them, these paragraphs are from my notes on the two sessions I attended listening to Jules Urbach one at GDC one at GTC, and I put ‘this symbol in front because in some cases I’m paraphrasing what he said rather directly, these are part of my notes from his presentation. In a few cases my notes are pretty close to a transcription of what he said so that’s another reason I’m making a special notation.

‘Otoy is well known for their rendering software in particular but also for their pretty heavy research into how to democratize rendering: how to bring cinematic rendering from films all the way down to users on a mobile device and that includes coming up with all the ecosystem pieces necessary for that to work.

‘Otoy’s software is primarily sold to visual artists who are looking to do visual effects or motion graphics, but last year they changed their core equation from a software that was embedded with Maya, Autodesk, or C4D to a software that was embedded in Unity. So that the absolute highest quality rendering could be done within Unity itself.

‘Six and a half million people now have access to Octane for free, thanks to the partnership with Unity.

‘One of OTOY’s goal with the integration of Octane into Unity was to give the quality of the graphics that we see in high quality film and television shows into the hands of Unity artists that are starting to see the introduction of cinematic tools inside of Unity.

### ‘Their focus this year has been on AI, which has exceeded expectations at OTOY

![](/wiki/svgn/articles/media/svgn-88471643/007.jpg)

![](/wiki/svgn/articles/media/svgn-88471643/009.jpg)

![](/wiki/svgn/articles/media/svgn-88471643/011.jpg)

‘Octane in Unity enables you to take existing assets, such as those used to build the intro opening scene of Westworld (the tv show), and bring them into Unity.

![](/wiki/svgn/articles/media/svgn-88471643/013.jpg)

![](/wiki/svgn/articles/media/svgn-88471643/015.jpg)

![](/wiki/svgn/articles/media/svgn-88471643/017.gif)

‘The new features of Octane 4 integrate the previous features that were developed under a product called Brigade. With Octane 4 and 8 GPUs you can now do real time path ray tracing, aka ray tracing in real time.’

### Here is a video I recorded of Disney demoing what this looks like at GTC 2018

Note this is not a movie, this is live raytracing, or live rendering of a lightfield, the holy grail of computing, running specifically on 8 GPUs.

2nd Note if you have any trouble playing the video above you can click this link https://www.youtube.com/watch?v=gZiSDtDhkyU

‘The entire licensing model around Octane is changing, up until now using Octane with Unity with one GPU has been free, now you get two GPU’s for free.

‘Then for subscriptions for $20 a month you get everything, you get access to nodes and to all 25 artist tools that work with Octane. With the subscription service you can render not only on the cloud but also on the blockchain.

‘What you get is the ability to do dynamic scene graphics for games, all of it can run now without slowing down the rendering, while rendering at Cinematic Quality

‘With Octane in Unity someone can take a big cinematic object in a big cinematic scene no matter how big it is no matter complex it is and move it around at 60 frames a second without the rendering slowing down.

‘With Octane 3 you could move a big object inside Unity at 1 frame a second, with Octane 4 it happens at 60 frames a second, but specifically I’m talking about moving 1 object inside a complex scene with 500GB worth of assets loaded into memory. That should slow down any computer, and it used to, but not anymore.

‘Previously in Octane 3 you could move the camera around a cinematic scene in Unity but it was never this fast when you were moving an object around inside a scene.

‘So Octane 4 represents a huge breakthrough in terms of how quickly artists can develop cinematic scenes inside Unity.’

‘ It means that you do not have any limits to the scene complexity when you are working, the scene complexity does not effect the dynamism, and the scene complexity does not slow down your workflow. There are no speed hits to moving objects around. No game engine through openGL can move objects this fast and still render the scene at 60 frames per second.

‘There is still a speed hit when objects are loaded from outside the systems memory core.

‘Scene AI tracks the data in and out of core, is a feature that pulls things in and out of core as you are playing so that you actually get the maximum speed.

‘AI lighting is different from that, it applies artificial intelligence inside the render itself, not in the post processing layer where you can speed things up

‘AI lighting makes an enormous difference, it helps you do spotlights and pointlights close to real time, and when you merge that with AI denoising you start to see Octane really having that full path trace quality you see in cinematic scenes like Westworld but in real time, and its also dynamic so its not something that has to be pre-calculated, AI lighting happens in real time.

‘AI lighting is just guessing at how the rest of the scene rendering will go but its just really good at it. This happens on two Volta GPUs, one of them runs the AI denoiser at the same time as the render.

‘With one more leap in GPU speed, and with more optimizations the denoiser will be running in real time scene graphs in Unity that do not need to render more than 10–20 samples to get to this quality.

‘With Mixed Reality we are really talking about capturing rendering and streaming all at the same time, as one service, the work at Octane is really in the middle of that. Octane 2019 will have that full stack including everything related to lightfield capture, photogrammetry, streaming.

‘When you are in a device that is blending the real world with rendered content you are capturing rendering and streaming all at the same time, in a single step, the work done by Otoy with Octane is just in the middle of that.’

### Micah Blumberg from SVGN interviews Jules Urbach the CEO of OTOY click SHOW EMBED directly below.

Micah Blumberg from SVGN interviews Jules Urbach the CEO of OTOY This is the video interview click show embed above.

End of story.

Also checkout here is video of Jules Urbach’s talk at Unity during GDC 2018

If you have any trouble watching the above video you can click this link https://www.youtube.com/watch?v=lfMRsd-lf88

Also you can listen to last years podcast that I did with Jules Urbach at GTC 2017

GTI 2017 GPU Technology Conference, The Neural Lace Podcast #5 Guest Jules Urbach, CEO at OTOY The Neural Lace Talks is a podcast about Science and Technology.  Main website http://vrma.io Contact via micah@vrma.io medium.com

See also: I got to ask the CEO of Nvidia Jensen Huang some burning questions:

After a mind exploding keynote at GTC 2018 I got the chance to ask Jensen Huang the CEO of Nvidia… I wanted to know about Blockchain, whether it will be necessary for Self Driving Cars to become Self-Aware Networks… medium.com

---

**Connected stories:** [[John Riccitiello the CEO of Unity explains how Real Time 3D (RTX) is disrupting every industry…]] · [[OctaneRender will be coming to UnrealEngine 4 in the first half of 2019]] · [[News volumetric video technology on display at Siggraph 2019, cinematic quality digital avatars…]] · [[Jules Urbach on RTX & VR, Capture & XR, AI & Rendering, and Self Aware AI.]]
