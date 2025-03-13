import { FeatureAppStage } from '@oneaudi/oneaudi-os-infrastructure';
import * as env from 'env-var';
import * as fs from 'fs';

const awsAccountIdPattern = /^\d{12}$/;
const asAwsAccountId: env.ExtensionFn<string> = (value: string) => {
  const input = env.accessors.asString(value);
  if (!awsAccountIdPattern.test(input)) {
    throw new Error('must be exactly 12 numerical characters.');
  }
  return input;
};

const asPath: env.ExtensionFn<string> = (value: string) => {
  const input = env.accessors.asString(value);
  if (!fs.existsSync(input)) {
    throw new Error('must be a valid path.');
  }
  return input;
};

const stages = Object.values(FeatureAppStage).map(String);
const asFeatureAppStage: env.ExtensionFn<FeatureAppStage> = (value: string) => {
  const input = env.accessors.asEnum(value, stages);
  return input as FeatureAppStage;
};

const envVars = env.from(process.env, { asFeatureAppStage, asAwsAccountId, asPath });

export const stage = envVars.get('STAGE').required().asFeatureAppStage();
export const appName = envVars.get('APP_NAME').required().asString();
export const awsDomain = envVars.get('AWS_DOMAIN').required().asString();
export const appVersion = envVars.get('APP_VERSION').asString();
export const awsAccountId = envVars.get('AWS_ACCOUNT_ID').required().asAwsAccountId();
export const apiBaseDirectory = envVars.get('API_BASE_DIRECTORY').asPath();
export const appBaseDirectory = envVars.get('APP_BASE_DIRECTORY').asPath();

export default {
  stage,
  appName,
  appVersion,
  awsAccountId,
  apiBaseDirectory,
  appBaseDirectory,
  awsDomain,
};
