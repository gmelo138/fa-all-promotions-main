# Feature Hub Demo Integrator

This demo integrator is used for development testing a Feature Hub implementation. It uses a simple example of [Integrator setup](./Integrator.tsx) and allows developers to enrich it with extra services.

## index.tsx

The entry point that initializes Module Federation.

## bootstrap.tsx

This file uses React DOM render to render the Feature Hub implementation to the document. The document reuses the existing [index.html](../index.html) file.

## Integrator.tsx

Feature Hub [Integrator](https://feature-hub.io/docs/guides/integrating-the-feature-hub) definition file. You can use this file to add services and other dependencies.

## services/

Some Feature App require Feature Hub Services to be defined in the Integrator. You can define any required mock services here. Remember that this is the demo so services don't have to be fully implemented.
