#pump.js
The sytem consists in an Arduino Yún that, using a pressure sensor, measures the water level of an acquifer and, depending on the obtained value, triggers one or two drain pumps.

The system will communicate through WebSockets to a [central server](https://github.com/SuperBonny/OsO.js.git) that stores all the data on a database and hosts a web control panel that permits to:

* Monitor the water level trough time using real time charts;
* Verify the functioning of the pumps and their active time;
* Set the threshold at wich the pump's state will be changed.

In case of error (high water level, malfuncioning pump etc...) the system will send an E-mail to a specified address and will also trigger an alarm audible from the apartment.

The system uses many different technologies like:

* Node.js
* The Firmata protocol
* Web Sockets

[School essay link](http://tesine.marconirovereto.it/dettagli.html?2016.5BI.3)
