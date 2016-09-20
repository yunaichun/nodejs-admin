/**
 * 详情页面
 * @param  {[type]} )
 * @return {[type]}
 */
$(function(){
	//点击用户头像
	//主评论+回复区
	//1、点击主评论：原来的data-tid="#{item.from._id}"变成现在的toId
	//2、点击回复区：原来的data-tid="#{reply.from._id}"变成现在的toId
	$('.comment').on('click',function(e){
		//点击头像
		var target=$(this);
		//拿到主评论对应的id:data-cid
		var commentId=target.attr('data-cid');
		//拿到主评论对应的用户id:data-tid
		//主评论下循环的是主评论用户ID----each item in comments---data-tid="#{item.from._id}"
		//回复后循环的是回复中的用户ID----each reply in item.reply----data-tid="#{reply.from._id}"
		var toId=target.attr('data-tid');
		

		//点击头像切换
		if($('#commentId').length>0){
			$('#commentId').val(commentId);
		}else{
			//动态插入隐藏域(主评论用户ID，主评论ID，原本页面已经有电影ID)
			//主评论ID。
			$('<input>').attr({
				type:'hidden',
				id:'commentId',
				name:'comment[cid]',
				value:commentId
			}).appendTo('#commentForm');
		}

		if($('#toId').length>0){
			$('#toId').val(toId);
		}else{
			//主评论对应的用户ID
			$('<input>').attr({
				type:'hidden',
				id:'toId',
				name:'comment[tid]',
				value:toId
			}).appendTo('#commentForm');
		}	
	});
});