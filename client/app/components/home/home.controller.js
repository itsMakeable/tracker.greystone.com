import groupBy from 'lodash.groupby';
import formModel from './form-model';
console.log(formModel);

class HomeController {
	constructor($timeout, $filter, toastr, $q, socket, project, task, Response) {
		console.log(socket);
		this.project = project;
		this.task = task;
		this.$q = $q;
		this.name = 'Leandro Zubrezki';
		this.toastr = toastr;
		this.$timeout = $timeout;
		this.$filter = $filter;
		this.users = [{
			name: 'Todd Lynch',
			username: 'tlynch',
			email: 'todd@itsmakeable.com',
			id: '203.246.4178',
			label: 'Todd Lynch',
		}, {
			name: 'Jim Smith',
			username: 'jsmith',
			email: 'jim@mydomain.com',
			id: '212.555.1212',
			label: 'Jim Smith'
		}];
		this.scrollableContent = angular.element(document.getElementById('scrollit'));
		this.newComment = '';
		this.data = {};
		this.loadData(this.task);
		this.formModel = formModel;
		this.logs = [{
			name: 'Todd Lynch',
			updates: [{
				message: 'Started task'
			}],
			date: new Date(2015, 6, 12, 12, 30, 1, 1),
			type: 'automatic'
		}, {
			name: 'Todd Lynch',
			updates: [{
				message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec molestie quam. Vestibulum ut malesuada dui, vitae bibendum nulla. Aliquam mollis mattis commodo. Mauris ut pulvinar dui, in suscipit nisl. Etiam gravida nulla dolor, quis suscipit dolor tempus quis. Nullam pharetra, est at pellentesque pulvinar, metus erat fringilla orci, et fringilla nunc mi et mi. Etiam aliquet finibus mauris, et maximus ipsum pulvinar eu. Fusce nec mauris vitae lorem faucibus porttitor. Integer sit amet lobortis nulla. Praesent in varius ipsum.'
			}],
			date: new Date(2015, 6, 13, 9, 20, 1, 1),
			type: 'comment'
		}, {
			name: 'Todd Lynch',
			updates: [{
				field: 'field1',
				value: 'XYZ 123',
				message: 'Updated Field 1 to "XYZ 123"'
			}, {
				field: 'field2',
				value: 'ABC 456',
				message: 'Updated Field 2 to "ABC 456"'
			}],
			date: new Date(2015, 6, 13, 9, 30, 1, 1),
			type: 'automatic'
		}, {
			name: 'Jim Smith',
			updates: [{
				field: 'field1',
				value: 'XYZ 123456',
				message: 'Updated Field 1 to "XYZ 123"'
			}, {
				field: 'field2',
				value: 'ABC 456789',
				message: 'Updated Field 2 to "ABC 456"'
			}],
			date: new Date(2015, 6, 17, 9, 20, 1, 1),
			type: 'automatic'
		}, {
			name: 'Jim Smith',
			updates: [{
				message: 'Here is the file'
			}],
			date: new Date(2015, 6, 27, 8, 15, 1, 1),
			type: 'message',
			attachments: ''
		}, {
			name: 'Jim Smith',
			updates: [{
				message: 'Said Field 3 is "Yes"'
			}],
			date: new Date(2015, 6, 27, 10, 20, 1, 1),
			type: 'message'
		}];
		this.updateViewData();
	}
	loadData(task) {
		angular.forEach(task.fields, field => {
			this.data[field.field_id] = field.active_response.data;
		});
		this.previousData = angular.copy(this.data);
	}
	updateViewData() {
		this.viewLogs = groupBy(this.logs, (log) => {
			return this.$filter('date')(log.date, 'MMMM d');
		});
	}
	update() {
		if (this.task4.$valid) {
			let element = angular.element(document.getElementById('exampleInputFile'));
			if (element[0].files[0]) {
				this.data.file1 = element[0].files[0].name;
			}
			var updates = [];
			angular.forEach(this.data, (value, key) => {
				if (this.previousData[key] != value) {
					updates.push({
						field: key,
						value: value,
						message: 'Updated ' + this.formModel[key].name + ' to "' + value + '"'
					});
				}
			});
			if (updates.length > 0) {
				this.logs.push({
					name: this.name,
					updates: updates,
					date: new Date(),
					type: 'automatic'
				});
				this.updateViewData();
				this.previousData = angular.copy(this.data);
				this.scrollToBottom();
				this.toastr.success('Updated');
			}
		} else {
			this.toastr.error('Error');
		}
	}
	undo() {
		this.data = angular.copy(this.previousData);
	}
	scrollToBottom() {
		this.$timeout(() => {
			this.scrollableContent[0].scrollTop = this.scrollableContent[0].scrollHeight;
		});
	}
	submitComment() {
		if (this.newComment !== '') {
			this.logs.push({
				name: this.name,
				updates: [{
					message: this.newComment
				}],
				date: new Date(),
				type: 'comment'
			});
			this.updateViewData();
		}
		this.newComment = '';
		this.scrollToBottom();
	}
	rollBackValue(update) {
		if (update.field && update.value && this.data.hasOwnProperty(update.field)) {
			this.data[update.field] = update.value;
		}
	}
	getTypeOfMessage(type) {
		if (type == 'automatic') {
			return '';
		} else if (type == 'comment') {
			return ' commented';
		} else if (type == 'message') {
			return ' wrote';
		}
	}
}


export default HomeController;
