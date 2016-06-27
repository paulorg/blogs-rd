$(window).load(function(){

  // HIDE NAV BAR WHEN SCROLLING DOWN
  var myElement = document.getElementById("epic-nav");
  var headroom  = new Headroom(myElement);
  headroom.init();

  $(".epic-nav").mouseover(function(){
    $(this).removeClass("headroom--unpinned").addClass("headroom--pinned");
  })

  // SCROLL TRACKER
  // Make the little progress bar on the top of the page grow while the user scrolls the page
  function scrollTracker(){
    var total = $("body").outerHeight() - $(window).height(),
        scrolled = $("body").scrollTop(),
        progress = $(".tracker .progress"),
        progressWidth = (scrolled * 100)/total + "%";
    progress.css({width:progressWidth});
  }

  // POPULATE TOPIC MENU WITH H2 TITLES
  function topicMenu(){
    var headings = $(".epic-article h2"),
        headingNav = $(".topics-nav .dropdown-menu");
    for (var t = 0; t < headings.length; t++) {
      h = headings.eq(t),
      hText = h.text();
      if(h.children().length > 0){
        hId = h.children("a").attr("name");
      }else{
        hId = "topic"+t;
        h.prepend("<a name='"+hId+"'></a>");
      }
      headingNav.append( "<li><a href='#" + hId + "' >" + hText + "</a></li>"  );

      scrollTo($("a[href='#"+hId+"']"), $("a[name="+hId+"]"), 64);
    }
  }
  topicMenu();

  // STICK ELEMENTS
  // Stick elements with .affixed class on top
  function affixImages(){
    if( $(window).width() >= 992 ){
      $(".affixed").stick_in_parent();
    } else {
      $(".affixed").trigger("sticky_kit:detach");
    }
  }

  // SCROLL TO
  // Function to automatic scroll the page to some place when an element is clicked
  function scrollTo(trigger, destination, offset){
    trigger.click(function(){
      destOffset = destination.offset().top - offset;
      $('html, body').animate({ scrollTop: destOffset }, 400, function(){
        //Recalculate affixed images position after resizing the collapse height
        $(".affixed").trigger("sticky_kit:recalc");
      });
    })
  }

  // DYNAMIZE ACCORDION
  // Make the Bootstrap accordion dynamic,
  function dynamizeAccordion(){
    acc = $(".accordion");
    for (i = 0; i < acc.length; i++) {
      idName = "accordion" + i;
      idSlug = "#" + idName;
      acc.eq(i).attr("id", idName);

      accHeading = $(idSlug+" .panel-heading");
      accPanel = $(idSlug+" .panel-collapse");
      for (j = 0; j < accHeading.length; j++) {
        headingId = "heading" + i,
        collapseName = "collapse" + i;
        accHeading.eq(j).attr({
          "data-parent": idSlug,
          "id": headingId + j,
          "href": "#" + collapseName + j,
          "aria-controls": collapseName + j
        });
        accPanel.eq(j).attr({
          "id": collapseName + j,
          "aria-labelledby": headingId + j
        })
      }
      // Scroll page to top of panel at opening
      scrollTo(accHeading, accHeading, 48);
    }
  }

  // Applying scrollTo function to the "back to top" button
  scrollTo($(".scroll-top"), $("body"), 0);

  dynamizeAccordion();
  scrollTracker();
  affixImages();
  $(window).scroll(function(){
    scrollTracker();
  })
  $(window).resize(function(){
    scrollTracker();
    affixImages();
  })

  $('#preloader').fadeOut('slow',function(){$(this).remove();});

  //DISQUS
  var disqus_config = function () {
    this.page.url = '<?php echo get_permalink(); ?>';
    this.page.identifier = '<?php echo dsq_identifier_for_post($post); ?>';
  };

  (function() {
  var d = document, s = d.createElement('script');

  s.src = '//blogdemarketingderesultados.disqus.com/embed.js';

  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
  })();

})
