
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
		drag : false
	}
}


Dialog.prototype = {
	
	constructor : Dialog,
	
	//每个dialog只创建一次标示
	once : {},
	//初始化
	init : function(options){
		
		if(this.once[options.Marked] == undefined){
			this.once[options.Marked] = true;
		}
		
		$.extend(this.settings,options);
		
		if(this.once[options.Marked]){
			this.createDialog();
			console.log(this.settings.Marked)
			console.log(this.once[this.settings.Marked])
			this.once[options.Marked] = false;
		}
				
	},
	
	createDialog : function(){
		this.$Dialog = $('<div class="dialog"></div>');
		this.$Dialog.addClass(this.settings.className);
		$('body').append(this.$Dialog);
		
		this.temple();
		this.setStyle();
		this.closeDialog();
		this.mask();
		//this.ok();
		//this.cancel();
	},
	
	//位置尺寸设置
	setStyle : function(){
				
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
			$('.dialog_sure').click(function(){
				This.ok();
				This.closeDialog(this);
			});
			
			$('.dialog_cancel').click(function(){
				This.cancel();
				This.closeDialog(this);
			})
		}		
	},
	//关闭dialog
	closeDialog : function(obj){
		var This = this;
		$('.dialog_close').off('click').on('click',function(){
			$(this).parent().parent().remove();
			This.once[This.settings.Marked] = true;
			console.log(This.settings.Marked)
			console.log(This.once[This.settings.Marked])
		});
		if(obj){
			$(obj).parent().parent().remove();
			this.once[this.settings.Marked] = true;
		}
		if(this.settings.mask){
			$('#mask').remove();
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
	}
	
}