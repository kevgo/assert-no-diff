build: clean    # builds for the current platform
	${CURDIR}/node_modules/.bin/tsc -p .

clean:   # removes all build artifacts
	rm -rf dist

coverage: # measures test coverage
	${CURDIR}/node_modules/.bin/nyc node_modules/.bin/mocha --require source-map-support/register test/*.test.ts
	${CURDIR}/node_modules/.bin/nyc report --reporter=text-lcov | node_modules/.bin/coveralls

docs:   # runs the documentation tests
	# node_modules/.bin/text-run --offline --format dot

fix:
	${CURDIR}/node_modules/.bin/prettier --write . &
	${CURDIR}/node_modules/.bin/eslint . --ext .ts --fix

help:   # prints all make targets
	cat Makefile | grep '^[^ ]*:' | grep -v '.PHONY' | grep -v help | sed 's/:.*#/#/' | column -s "#" -t

lint:   # lints all files
	${CURDIR}/node_modules/.bin/eslint --ext .ts . &
	${CURDIR}/node_modules/.bin/prettier --list-different . &
	${CURDIR}/node_modules/.bin/tsc --noEmit

setup:   # sets up the installation on this machine
	yarn install

test:  # runs all tests
	make --no-print-directory unit &
	make --no-print-directory docs &
	make --no-print-directory lint
.PHONY: test

unit:   # runs the tests
	${CURDIR}/node_modules/.bin/mocha test/*.test.ts

update:   # updates the dependencies to their latest versions
	yarn upgrade --latest

.SILENT:
