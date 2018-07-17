
intValue = 20;

$("#btn").click(function(e) {
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: "https://jsonplaceholder.typicode.com/users",
      async : false,
      success: function(data) {
        users = [];
        var len = data.length;
        console.log("value "+ data[0]['name']);
        for(i=0;i<data.length;i++){
         users.push(data[i]);
       }
       localStorage.setItem('users', JSON.stringify(users));
       console.log(localStorage.getItem('users') );
       if(localStorage.getItem('users')){
         loadData();
         loadArticles(data);
       // loadData();
       // displayArticle(data);
       }


    // try{
    //   JSON.parse(localStorage.getItem('users'));
    //   displayArticle(data,pnum);
    // }
    // catch(e){
    //
    // }



       }

    });


    $.ajax({
      type: "GET",
      url: "https://jsonplaceholder.typicode.com/posts",
      async : false,
      success: function(data) {
        console.log(data[1]);
          posts = [];
          for(i=0;i<data.length;i++){
          posts.push(data[i]);
        }
        localStorage.setItem('posts',JSON.stringify(posts));
        if(localStorage.getItem('posts')){
          loadData();
          loadArticles(data);
        // loadData();
        //  displayArticle(data);
        }
        },
      error: function(result) {
        alert('error');
      }
    });

    $.ajax({
      type: "GET",
      url: "https://jsonplaceholder.typicode.com/comments",
      async : false,
      success: function(data) {
        // if(localStorage.getItem('comments') === null){
          comments = [];
          for(i=0;i<data.length;i++){
          comments.push(data[i]);
        }
          localStorage.setItem('comments',JSON.stringify(comments));
          if(localStorage.getItem('comments')){
            loadData();
            loadArticles(data);
          // loadData();
          //  displayArticle(data);
          }
        },
      error: function(result) {
        alert('error');
      }
    });

  toggle_visibility('btn');
  // loadArticles(data);
  // displayArticle(data, pnum);
    // loadData();
    // comment();
  });


function toggle_visibility(id) {
         var e = document.getElementById(id);
         e.style.display = ((e.style.display!='none') ? 'none' : 'block');
      };



function loadData(){
    // var Users, Posts, Comments;
    if(window.localStorage.users)
        this.Users = JSON.parse(window.localStorage.users);
    if(window.localStorage.posts);
        this.Posts = JSON.parse(window.localStorage.posts);
    if(window.localStorage.comments)
        this.Comments = JSON.parse(window.localStorage.comments);
}

loadData.prototype.get_users = function(){
    return this.Users;
}
loadData.prototype.get_posts = function(){
    return this.Posts;
}
loadData.prototype.get_comments = function(){
    return this.Comments;
}

loadData.prototype.update_users = function(Users){
    this.Users = Users
}
loadData.prototype.update_comments = function(Comments){
    this.Comments = Comments;
}
loadData.prototype.update_post = function(Posts){
    this.Posts = Posts;
}

var brk = 20;
var art_count = 21;
var check = 1;
// ---------------------------------------------------------------------------------------------------------------------------
// console.log(pnum);
function updateComments(data,pnum){
    //alert("Inside comment");
    Comments = data.get_comments();
    Users = data.get_users();
    Posts = data.get_posts();
    if (jQuery("#add_comment_name_art_" + (pnum+1)).val() && jQuery("#add_comment_email_art_" + (pnum+1)).val() && jQuery(id).val("#add_comment_art_" + (pnum+1))){
        name = jQuery("#add_comment_name_art_" + (pnum+1)).val();
        email = jQuery("#add_comment_email_art_" + (pnum+1)).val();
        body = jQuery("#add_comment_art_" + (pnum+1)).val();
        Comments.push({
        "postId": Posts[pnum].id,
        "id": (Comments[Comments.length-1].id+1),
        "name": name,
        "email": email,
        "body": body
    });
    data.update_comments(Comments);
    window.localStorage.comments = JSON.stringify(Comments);
    }
    id = '#article_'+ (pnum+1) +'_comments';
    jQuery(id).empty();
    viewComments(data, pnum);
}

// ---------------------------------------------------------------------------------------------------------------------------

function addComment(data, pnum){
    btn = '<br><button type="button" id="btn_add_comment_' + (pnum+1) + '" class="add_comment_button">Add comments</button>';
    id = "#article_"+ (pnum+1) +"_comments";
    name = '<br><input id="add_comment_name_art_'+ (pnum+1) +'" type="text" class="input_comment_name" placeholder="Enter Name..." required/>';
    email = '<br><input id="add_comment_email_art_'+ (pnum+1) +'" type="text" class="input_comment_email" placeholder="Enter Emaill..." required/>';
    body = '<br><input id="add_comment_art_'+ (pnum+1) +'" type="text" class="input_comment_body" placeholder="Enter Comment..." required/>';

    jQuery(id).append(name);
    jQuery(id).append(email);
    jQuery(id).append(body);
    jQuery(id).append(btn);
    id = "#btn_add_comment_" + (pnum+1);
    jQuery(id).click(function(){
        updateComments(data, pnum);
    });
}

