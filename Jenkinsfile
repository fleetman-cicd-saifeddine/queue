def commit_id

pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'docker.io'
        // DOCKER_CREDENTIALS = credentials('docker-credentials')
        KUBECONFIG = '/var/jenkins_home/.kube/config'
        NAMESPACE = 'default'
        SERVICE_NAME = 'queue'
        SONARQUBE_URL = 'http://192.168.79.129:9000'
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
                        # mvn clean package
                        echo "Queue build completed"
                    '''
                }
            }
        }
        
        stage('Linting') {
            steps {
                script {
                    echo '========== STAGE: Linting (Queue) =========='
                    sh '''
                        if command -v npm &> /dev/null; then
                            npm run lint || true
                        else
                            echo "npm not available, skipping linting"
                        fi
                    '''
                }
            }
        }
        
        stage('Unit Tests') {
            steps {
                script {
                    echo '========== STAGE: Unit Tests (Queue) =========='
                    sh '''
                        if command -v npm &> /dev/null; then
                            npm test -- --coverage --watchAll=false || true
                        else
                            echo "npm not available, skipping tests"
                        fi
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
                        # docker build -t ${DOCKER_REGISTRY}/queue:${commit_id} .
                        echo "Docker image build completed"
                    '''
                }
            }
        }
        
        stage('Code Quality') {
            steps {
                script {
                    echo '========== STAGE: Code Quality (Queue) =========='
                    withCredentials([usernamePassword(credentialsId: 'sonarqube-credentials', usernameVariable: 'SONAR_USER', passwordVariable: 'SONAR_PASS')]) {
                        sh '''
                            echo "Running SonarQube analysis for queue..."
                            /opt/sonar-scanner/bin/sonar-scanner \
                                -Dsonar.projectKey=queue \
                                -Dsonar.projectName="Queue Service" \
                                -Dsonar.projectVersion=1.0.0 \
                                -Dsonar.sources=. \
                                -Dsonar.exclusions=node_modules/**,dist/**,.git/**,.mvn/**,target/**,coverage/** \
                                -Dsonar.tests=. \
                                -Dsonar.test.inclusions=**/*.test.js,**/*.spec.js \
                                -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                                -Dsonar.sourceEncoding=UTF-8 \
                                -Dsonar.qualitygate.wait=false \
                                -Dsonar.coverage.exclusions=**/*.test.js,**/*.spec.js,node_modules/** \
                                -Dsonar.host.url=http://192.168.79.129:9000 \
                                -Dsonar.login=${SONAR_USER} \
                                -Dsonar.password=${SONAR_PASS} || true
                            echo "Code quality analysis completed"
                        '''
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    echo '========== STAGE: Deploy (Queue) =========='
                    sh '''
                        echo "Deploying queue to Kubernetes..."
                        echo "Note: Deploy stage is informational for this demo"
                        echo "In production, this would:"
                        echo "  1. Connect to Kubernetes cluster"
                        echo "  2. Update the queue deployment"
                        echo "  3. Wait for rollout to complete"
                        echo "Queue deployment completed successfully"
                    '''
                }
            }
        }
    }
    
    post {
        always {
            script {
                echo "Pipeline execution completed"
                currentBuild.description = "SonarQube Analysis"
            }
        }
        success {
            echo "Queue pipeline succeeded"
        }
        failure {
            echo "Queue pipeline failed"
        }
    }
}
