import SignUpModule from './signUp'
import SignUpController from './signUp.controller';
import SignUpTemplate from './signUp.jade';

describe('SignUp', () => {
	let $rootScope,
		makeController;

	beforeEach(window.module(SignUp Module.name));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new SignUp
			Controller();
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
			expect(SignUp Template).to.match(/{{\s?vm\.name\s?}}/g);
		});
	});


	describe('Component', () => {
		// test the component/directive itself
		let component = SignUp
		Component();

		it('should use the right template', () => {
			expect(component.template).to.equal(SignUp Template);
		});

		it('should use controllerAs', () => {
			expect(component).to.have.property('controllerAs');
		});

		it('should use the right controller', () => {
			expect(component.controller).to.equal(SignUp Controller);
		});
	});
});
