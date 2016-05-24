Template.groupdiscussion.onCreated(function(){
    var self= this;
    this.autorun( function() {
        self.subscribe('threads');
        self.subscribe('groups');
        self.subscribe('groups');
    });
});

Template.groupdiscussion.events({
    "submit .new-post": function(event){
        event.preventDefault();
        var post_id= this._id;
        var text = event.target.commentbox.value;
        var groupId = Session.get('groupId'); //instead of Router.current().params.gameId;
        Meteor.call("addThread",text, groupId,post_id);
        event.target.commentbox.value='';  
    }
});

Template.postMessage.helpers({
    'count':function(){
        var postid= this._id;
         return Thread.find({ postId:postid}).count();
    },
    'gdPost': function(){   
        var postid= this._id;
        return Thread.find({ postId:postid});
    },
    admin: function(){
       var owner= this.owner.id;
       if(owner === Meteor.userId())
        return true;
    }
});
 
Template.postMessage.onCreated(function(){
    var self= this;
    this.autorun( function() {
        self.subscribe('threads');
        self.subscribe('groups');
        self.subscribe('posts');
    });
});

Template.postMessage.events({
    'click #deletePost' : function(){
        var thread_id= this._id;
        var note=Posts.findOne({ threads: thread_id},{ _id:1});
        var note_id= note._id;
        Meteor.call('deleteThread',thread_id, note_id);
    },
    'click #likePost' :function(text){
        var owner=this.owner.id;
        var thread= Thread.findOne({_id: this._id});
        var likedBy= thread.likedBy;
        var like = thread.like;;
        var content=this.content
        var user= Meteor.user().profile.name;
        var group_id= Session.get('groupId');
        for(var i=0;i<likedBy.length;i++){
            //console.log(likedBy[i]);
            if(likedBy[i]===Meteor.user().profile.name){
                return false;
            }
        }
        like++;
        Meteor.call('likeThread',this._id,like,owner,group_id,content);
    }
});
