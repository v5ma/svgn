---
id: svgn-88471212
title: "Samsung reveals an experimental AR headset that isn’t a Samsung product."
date: "2018-11-08"
slug: "samsung-reveals-an-experimental-ar-headset-that-isnt-a-samsung-product-d7b75ec8f52e"
canonical: "https://svgn.io/p/samsung-reveals-an-experimental-ar-headset-that-isnt-a-samsung-product-d7b75ec8f52e"
source: "https://medium.com/@vrma/samsung-reveals-an-experimental-ar-headset-that-isnt-a-samsung-product-d7b75ec8f52e"
audience: "everyone"
topics: ["samsung", "tracking", "controllers", "headset", "motion", "gear", "controller", "oculus"]
related: ["vrma-ec21c98a9154", "vrma-da5a236fd239", "vrma-d7b75ec8f52e", "vrma-4b4d42e35558"]
images: 12
---

# Samsung reveals an experimental AR headset that isn’t a Samsung product.

*Based on the Gear VR SDK its just a tool for Samsung developers to begin creating wearable Augmented Reality apps presumably for some other…*

![](/wiki/svgn/articles/media/svgn-88471212/000.jpg)

Article by Micah Blumberg

The first thing to know about the Samsung AR Headset shown at SDC is that this isn’t a Samsung product. The headset was essentially “hacked” together by Samsung Research with parts that can be ordered online, I think they said from Alibaba. The point of its existance is to help developers to begin to create a software ecosystem of Augmented Reality apps that are designed to be the “wearable” kind of AR applications, so that if Samsung ever starts selling an official AR headset there will be plenty of apps ready for it.

![](/wiki/svgn/articles/media/svgn-88471212/001.jpg)

The version shown at SDC 2018 uses a 3dof controller or alternately another Samsung phone can be used for tracking. I asked about 6dof controllers and they said that there is no limitation preventing them from adding 6dof controllers that could be tracked by the camera, but they have nothing to show at the moment.

![](/wiki/svgn/articles/media/svgn-88471212/003.jpg)

![](/wiki/svgn/articles/media/svgn-88471212/005.jpg)

![](/wiki/svgn/articles/media/svgn-88471212/007.jpg)

![](/wiki/svgn/articles/media/svgn-88471212/009.jpg)

![](/wiki/svgn/articles/media/svgn-88471212/011.jpg)

![](/wiki/svgn/articles/media/svgn-88471212/013.jpg)

![](/wiki/svgn/articles/media/svgn-88471212/015.jpg)

![](/wiki/svgn/articles/media/svgn-88471212/017.jpg)

![](/wiki/svgn/articles/media/svgn-88471212/019.jpg)

![](/wiki/svgn/articles/media/svgn-88471212/021.jpg)

I learned that the SXR sdk (Samsung XR (AR & VR) Software Development Kit) will only use ARcore for plane tracking if the AR app is through the phone itself and not through the wearable headset. The reason is that the wearable uses an external camera and ARcore does not provide any support for external cameras. So Samsung Research reached out to their computer vision department to “hack together” something to make the wearable AR headset have position tracking. Unfortunately this hacked together “tracking” does not yet work as well as ARcore, and its currently only using marker based tracking. Samsung Research is looking at Vuforia and other solutions to improve the tracking and to add features like plane detection.

I tried two demos, one involved a3D menu that I controlled with a Gear VR controller. The 3D menu looked really cool. It reminded me a lot of the 3D Augmented Reality email mockup by Weta Workshop for Magic Leap. Except it was an actually working prototype besides looking really good. I navigated this menu with a 3dof controller. I opened and rotated a 3D model of a car, it looked really good, I could not see the boundaries of the FOV but basically it’s the width of the Samsung phone reflected in the wearable headset (about 110 fov). The other demo was a paint program, I used the phone as a controller, I was able to paint on a 2D plane, and the program seemed to be glitching very badly.

The Samsung SDK seems to be at a very early stage, I don’t know exactly how long it takes a corporation to develop an Augmented Reality sdk, including a 3D software interface & hardware, but I think they have a long way to go. It seems like they might be starting from scratch when it comes to trying to do things like world scale tracking with artificial intelligence, and 6dof or motion controller tracking. I suspect that it could be a six months to even a year before developers are creating the kinds of experiences that you can try now on a Magic Leap headset.

Interesting the SXR SDK is based on the Samsung Gear VR SDK. Samsung is folding the Gear VR SDK into the SXR SDK, such that eventually the Gear VR sdk will cease to exist as a separate SDK, it will no longer receive updates, but Samsung will continue to support it.

I confirmed that the current SXR SDK for phones is pretty much a combination of ARcore and the renamed Gear VR SDK. I learned that ARcore in contrast to ARkit doesn’t provide any support to developers for creating graphics. I believe that is why the Gear VR SDK forms the basis of the SXR SDK.

With this knowledge one is forced to imagine a Samsung Gear XR device that is capable of running Gear VR apps but also augmented reality apps.

The screen is better, wider & bigger than the Magic Leap and the Hololens, and it didn’t give me any noticable eye strain. The fact that the screen is better really makes me wish that they were much further along with strong world tracking (position tracking) and 6dof motion controllers. I’m excited to see what they show next year.

From the looks of it they are no where close to being able to do what the Oculus Quest is doing, neither in hardware nor in software.

From what I have seen and heard no other company is coming close to matching the capabilities of the Oculus Quest. Google has announced motion controllers but they haven’t been demonstrated to the press yet. However the Google Daydream Standalone headset is selling for $399 without motion controllers at most places. So you have to imagine that motion controller may cost $100 or $200 in addition to what you paid for the headset. HTC is working with 3rd party companies like Finch VR to sell 3rd party made motion controllers for the Vive Focus, the expected price is $199 although Finch has said they would like to get the price down to $99.

The public has no reason to expect that the HTC Vive Focus controllers or the Mirage Solo motion controllers will be on par with the Oculus Quest motion controllers in terms of tracking accuracy, speed, and smoothness. Until independent journalists get to try the controllers for the Vive Focus and the Mirage Solo the only game in town anyone should be thinking about is the Oculus Quest.

I have also tried the Nolo VR 6dof controllers & 6dof head postion tracking system and in my humble opinion the Nolo controllers are terrible, the tracking capabilities of the Nolo controllers come nowhere close to the Oculus Quest controller tracking performance. Do not buy the Nolo VR motion controllers.

It is surprising now to consider the possibility that there really be no other products on par with the Oculus Quest when it launches in the Spring of 2019 for $399. At least not for $399.

---

**Connected stories:** [[6dof Motion Controller tracking for Standalone VR is a hard problem.]] · [[Valve Index shows up right on time to crush the weak excuse of a VR headset called Oculus Rift S.]] · [[Samsung reveals an experimental AR headset that isn’t a Samsung product.]] · [[Samsung Odyssey a premium VR headset hits the price floor at Microsoft.com]]
