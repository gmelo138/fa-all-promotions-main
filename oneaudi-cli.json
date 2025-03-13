#!/bin/sh

APPPATH=$(pwd)
rimraf ./dist/api

# The flag --no-install is used when some dependencies are linked locally using `npm link`
# and refetching it from package registry is not intended.

# 1. compile .ts to .js files
# 2. replace the source mapping inside the .js.map file
# 3. rename the .js file to have an underscore before 'unprotected'
# This is necessary since serverless is unable to access .js files containing dots before the extension.

echo "Beginning to re-compile changes"
tsc -p src/api/tsconfig.json --outDir dist/api --pretty && \
cd dist/api && \
find . -type f -name "*.unprotected.js" 2>/dev/null | grep -q . && \
for x in *.unprotected.js;do
  sed -e 's/.unprotected.js/_unprotected.js/' "${x}".map > tmpFile && \
  mv tmpFile "${x}".map && \
  mv "$x" "${x%.unprotected.js}"_unprotected.js
done
cd "${APPPATH}" || exit 1
echo "Re-compilation done"
