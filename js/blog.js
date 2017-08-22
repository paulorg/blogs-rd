(function($){

	$(document).ready(function (){

		var TOKEN = '4ac98d510af23fd1b39770575544b8e0';
		var form = $('#rsssignsidebarform');
		var inputEmail = form.find('input[name="email"]');

		$('#rsssignsidebarform').submit(function() {
			if ($('#rsssignsidebarform input:checkbox').is(':checked')) {
				var data_obj = {
		      'token_rdstation': TOKEN,
		      'identificador': 'blog_subscription',
		      'email': inputEmail.val()
		    };
				$.ajax({
		      type: 'POST',
		      url: 'https://www.rdstation.com.br/api/1.3/conversions',
		      data: data_obj,
		      crossDomain: true
		    });
			}
		});

		//Social share count
    $(".sharing").each(function (index, e) {
      var shareUrl = $(this).attr('data-url');
			$.when(
		  	$.getJSON('https://website-grader.herokuapp.com/social/' + encodeURIComponent(shareUrl.replace('https://', 'http://'))),
		    $.getJSON('https://website-grader.herokuapp.com/social/' + encodeURIComponent(shareUrl))
		  ).then(function(http, https) {
		  	var count = http[0].data.shares.total + https[0].data.shares.total - http[0].data.shares.linkedin;
				if (count > 1000) {
        	count = (count / 1000).toFixed(1);
          if (count > 1000) count = (count / 1000).toFixed(1) + "M";
          else count = count + "k";
      	}
				$(e).html(count + " compartilhamentos");
		  });
		});

		$('.navbar-nav li li a[href*=\\#], .global-offer a').click(function(){
			var topCount = ( $ ( $.attr(this, 'href') ).offset().top );
			$('html, body').animate({ scrollTop: topCount }, 500);
			return false;
		});

		$('#search-modal').on('shown.bs.modal', function () {
			$('#search-modal input').focus();
		})

	});

})(jQuery);
