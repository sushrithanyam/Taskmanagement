pipeline {
    agent any

    environment {
        ACR_NAME = "taskmanagemntacr"
        ACR_LOGIN = "taskmanagemntacr.azurecr.io"
        IMAGE_NAME = "task-app"
        TAG = "v1.${BUILD_NUMBER}"
        AKS_NAMESPACE = "default"
    }

    tools {
        maven "maven3"
    }

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/sushrithanyam/Taskmanagement.git'
            }
        }

        stage('Build + Test') {
            steps {
                sh 'mvn clean package -DskipTests=false'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'mvn clean verify sonar:sonar -DskipTests'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                docker build -t ${IMAGE_NAME}:${TAG} .
                docker tag ${IMAGE_NAME}:${TAG} ${ACR_LOGIN}/${IMAGE_NAME}:${TAG}
                """
            }
        }

        stage('Login ACR & Push Image') {
            steps {
                sh """
                az acr login --name ${ACR_NAME}
                docker push ${ACR_LOGIN}/${IMAGE_NAME}:${TAG}
                """
            }
        }

        stage('Trivy Scan') {
            steps {
                sh """
                trivy image ${ACR_LOGIN}/${IMAGE_NAME}:${TAG}
                """
            }
        }

        stage('Deploy to AKS') {
            steps {
                sh """
                kubectl apply -f k8s/
                kubectl set image deployment/task-app task-app=${ACR_LOGIN}/${IMAGE_NAME}:${TAG} -n ${AKS_NAMESPACE}
                kubectl rollout status deployment/task-app -n ${AKS_NAMESPACE}
                """
            }
        }
    }

    post {

        success {
            echo "Deployment Successful 🚀"
        }

        failure {
            echo "Build Failed → Rolling Back"

            sh """
            kubectl rollout undo deployment/task-app -n ${AKS_NAMESPACE}
            """
        }
    }
}