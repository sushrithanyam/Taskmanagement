# Task Management Application - Complete DevOps CI/CD Project

## Project Overview

This project demonstrates an end-to-end DevOps implementation for deploying a Spring Boot Task Management application using cloud-native technologies.

The complete workflow includes:

* Source code management
* Automated CI/CD pipeline
* Maven build automation
* SonarQube code quality analysis
* Docker containerization
* Trivy security scanning
* Azure Container Registry image storage
* Azure Kubernetes Service deployment
* Automated rollback strategy
* Prometheus monitoring
* Grafana visualization

---

# Architecture

```
Developer
    |
    ↓
GitHub Repository
    |
    ↓
Jenkins CI/CD Pipeline
    |
    |---- Maven Build & Test
    |
    |---- SonarQube Analysis
    |
    |---- Quality Gate Validation
    |
    |---- Docker Image Build
    |
    |---- Trivy Security Scan
    |
    |---- Push Image
    ↓
Azure Container Registry (ACR)
    |
    ↓
Azure Kubernetes Service (AKS)
    |
    |---- Backend Deployment
    |
    |---- Frontend Deployment
    |
    ↓
Prometheus Monitoring
    |
    ↓
Grafana Dashboard
```

---

# Technology Stack

## Application

* Java Spring Boot
* Maven
* REST API
* Spring Boot Actuator

## DevOps Tools

* Jenkins
* SonarQube
* Docker
* Trivy

## Cloud

* Microsoft Azure
* Azure Container Registry
* Azure Kubernetes Service

## Kubernetes

* Deployment
* Services
* LoadBalancer
* ServiceMonitor

## Monitoring

* Prometheus
* Grafana

---

# CI/CD Pipeline Flow

```
Code Commit
     |
     ↓
Jenkins Trigger
     |
     ↓
Maven Build
     |
     ↓
SonarQube Code Analysis
     |
     ↓
Quality Gate Check
     |
     ↓
Docker Image Build
     |
     ↓
Trivy Vulnerability Scan
     |
     ↓
Push Image to ACR
     |
     ↓
Deploy to AKS
     |
     ↓
Monitor Application
```

---

# Pipeline Stages Explanation

## 1. Maven Build

Maven is used to compile the Spring Boot application, run tests, and package the application.

Command:

```bash
mvn clean package
```

Generated artifact:

```
target/task-management-*.jar
```

Successful build output:

```
[INFO] BUILD SUCCESS
```

---

## 2. SonarQube Code Quality Analysis

SonarQube performs static code analysis.

It checks:

* Bugs
* Vulnerabilities
* Code smells
* Maintainability
* Reliability

Pipeline continues only when Quality Gate passes.

Example:

```
Quality Gate: OK
```

---

## 3. Docker Image Build

The Spring Boot application is packaged into a Docker image.

Example:

```bash
docker build -t task-app:v1 .
```

The image contains:

* Java runtime
* Application JAR
* Application dependencies

---

## 4. Trivy Security Scan

Trivy scans the Docker image for known vulnerabilities.

Example:

```bash
trivy image task-app:v1
```

It checks:

* OS vulnerabilities
* Package vulnerabilities
* Security issues

Example result:

```
Total vulnerabilities: 0
```

---

## 5. Push Image to Azure Container Registry

Docker image is stored in Azure Container Registry.

Commands:

```bash
az acr login --name <acr-name>

docker push <acr-name>.azurecr.io/task-app:v1
```

---

# Kubernetes Deployment

The application is deployed on Azure Kubernetes Service.

## Check Pods

```bash
kubectl get pods
```

Example:

```
task-app-xxxxx    Running
task-ui-xxxxx     Running
```

---

## Check Services

```bash
kubectl get svc
```

Services:

* Backend API Service
* Frontend UI Service

Both are exposed using Kubernetes LoadBalancer.

---

# Rollback Strategy

The Jenkins pipeline includes automatic rollback.

If deployment fails:

