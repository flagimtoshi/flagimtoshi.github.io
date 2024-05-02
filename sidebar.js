
        // Selecting the iframe element 
        var frame = document.getElementById("Iframe"); 
        var sidebar = document.getElementById("Sidebar"); 
          
        // Adjusting the iframe height onload event 
        frame.onload = function() 
        // function execute while load the iframe 
        { 
            frame.style.height = "380px"; // failsafe
            // set the height of the iframe as  
          // the height of the iframe content 
          frame.style.height =  
          frame.contentWindow.document.body.scrollHeight + 'px'; 
          sidebar.style.height =  
          frame.contentWindow.document.body.scrollHeight + 'px'; 
           
  
         // set the width of the iframe as the  
         // width of the iframe content 
         frame.style.width  =  
          frame.contentWindow.document.body.scrollWidth+'px'; 
              
        }
