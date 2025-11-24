pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                echo '========== STAGE: Checkout =========='
                checkout scm
            }
        }

        stage('Setup Environment') {
            steps {
                echo '========== STAGE: Setup Environment =========='
                sh '''
                    # Install Node.js and npm if not already installed
                    if ! command -v npm &> /dev/null
                    then
                        echo "npm could not be found, installing Node.js..."
                        apt-get update -y
                        apt-get install -y nodejs npm
                    fi
                    npm install
                '''
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
                    withSonarQubeEnv('SonarQube') {
                        sh """
                            ./node_modules/sonar-scanner/bin/sonar-scanner \
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
