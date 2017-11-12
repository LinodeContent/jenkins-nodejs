pipeline {
  agent any
  stages {
    stage('BUILD') {
      parallel {
        stage('Express Server') {
          steps {
            sh 'docker build -f express-server/Dockerfile                 -t damasosanoja/express-server:latest .'
          }
        }
        stage('Test Server') {
          steps {
            sh 'docker build -f test-server/Dockerfile                 -t damasosanoja/test-server:latest .'
          }
        }
      }
      post {
        always {
          echo 'If you see this ALWAYS works.'
          
        }
        
        success {
          echo 'Post success conditional'
          
        }
        
        unstable {
          echo 'I am unstable :/ -this means I work.'
          
        }
        
        failure {
          echo 'I failed :( - so this means I FAIL'
          
        }
        
        changed {
          echo 'Things were different before...'
          
        }
        
      }
    }
    stage('TEST') {
      parallel {
        stage('Mocha Test') {
          steps {
            sh 'docker run --name express-server --network="bridge" -d                 -p 9000:9000 damasosanoja/express-server:latest'
            sh 'docker run --name test-server -v $PWD:/JUnit --network="bridge"                 --link=express-server -d -p 9001:9000                 damasosanoja/test-server:latest'
          }
        }
        stage('Test 2') {
          steps {
            echo 'Second Test'
          }
        }
      }
      post {
        always {
          echo 'Test stage ALWAYS message.'
          
        }
        
        success {
          echo 'Test stage SUCCESS message'
          
        }
        
        unstable {
          echo 'Test stage UNSTABLE message'
          
        }
        
        failure {
          echo 'I failed :( - so this means I FAIL'
          
        }
        
        changed {
          echo 'Things were different before...'
          
        }
        
      }
    }
    stage('Clean-up Containers and Images') {
      steps {
        sh 'docker stop express-server test-server'
        sh 'docker system prune -f'
      }
    }
    stage('Reports') {
      steps {
        junit 'reports.xml'
        archiveArtifacts(artifacts: 'reports.xml', allowEmptyArchive: true)
      }
      post {
        always {
          echo 'If you see this ALWAYS works.'
          echo "${env.BUILD_NUMBER}"
          deleteDir()
          
        }
        
        success {
          echo 'Post success conditional'
          
        }
        
        unstable {
          echo 'I am unstable :/ -this means I work.'
          
        }
        
        failure {
          echo 'I failed :( - so this means I FAIL'
          
        }
        
        changed {
          echo 'Things were different before...'
          
        }
        
      }
    }
    stage('DEPLOY') {
      environment {
        DOCKER = credentials('docker-hub')
      }
      steps {
        echo 'This is deploy stage'
        sh 'docker login --username $DOCKER_USR --password $DOCKER_PSW'
      }
    }
    stage('Promote') {
      steps {
        timeout(time: 5, unit: 'MINUTES') {
          input(message: 'Ready for Promotion', id: 'promotion', submitter: 'IT Departament')
        }
        
      }
    }
  }
}