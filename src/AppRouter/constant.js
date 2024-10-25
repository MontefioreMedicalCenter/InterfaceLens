import Login from '../../Login/view/index'
import Main from '../../Main'




const ROUTES = [
	{ name: 'login', url: '/', private: false, component: Login, exact: true },
	{ name: 'main', url: '/main', private: true, component: Main, exact: false }
]

// export const PRIVATE_ROUTES = [
// 	{
// 		name: 'login',
// 		url: '/login',
// 		private: true,
// 	},{
// 		name: 'main',
// 		url: '/main',
// 		private: true,
// 	}
// ]


const DHUB = () => <h1>DHub Page</h1>;
const BDI = () => <h1>BDI Page</h1>;
const HealthConnect = () => <h1>Health Connect Page</h1>;
const AdminTab = () => <h1>Admin Page</h1>;
const UsersPage = () => <h1>User Page</h1>;
export const PRIVATE_ROUTES = [
	{
		name: 'dhub',
		url: '/main/dhub',
		private: true,
		component: DHUB,
		exact: true
	},{
		name: 'bdi',
		url: '/main/BDI',
		private: true,
		component: BDI,
		exact: true
	},{
		name: 'users',
		url: '/main/users',
		private: true,
		component: UsersPage,
		exact: true
	},{
		name: 'users',
		url: '/main/admin',
		private: true,
		component: AdminTab,
		exact: true
	},{
		name: 'users',
		url: '/main/admin/department',
		private: true,
		//component: AdminTab,
		exact: true
	},{
		name: 'users',
		url: '/main/admin/locations',
		private: true,
		//component: AdminTab,
		exact: true
	},{
		name: 'users',
		url: '/main/admin/usertype',
		private: true,
		//component: AdminTab,
		exact: true
	},{
		name: 'users',
		url: '/main/admin/title',
		private: true,
		//component: AdminTab,
		exact: true
	}
]
// const tabList = [
// 	{ label: 'Department', value: 0, path: '/main/admin/department' },
// 	{ label: 'Locations', value: 1, path: '/main/admin/locations' },
// 	{ label: 'User Types ', value: 2, path: '/main/admin/usertype' },
// 	{ label: 'Title', value: 3, path: '/main/admin/title' }
// ]

export default ROUTES
