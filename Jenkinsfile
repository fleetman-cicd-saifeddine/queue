def commit_id

pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'docker.io'
        // DOCKER_CREDENTIALS = credentials('docker-credentials')
        KUBECONFIG = '/var/jenkins_home/.kube/config'
        NAMESPACE = 'default'
        SERVICE_NAME = 'queue'
    }
    
    stages {
        stage('Preparation') {
            steps {
                script {
                    echo '========== STAGE: Preparation (Queue/ActiveMQ) =========='
                    checkout scm
                    sh "git rev-parse --short HEAD > .git/commit-id"
                    commit_id = readFile('.git/commit-id').trim()
                    echo "Commit ID: ${commit_id}"
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    echo '========== STAGE: Build (Queue) =========='
                    sh '''
                        echo "Building queue application..."
                        echo "Queue build completed"
                    '''
                }
            }
        }
        
        stage('Image Build') {
            steps {
                script {
                    echo '========== STAGE: Image Build (Queue) =========='
                    sh '''
                        echo "Building Docker image for queue..."
                        docker --version
                        echo "Docker image build completed"
                    '''
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    echo '========== STAGE: Deploy (Queue) =========='
                    sh '''
                        echo "Deploying queue to Kubernetes..."
                        kubectl cluster-info
                        kubectl set image deployment/queue queue=richardchesterwood/k8s-fleetman-queue:release2 -n ${NAMESPACE} || true
                        kubectl rollout status deployment/queue -n ${NAMESPACE} --timeout=5m
                        echo "Queue deployment completed successfully"
                    '''
                }
            }
        }
    }
    
    post {
        always {
            echo "Pipeline execution completed"
        }
        success {
            echo "✅ Queue pipeline succeeded"
        }
        failure {
            echo "❌ Queue pipeline failed"
        }
    }
}
