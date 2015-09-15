/********************************************************************
 KWin - the KDE window manager
 This file is part of the KDE project.

 Copyright (C) 2015 Andrey Shertsinger <andrey@shertsinger.ru>

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*********************************************************************/
var lastActive = null;

var minimizeOther = function(client) {
	if (client.skipTaskbar || client.modal || client.transient){
			return;
	}
	var clients = workspace.clientList();
	var transients = [];
	for(var i = 0; i < clients.length; i++) {
		if(clients[i].transient){
			transients[clients[i].transientFor]=1;
		}
	}
	if(client.transient){
		transients[client.transientFor]=1;
	}
	var actives=[];
	var ai=0;
	for(var i = 0; i < clients.length; i++) {
		if(clients[i].minimizable && transients[clients[i]] != 1 &&
				clients[i] != client &&
				clients[i].desktop == client.desktop &&
				!( clients[i].skipTaskbar || clients[i].skipSwitcher || clients[i].skipPager || clients[i].transient || clients[i].modal )){
			actives[ai]=clients[i];
			ai++;
		}
	}
	for(var i = 0; i < ai; i++) {
		actives[i].minimized = true;
	}
	if(ai==1){
		lastActive=actives[0];
	}
}

var restoreClient = function(client) {
	if (client.skipTaskbar || client.modal || client.transient){
		return;
	}
	lastActive = client;
	minimizeOther(client);
}


var minimizeClient = function(client) {
	if (client.skipTaskbar || client.modal || client.transient){
		return;
	}
	if(lastActive != null){
		lastActive.minimized = false;
		lastActive = client;
	}
}

workspace.clientAdded.connect(restoreClient);
workspace.clientRestored.connect(minimizeOther);
workspace.clientUnminimized.connect(restoreClient);
workspace.clientMinimized.connect(minimizeClient);
