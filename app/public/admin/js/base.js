//import { app } from "egg-mock/bootstrap";

$(function(){
	app.init();
})

const app = {
	init: function () {
		this.toggleAside();
	},
	toggleAside:function(){
		$('.aside h4').click(function(){
			$(this).siblings('ul').slideToggle();
		})
	},
	changeStatus: function (el, model, attr, id){
		$.get('/admin/changeStatus', {
			model,
			attr,
			id
		}, function (data) {
			if(data.success) {
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
				console.log(data);
				$(el).html(num);
			})
		
		})
	
	}
}

