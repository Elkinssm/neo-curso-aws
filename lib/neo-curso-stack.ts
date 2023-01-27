import * as cdk from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { join } from "path";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class NeoCursoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1) Creamos la lambda function
    // 2) Enlazamos nuestra lambda a un construct

    const myLambda = new Function(this, "my-lambda-user", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(join(__dirname, "../lambdas")),
      handler: "hello.world",
    });

    //Creamos el gateway
    const api = new RestApi(this, "usergateway", {
      description: "apigateway for users",
    });

    //http:servidor/prjoect/user
    const pathURL = api.root.addResource("user");
    pathURL.addMethod("GET", new LambdaIntegration(myLambda));
    pathURL.addMethod("POST", new LambdaIntegration(myLambda));
    // pathURL.addMethod("PUT");
    // pathURL.addMethod("DELETE");
  }
}
