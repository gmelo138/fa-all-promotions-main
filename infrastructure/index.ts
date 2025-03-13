import { deployDefaultFeatureAppCoreStack } from '@oneaudi/oneaudi-os-infrastructure';
import environment from './environment';

const {
  stage,
  appName,
  appVersion,
  awsAccountId: accountId,
  apiBaseDirectory,
  appBaseDirectory,
  awsDomain,
} = environment;

/**
 * By calling deployDefaultFeatureAppCoreStack we make use of the oneAudi OS infrastructure package that
 * comes with a AWS CDK implementation for deploying AWS resources.
 *
 * The default stack sets up an appropriate AWS infrastructure with components like S3, CloudFront, Route53,
 * DNS-validated certificates, API Gateway and Lambda functions.
 *
 * Additionally it takes care of deploying your appBaseDirectory (dist folder) to S3 and all functions within
 * the apiBaseDirectory to AWS Lambda.
 */
deployDefaultFeatureAppCoreStack(
  accountId,
  {
    appName,
    stage,
    baseDomain: awsDomain,
    s3Config: appBaseDirectory
      ? {
          sourceDirectory: appBaseDirectory,
          targetDirectory: appVersion,
          secureS3PatternsConfig: {
            pathPatterns: ['*/protected/*'],
            authorizerConfig: {
              useAccountDefaults: true,
            },
          },
        }
      : undefined,
    lambdaConfig: apiBaseDirectory
      ? {
          sourceDirectory: apiBaseDirectory,
          defaultAuthorizerConfig: {
            useAccountDefaults: true,
          },
        }
      : undefined,
  },
  'us-east-1',
);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Example for having a more sophisticated stack by extending the Feature App core stack

// import { FeatureAppCoreStack, FeatureAppStage } from '@oneaudi/oneaudi-os-infrastructure';
// import { App } from 'aws-cdk-lib';
// import { Bucket } from 'aws-cdk-lib/aws-s3';

// class MyFancyStack extends FeatureAppCoreStack {
//   constructor() {
//     super(
//       new App(),
//       {
//         env: {
//           account: accountId,
//           region: 'us-east-1',
//         },
//         enableTerminationProtection: stage === FeatureAppStage.PROD
//       },
//       {
//         appName,
//         stage,
//         s3Config: appBaseDirectory ? {
//           sourceDirectory: appBaseDirectory,
//           targetDirectory: appVersion,
//           secureS3PatternsConfig: {
//             pathPatterns: ['*/protected/*'],
//               authorizerConfig: {
//               useAccountDefaults: true,
//             },
//           },
//         } : undefined,
//         lambdaConfig: apiBaseDirectory ? {
//           sourceDirectory: apiBaseDirectory,
//           defaultAuthorizerConfig: {
//             useAccountDefaults: true,
//           },
//         } : undefined
//       }
//     );

//     new Bucket(this, `Bucket-${appName}-2`, {
//       bucketName: `${appName}-2`,
//     });
//   }
// }

// new MyFancyStack();
