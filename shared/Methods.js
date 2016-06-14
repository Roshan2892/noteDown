Meteor.methods({
//------------------User--------------
<<<<<<< HEAD
	editUser:function(user_id,/* name, */first_name, last_name, email, age, gender,/* img*/){
		return Meteor.users.update({ _id: user_id },{
			$set:{
				//"profile.name": name,
				"profile.first_name": first_name,
				"profile.last_name": last_name,
				"profile.emails": email,
				"profile.age": age,
				"profile.gender": gender/*,
				"profile.image":img*/
			}
		})
	},

//-------------------note---------------
/*	addDoc:function(loc,tags){		//, tags
		var doc;
		if(!this.userId){// NOt logged in
			return;
		}else{
			doc={
				owner:this.userId, 
				getLocation:loc,
				tagsName:tags,
				createdOn:new Date().toLocaleString(), 
				title:"Untitled Document"
			};
			var id = Documents.insert(doc);
			return id; //return was missing. caused problem in method call.
		}
	},
	delDoc:function(doc){
		if(!this.userId){// NOt logged in
			return;
		}else{
			var realDoc=Documents.findOne({_id:doc._id, owner:this.userId});
			if(realDoc){
				//realDoc.isPrivate=doc.isPrivate;
				Documents.remove({_id:doc._id}, realDoc);
=======
	editUser:function(user_id,first_name, last_name, email,/* img*/){
		return Meteor.users.update({ _id: user_id },{
			$set:{
				"profile.first_name": first_name,
				"profile.last_name": last_name,
				"profile.emails": email
				/*"profile.image":img*/
			}
		})
	},

//-------------------note---------------
	addDoc:function(group){		//, tags
		var doc;
		doc={
			owner:this.userId, 
			createdAt:new Date().toLocaleString(), 
			title:"Untitled Discussion",
			groupID: group
		};
		var id = Documents.insert(doc);
		var group = Groups.findOne({ _id : group });
		var name = group.gname;
		var gid = group._id;
		var members = group.members;
		for (var i = 0; i <members.length; i++){
			if(members[i].id !== this.userId){
				Rss.insert({
					rss_title: "has opened a new",
					title: "discussion",
					user_action: "/user_dashboard/"+ this.userId,
					user_name: Meteor.user().profile.name,
					group_name: name,
					createdAt: new Date().toLocaleString(),
					group_action: "/group/"+gid+"/",
					action: "/group/"+gid+"/discuss/",
					user: members[i].name
				});
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
			}
		}
<<<<<<< HEAD
	}
	updateDocPrivacy:function(doc){
		console.log("updateDocPrivacy Method");
=======
		return id; //return was missing. caused problem in method call.
	},

	delDoc:function(doc){
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
		var realDoc=Documents.findOne({_id:doc._id, owner:this.userId});
		if(realDoc){
			//realDoc.isPrivate=doc.isPrivate;
			Documents.remove({_id:doc._id}, realDoc);
		}
	},
<<<<<<< HEAD
	*/
=======
	
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
	addEditingUser:function(docid){
		var doc, user, eusers;

		doc = Posts.findOne({_id:docid});
		if(!doc){return;} //No Doc Give up.
		
		if(!this.userId){return;}// No Loggen in user Give up.
		//NOw i have a doc anf possibly a user.

		user=Meteor.user().profile;
		eusers=EditingUsers.findOne({ docid:doc._id});
		if(!eusers){
			eusers={
				docid:doc._id,
				users:{},
			};
		}
		user.lastEdit = new Date().toLocaleString();
		eusers.users[this.userId] = user;
		EditingUsers.upsert({_id:eusers._id},eusers);
	},

	//---------------Group Function--------------------------------------------
	addGroup: function(gtitle,gdesc, privacy) {
		check(gtitle,String);
		check(gdesc,String);
		var group;
		var user=Meteor.user().profile.name;
		if(!this.userId){// NOt logged in
			return;
		}
		else {
			group={
				gname: gtitle,
				gdesc: gdesc,
				privacy: privacy,
				owner:{
					"id": this.userId,
				    "name": Meteor.user().profile.name 
				},
<<<<<<< HEAD
				members:[],
=======
				members:[{
					"id": this.userId,
				    "name": Meteor.user().profile.name,
				    "joinedAt": new Date().toLocaleString()
				}],
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
				member_count: 1,
				createdOn: new Date().toLocaleString()
			};
			var id= Groups.insert(group);
			var group_Id= Meteor.users.update({ _id: this.userId },{
				$addToSet: {
					group_ids: id
				}
			});
<<<<<<< HEAD
			/*Rss.insert({
                rss_title: "'" +user+ "' has created a new group",
                title:gtitle,
                user: user,
                createdAt: new Date().toLocaleString(),
                action: "/group/"+id,
                id: id
          	});*/
=======
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
			return id;
		}
	},

	deleteGroup : function(groupId){
		var data = Groups.findOne(groupId);
		var owner= data.owner.id;
		console.log(owner);
		if(owner !== this.userId){ // if not the owner of the group
			throw new Meteor.Error("not-authorised");
			alert("Not authorised to delete");
		}
		var id=Groups.remove(groupId);
		Meteor.users.update(
			{ _id: this.userId },
			{ 
				$pull: {
					group_ids: groupId 
				}
			}
		);
		return id;
	},

	joinGroup : function(groupId, memberId, memberName){
		var data= Groups.findOne(groupId);
		var member=Groups.find({},{ "members_id":1, _id: 0 });
		var id= data._id;	
		var count= data.member_count;
		

		for (var i = 0; i < data.members.length; i++) {
      		if (data.members[i].id == memberId) {
        		return false;
      		}
    	}
    	count++;
		if(!memberId){// NOt logged in
			return;
		}
		else{
			var id= Groups.update(
				{"_id" : id},{
					$set:{ member_count: count},
<<<<<<< HEAD
					$addToSet: {
						members:{ 
							"id": memberId,
							"name":memberName,
							"joinedAt": new Date().toLocaleString()
							}
						}
					});
=======
				$addToSet: {
					members:{ 
						"id": memberId,
						"name":memberName,
						"joinedAt": new Date().toLocaleString()
					}
				}
			});
			var group_Id= Meteor.users.update({ _id: this.userId },{
				$addToSet: {
					group_ids: data._id
				}
			});
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
			return id;
		}
	},

	leaveGroup: function(groupId) {
	    check(groupId, String);
	    var userId = Meteor.userId();
	    var name= Meteor.user().profile.name;
	    var result = Groups.findOne({_id: groupId});
	    var count= result.member_count;
	    if (!result) {
	      return false;
	    }
	    if (result.owner.id === userId) {
	      throw new Meteor.Error(403, 'You can\'t leave this group because you are owner');
	      return false;
	    } 
	    else {
<<<<<<< HEAD
	      count--;
	      return Groups.update(result._id, {
	      	$set: { member_count: count},
	      	$pull: {
				members:{
					id: userId,
					name: name 
				}
			}
=======
	      	count--;
	      	Meteor.users.update(
				{ _id: this.userId },
				{ 
					$pull: {
						group_ids: groupId 
					}
				}
			);
	      	return Groups.update(result._id, {
		      	$set: { member_count: count},
		      	$pull: {
					members:{
						id: userId,
						name: name 
					}
				}
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
			});
	    }
  	},

  	saveGroup: function(groupId,title, description){
  		var data= Groups.findOne(groupId);
  		check(title,String);
  		check(description,String);
  		if(!this.userId){// NOt logged in
			return;
		}
		else {
			var id= Groups.update({ _id: groupId },{
				$set:{
					gname: title,
					gdesc: description
				}
			});
			return id;
		}
  	},
<<<<<<< HEAD

  	requestJoin: function(groupId, ownerId,ownerName, user, username){
  		var data= Groups.findOne(groupId);
  		var name= data.gname;
  		var notification= {
  			title: username + " wants to join your group- " + name,
  			group:{
  				id: groupId,
  				name: name
  			},
  			owner:{
  				id: ownerId,
  				name: ownerName
  			},
  			user:{
  				id: user,
  				name: username
  			},
  			createdAt: new Date().toLocaleString()
  		};
  		var id= Notify.insert(notification);
  		console.log(id);
  		return id;
  	},

=======
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
  	removeMember: function(groupId, memberId, memberName){  
  		var data= Groups.findOne(groupId);
  		var count= data.member_count;
  		if (!data) {
	      return false;
	    }
	    if (data.owner.id === memberId) {
	      throw new Meteor.Error(403, 'You can\'t remove yourseld because you are owner');
	      return false;
	    } 
	    else {
<<<<<<< HEAD
	      count--;
	      return Groups.update({_id: groupId}, {
=======
	      	count--;
	      	Meteor.users.update(
				{ _id: memberId },
				{ 
					$pull: {
						group_ids: groupId 
					}
				}
			);
	      	return Groups.update({_id: groupId}, {
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
		      	$set: { member_count: count},
		      	$pull: {
					members:{
						id: memberId,
						name: memberName 
					}
				}
			});
	    }
  	},
	
	//---------------Todo Function--------------------------------------------

	createReminder : function(text, desc, date){
		check(text,String);
		check(desc,String);
		var task;
	    if(! this.userId){
	    	throw new Meteor.Error("non-authorized");
	    }
		else{
				task={
					title: text,
					desc: desc,
					date: date,
				    createdAt : new Date().toLocaleString(),
				    owner:{
						"id": this.userId,
						"name": Meteor.user().profile.name 
					},
					action:"todo"
				}			
		}
		var id=Tasks.insert(task);
		var reminderId= Meteor.users.update({ _id: this.userId },{
				$addToSet: {
					reminder_ids: id
				}
			});
		return id;
    },

    createTask : function(text, desc, date, assign, group_id, group_name){
		check(text,String);
		check(desc,String);
		var task;
	    if(! this.userId){
	    	throw new Meteor.Error("non-authorized");
	    }
		else{
				task={
					title: text,
					desc: desc,
					date: date,
					groupID: group_id,
					assignedTo: assign,
				    createdAt : new Date().toLocaleString(),
				    owner:{
						"id": this.userId,
						"name": Meteor.user().profile.name 
					},
					action: "task"
				}			
		}
		var id=Tasks.insert(task);
<<<<<<< HEAD
		Rss.insert({
				rss_title: "has created a task",
=======
		var group = Groups.findOne({ _id : group_id });
		Rss.insert({
				rss_title: "has assigned you a task",
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
				title: text,
				user_action: "/user_dashboard/"+ this.userId,
				user_name: Meteor.user().profile.name,
				group_name: group_name,
				createdAt: new Date().toLocaleString(),
<<<<<<< HEAD
				action: "/group/"+group_id,
				id: id
=======
				group_action: "/group/"+group_id+"/",
				action:"/group/"+group_id+"/group_task/",
				user: assign
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
		});
		var reminderId= Meteor.users.update({ _id: this.userId },{
				$addToSet: {
					reminder_ids: id
				}
			});
		return id;
    },
    deleteReminder : function(taskId){
		var task = Tasks.findOne(taskId);
<<<<<<< HEAD
		if(task.owner.id !== this.userId){
			throw new Meteor.Error("not-authorized");
		}
=======
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
		var id=Tasks.remove(taskId);
		Meteor.users.update({ _id: this.userId },{ 
			$pull: {
				reminder_ids: taskId 
			}
		});
		return id;
    },

    setCheckedReminder : function(taskId, setChecked){
		var task = Tasks.findOne(taskId);
<<<<<<< HEAD
		if(task.owner.id !== this.userId){
			throw new Meteor.Error("not-authorized");
=======
		Tasks.update({_id: taskId},{$set: {checked:setChecked}});
    },
     //--------------------------------group Discussion--------------------------
	addThread : function(msg, groupId,post_id, post_name){
		var user= Meteor.user().profile.name;
		var group= Groups.findOne({_id: groupId});
		var group_name= group.gname;
		var thread = {
				content:msg,
				owner:{
					"id":this.userId,
					"name":Meteor.user().profile.name
				},
				like: 0,
				likedBy: [],
				publishedAt: new Date().toLocaleString(),
				postId: post_id,
				type: "comment"

		};
		var id=Thread.insert(thread);
		/*var group = Groups.findOne({ _id : groupId });
		var gname = group.gname;
		var members = group.members;
		for (var i = 0; i <members.length; i++){
			if(members[i].id !== user_id){
				Rss.insert({
		          rss_title: "has commented on note",
		          title: post_name,
		          user_action: "/user_dashboard/"+ this.userId,
		          user_name: user,
		          group_name: gname,
		          group_action: "/group/"+groupId+"/",
		          createdAt: new Date().toLocaleString(),
		          action: '/group/'+groupId+'/notes/'+post_id+"/",
		          user: members[i].name
		        });
		    }
		}*/
		Posts.update({ _id: post_id},{
			$addToSet: {
				comments: id
			}
		});
		return id;
	},

	likeThread : function(nid,like,owner, owner_name ,group_id,content){
		var user= Meteor.user().profile.name;
		var id= Thread.update({ _id: nid},
		{
			$set:{ like:like, likedAt: new Date().toLocaleString()},
			$addToSet:{ 
				likedBy: Meteor.user().profile.name
			}
		});
		return id;
		
	},

	deleteThread: function(thread_id,note_id){
		var did=Thread.remove(thread_id);
		Thread.remove({threadID: thread_id});
		Posts.update({_id: note_id},{
			$pull: {
				comments: thread_id
			}
		});
		return did;
	},
	setReply: function( userid, username, value, thread_id,type){
		var thread ={
        		title: value,
        		owner:{
        			id: userid,
        			name: username
        		},
        		threadID: thread_id,
        		publishedAt: new Date().toLocaleString(),
        		type: type
        }
        var id =Thread.insert(thread);
        if(type==="reply"){
			Thread.update({ _id: thread_id },{
					$addToSet:{
						comments: id
					}
			});
		}
		return id;
	},

	//SummerNote------------------------------------
	addPost: function (title, postBody, loc, tags, privacy, created_date) {
		var doc;
		var user= Meteor.user().profile.name;
		if(!this.userId){// NOt logged in
			return;
		}
		else{
			doc={
				
				Title: title,
				Body: postBody,
				owner:{
					id:this.userId, 
					name:Meteor.user().profile.name
				},
				Location:loc,
				Tags:tags,
				privacy: privacy,
				createdOn: created_date, 
			};
			var id = Posts.insert(doc);
			var postId= Meteor.users.update({ _id: this.userId },{
				$addToSet: {
					post_ids: id
				}
			});
			return id;
		}  
		
	},

	editPost: function (postID, title, postBody, owner, loc, tags, updatedAt) {
		var user=Meteor.user().profile.name;
		var id =Posts.update(postID,{
			$set:{
				Title: title,
				Body: postBody,
				Location: loc,
				Tags:tags,
				updatedAt: updatedAt
			}
		});
		return id;
	},
		
	
	deletePost: function (postID) {
		Posts.remove(postID);
		Meteor.users.update({ _id: this.userId },{ 
				$pull: {
					post_ids: postID 
				}
		});
	},
  	shareNotes:function(note_id,group_id){
  		Groups.update({ _id: group_id},{
  				$addToSet:{
  	  				notes: note_id
  				}
  			});
  		return Posts.update({ _id: note_id},{
  				$set:{
  	  				groupid: group_id,
  	  				privacy: "public"
  				}
  			});
  	},
  	addGroupNote: function (title, postBody, loc, tags, privacy, group_id, group_name) {
		var doc;
		var user= Meteor.user().profile.name;
		if(!this.userId){// NOt logged in
			return;
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
		}
		else{
			doc={
				
				Title: title,
				Body: postBody,
				owner:{
					id:this.userId, 
					name:Meteor.user().profile.name
				},
				Location:loc,
				Tags:tags,
				privacy: privacy,
				groupID:group_id,
				createdOn:new Date().toLocaleString(), 
			};
			var id = Posts.insert(doc);
			var group = Groups.findOne({ _id : group_id });
			var members = group.members;
			for (var i = 0; i <members.length; i++){
				if(members[i].id !== this.userId){
					Rss.insert({
						rss_title: "has created a note",
						title: title,
						user_action: "/user_dashboard/"+ this.userId,
						user_name: user,
						group_name: group_name,
						createdAt: new Date().toLocaleString(),
						group_action: "/group/"+group_id+"/",
						action: "group/"+group_id+"/notes/"+id+"/",
						user: members[i].name
					});
				}
			}
			var postId= Meteor.users.update({ _id: this.userId },{
				$addToSet: {
					post_ids: id
				}
			});
			return id;
		}  
		
	},
	editGroupNote: function (postID, title, postBody, owner, loc, tags, updatedAt, groupId) {
		var user=Meteor.user().profile.name;
		var user_id = this.userId;
		var id =Posts.update(postID,{
			$set:{
				Title: title,
				Body: postBody,
				Location: loc,
				Tags:tags,
				updatedAt: updatedAt,
				updatedBy: user
			}
		});
		var group = Groups.findOne({ _id : groupId });
		var name = group.gname;
		var members = group.members;
		for (var i = 0; i <members.length; i++){
			Rss.insert({
	          rss_title: "has edited a note",
	          title: title,
	          user_action: "/user_dashboard/"+ user_id,
	          user_name: user,
	          group_name: name,
	          group_action: "/group/"+groupId+"/",
	          createdAt: new Date().toLocaleString(),
	          action: '/group/'+groupId+'/shared_media/',
	          user: members[i].name
	        });
		   
		}
		return id;
	},
	Media_Rss: function(rss_title, title, user_id, user_name, group_name, groupId){
		var group = Groups.findOne({ _id : groupId });
		var members = group.members;
		for (var i = 0; i <members.length; i++){
			if(members[i].id !== user_id){
				Rss.insert({
		          rss_title: rss_title,
		          title: title,
		          user_action: "/user_dashboard/"+ user_id,
		          user_name: user_name,
		          group_name: group_name,
		          group_action: "/group/"+groupId+"/",
		          createdAt: new Date().toLocaleString(),
		          action: '/group/'+groupId+'/shared_media/',
		          user: members[i].name
		        });
		    }
		}
<<<<<<< HEAD
    },
     //--------------------------------group Discussion--------------------------
	addThread : function(msg, groupId,post_id){
		var user= Meteor.user().profile.name;
		var group= Groups.findOne({_id: groupId});
		var group_name= group.gname;
		var thread = {
				content:msg,
				owner:{
					"id":this.userId,
					"name":Meteor.user().profile.name
				},
				like: 0,
				likedBy: [],
				publishedAt: new Date().toLocaleString(),
				postId: post_id

		};
		var id=Thread.insert(thread);
		Posts.update({ _id: post_id},{
			$addToSet: {
				threads: id
			}
		});
		/*Rss.insert({
			rss_title:"'" + user + "' has posted a comment",
			title:msg,
			user: user,
			createdAt: new Date().toLocaleString(),
			action: "/group/"+groupId,
			id: groupId
		});*/
		return id;
	},

	likeThread : function(nid,like,owner, owner_name ,group_id,content){
		var user= Meteor.user().profile.name;
		var id= Thread.update({ _id: nid},
		{
			$set:{ like:like, likedAt: new Date().toLocaleString()},
			$addToSet:{ 
				likedBy: Meteor.user().profile.name
			}
		});
		/*Rss.insert({
			rss_title: user + " has liked " + owner_name +" post",
			title:content,
			user: user,
			owner: owner,
			createdAt: new Date().toLocaleString(),
			action: "/group/"+group_id,
			id: group_id
		});*/
		return id;
		
	},

	deleteThread: function(thread_id,note_id){
		var did=Thread.remove(thread_id);
		Posts.update({_id: note_id},{
			$pull: {
				threads: thread_id
			}
		});
		return did;
	},

	//SummerNote------------------------------------
	addPost: function (title, /*message,*/ postBody, loc, tags, privacy, created_date) {
		var doc;
		var user= Meteor.user().profile.name;
		if(!this.userId){// NOt logged in
			return;
		}
		else{
			doc={
				
				Title: title,
				//Message: message,
				Body: postBody,
				owner:{
					id:this.userId, 
					name:Meteor.user().profile.name
				},
				Location:loc,
				Tags:tags,
				privacy: privacy,
				createdOn: created_date, 
			};
			var id = Posts.insert(doc);
			/*Rss.insert({
				rss_title: "'" +user + "' has created a note",
				title:title,
				user: user,
				createdAt: created_date,
				action: "/posts/"+id,
				id: id
			});*/
			var postId= Meteor.users.update({ _id: this.userId },{
				$addToSet: {
					post_ids: id
				}
			});
			return id;
		}  
		
	},

	editPost: function (postID, title,/* message,*/ postBody, owner, loc, tags, updatedAt) {
		var user=Meteor.user().profile.name;
		var id =Posts.update(postID,{
			$set:{
				Title: title,
				//Message: message,
				Body: postBody,
				Location: loc,
				Tags:tags,
				updatedAt: updatedAt
			}
		});
		return id;
	},
		
	
	deletePost: function (postID) {
		Posts.remove(postID);
		Meteor.users.update({ _id: this.userId },{ 
				$pull: {
					post_ids: postID 
				}
		});
	},
  	shareNotes:function(note_id,group_id){
  		Groups.update({ _id: group_id},{
  				$addToSet:{
  	  				notes: note_id
  				}
  			});
  		return Posts.update({ _id: note_id},{
  				$set:{
  	  				groupid: group_id,
  	  				privacy: "public"
  				}
  			});
  	},
  	addGroupNote: function (title, /*message,*/ postBody, loc, tags, privacy, group_id, group_name) {
		var doc;
		var user= Meteor.user().profile.name;
		if(!this.userId){// NOt logged in
			return;
		}
		else{
			doc={
				
				Title: title,
				//Message: message,
				Body: postBody,
				owner:{
					id:this.userId, 
					name:Meteor.user().profile.name
				},
				Location:loc,
				Tags:tags,
				privacy: privacy,
				groupID:group_id,
				createdOn:new Date().toLocaleString(), 
			};
			var id = Posts.insert(doc);
			Rss.insert({
				rss_title: "has created a note",
				title: title,
				user_action: "/user_dashboard/"+ this.userId,
				user_name: user,
				group_name: group_name,
				createdAt: new Date().toLocaleString(),
				action: "/group/"+group_id,
				id: id
			});
			var postId= Meteor.users.update({ _id: this.userId },{
				$addToSet: {
					post_ids: id
				}
			});
			return id;
		}  
		
	},
	editGroupNote: function (postID, title,/* message,*/ postBody, owner, loc, tags, updatedAt) {
		var user=Meteor.user().profile.name;
		var id =Posts.update(postID,{
			$set:{
				Title: title,
				//Message: message,
				Body: postBody,
				Location: loc,
				Tags:tags,
				updatedAt: updatedAt
			}
		});
		return id;
	},
=======
	}
>>>>>>> 6c12f9441b016354c71cd1b368f2cddf86c283de
});
