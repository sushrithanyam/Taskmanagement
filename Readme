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

Purpose:

Shows successful deployment.

---

## 2. GitHub Repository

Screenshot:

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

Jenkins Console Output showing:

```
Finished: SUCCESS
Deployment Successful
```

Purpose:

Shows complete automation.

---

## 4. Maven Build

Screenshot:

Jenkins console:

```
[INFO] BUILD SUCCESS
```

Purpose:

Shows application compilation and packaging.

---

## 5. SonarQube Quality Gate

Screenshot:

SonarQube project page showing:

```
Quality Gate: Passed
```

Purpose:

Shows code quality validation.

---

## 6. Docker Build

Screenshot:

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

Azure Portal:

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
