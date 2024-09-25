/**
 * Flexicious
 * Copyright 2011, Flexicious LLC
 */

// @flow
// FIXME: Add correct types where FlowFixMe's have been used
import { toast } from 'react-toastify'

import { TypedObject } from '../../flexicious'
// import { traceError, /* trace */ } from "../../helpers/loggers";
import {
	watch as networkStateWatcher,
	check as checkNetworkStatus
} from 'is-offline'
import axios from 'axios'
import GlobalEventDispatcher from '../../utils/GlobalEventDispatcher'
import ArrayCollection from '../../vo/ArrayCollection'
const amf = window.amf

/**
 * This is a base class that wraps a Webservice/RemoteObject object. Since the concrete classes are
 * singletons, we always have a single instance of the webservice wsdl downloaded for efficiency.
 * @author Flexicious
 * @constructor
 * @extends TypedObject
 */
export default class ServiceProxyBase extends TypedObject {
	constructor() {
		super()
		this.showBusyCursor = false
		ServiceProxyBase.callCount = 0
		this.baseUrl =
			window.location.href.indexOf('localhost') >= 0 ||
			window.location.href.indexOf('192.168.') >= 0
				? 'http://localhost:8080/'
				: window.location.origin + '/'
	}

	static get finish() {
		return ServiceProxyBase.callCount === 0
	}

	static progressHook(hookFunction: Function) {
		ServiceProxyBase._hook = hookFunction
	}
	getHeaderData() {
		var headerData = {
			userName: localStorage.getItem('user-id'),
			Authorization: localStorage.getItem('token'),
			'Content-Type': 'application/json'
		}
		return headerData
	}
	getHeaderFormData() {
		var headerData = {
			userName: localStorage.getItem('user-id'),
			Authorization: localStorage.getItem('token'),
			'Content-Type': 'application/x-www-form-urlencoded'
		}
		return headerData
	}

	convertToVo(arr, converter) {
		var list = new ArrayCollection()
		if (arr instanceof Array) {
			arr.forEach(data => {
				let converted = converter()
				converted.fromJson(data)
				list.addItem(converted)
			})
			return list
		} else {
			let converted = converter()
			converted.fromJson(arr)
			return converted
		}
	}
	dispatchEvent(evt) {
		GlobalEventDispatcher.instance().dispatchEvent(evt)
	}
	getClassNames() {
		return ['ServiceProxyBase', 'TypedObject']
	}

	execHook = () => {
		if (ServiceProxyBase._hook) {
			ServiceProxyBase._hook({ busy: this.showBusyCursor })
		}
	}

	callApi = (methodType, url, token, params, contentType, headerData = {}) => {
		let headers = {}

		if (token) {
			headers = {
				'Content-Type': 'application/json',
				userName: localStorage.getItem('user-id'),
				Authorization: localStorage.getItem('token'),
			}
		} else {
			if (contentType === 'form') {
				headers = { 
					'Content-Type': 'application/x-www-form-urlencoded',
					userName: localStorage.getItem('user-id'),
					Authorization: localStorage.getItem('token'),
				 }
			} else {
				headers = {
					'Content-Type': 'application/json',
					userName: localStorage.getItem('user-id'),
					Authorization: localStorage.getItem('token'),
				}
			}
		}

		if (Object.keys(headerData).length) {
			headers = headerData
		}

		if (methodType === 'get') {
			return axios({
				method: 'get',
				url: this.baseUrl + url,
				headers: headers
			})
		} else if (methodType === 'post') {
			return axios({
				method: 'post',
				url: this.baseUrl + url,
				data: params,
				headers: headers
			})
		}
	}

	callServiceMethod = (
		method,
		urlPath,
		args,
		token,
		resultFunction,
		faultFunction,
		contentType,
		header
	) => {
		if (typeof faultFunction == 'undefined') faultFunction = null
		if (faultFunction == null) faultFunction = this.defaultFaultHandler
		this.showBusyCursor = true
		ServiceProxyBase.callCount++
		if (ServiceProxyBase.callCount === 1) {
			this.execHook()
		}

		let promise = this.callApi(
			method,
			urlPath,
			token,
			args,
			contentType,
			header
		)
		promise.then(
			response => {
				ServiceProxyBase.callCount -= ServiceProxyBase.callCount ? 1 : 0
				this.showBusyCursor = false
				if (ServiceProxyBase.finish) {
					this.execHook()
				}
				// if(resultFunction)
				// resultFunction({ result: typeof response.data =="string" ? JSON.parse(response.data) : response.data });

				/**
				 * if there any error in backend server please return it as error response
				 * that's why I have replaced above lines with bunch of lines below
				 */
				if (resultFunction) {
					let result
					try {
						result =
							typeof response.data === 'string' &&
							response.data.length > 0 &&
							response.data.includes('{')
								? JSON.parse(response.data)
								: response.data
						resultFunction({ result })
					} catch (err) {
						if (faultFunction) {
							// traceError(response.data);
							faultFunction({ error: err, response })
							if(err.response && err.response.status === 408) {
								document.dispatchEvent(new Event("logout"))
							}
						}
					}
				}
			},
			err => {
				ServiceProxyBase.callCount -= ServiceProxyBase.callCount ? 1 : 0
				this.showBusyCursor = false
				if (ServiceProxyBase.finish) {
					this.execHook()
				}
				faultFunction({ error: err })
				if(err.response && err.response.status === 408) {
					document.dispatchEvent(new Event("logout"))
				}
			}
		)

		if (ServiceProxyBase.IsOffline) {
			promise[this.useJsonService ? 'reject' : 'resolve'](
				new amf.Response(503, 'No network connection')
			)
		}

		return promise
	}

	// eslint-disable-next-line no-unused-vars
	defaultFaultHandler({ fault }, token) {
		if (typeof token == 'undefined') token = null
		toast.error(fault)
	}
}

ServiceProxyBase.networkWatcher = IsOffline => {
	ServiceProxyBase.IsOffline = IsOffline
}

networkStateWatcher(ServiceProxyBase.networkWatcher)
checkNetworkStatus().then(ServiceProxyBase.networkWatcher)

ServiceProxyBase.prototype.typeName = ServiceProxyBase.typeName =
	'ServiceProxyBase' //for quick inspection
