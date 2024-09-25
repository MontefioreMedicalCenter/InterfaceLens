/* eslint-disable react/jsx-key */
import {
	DateComboBox,
	UIUtils,
	Constants,
	FlexDataGridEvent,
	DateRange,
	ToolbarAction,
	DateRangePicker
} from '../../../../../flexicious'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import React from 'react'

export default class MaterialDateComboBox extends DateComboBox {
	constructor() {
		super('span')
		this.handleChange = this.handleChange.bind(this)
		this.setDateRangeOptions([ 
            DateRange.DATE_RANGE_CUSTOM
        ]);
	}
	changeEventHandler() {}
	clear() {
		super.clear()
		this._dataProviderDirty = true
		this.commitDataProvider()
		this.requestRender()
	}
	commitDataProvider() {
		var options = []
		var item, i, selectedValue

		if (this._dataProviderDirty) {
			this._dataProviderDirty = false
			var dp = this.getDataProvider()

			for (i = 0; i < dp.length; i++) {
				item = dp[i]
				options[options.length] = new Option(
					this.itemToLabel(item),
					UIUtils.resolveExpression(item, this.dataField)
				)
				if (i === this.getSelectedIndex()) {
					options[i].selected = 'selected'
					selectedValue = options[i].value
				}
			}
		}
		if (this._selectedItemDirty) {
			this._selectedIndex = -1
			this._selectedIndexDirty = true
			this._selectedItemDirty = false
			dp = this.getDataProvider()
			for (i = 0; i < dp.length; i++) {
				item = dp[i]
				if (item === this.getSelectedItem()) {
					this._selectedIndex = i
					break
				}
			}
		}
		if (this._selectedIndexDirty) {
			this._selectedIndexDirty = false
			this.setAttribute('defaultValue', this._selectedIndex)
		}
		if (options.length > 0) {
			this.children = [
				<Select
					style={{ width: '100%' }}
					value={selectedValue || Constants.DEFAULT_ALL_ITEM_TEXT}
					onChange={this.handleChange}>
					{options.map((opt, i) => {
						return (
							<MenuItem key={i} value={opt.value}>
								{opt.label}
							</MenuItem>
						)
					})}
				</Select>
			]
		}
	}
	handleChange(e) {
		let dp
		let item
		let i
		const selectedValue = e.target.value
		let selectedIndex = 0

		for (i = 0; i < this.getDataProvider().length; i++) {
			const item = this.getDataProvider()[i]

			if (UIUtils.resolveExpression(item, this.dataField) === selectedValue) {
				selectedIndex = i
				break
			}
		}
		if (selectedIndex !== this.getSelectedIndex()) {
			dp = this.getDataProvider()
			this._selectedIndex = selectedIndex

			if (this.dataField) {
				this._selectedValue = selectedValue
				for (i = 0; i < dp.length; i++) {
					item = dp[i]
					if (
						UIUtils.resolveExpression(item, this.dataField) === selectedValue
					) {
						this._selectedItem = item
						break
					}
				}
			}
		}

		if (this._selectedValue === DateRange.DATE_RANGE_CUSTOM) {
			const actions = [
				ToolbarAction.create(
					Constants.MCS_BTN_APPLY_LABEL,
					this.onDatePicker,
					true
				),
				ToolbarAction.create(
					Constants.MCS_BTN_CANCEL_LABEL,
					this.onDatePickerCancel.bind(this),
					true
				)
			]

			this.popup = (
				<DateRangePicker
					combo={this}
					dateFormatString={this.dateFormatString}
					grid={this.grid}
				/>
			)
			this.popup = UIUtils.addPopUp(
				this.popup,
				this.domElement,
				true,
				null,
				'Select Date',
				actions
			)
			this.grid.addPopup(this.popup)
		}
		this._dataProviderDirty = true
		this.commitDataProvider()
		this.dispatchEvent(new FlexDataGridEvent(Constants.EVENT_CHANGE))
		this.dispatchEvent(new FlexDataGridEvent(Constants.EVENT_VALUE_COMMIT))
		this.requestRender()
	}
}