function deleteComments(data, pnum){
    id = '#article_'+ (pnum+1) +'_comments';
    jQuery(id).empty();
    Comments = data.get_comments();
    Posts = data.get_posts();
    var i = 0;
    for (; i<Comments.length; ){
        if(Posts[pnum].id == Comments[i].postId){
            Comments.splice(i, 1);
            i = 0;
        }
        else{
            i++;
        }
    }
    data.update_comments(Comments);
    window.localStorage.comments = JSON.stringify(Comments);
    jQuery("#btn_edit_post_" + (pnum+1)).remove();
    jQuery("#btn_delete_article_" + (pnum+1)).remove();
    loadButtons(data, pnum);
}

function hideComments(data, pnum){
    id = '#article_'+ (pnum+1) +'_comments';
    jQuery(id).empty();
    btn = '<button type="button" id="btn_view_comment_' + (pnum+1) + '" class="view_comment_button">View comments</button>';
    id = '#div_article_' + (pnum+1);
    jQuery(id).append(btn);
    id = '#btn_view_comment_' + (pnum + 1);
    jQuery(id).click(function(){
        viewComments(data, pnum)
    });
}

function deleteSingleComment(data, pnum, comment_num){
    jQuery("#art_comment_"+comment_num).remove();
    Comments = data.get_comments();
    Posts = data.get_posts();
    var i = 0;
    for (; i<Comments.length; ){
        if(Posts[pnum].id == Comments[i].postId && (Comments[i].id == comment_num)){
            {
                Comments.splice(i, 1);
                i = 0;
            }
        }
        else{
            i++;
        }
    }
    data.update_comments(Comments);
    window.localStorage.comments = JSON.stringify(Comments);

}

function displayComments(data, name, email, body ,comment_num, pnum){
    sub_div = '';
    sub_div += '<div id="art_comment_' + (comment_num) + '"' + 'name="post_' + (pnum+1) +'_comments" class="comment_box">';
    sub_div += '<p class="comment_name"> Name: ' + name + '</p>';
    sub_div += '<p class="comment_email"> Email: ' + email + '</p>';
    sub_div += '<p class="comment_body"> Comment: ' + body + '</p>';
    sub_div += '<br><button type="button" id="art_comment_del_' + comment_num + '" class="single_comment_delete">Delete</button>';
    sub_div += '</div>';
    id_temp = '#article_'+ (pnum+1) + '_comments';
    jQuery(id_temp).append(sub_div);
    jQuery("#art_comment_del_" + comment_num).click(function(){
        deleteSingleComment(data, pnum, comment_num);
    })
    //console.log(data.get_comments());
}

function viewComments(data, pnum){
    Comments = data.get_comments();
    Posts = data.get_posts();
    len_c = Comments.length;
    for (var i=0; i<Comments.length; i++){
        if(Posts[pnum].id == Comments[i].postId){
            displayComments(data, Comments[i].name ,Comments[i].email,Comments[i].body,Comments[i].id, pnum);
        }
    }
    addComment(data, pnum);
    id = "#btn_view_comment_"+(pnum+1);
    jQuery(id).remove();
    hide_btn = '<br><button type="button" id="btn_hide_comment_' + (pnum+1) + '" class="hide_comment_button">Hide comments</button>';
    id = "#article_" + (pnum+1) + "_comments";
    jQuery(id).append(hide_btn);
    id = '#btn_hide_comment_' + (pnum+1);
    jQuery(id).click(function(){
        hideComments(data,pnum);
    })
    btn = '<button type="button" id="btn_delete_comment_' + (pnum+1) + '" class="delete_comment_button">Delete comments</button>';
    id = "#article_" + (pnum+1) + "_comments";
    jQuery(id).append(btn);
    id = "#btn_delete_comment_" + (pnum+1);
    jQuery(id).click(function(){
        deleteComments(data, pnum);
    });
}

function updatePost(data, pnum){
    Posts = data.get_posts();
    title = "Title: ";
    body = "";
    id = "#edit_title_art_" + (pnum+1);
    if(jQuery(id).val())
    {
        Posts[pnum].title = jQuery(id).val();
        title += jQuery(id).val();
        jQuery("#article_title_" + (pnum+1)).text(title);
    }
    id = "#edit_body_art_" + (pnum+1);
    if(jQuery(id).val()){
        Posts[pnum].body = jQuery(id).val();
        body = jQuery(id).val();
        jQuery("#article_body_" + (pnum+1)).text(body);
    }
    data.update_post(Posts);
    window.localStorage.posts = JSON.stringify(Posts);
    jQuery("#article_updatefield_"+ (pnum+1)).empty();
    //jQuery("#article_"+ (pnum+1) +"_comments").empty();
    id = "#btn_edit_post_" + (pnum+1);
    jQuery(id).unbind('click');
    jQuery(id).html("Edit post");
    jQuery(id).click(function(){
        editPost(data, pnum);
    });
}

