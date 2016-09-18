/**
 * 列表页面
 * @param  {[type]} )
 * @return {[type]}
 */
$(function(){
	//删除
	$('.del').on('click',function(e){
		var target=$(e.target);
		//当前删除行的id
		var id=target.attr('data-id');
		//当前点击行
		var tr=$('.item-id-'+id);
		$.ajax({
			type:'DELETE',
			url:'/admin/movie/list?id='+id
		}).done(function(results){
			console.log(results);
			if(results.success===1){
				if(tr.length>0){
					tr.remove();
				}
			}
		})
	})
})