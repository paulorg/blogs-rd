(function($){

	$(document).ready(function (){

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

        //Social share count

        var shareUrl = $('.sharing').attr('data-url');
        $.getJSON('https://count.donreach.com/?url=' + encodeURIComponent(shareUrl) + "&callback=?", function (data) {
            shares = data.shares;
            shares.total = data.total;
            $(".sharing").each(function (index, e) {
                count = shares["total"];
                if (count > 1000) {
                    count = (count / 1000).toFixed(1);
                    if (count > 1000) count = (count / 1000).toFixed(1) + "M";
                    else count = count + "k";
                }
                $(e).html(count+" compartilhamentos");
            });
        });

		// Estimated reading time
		var text = $('main.post').text();
		var charsLength = text.length;
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
