pipeline {
  agent any
  stages {
    stage('BUILD') {
// Build both Servers in Parallel
      parallel {
        stage('Express Server') {
          steps {
            sh 'docker build -f express-server/Dockerfile \
                -t damasosanoja/express-server:latest .'
          }
        }
        stage('Test Server') {
          steps {
            sh 'docker build -f test-server/Dockerfile \
                -t damasosanoja/test-server:latest .'
          }
        }
      } // End of Parallel block
      post {
        always {
            echo 'One way or another, I have finished'
            deleteDir() /* clean up our workspace */
        }
        success {
            echo 'I succeeeded!'
        }
        unstable {
            echo 'I am unstable :/'
        }
        failure {
            echo 'I failed :('
        }
        changed {
            echo 'Things were different before...'
        }
    }

    } // This is the end of BUILD stage

    stage('TEST') {
// Doing tests in parallel
      parallel {
        stage('Mocha Test') {
          steps {
            sh 'docker run --name express-server --network="bridge" -d \
                -p 9000:9000 damasosanoja/express-server:latest'
            sh 'docker run --name test-server -v $PWD:/JUnit --network="bridge" \
                --link=express-server -d -p 9001:9000 \
                damasosanoja/test-server:latest'
          }
        }
        stage('Test 2') {
          steps {
            echo 'Second Test'
          }
        }
      } // End of Parallel block
    } // This is the end of TEST stage

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
