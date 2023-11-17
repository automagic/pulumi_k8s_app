import * as pulumi from "@pulumi/pulumi";

import * as k8s from "@pulumi/kubernetes";

let providerConfig: k8s.ProviderArgs = {};

const config = new pulumi.Config();

if (config.get("renderToDirectory")) {
  providerConfig = {
    renderYamlToDirectory: config.get("renderToDirectory"),
    ...providerConfig,
  };
}

const k8sProvider = new k8s.Provider("yaml-provider", providerConfig);

const pod = new k8s.core.v1.Pod("my-pod", {
    spec: {
        containers: [{
            name: "nginx",
            image: "nginx:1.14-alpine",
        }],
    },
}, {provider: k8sProvider});  