function editPost(data, pnum){
    jQuery("#btn_edit_post_" + (pnum+1)).unbind('click');
    jQuery("#btn_edit_post_" + (pnum+1)).html("Update post");
    title = '<br><input id="edit_title_art_'+ (pnum+1) +'" type="text" class="input_comment_email" placeholder="Enter Title..." required/>';
    body = '<br><input id="edit_body_art_'+ (pnum+1) +'" type="text" class="input_comment_body" placeholder="Enter Body..." required/>';

    Posts = data.get_posts();
    console.log(Posts[pnum].title);
    //document.getElementById('edit_title_art_'+(pnum+1)).value = "temp"; //Posts[pnum].title;

    jQuery("#article_updatefield_"+ (pnum+1)).append(title);
    jQuery("#article_updatefield_"+ (pnum+1)).append(body);
    jQuery("#edit_title_art_"+ (pnum+1)).val(Posts[pnum].title);
    jQuery("#edit_body_art_"+ (pnum+1)).val(Posts[pnum].body);

    id = "#btn_edit_post_" + (pnum+1);
    jQuery(id).click(function(){
        updatePost(data, pnum);
    });
}

// ---------------------------------------------------------------------------------------------------------------------------
function deleteArticle(data, pnum){
    Posts = data.get_posts();
    jQuery("#article_" + (pnum+1)).remove();
    Posts.splice(pnum,1);
    data.update_post(Posts);
    window.localStorage.posts = JSON.stringify(Posts);
    jQuery("#page").empty();
    loadArticles(data);
}
// ---------------------------------------------------------------------------------------------------------------------------

function upDateData(data){
    jQuery("#add_post").remove();
    name = jQuery("#new_art_name").val();
    username = jQuery("#new_art_username").val();
    email = jQuery("#new_art_email").val();
    street = jQuery("#new_art_street").val();
    suite = jQuery("#new_art_suite").val();
    city = jQuery("#new_art_city").val();
    zipcode = jQuery("#new_art_zipcode").val();
    phone = jQuery("#new_art_phone").val();
    website = jQuery("#new_art_website").val();
    title = jQuery("#new_art_title").val();
    body = jQuery("#new_art_body").val();
    Users = data.get_users();
    Posts = data.get_posts();
    userid = Users.length+1;
    var user_exist = false;
    for(let each_usr in Users){
        if (Users[Number(each_usr)].name == name)
        {
                userid = Users[each_usr].id;
                user_exist = true;
                break;
        }
    }
    if (!user_exist){
        user_detail = {
            "id": userid,
            "name": name,
            "username": username,
            "email": email,
            "address": {
            "street": street,
            "suite": suite,
            "city": city,
            "zipcode": zipcode,
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
            },
            phone: phone,
            "website": website,
            "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
            }
        }
        Users.push(user_detail);
    }

    new_post = {
        "userId": userid,
        "id": Posts.length + 1,
        "title": title,
        "body": body
    }

    Posts.unshift(new_post);
    data.update_post(Posts);
    data.update_users(Users)
    window.localStorage.posts = JSON.stringify(Posts);
    window.localStorage.users = JSON.stringify(Users);
    jQuery("#new_art_ip").remove();
    jQuery("#add_post").remove();
    jQuery("#add_art").append('<button id="creat_post" class="new_post_btn">Create New Post</button>');
    jQuery("#page").empty();
    loadArticles(data);
}

function createNewPost(data){
    article_num = data.get_posts().length;
    input = '';
    input += '<div id="new_art_ip">';
    input += '<br><input id ="new_art_name" type="text" class="input_comment_name" placeholder="Name..." required/>';
    // input += '<br><input id ="new_art_username" type="text" class="input_comment_name" placeholder="Username..." required/>';
    // input += '<br><input id ="new_art_email" type="text" class="input_comment_name" placeholder="Email..." required/>';
    // input += '<br><input id ="new_art_street" type="text" class="input_comment_name" placeholder="Street..." required/>';
    // input += '<br><input id ="new_art_suite" type="text" class="input_comment_name" placeholder="Suite..." required/>';
    // input += '<br><input id ="new_art_city" type="text" class="input_comment_name" placeholder="City..." required/>';
    // input += '<br><input id ="new_art_zipcode" type="text" class="input_comment_name" placeholder="Zipcode..." required/>';
    // input += '<br><input id ="new_art_phone" type="text" class="input_comment_name" placeholder="Phone..." required/>';
    // input += '<br><input id ="new_art_website" type="text" class="input_comment_name" placeholder="Website..." required/>';
    input += '<br><input id ="new_art_title" type="text" class="input_comment_email" placeholder="Title..." required/>';
    input += '<br><input id ="new_art_body" type="text" class="input_comment_body" placeholder="Body..." required/>';
    input +='</div>';
    jQuery("#add_art").append(input);
    jQuery("#add_art").append('<button id="add_post" class="new_post_btn">Add New Post</button>');
    jQuery("#add_post").click(function(){
        upDateData(data);
    })
}

