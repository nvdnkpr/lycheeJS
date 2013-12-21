
lychee.define('lychee.net.client.Chat').includes([
	'lychee.net.Service'
]).exports(function(lychee, global, attachments) {

	var Class = function(client, data) {

		var settings = lychee.extend({}, data);


		this.room = null;
		this.user = null;


		this.setRoom(settings.room);
		this.setUser(settings.user);

		delete settings.room;
		delete settings.user;


		settings.type      = lychee.net.Service.TYPE.client;
		settings.broadcast = true;


		lychee.net.Service.call(this, 'chat', client, settings);

		settings = null;


		this.sync();

	};


	Class.prototype = {

		/*
		 * SERVICE API
		 */

		setRoom: function(room) {

			room = typeof room === 'number' ? room : null;


			if (room !== null) {

				this.room = room;

				return true;

			}


			return false;

		},

		setUser: function(user) {

			user = typeof user === 'string' ? user : null;


			if (user !== null) {

				this.user = user;

				return true;

			}


			return false;

		},



		/*
		 * CUSTOM API
		 */

		sync: function() {

			var user = this.user;
			var room = this.room;
			if (
				   user !== null
				&& room !== null
			) {

				this.broadcast({
					type: 'sync',
					user: user,
					room: room
				}, null);

			}

		},

		message: function(message) {

			message = typeof message === 'string' ? message : null;


			if (message !== null) {

				var user = this.user;
				var room = this.room;
				if (
					   user !== null
					&& room !== null
				) {

					this.broadcast({
						type:    'message',
						message: message,
						user:    user,
						room:    room
					}, null);
					//{
					//	id:    this.id,
					//	event: 'message'
					//});

				}

			}

		}

	};


	return Class;

});

