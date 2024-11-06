/**
 * Flexicious
 * Copyright 2011, Flexicious LLC
 */
import ServiceProxyBase from '../../shared/ServiceProxyBase'
import qs from 'qs'

export default class InterfaceService extends ServiceProxyBase {
	constructor(props) {
		super(props)
		this.source = ''
	}

	getClassNames() {
		return ['InterfaceService', 'ServiceProxyBase']
	}

	getallusers(resultHandler, faultHandler) {
		if (typeof faultHandler == 'undefined') faultHandler = null
		// var bodyFormData = qs.stringify({
		// 	userName: username,
		// 	password: password
		// })

		return this.callServiceMethod(
			'post',
			'IdentityHub/api/adminsvc/getAllUsers',
			null,
			null,
			resultHandler,
			faultHandler,
			'form'
		)
	}

	

	
}

InterfaceService.prototype.typeName = InterfaceService.typeName = 'InterfaceService' //for quick inspection
InterfaceService.instance = null
InterfaceService.getInstance = () => {
	if (InterfaceService.instance == null) {
		InterfaceService.instance = new InterfaceService()
	}
	return InterfaceService.instance
}