function loadButtons(data, pnum){
    div = '';
    div += '<input type="button" value="Like" id="btn_like_post_' + (pnum+1) + '" class="like_post_button"/>';
    div += '<button type="button" id="btn_edit_post_' + (pnum+1) + '" class="edit_post_button">Edit post</button>';
    div += '<button type="button" id="btn_delete_article_' + (pnum+1) + '" class="delete_article_button">Delete post</button>';
    div += '<button type="button" id="btn_view_comment_' + (pnum+1) + '" class="view_comment_button">View comments</button>';
    jQuery("#div_article_" + (pnum+1)).append(div);
    id = "#btn_edit_post_" + (pnum + 1);
    jQuery(id).click(function(){
        editPost(data, pnum);
    });

    id = "#btn_like_post_" + (pnum + 1);
    // $(document).ready(function(e) {
        jQuery(id).click(function(){
				jQuery(this).val("Liked");
			});
    // });
    id = "#btn_view_comment_" + (pnum + 1);
    jQuery(id).click(function(){
        viewComments(data, pnum);
    });
    jQuery("#btn_delete_article_" +(pnum+1)).click(function(){
        deleteArticle(data, pnum);
    });
}

function displayArticle(data, pnum){
    Posts = data.get_posts();
    Users = data.get_users();
    user_id = Posts[pnum].userId;
    name = Users[user_id-1].name;
    title = Posts[pnum].title;
    body = Posts[pnum].body;

    div = '';
    div += '<div id = "article_' + (pnum+1) +'" class="article_holder">'
    div += '<div id="div_article_'+ (pnum+1) + '" class="article_box">';
    div += '<p id="p_article_' + (pnum+1) +'" class="auther_name">' + (pnum + 1) + '. ' + name + '</p>';
    div += '<p id="article_title_' + (pnum+1) + '" class="article_title">Title: ' + title + '</p>';
    div += '<p id="article_body_' + (pnum+1) +'" class="article_body">' + body + '</p>';
    div += '</div>';
    div += '<div id="article_updatefield_' + (pnum+1) + '" class="post_update_field"></div>';
    div += '<div id="article_'+ (pnum+1) + '_comments" class="comment_holder"></div>';
    div += '</div>';
    jQuery("#page").append(div);
    loadButtons(data, pnum);
}

function scrolled(data)
{
  console.log(data);
    var obj = document.getElementById("page");
    console.log(obj);
    //console.log($("#page").scrollTop() +"|"+ $("#page").innerHeight() +"|"+ obj.scrollHeight);

    if(Math.ceil($("#page").scrollTop()) + Math.ceil($("#page").innerHeight())>=obj.scrollHeight)
    {
        jQuery("#page").off("scroll");
        while(true){
            if(art_count == data.get_posts().length+1)
                break;
            if ((art_count%brk) == 0)
            {
                console.log(art_count);
                displayArticle(data, Number(art_count-1));
                art_count++;
                break;
            }
            else{
                displayArticle(data, Number(art_count-1));
                art_count++;
            }
        }
        // jQuery("#page").scroll(function(){
        //     scrolled(data);
        // });
    }
}

function loadArticles(data){
    jQuery("#creat_post").click(function(){
        jQuery("#add_art").empty();
        createNewPost(data);
    });
    Posts = data.get_posts();
    var i=1;
    while(true){
        if ((i%brk) == 0)
        {
            displayArticle(data, Number(i-1));
            break;
        }
        else
            displayArticle(data, Number(i-1));
            i++;
    }
    jQuery("#page").scroll(function(){
        scrolled(data, i);
    })
}

window.onload = function(){
    var data = new loadData();
    loadArticles(data);
    // scrolled(data);
}


$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {
     var data = new loadData();
     // loadArticles(data);
     scrolled(data);
   }
 });
// $(window).scroll(function() {
//    if($(window).scrollTop() + $(window).height() == $(document).height() && intValue < JSON.parse(localStorage.getItem("posts")).length) {
//      // intValue = JSON.parse(localStorage.getItem("userList")).length;
//      intValue += 20;
//      console.log(intValue);
//      displayArticle(data, pnum);
//
//    }
//    // else
// });

// return true;
// }
// if(localStorage.getItem('users') === null){
//       return k();
//   }
