/**
 * [userAction 调用reducer]
 * 它们的作用是封装动作对象的内部结构，以便其余的代码库不需要关心它。
 * 操作创建者还可以方便地记录在给定应用程序中可以调度的所有操作。
 */
// 查询全部
const selectUsersAction = () => {
	return {
		type: 'selectUsersAction'
	};
};
// 注册
const signupAction = (username, password) => (
	{
		type: 'signupAction',
		username,
		password
	}
);

export { signupAction, selectUsersAction };
