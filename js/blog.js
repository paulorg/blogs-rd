(function($){

	$(document).ready(function (){

		var TOKEN = '4ac98d510af23fd1b39770575544b8e0';
		var form = $('#rsssignsidebarform');
		var inputEmail = form.find('input[name="email"]');

		$('#rsssignsidebarform').submit(function() {
			if ($('#rsssignsidebarform input:checkbox').is(':checked')) {

				var data_array = [
					{ name: 'email', value: inputEmail.val() },
					{ name: 'identificador', value: 'blog_subscription' },
					{ name: 'token_rdstation', value: TOKEN }
				];
				RdIntegration.post(data_array);

			}
		});
		
		//Social Media
		$('.sharing > span').sharrre({
			share: {
				googlePlus: true,
				facebook: true,
				linkedin: true,
				},
			enableHover: false,
			urlCurl: ' ',
			template: '{total}'

		});

		$('.navbar-nav li li a[href*=#], .global-offer a').click(function(){
			var topCount = ( $ ( $.attr(this, 'href') ).offset().top );
			$('html, body').animate({ scrollTop: topCount }, 500);
			return false;
		});

		$('#search-modal').on('shown.bs.modal', function () {
			$('#search-modal input').focus();
		})

	});

})(jQuery);
