pipeline {
  agent any
  stages {
    stage('Build Servers') {
      parallel {
        stage('Express Server') {
          steps {
            sh 'docker build -f express-server/Dockerfile -t damasosanoja/express-server:latest .'
          }
        }
        stage('Parallel Build') {
          steps {
            echo 'Code here'
          }
        }
      }
    }
    stage('Test Server') {
      steps {
        sh 'docker build -f test-server/Dockerfile -t damasosanoja/test-server:latest .'
      }
    }
    stage('Application Tests') {
      parallel {
        stage('Mocha Test') {
          steps {
            sh 'docker run --name express-server --network="bridge" -d -p 9000:9000 damasosanoja/express-server:latest'
            sh 'docker run --name test-server -v $PWD:/JUnit --network="bridge" --link=express-server -d -p 9001:9000 damasosanoja/test-server:latest'
          }
        }
        stage('Test 2') {
          steps {
            echo 'Second Test'
          }
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
        archiveArtifacts 'reports.xml'
      }
    }
  }
}
