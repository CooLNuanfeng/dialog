
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
		type : 'notice',
		className:'dialog_ui',
		pos : 'c-c',
		move : '',
		mask : false,
		okVal : '确定',
		cancelVal : '取消',
		ok : false,
		cancel : false	
	}
}


Dialog.prototype = {
	
	constructor : Dialog,
	
	//每个dialog只创建一次标示
	once : {},
	//初始化
	init : function(options){
		
		$.extend(this.settings,options);
		
		//console.log(this.once[this.settings.Marked])
		if(this.once[this.settings.Marked] == undefined){
			this.once[this.settings.Marked] = true;
		}
	
		
		if(this.once[this.settings.Marked]){
			this.createDialog();
			this.once[this.settings.Marked] = false;
		}
				
	},
	
	createDialog : function(){
		this.$Dialog = $('<div class="dialog"></div>');
		this.$Dialog.addClass(this.settings.className);
		$('body').append(this.$Dialog);
		
		this.temple();
		this.setStyle();
		this.closeDialog();
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
		
		if(this.settings.type == 'notice'){
			this.$Dialog.html('<div class="dialog_title"><a href="#" class="dialog_close"><i class="fa fa-dot-circle-o"></i></a>'+this.settings.title+'</div>'+
    					 '<div class="dialog_con"></div>');
		}
		
		if(this.settings.type == 'proform'){
			this.$Dialog.html('<div class="dialog_title"><a href="#" class="dialog_close"><i class="fa fa-dot-circle-o"></i></a>'+this.settings.title+'</div>'+
    					 '<div class="dialog_con"></div>'+
						 '<div class="dialog_btn"><a class="dialog_sure">'+this.settings.okVal+'</a><a class="dialog_cancel">'+this.settings.cancelVal+'</a></div>');
		}
		
	},
	
	closeDialog : function(){
		var This = this;
		$('.dialog_close').on('click',function(){
			$(this).parent().parent().remove();
			This.once[This.settings.Marked] = true;
		})
	}
	
}