```
Deployment Failure
        |
        ↓
Jenkins detects failure
        |
        ↓
kubectl rollout undo
        |
        ↓
Previous stable version restored
```

Rollback command:

```bash
kubectl rollout undo deployment/task-app -n default
```

This helps maintain application availability by returning to the previous working version.

---

# Monitoring Setup

## Prometheus

Prometheus collects application metrics from Spring Boot Actuator.

Metrics endpoint:

```
/actuator/prometheus
```

Collected metrics include:

* JVM memory
* CPU usage
* HTTP requests
* Application startup time
* Thread information

---

## ServiceMonitor

A Kubernetes ServiceMonitor connects Prometheus with the application.

Example:

```yaml
endpoints:
- path: /actuator/prometheus
  interval: 15s
```

---

## Grafana Dashboard

Grafana visualizes application metrics.

Dashboard examples:

* JVM Memory Usage
* HTTP Requests
* Response Time
* CPU Usage
* Application Health

---

# Useful Commands

## Kubernetes

```bash
kubectl get pods

kubectl get svc

kubectl get deployments
```

---

## Prometheus

```bash
kubectl port-forward -n monitoring svc/monitoring-kube-prometheus-prometheus 9090:9090
```

Access:

```
http://localhost:9090
```

---

## Grafana

```bash
kubectl port-forward -n monitoring svc/monitoring-grafana 3000:80
```

Access:

```
http://localhost:3000
```

---

# Screenshots Documentation

## 1. Application Running

Screenshot:

* Frontend application homepage
* Task management functionality
<img width="975" height="431" alt="image" src="https://github.com/user-attachments/assets/459fbab7-173d-4d02-832c-dd852997cea2" />


Purpose:

Shows successful deployment.

---

## 2. GitHub Repository

Screenshot:
<img width="975" height="496" alt="image" src="https://github.com/user-attachments/assets/27d92fb2-4e19-436c-a757-d794e7f6b21a" />

Show:

* Source code
* Dockerfile
* Kubernetes YAML files
* Jenkinsfile

Purpose:

Shows project structure.

---

## 3. Jenkins Pipeline Success

Screenshot:
<img width="975" height="491" alt="image" src="https://github.com/user-attachments/assets/5ccc7dbd-2d29-4927-afdb-c97a91917cd0" />

Jenkins Console Output showing:
<img width="975" height="482" alt="image" src="https://github.com/user-attachments/assets/04f66d65-c03f-4831-9f27-bf580c336f1e" />

```
Finished: SUCCESS
Deployment Successful
```

Purpose:

Shows complete automation.

---

## 4. Maven Build

Screenshot:
<img width="975" height="485" alt="image" src="https://github.com/user-attachments/assets/e3f9714f-8508-41eb-9814-9ef4ec434c5c" />
<img width="975" height="494" alt="image" src="https://github.com/user-attachments/assets/b4c64049-4989-4852-86d5-3d61b6b14ca4" />

Jenkins console:

```
[INFO] BUILD SUCCESS
```

Purpose:

Shows application compilation and packaging.

---

## 5. SonarQube Quality Gate

Screenshot:
<img width="975" height="492" alt="image" src="https://github.com/user-attachments/assets/66e75fcb-5bab-450b-aea9-5af96434bbe8" />
<img width="975" height="488" alt="image" src="https://github.com/user-attachments/assets/da14ad16-d52f-4e2c-9330-679a5f0d8895" />

SonarQube project page showing:

```
Quality Gate: Passed
```
<img width="975" height="489" alt="image" src="https://github.com/user-attachments/assets/81f66168-9a6b-4eca-85d2-ec3544b22816" />
<img width="975" height="489" alt="image" src="https://github.com/user-attachments/assets/3d475d01-b88f-41ae-b8fd-7c5b0c9d0f46" />

Purpose:

Shows code quality validation.

---

## 6. Docker Build

