pipeline {
    agent {
        docker { 
            image 'node:18-alpine' 
            args '-u root'
        }
    }
    
    environment {
        SERVICE_NAME = 'queue'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '========== STAGE: Checkout =========='
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '========== STAGE: Install Dependencies =========='
                sh 'npm install'
            }
        }
        
        stage('Unit Tests & Coverage') {
            steps {
                echo '========== STAGE: Unit Tests & Coverage =========='
                sh 'npm test -- --coverage --watchAll=false'
            }
        }
        
        stage('Code Quality') {
            steps {
                script {
                    echo '========== STAGE: Code Quality (Queue) =========='
                    // The withSonarQubeEnv wrapper will automatically use the SonarQube configuration from Jenkins settings
                    withSonarQubeEnv('SonarQube') {
                        sh """
                            /usr/src/app/node_modules/sonar-scanner/bin/sonar-scanner \
                                -Dsonar.projectKey=queue \
                                -Dsonar.projectName=Queue \
                                -Dsonar.sources=. \
                                -Dsonar.exclusions=node_modules/**,coverage/**,*.test.js \
                                -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
                        """
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo "Pipeline finished."
        }
    }
}
