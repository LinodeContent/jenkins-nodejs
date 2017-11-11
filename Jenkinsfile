pipeline {
  agent any
  stages {
    stage('Build Servers') {
// Build both Servers in Parallel
      parallel {
        stage('Express Server') {
          steps {
            sh 'docker build -f express-server/Dockerfile -t damasosanoja/express-server:latest .'
          }
        }
        stage('Test Server') {
          steps {
            sh 'docker build -f test-server/Dockerfile -t damasosanoja/test-server:latest .'
          }
        }
      } // End of Parallel block
    } // This is the end of Build Servers stage

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
