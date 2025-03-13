import { Migration } from '@oneaudi/falcon-tools/cfm-migrations';
import { resolve } from 'path';

// either use editor.json as a starting point; useful if app needs to continue working in NEMO ...
// const migration = Migration.load(
//     resolve(__dirname, '../../src/editor.json') // Note: __dirname is dist/models on execution
// );

// ... or start from scratch
const migration = Migration.init('fa-all-promotions');

// edit fields of the CFMs using the methods on the migration

// ...and write the complete model definition to file
// Note: only /dist/app is uploaded to AWS when releasing the Feature App, so the model definition MUST be inside /dist/app
migration.save(resolve(__dirname, '../app/models/root.json'));
