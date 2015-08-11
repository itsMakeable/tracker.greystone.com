import UserProfileModule from './user-profile'
import UserProfileController from './user-profile.controller';
import UserProfileComponent from './user-profile.component';
import UserProfileTemplate from './user-profile.jade';

describe('UserProfile', () => {
	let $rootScope,
		makeController;

	beforeEach(window.module(UserProfileModule.name));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new UserProfileController();
		};
	}));

	describe('Module', () => {
		// test things about the component module
		// checking to see if it registers certain things and what not
		// test for best practices with naming too
		// test for routing
	});

	describe('Controller', () => {
		// test your controller here

		it('should have a name property [REMOVE]', () => { // erase me if you remove this.name from the controller
			let controller = makeController();

			expect(controller).to.have.property('name');
		});
	});

	describe('Template', () => {
		// test the template
		// use Regexes to test that you are using the right bindings {{  }}

		it('should have name in template [REMOVE]', () => {
			expect(UserProfileTemplate).to.match(/{{\s?vm\.name\s?}}/g);
		});
	});


	describe('Component', () => {
		// test the component/directive itself
		let component = UserProfileComponent();

		it('should use the right template', () => {
			expect(component.template).to.equal(UserProfileTemplate);
		});

		it('should use controllerAs', () => {
			expect(component).to.have.property('controllerAs');
		});

		it('should use the right controller', () => {
			expect(component.controller).to.equal(UserProfileController);
		});
	});
});
