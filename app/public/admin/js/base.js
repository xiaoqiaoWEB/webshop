//import { app } from "egg-mock/bootstrap";

$(function () {
	app.init();
})

const app = {
	init: function () {
		this.toggleAside();
		//this.resizeIframe();
	},
	toggleAside: function () {


		$('.aside h4').click(function () {


			if ($(this).find('span').hasClass('nav_close')) {

				$(this).find('span').removeClass('nav_close').addClass('nav_open');
			} else {

				$(this).find('span').removeClass('nav_open').addClass('nav_close');
			}

			$(this).siblings('ul').slideToggle();
		})
	},

	changeStatus: function (el, model, attr, id) {
		$.get('/admin/changeStatus', {
			model,
			attr,
			id
		}, function (data) {
			if (data.success) {
				if (el.src.indexOf('yes') != -1) {
					el.src = '/public/admin/images/no.gif';
				} else {
					el.src = '/public/admin/images/yes.gif';
				}
			}
		})
	},
	editNum: function (el, model, attr, id) {
		var val = $(el).html();

		var input = $('<input value="">');

		$(el).html(input);

		$(input).trigger('focus').val(val);

		$(input).click(function () {
			return false;
		})

		$(input).blur(function () {
			var num = $(input).val();

			$.get('/admin/editNum', {
				model,
				attr,
				num,
				id
			}, function (data) {
				$(el).html(num);
			})

		})

	},

	resizeIframe: function(){
		var heights = document.documentElement.clientHeight-100;	
		document.getElementById('rightMain').height = heights
	},

}