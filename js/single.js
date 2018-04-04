(function($){

	$(document).ready(function (){

		dataLayer.push({ 'Author': post.author, 'Subject': post.subject });
		console.log(post.author);

		var topDistance = $('.single article header').offset().top + $('.single article header').height() + 48;
		var bottomDistance = $('article footer').height() + $('body > footer').height() + $('aside').height() + 120;

		$('.single article aside').affix({
			offset: {
				top: topDistance,
				bottom: bottomDistance
			}
		})

		$('a.comments').click(function(e){
			e.preventDefault();
		});

		// Estimated reading time
		var text = $('main.post').html();
		if (text.indexOf('<form') > -1) {
			text = text.slice(0, text.indexOf('<form')) + text.slice(text.indexOf('</form>'));
		}
		text = text.replace(/(<([^>]+)>)/ig,'');
		var wordsCount = text.split(' ').length;
		var readingSpeed = Math.round(wordsCount / 200);
		$('.reading-time .minutes').text(readingSpeed);

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

	});

})(jQuery);