Screenshot:
<img width="975" height="492" alt="image" src="https://github.com/user-attachments/assets/e65a0ec8-c661-475d-9dda-761c2627061f" />
<img width="975" height="479" alt="image" src="https://github.com/user-attachments/assets/1013b89e-e9b9-4348-9434-e3adb86e1762" />

Jenkins console:

```
docker build successful
Successfully tagged task-app:v1
```

Purpose:

Shows container creation.

---

## 7. Azure Container Registry

Screenshot:
<img width="975" height="483" alt="image" src="https://github.com/user-attachments/assets/a3daeec6-c5b4-4809-b6a2-a6018e1b79de" />

Azure Portal:
<img width="975" height="487" alt="image" src="https://github.com/user-attachments/assets/24ad6dc1-f3ac-4a9c-86f7-6c90ab4a7821" />
<img width="975" height="518" alt="image" src="https://github.com/user-attachments/assets/3dbb4311-4a85-497a-9efe-fca0def802f2" />

```
Container Registry
    |
    task-app
    |
    v1.xx
```

Purpose:

Shows image storage.

---

## 8. Trivy Security Scan

Screenshot:
<img width="975" height="486" alt="image" src="https://github.com/user-attachments/assets/8c923c07-b160-4851-8632-6ef9115e8093" />

Jenkins console:

```
trivy image task-app:v1

Total vulnerabilities
```

Purpose:

Shows container security scanning.

---

## 9. Kubernetes Deployment

Screenshot:
<img width="975" height="487" alt="image" src="https://github.com/user-attachments/assets/59dc152d-54cb-4bf7-a3d5-a4499a965533" />
<img width="938" height="220" alt="image" src="https://github.com/user-attachments/assets/7a3a2404-d3d2-4f18-b1b3-db9c9ac0ebb8" />

Command:

```bash
kubectl get pods
```

Showing:

```
Running
Ready 1/1
```

Purpose:

Shows application running in AKS.

---

## 10. Kubernetes Services

Screenshot:
<img width="975" height="489" alt="image" src="https://github.com/user-attachments/assets/ee841288-3746-46f1-b54b-b433ec0fc341" />
<img width="975" height="241" alt="image" src="https://github.com/user-attachments/assets/9c393127-9c65-47d1-a310-f70893b642d0" />

Command:

```bash
kubectl get svc
```

Showing:

```
task-service
task-ui-service
EXTERNAL-IP
```

Purpose:

Shows application access.

---

## 11. Rollback Proof

Screenshot:
<img width="975" height="221" alt="image" src="https://github.com/user-attachments/assets/5459c13d-29b2-4444-b11f-0edb0bd40565" />

Jenkins failed build console:

```
Build Failed → Rolling Back

kubectl rollout undo deployment/task-app

deployment.apps/task-app rolled back
```

Purpose:

Shows recovery mechanism.

---

## 12. Prometheus Target

Screenshot:
<img width="975" height="516" alt="image" src="https://github.com/user-attachments/assets/3484308f-7fbd-44b0-b842-eb8ef1099aba" />


Prometheus:

```
Status
 → Targets

task-service
State: UP
```

Purpose:

Shows monitoring connection.

---

## 13. Grafana Dashboard

Screenshot:
<img width="975" height="491" alt="image" src="https://github.com/user-attachments/assets/4f437e34-6b0a-44ba-a167-436312162fe9" />

Grafana dashboard showing:

* JVM metrics
* Request metrics
* CPU usage

Purpose:

Shows application monitoring.

---

# Final Project Result

This project successfully implements:

✅ Automated CI/CD Pipeline
✅ Maven Build Automation
✅ SonarQube Quality Analysis
✅ Docker Containerization
✅ Trivy Security Scanning
✅ Azure Container Registry Integration
✅ AKS Deployment
✅ Kubernetes Service Exposure
✅ Automatic Rollback
✅ Prometheus Monitoring
✅ Grafana Visualization

---

# Future Improvements

* Kubernetes Ingress
* HTTPS/TLS certificates
* AlertManager notifications
* Automated Git webhook deployment
* Advanced security scanning
