---
id: svgn-88471325
title: "I’m imagining an Oculus Half Dome Mixed Reality headset, new things we might see in software…"
date: "2018-09-12"
slug: "im-imagining-an-oculus-half-dome-mixed-reality-headset-new-things-we-might-see-in-software-6553c09e2b21"
canonical: "https://svgn.io/p/im-imagining-an-oculus-half-dome-mixed-reality-headset-new-things-we-might-see-in-software-6553c09e2b21"
source: "https://medium.com/@vrma/im-imagining-an-oculus-half-dome-mixed-reality-headset-new-things-we-might-see-in-software-6553c09e2b21"
audience: "everyone"
topics: ["urbach", "jules", "time", "real", "capture", "tracing", "reality", "through"]
related: ["vrma-564abc09a8b3", "vrma-f38834dce635", "vrma-d610a1b6c908", "vrma-96489ecfd086"]
images: 4
---

# I’m imagining an Oculus Half Dome Mixed Reality headset, new things we might see in software…

*This article is select quotes and thoughts I had after the podcast with Jules Urbach. Recently I talked to Jules Urbach about the news…*

This article is select quotes and thoughts I had after the podcast with Jules Urbach. Recently I talked to Jules Urbach about the news since Siggraph 2018 (from the Neural Lace Podcast Season 2 Episode 2). After I transcribed the call I was surprised by some of the details I had missed the first time through.

What he says about Magic Leap and Oculus is very surprising.

See two developers share their unbiased views of Magic Leap here: https://www.youtube.com/watch?v=Dz26uDp48Ms&t=316s

Based on what Urbach said in the Neural Lace Podcast Season 2 Episode 2 I think we haven’t yet seen the best of what the Magic Leap One can do, and I imagine that what he says about reconstructing a scene as a CGI object has relevance to the future of the Facebook 360 camera being built with the folks at Red (a hardware Camera company) and the folks at Lucidcam (a camera company working on the software).

In the podcast I wanted to know if Real Time ray tracing (RTX) was a reality for VR which requires high frame rates, and I wondered if the demos shown during Jensen’s keynote showing games like Battlefield V running real time raytracing were representative of how VR was going to change, the answer surprised me.

Jules Urbach: “there is a deeper and frankly a much higher quality option that is probably going to take six months to maybe even nine months to get into the hands of game developers, we are trying to do our part by providing Octane [in game engines like Unity and Unreal Engine 4]”

Jules Urbach: “The idea is that we will bring, through just the two integrations we have in these game engines, we will bring the entire cinematic pipeline that the film studios use for rendering movies and we will bring that to real time and we will bring that to VR “

Jules Urbach: “you can take something you created in Cinema 4D or Maya or right from a Marvel movie which is maybe Cinema 4D and Octane, which was used for the title: Ant-man and the Wasp, you can just drop that into an an ORBX package which is the interchange format we open sourced for Octane and you can drop it into Unity and Unreal and with RTX hardware you can now render that quality basically in real time.”

One particularly profound insight that I had came when he mentions the reason why Otoy has not pursued the same direction that Google has pursued in terms of light field capture, and I think what he says has implications for what Facebook might be doing with it’s 360 cameras and what Facebook might be doing with the next Oculus Rift. I’m just guessing however. At this point Urbach talks about capturing reality and turning reality into a CG object which I think it’s the biggest clue to the future of AR VR devices from Oculus, and 360 volumetric cameras from Facebook, and possibly also the Red phone.

Jules: “one of the reasons we didn’t go deeper into “lightfield capture” and push further on that experimental thing that Paul Debevec is doing at Google was because really we want to be able to capture what we capture on a lightstage basically in real time and make that something that is consumable inside of Octane or inside of the VR Pipeline because if you are just capturing a lightfield that is better than RGB and depth or maybe stereo or maybe pano it is still a very small subset of the data you want, what you want is a CG recreation that you can drop into a renderer and treat it like a CG object that then matches the real world and for that you need to capture materials”

Jules “I think your app on the magic leap platform has to request being able to capture the world around you but things like that are really important, so what we were showing at Siggraph on the phone basically is able to reconstruct the scene from the phone camera”

Re-reading what Urbach says causes me to imagine a future Mixed Reality Oculus Rift VR Headset that could be like the Oculus Half Dome Prototype but with added inside out tracking cameras. The half dome prototype gives the user a motors for each eye to focus independently for objects near and far, it’s called Varifocal and it’s the type of technology needed for Augmented Reality. https://medium.com/silicon-valley-global-news/oculus-half-dome-vr-headset-prototype-revealed-at-f8-today-5bcce90c31a5

