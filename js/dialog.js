
/*
宽 高 内容 标题 位置 动画形式 mask 按钮及回调
*/
;(function($){
	function Factory(options){
		var oDialog = new Dialog();
		return oDialog.init(options);
	}
	
	$.fn.dialog = $.dialog = Factory
})(jQuery)

function Dialog(){
	
	this.$Dialog = null;
	
	this.settings = {
		width : 300,
		height: 'auto',
		title : '',
		content : '',
		className:'dialog_ui',
		pos : 'c-c',
		mask : false,
		drag : false,
		animate : ''
	}
}


Dialog.prototype = {
	
	constructor : Dialog,
	
	//每个dialog只创建一次标示
	once : {},
	//初始化
	init : function(options){
		
		$.extend(this.settings,options);
		
		if(this.once[this.settings.once] == undefined){
			this.once[this.settings.once] = true;
		}
		
		if(this.once[this.settings.once]){
			this.createDialog();
			this.once[this.settings.once] = false;
		}
				
	},
	
	createDialog : function(){
		this.$Dialog = $('<div class="dialog"></div>');
		this.$Dialog.addClass(this.settings.className+' '+this.settings.animate);
		$('body').append(this.$Dialog);
		
		this.temple();
		this.setStyle();
		this.mask();
		this.drag();
		
		if(this.settings.animate !== ''){
			this.animate();
		}else{
			this.closeDialog();
		}
		
		//
		//this.ok();
		//this.cancel();
	},
	
	//位置尺寸设置
	setStyle : function(){
		/*
		if(this.settings.animate){
			this.animate();
		}else{
			this.$Dialog.width(this.settings.width);
			this.$Dialog.height(this.settings.height);
		}
		*/
		this.$Dialog.width(this.settings.width);
		this.$Dialog.height(this.settings.height);
		
		if(this.settings.pos == 'c-c'){
			this.$Dialog.css({
				top: ($(window).height()-this.$Dialog.height())/2,
				left: ($(window).width()-this.$Dialog.width())/2
			})
			
		}
		
		if(this.settings.pos == 'r-b'){
			this.$Dialog.css({
				top: ($(window).height()-this.$Dialog.height()),
				left: ($(window).width()-this.$Dialog.width())
			})
			
		}
		
	},
	//模板类型
	temple : function(){
		
		var This = this;
		
		if(this.settings.okVal == undefined){
			this.$Dialog.html('<div class="dialog_title"><a href="javascript:;" class="dialog_close" target="_self"><i class="fa fa-dot-circle-o"></i></a>'+this.settings.title+'</div>'+
    					 '<div class="dialog_con">'+this.settings.content+'</div>');
		}
		
		if(this.settings.okVal){
			this.$Dialog.html('<div class="dialog_title"><a href="#" class="dialog_close"><i class="fa fa-dot-circle-o"></i></a>'+this.settings.title+'</div>'+
    					 '<div class="dialog_con">'+this.settings.content+'</div>'+
						 '<div class="dialog_btn"><a class="dialog_sure">'+this.settings.okVal+'</a><a class="dialog_cancel">'+this.settings.cancelVal+'</a></div>');
			this.$Dialog.find('.dialog_sure').click(function(){
				This.ok();
				This.closeDialog(this);
			});
			
			this.$Dialog.find('.dialog_cancel').click(function(){
				This.cancel();
				This.closeDialog(this);
			})
		}		
	},
	//关闭dialog
	closeDialog : function(obj){
		var This = this;
		//this.$Dialog.find('.dialog_close') 要在创建的对象下找，被这个害惨了，浪费了老长时间  T.T
		this.$Dialog.find('.dialog_close').on('click',function(){
			$(this).parent().parent().remove();
			This.once[This.settings.once] = true;
			if(This.settings.mask){
				$('#mask').remove();
			}
		});
		if(obj){
			$(obj).parent().parent().remove();
			this.once[this.settings.once] = true;
			if(this.settings.mask){
				$('#mask').remove();
			}
		}
		
	},
	
	//蒙版部分
	mask : function(){
		
		if(this.settings.mask){
			$('body').append($('<div id="mask"></div>').css({
				width :$(window).width(),
				height :$(window).height()
			}));
			
		}
		
	},
	
	//OK回调函数
	ok : function(){
		if(this.settings.ok){
			this.settings.ok();
		}
	},
	
	//cancle回调
	cancel : function(){
		if(this.settings.cancel){
			this.settings.cancel();
		}
	},
	
	//拖拽
	drag : function(){
		var This = this;
		if(this.settings.drag){
			this.$Dialog.find('.dialog_title').css({cursor:'all-scroll'}).on('mousedown',function(e){
				var _this = this;
				var disX = 	parseInt(e.pageX - This.$Dialog.position().left);
				var disY = 	parseInt(e.pageY - This.$Dialog.position().top);
				$(document).on('mousemove',function(e){
					var L = e.pageX - disX;
					var T = e.pageY - disY;
					if(L<0){
						L =0;
					}else if(L>$(window).width()-This.$Dialog.width()){
						L = $(window).width()-This.$Dialog.width()
					}
					if(T<0){
						T = 0;
					}else if(T>$(window).height()-This.$Dialog.height()){
						T = $(window).height()-This.$Dialog.height()
					}
					This.$Dialog.css({
						left : L,
						top : T	
					})
				});
				$(document).on('mouseup',function(){
					$(document).off('mousemove');
					$(document).off('mouseup');
				});
				
				return false;
			})
		}
	},
	
	//运动形式
	animate : function(){
		
		if(this.settings.animate == 'slide'){
			this.$Dialog.hide();
			this.$Dialog.slideDown('slow');
			this.animateCloseStyle();
		}
		if(this.settings.animate == 'one_3D'){
			this.$Dialog.removeClass('one_3D').css({
				WebkitTransition: 'all ease-in 0.8s'
			});
			this.animateCloseStyle();
		}
	
	},
	
	animateCloseStyle : function(){
		
		var This = this;
		if(this.settings.animate == 'slide'){
			this.$Dialog.find('.dialog_close').on('click',function(){
				var _this = this;
				This.$Dialog.slideUp('slow',function(){
					$(_this).parent().parent().remove();
				});
				This.once[This.settings.once] = true;
				if(This.settings.mask){
					$('#mask').remove();
				}
			})	
		}
		
		if(this.settings.animate == 'one_3D'){
			this.$Dialog.find('.dialog_close').on('click',function(){
				This.$Dialog.addClass('one_3D');
				//$(this).parent().parent().delay(1000).remove();
			})
			This.once[This.settings.once] = true;
			if(This.settings.mask){
				$('#mask').remove();
			}
		}
		
	}
	
	
	
	
}

















