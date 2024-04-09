install:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

gendiff:
	node bin/gendiff.js

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test
