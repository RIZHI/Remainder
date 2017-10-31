//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookMark);

//save bookmark
function saveBookMark(e){
    
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    var dateTime = document.getElementById('dateTime').value;
    
    var countDownDate = new Date(dateTime).getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 *24));
    var hours = Math.floor(distance % (1000 * 60 *60 *24));
    var minutes = Math.floor(distance % (1000 * 60 *60 ) / (1000 * 60));
    var seconds = Math.floor(distance % (1000 * 60) /100);

   

    if(!validateForm(siteName,siteUrl,dateTime))
    {
        return false;
    }

    var bookmark={
        name:siteName,
        url:siteUrl,
        dateTime:dateTime
    }

    //test if bookmark is null
    
    if(localStorage.getItem('bookmarks') === null){
        //init array
        var bookmarks = [];
        //add to array
        bookmarks.push(bookmark);
        //set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }else {
        //get bookarks from localstorage 
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    }

    //clear form
    document.getElementById('myForm').reset();
    //prevent form from submiting
    fetchBookmarks();
    e.preventDefault();
}

//Delete bookmark
function deleteBookmark(url){
    //get bookmark from localstorage
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    //loop through  bookmarks
    for(var i = 0; i<bookmarks.length;i++){
        if(bookmarks[i].url == url)
        {
            //remove from array
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();
}

//fetch Boookmarks
function fetchBookmarks(){

    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    
    //get output
    var bookmarksResults=document.getElementById('bookmarksResults');

    ///calculate countdown to current 
    
 

   
    //build output
    bookmarksResults.innerHTML="";

    for(var i = 0; i<bookmarks.length; i++){
        
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        var dateTime = bookmarks[i].dateTime;
        
        var countDownDate = new Date(dateTime).getTime();
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      
        if(!(days < 0 && hours < 0))
        {
            bookmarksResults.innerHTML += '<div class="well">'+
            '<h3>'+name+
            '<h4>'+ days +' Days ' + hours + ' hours remaining</h4>'+
            '<h5>'+url+'</h5>'+
            //' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
            ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'
            '</h3>'+
            '</div>';

        }
        
        else{
            bookmarksResults.innerHTML += '<div class="well">'+
            '<h3>'+name+
            '<h4> is due for Service </h4>'+
            '<h5>'+url+'</h5>'+
            //' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
            ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'
            '</h3>'+
            '</div>';
        }
        /*if(distance < 0)
            {
                notify.innerHTML +='<h4> Expired  </h4>';
            }*/
        }
}

//validation
 function validateForm(siteName,siteUrl,dateTime)
 {
    if(!siteName  || !siteUrl || !dateTime)
    {
        alert("Please fill in the form");
        return false;
    }

  /*  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    
    if(!siteUrl.match(regex))
    {
        alert('Please use valid url');
        return false;
    }*/
    return true;
 }




 /*
   bookmarksResults.innerHTML += '<div class="well">'+
            '<h3>'+name+
            '<h4>'+ days +' Days ' + hours + ' hours </h4>'+
            ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
            ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'
            '</h3>'+
            '</div>';
 */