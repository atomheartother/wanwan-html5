![Wan~](
https://wanwan-html5.moe/girls/Momiji.png
)
# wanwan-html5
This is an HTML5 version of the flash animation "WAN WAN INTENSIFIES.sfw". CSS animations controlled by Javascript for very fluid wolf girl.

# Why?
Wan not?

# Features
- Wan~
- Wolf girls!
- Dozens of wanning wolves, with search!
- Use any image you want and send it to friends!
- Mobile support
- No awoo :c

# Todo
- ~~Nightcore mode for fast wolf girl (that's easy just have to do it)~~
- ~~Mobile portrait fix (shoooould be easy)~~
- ~~Gapless audio loop so wolf girl can wan better (that's actually kind of hard for sync reasons)~~
- ~~Actual menu so we can have a LOT of wolf girls, a volume slider...~~
- ~~Vector graphics~~
- ~~Use url parameters for girls instead of function calls~~
- ~~Loading bar instead of Momiji~~
- ~~Better search~~
- ~~Volume slider~~
- Vectors for all girls: 2/29 done
- ~~Let people use custom url for wolf girl image~~
- ~~Customize volume slider so it's consistent across platforms~~
- Crazier Nightcore mode
- [Get Down Nitori](https://www.youtube.com/watch?v=FkQaQZCzjic) mode
- ~~Replace wan images by text so we can write different stuff~~
- ~~Fix the animation unsync when page isn't visible~~
- Rewrite of animation code, more below
- Awoo maybe.

# Animation rewrite
*01/09/17*: I've come to terms with the fact that this website has some deep performance issues, due to how I handle animations. To make it simple: I animated using top/left properties, as opposed to transforms, and what I didn't know at the time was that this system is *awful*. [Here's a side-by-side comparison](https://www.youtube.com/watch?time_continue=4&v=-62uPWUxgcg) of both methods, showing just how much performance we're losing.

If you're on a good computer you may not have noticed it but mobile devices in particular are feeling the hit, and I have to do something about this. So... Time to get my hands dirty and re-write a big part of this website! I'll try and make it so I can do later changes much easier, and also take this opportunity to clean up wolfscript.js.

I've also considered moving to a library like VelocityJS, because chaining CSS animations like we are here has been known to cause performance issues, but since that conflicts with this website's general philosophy I'm quite reluctant to do so. I'd rather try and see what the performance looks like with transform CSS animations, and if there's still some issues, I'll see then.

# Philosophy
I hate bloated pages and believe in pure html/css/js to run a vast majority of website. Most web pages have absolutely no excuse for being over 1MB, including huge libraries for no other purpose than to make the programmer's life easier on a few function calls. This project will always be as small as I can make it.

Currently, the only library I use is the awesome [howler.js](https://howlerjs.com/), for the gapless audio loop, and do so out of absolute necessity.

# Credit
I try to find the artists whose art I use, if you made one of these faces and want credit, contact me about it!

- Link, DJSona, Papi, Tracer, Tamamo, D.Va, Kanna, Bayonetta, Miia: [Kirbmaster](http://kirbmaster.deviantart.com/)
- Ryuko, Satsuki: Tetra (Couldn't find their contact info/website)
- Nico, Umi, Hanayo, Honoka, Kotori, Eli, Umi, Rin by [kurisu004](https://twitter.com/kurisu004/) (I think, haven't contacted them yet)

# Contact
Have a suggestion, a complaint, a compatibility issue with your browser? Drop an issue on here!

Don't want to make an issue, or do you maybe just want to say hi? You can tweet to me at [@atomheartother](https://twitter.com/atomheartother) !
