/**
 * Copyright (C) 2015 Infinite Automation Systems, Inc. All rights reserved.
 * http://infiniteautomation.com/
 * @author Jared Wiltshire
 */

require(['jquery', 'mango/api', 'view/ToolbarUtilities', 'es5-shim', 'domReady!'],
		function($, MangoAPI, ToolbarUtilities) {
    
	var toolbarUtilities = new ToolbarUtilities();
	
	$.when(toolbarUtilities.getCurrentUser(),
			toolbarUtilities.api.getEventsActiveSummary(),
			toolbarUtilities.setupTranslations()).then(MangoAPI.firstArrayArg)
	.done(function(user, activeEvents){
		
		//Setup the Sound Player
		toolbarUtilities.setupSoundPlayer(user.muted);
		
		//Setup the Mute Icon
		var userMutedIcon = $('#userMutedIcon');
		if(user.muted === true){
			userMutedIcon.attr('src', '/images/sound_mute.png');
			userMutedIcon.attr('alt', toolbarUtilities.tr('header.mute'));
			userMutedIcon.attr('title', toolbarUtilities.tr('header.mute'));
		}else{
			userMutedIcon.attr('src', '/images/sound_none.png');
			userMutedIcon.attr('alt', toolbarUtilities.tr('header.unmute'));
			userMutedIcon.attr('title', toolbarUtilities.tr('header.unmute'));
		}
		userMutedIcon.on('click', function(){
			toolbarUtilities.api.toggleUserMute(user.username).done(function(response){
				
				//Toggle the mute
				toolbarUtilities.soundPlayer.setMute(response.muted);
				
				//Flip the icon to the current state
				if(response.muted === true){
					userMutedIcon.attr('src', '/images/sound_mute.png');
					userMutedIcon.attr('alt', toolbarUtilities.tr('header.mute'));
					userMutedIcon.attr('title', toolbarUtilities.tr('header.mute'));
				}else{
					userMutedIcon.attr('src', '/images/sound_none.png');
					userMutedIcon.attr('alt', toolbarUtilities.tr('header.unmute'));
					userMutedIcon.attr('title', toolbarUtilities.tr('header.unmute'));
				}
			}).fail(toolbarUtilities.showError);
		});
		
		//Setup the Home URL Icon
		$('#goHome').on('click', function(){
			if((user.homeUrl === null) || (user.homeUrl === ''))
				toolbarUtilities.showMessage(toolbarUtilities.tr('header.noHomeUrlDefined'), 'warn');
			else
				window.location = user.homeUrl;
		});
		var homeWidget = $('#homeWidget');
		homeWidget.hover(function(){
			var userHome = $('#userHome');
			var pos = $(this).position();
			var width = $(this).outerWidth();
			userHome.css({
				position: 'absolute',
				top: pos.bottom + 'px',
				left: (pos.left + width - 30) + 'px',
			}).show();
		}, function(){
			$('#userHome').hide();
		});
		
		//Setup the save home URL Icon
		$('#saveHome').on('click', function(){
			var userHomeUrl = window.location.href;
			toolbarUtilities.api.setHomeURL(user.username, userHomeUrl).done(function(response){
				user.homeUrl = userHomeUrl;
				toolbarUtilities.showSuccess(toolbarUtilities.tr('header.homeUrlSaved'));
			}).fail(toolbarUtilities.showError);
		});
		
		//Setup the Alarms View
		toolbarUtilities.setupEventsSummary(activeEvents);
		
	}).fail(toolbarUtilities.showError);
});
