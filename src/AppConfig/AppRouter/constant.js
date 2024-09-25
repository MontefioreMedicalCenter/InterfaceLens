import Login from '../../Login/view/index'
//import Main from '../Main'




const ROUTES = [
	{ name: 'login', url: '/', private: false, component: Login, exact: true },
	//{ name: 'main', url: '/main', private: true, component: Main, exact: false }
]

export const PRIVATE_ROUTES = [
	{
		name: 'login',
		url: '/login',
		private: true,
	},{
		name: 'main',
		url: '/main',
		private: true,
	}
]

// const tabList = [
// 	{ label: 'Department', value: 0, path: '/main/admin/department' },
// 	{ label: 'Locations', value: 1, path: '/main/admin/locations' },
// 	{ label: 'User Types ', value: 2, path: '/main/admin/usertype' },
// 	{ label: 'Title', value: 3, path: '/main/admin/title' }
// ]

export default ROUTES