Jules “I can’t even imagine VR frankly existing in the future without pass through cameras that allow you to switch to AR mode trivially. In which case you are back to the same problem in which you are either seeing the world through your eyes and there is an overlay like magic leap, or its something like what Oculus is talking about and who knows when it will be out but basically you will have camera pass through where you are actually reporting through two cameras what’s in the field of view and you could do AR you could blend it with VR, that kind of stuff is super interesting. I feel like that requires everything to just be up in terms of the quality so AI is important for scene reconstruction”

I highlighted the parts where he is calling for scene reconstruction. After this call I really think scene reconstruction is going to be the bases of Mixed Reality in the future. I’m not sure what to say about pass through headsets like Magic Leap, Meta, and Hololens if the likes of Oculus and HTC Vive start competiting for the same users. Earlier in the call Urbach mentions the possibility of 4000dpi screens, he also mentions the possibility of a screen resolution that is 4k x 4k per eye, I’m not sure if 4k x 4k per eye is the same thing as 4000dpi or not.

Jules “One of these headsets that have 4k x 4k per eye if you ever were to go that far, you can imagine things progressing to that level, the RTX hardware can keep up with that, you can start to skip a lot of the hacks and a lot of the problems that one held back scene complexity, visual fidelity because you had to render everything with triangles and not rays of ray tracing, light and also things like anti-aliasing are solved, depth of field get solved, there are a lot of things that ray tracing just solves correctly without having to hack it, and that’s double the case in VR where you can just render those rays, instead of doing two renders, and doing a lose res one and both using foveated rendering to mix those, you can just use ray tracing to basically do a heat map and just send more rays to the parts of the view port that are looked at by the eye and that’s something you can’t do in traditional rasterization and it would be very expensive to do without RTX.”

Elsewhere Urbach says Jules “I have tried some of the lightest weight glasses, that is something where ray-tracing hardware is absolutely critical to make the display panel at that resolution running in real time. It would be very difficult to do that without Ray Tracing hardware making that 10 times faster, and because it’s 10 times faster we can now drive holographic displays probably in the next six months with this kind of speed in real time.”

Could it be that we will soon have 4k x 4k screens with 4000dpi running Real Time Ray Tracing at 120 fps for Virtual Reality and Augmented Reality headsets in six to nine months?

Jules Urbach “there is no doubt in my mind that the next decade of computer graphics if not the next twenty years is going to be defined by Ray Tracing Hardware at the foundational layer. The same way that GPUs have just made 3D graphics a commodity on our phones: you can play Fortnite on an iphone.”

Jules Urbach on RTX & VR, Capture & XR, AI & Rendering, and Self Aware AI. Urbach on how RTX may vastly improve VR and AR, and on how scene capture with AI to enable turning the world into a CG… medium.com

Listen to the full audio here: https://youtu.be/yMsaNsqzjFQ

For Neurohackers: I had some questions about using AI rendering with medical imaging. AI denoising and real time ray tracing are used to finish rendering computer graphics, and those computer graphics could be the resulting product of what began as a light field volumetric capture. Medical imagining often involves 3D volumes of data, and we are getting several news kinds of imagining technologies like photoacoustic tomography that can be combined with existing new technologies like electrical impedance tomography to and semantic segmentation to create new tools for neurohackers to analyze brain activity and correlate it to the 3D data so that’s a small part of this podcast which should be interesting to a lot of folks for different reasons.

![](/wiki/svgn/articles/media/svgn-88471325/001.gif)

![](/wiki/svgn/articles/media/svgn-88471325/003.jpg)

![](/wiki/svgn/articles/media/svgn-88471325/005.jpg)

![](/wiki/svgn/articles/media/svgn-88471325/007.jpg)

---

**Connected stories:** [[Real Time Ray-tracing (RTX) is coming to Virtual Reality and is expected to revolutionize the VR…]] · [[Jules Urbach on RTX & VR, Capture & XR, AI & Rendering, and Self Aware AI.]] · [[We shot through the Varjo Mixed Reality add on that makes their VR headset into an XR headset!]] · [[Shores of Loci is a must get App Lab experience for the Meta Quest Virtual Reality headset by Meta.]]
