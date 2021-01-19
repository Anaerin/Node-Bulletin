Anaerin's Forum Thing
=====================
Okay, so this isn't going to be your regular bulletin board style forum, it's going to have at least one major difference - optional REALTIME UPDATES!

The idea is that if you're sitting in a thread and there's a new post, the new post automatically appears at the bottom of the page where it belongs. If you're viewing a forum and there's a new post in a thread, that thread moves to the top of the list (under pinned items) and the details are updated.

How?
----
The idea is that the app is split into (2?) parts:
* One handles generating the HTML, interfacing with the Database and the like. When there's a post, this updates the Database, then sends out a UDP packet for...
* The other part, which listens for WebSockets connections and UDP packets (Broadcast or Multicast). When it gets a UDP packet, it determines which of the websockets it currently has open (if any) the information is suitable for, and sends the data over that websocket.

This way, the WS/UDP listener part can be sharded using a load balancer (haproxy, nginx etc.) and runs as minimally as possible (no DB access required) to keep resources low. The frontend can also be sharded if load gets high, and the two can work independently.

Why Broadcast AND Multicast support?
-----------------------------------
Multicast is clearly the proper way to do this, with the listeners subscribing to the multicast feed to keep network traffic low. However, some popular containerization systems (looking directly at you, Docker) don't support Multicast. So Broadcast it is, right? Well yes, but also no, as while Broadcast is supported on a single host, it won't work across an overlay network in Docker Swarm. So I may also have to make a Unicast relay system for cross-host networking, at which point this system might start looking like IRC.

What else?
----------
Well, I'm hoping it'll be as clear and information dense as old vBulletin forums, as opposed to more "modern" frontends like NodeBB, Discourse and the like. So full-wide pages with clear information, and with capability to skin as you like using modern CSS and simple HTML. Message composition and editing in simple Markdown, Image uploading and hosting built in, full edit history, extensive moderation options, multiple user levels and groups, multiple backend database type support (in theory, anything supported by Sequelize, from sqlite all the way up to Postgres/MSSQL), and scalability.

Of course, that's all aspirational right now. I'm just getting started, and hopefully I'll have the impetus to keep this going 'til it's a finished product.