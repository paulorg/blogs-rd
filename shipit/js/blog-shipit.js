(function($){

	$(document).ready(function (){

		var TOKEN = '4ac98d510af23fd1b39770575544b8e0';
		var form = $('#rsssignsidebarform');
		var inputEmail = form.find('input[name="email"]');

		$('#rsssignsidebarform').submit(function() {
			if ($('#rsssignsidebarform input:checkbox').is(':checked')) {

				var data_array = [
					{ name: 'email', value: inputEmail.val() },
					{ name: 'identificador', value: 'shipit_blog_subscription' },
					{ name: 'token_rdstation', value: TOKEN }
				];
				RdIntegration.post(data_array);

			}
		});

		//Social share count
        $(".sharing").each(function (index, e) {
            var shareUrl = $(this).attr('data-url');
            $.getJSON('https://count.donreach.com/?url=' + encodeURIComponent(shareUrl) + "&callback=?", function (data) {
            	shares = data.shares;
            	shares.total = data.total;
            	count = shares["total"];
            	if (count > 1000) {
                	count = (count / 1000).toFixed(1);
                	if (count > 1000) count = (count / 1000).toFixed(1) + "M";
                	else count = count + "k";
            	}
            	$(e).html(count+" compartilhamentos");
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
