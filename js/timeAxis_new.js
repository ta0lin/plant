;(function ($, window, document) {
	var defaults = {
		data: [], // 展示数据
		id: '', // 判定dom ID
		props: { // 参数反显字段名
			key: 'time',
			title:'title',
			text:'text',
			pic:'pic'
		},
		index: 0, //默认当前选中
		height: '100px',
		then: function () {

		}
	};

	var TimeAxis = function (options) {
		this.options = Object.assign(defaults, options);
		this.props = this.options.props;
		this.id = this.options.id;
		this.height = this.options.height;
		this.init();
	};

	TimeAxis.prototype = {

		// 组件初始化
		init: function () {
			// 生成时间轴盒子html
			this.setTimeBox();
		},

		// 生成时间轴盒子html
		setTimeBox: function () {
			var id = "#" + this.id;
			var html = '<span><img src="../images/collections/top.png" alt="" class="right-top"></span><div class="cx-time-box"><ul></ul></div><span><img src="../images/collections/bottom.png" alt="" class="right-bottom"></span>';
			$(id).empty().append(html);
			// 生成时间轴html
			this.setTimeAxisHtml();

			var self = this;

			// 向左移动
			$(id + '>span:first').on('click', function () {
				self.timeAxisMove(-1);
			});

			//向右移动
			$(id + '>span:last').on('click', function () {
				self.timeAxisMove(1);
			})
		},

		// 生成时间轴html
		setTimeAxisHtml: function () {
			var list = this.options.data || [];
			var html = '';
			var self = this;
			$.each(list, function (index, item) {
				html += '<li class="cx-round-box cx-round-box'+index+'">';
				html += '<div class="cx-time-bottom">'+item[self.props.key]+'</div>';
				html += '</li>';
				if(index != list.length - 1){
					html += '<li class="cx-time-line" style="height: '+ self.height +'"></li>';
				}
			});
			var cls = "#" + this.id + ' ul';
			$(cls).empty().append(html);
			$(cls + ' .cx-time-bottom').on('click', function () {
				self.options.index = $(this).data('index');
				self.timeAxisMove(0); //点击某一点
			})
			this.firstLoad = true;
			this.timeAxisMove(0);//初始选中
		},

		//点击连边移动选中时间节点
		timeAxisMove: function (num){
			var list = this.options.data || [];
			this.options.index += num;
		    if(this.options.index < 0){
		        this.options.index = list.length - 1;
		    }
		    if(this.options.index > list.length - 1){
		        this.options.index = 0;
		    }
		    this.timeAxisRoll();
		    this.timeAxisActive(this.options.index);
		},

		//选中节点左右滚动
		timeAxisRoll: function (){
			var list = this.options.data || [];

			var height = parseInt(this.height) + 12;
			var firstIndex = this.options.index - 1 < 0?0:this.options.index - 1;
			var roll = -(firstIndex* height);
			var widthBox = $('.cx-time-box').height();//时间轴宽度盒子总宽度
			var widthBox1 = Math.abs(list.length * height); //实际总宽度
			if(widthBox > widthBox1){
				return
			}
			var i = parseInt(widthBox/height);//显示时间轴条数

			if(this.options.index + i >= list.length){
				roll =  -((list.length - 1 - i) * height);
			}

			var cla = "#" + this.id + ' ul li';
			$(cla).animate({
				'top': roll + 'px'
			});
		},

		// 前后滑动点击事件
		timeAxisActive: function (num) {
			if(!this.firstLoad){
				var list = this.options.data || [];
				var data = list[this.options.index];
				this.options.then(data);
			} // 首次加载不执行回调
			$('.cx-round-box').removeClass('cx-time-active');
			$('.cx-round-box' + this.options.index).addClass('cx-time-active');
			this.firstLoad = false;
		}
	};
	window.oTimeAxios = TimeAxis;
})(jQuery, window, document);
