import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";

let providerConfig: k8s.ProviderArgs = {
    renderYamlToDirectory: 'yaml'
};

const k8sProvider = new k8s.Provider("yaml-provider", providerConfig);

const pod = new k8s.core.v1.Pod("nginx-pod", {
    metadata: {
      name: 'my-nginx-pod',
    },
    spec: {
        containers: [{
            name: "nginx",
            image: "nginx:1.16-alpine",
        }],
    },
}, {provider: k8sProvider});  