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
                withSonarQubeEnv('SonarQube') {
                    sh '''
                        /opt/sonar-scanner/bin/sonar-scanner \
                            -Dsonar.projectKey=queue \
                            -Dsonar.projectName=Queue \
                            -Dsonar.sources=. \
                            -Dsonar.exclusions=node_modules/**,coverage/**,.git/**,dist/** \
                            -Dsonar.host.url=http://192.168.79.129:9000 \
                            -Dsonar.token=squ_7cea9a5d7a9f559a26f53243d82f37d68e8e78f1
                    '''
                }
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: false
                }
            }
        }
    }
    
    post {
        always {
            echo "Pipeline finished"
        }
    }
}
