/**
 * [userAction 调用reducer]
 * 它们的作用是封装动作对象的内部结构，以便其余的代码库不需要关心它。
 * 操作创建者还可以方便地记录在给定应用程序中可以调度的所有操作。
 */
const selectUsers = () => {
	return {
		type: 'selectUsers'
	};
};

const insertUser = (username, password) => (
	{
		type: 'insertUser',
		username,
		password
	}
);

export { insertUser, selectUsers };
