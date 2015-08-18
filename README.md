tracker.greystone.com

## Dev Server Running

> make sure line 9 in client/app/app.js is uncommented and line 10 is commented.
> ssh tlynch:dev.shifteight.com   (p: jack12)
> cd /opt/mean/tracker.greystone.com
> sudo -u www-data git pull   (toddhlynch / JJack123)
> sudo -u www-data npm install
> sudo -u www-data gulp
> sudo -u www-data node server/server.js &

The & in the line above makes it run in the backgroundf and keep running.  If you want to kill the process or restart, run:

> ps -fade    (look down the list and find the PID of the process running node)
> sudo kill [PID]

## Testing Setup
All test are written in ES6 too because why not! We use Webpack to take care of all the logistics of getting those files run in browsers just like our client files. Our testing setup is:
* Karma
* Webpack + Babel
* Mocha
* Chai

To run test just `npm test` or `karma start`. Read more about testing [below](#testing)


# Getting Started
## Dependencies
What you need to run this app:
* `node` and `npm`
Once you have those, you should install these globals with `npm install --global`:
* `karma-cli`
* `gulp`
* `karma`
* `webpack`

## Installing
* `fork` me
* `clone` your fork
* `npm install` to install all dependencies


## Running the app
NG6 uses Gulp to build and start the dev environment. After you have installed all dependencies you can now run the app.
Run `gulp` to start bundle with `webpack`, start a dev server and watch all files. The port will displayed to you.
 
### Gulp tasks
Here's a list of possible Gulp task to run:
* `webpack`
  * runs webpack which will transpile, compile, and bundle all assets and modules into `client/bundle.js`
* `serve`
  * starts a dev server with `browser-sync` serving the client folder
* `watch`
  * listens for file changes and rebuilds with webpack then refreshes the browser
* `default`
	* runs `webpack`, `serve`, and `watch` in that order.
* `component`
  * builds out boilerplate for a new angular component, [read below](#generating-components) to see how to use this in more detail
  
### Testing
To run test, just run `npm test` or `karma start`.

`Karma` combined with webpack will run all files that match `.spec.js` inside the `app` folder. This is awesome because we can write tests for our components in the same folder with the rest of the component. `spec.bundle.js` is the bundle file for all our spec files that karma will run.

Be sure to include your `spec` files in the appropriate component directory. You must name the spec file like so, `[name].spec.js`. If you don't want to use the `.spec.js` extentsion, you must change the `regex` in `spec.bundle.js` to look for whatever file(s) you want.
`Mocha` is the testing suite being used and `chai` is the assertion library. If you would like to change this, change it in `karma.conf.js`.


## Generating components
Following a good practice allows us to guarantee certain things. We can take advantage of these guarantees and use a task to automate things. Because the components we make will almost always have the same structure, we can generate this boilerplate for you. Boilerplate includes:
* Component folder
* Component entry file which will `import` all of its dependencies
* Component component file, or directive file will will also `import` its dependencies
* Component template
* Component controller
* Component styl, a stylus file for the component. can replace with css, less, or sass
* Component spec with passing tests already written

You can create all this by hand, but it gets old fast!
To generate a component, we must use the `gulp component --name componentName` task.

The `--name` flag is the name of the component you want to create. Be sure to be unique, or it will override an existing component.


The component will be created by default on the root of `client/app/components`.

We can change this by passing in the `--parent` flag. 

You can pass in a path relative to `client/app/components/` and your component will be made there.

So running `gulp component --name signup --parent auth` will create a `signup` component at `client/app/components/auth/signup`.

Running `gulp component --name footer --parent ../common` will create a `footer` component at `client/app/common/footer`. 

Because `--name` is used to create folder name too, use camel or snakeCase and stay consistent.

