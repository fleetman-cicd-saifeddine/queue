pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                sh '''
                    /opt/sonar-scanner/bin/sonar-scanner \
                        -Dsonar.projectKey=queue \
                        -Dsonar.projectName=Queue \
                        -Dsonar.sources=. \
                        -Dsonar.exclusions=node_modules/**,coverage/**,*.test.js \
                        -Dsonar.host.url=http://192.168.79.129:9000 \
                        -Dsonar.login=admin \
                        -Dsonar.password=Saif21221936@ || true
                '''
            }
        }
    }
    
    post {
        always {
            echo "Pipeline finished"
        }
    }
}
