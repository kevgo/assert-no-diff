build: clean    # builds for the current platform
	@node_modules/.bin/tsc -p .

clean:   # removes all build artifacts
	@rm -rf dist

coverage: build  # measures test coverage
	@node_modules/.bin/nyc node_modules/.bin/mocha --require source-map-support/register test/*-test.ts
	@node_modules/.bin/nyc report --reporter=text-lcov | node_modules/.bin/coveralls

docs:   # runs the documentation tests
	# node_modules/.bin/text-run --offline --format dot

fix:
	tslint --project tsconfig.json --fix
	prettier --write src/*.ts
	prettier --write *.md

help:   # prints all make targets
	@cat Makefile | grep '^[^ ]*:' | grep -v '.PHONY' | grep -v help | sed 's/:.*#/#/' | column -s "#" -t

lint:   # lints all files
	node_modules/.bin/tsc --noEmit
	node_modules/.bin/tslint --project .
	node_modules/.bin/prettier -c "src/*.ts"
	node_modules/.bin/prettier -c "*.md"

setup:   # sets up the installation on this machine
	yarn install

test: lint unit docs   # runs all tests
.PHONY: test

unit:   # runs the tests
	@node_modules/.bin/mocha test/*-test.ts

update:   # updates the dependencies to their latest versions
	yarn upgrade --latest
