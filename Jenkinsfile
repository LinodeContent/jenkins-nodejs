pipeline {
  agent any
  stages {
// Building your Test Images
    stage('BUILD') {
// Parallel block
      parallel {
        stage('Express Image') {
          steps {
            sh 'docker build -f express-server/Dockerfile \
            -t damasosanoja/express-server:latest .'
          }
        }
        stage('Test-Unit Image') {
          steps {
            sh 'docker build -f test-server/Dockerfile \
            -t damasosanoja/test-server:latest .'
          }
        }
      }
// This action only triggers if the build FAILS
      post {
        failure {
          echo 'Sorry, I failed you.'
          mail(from: "jenkins-bot@example.com",
           to: "devops@example.com",
           subject: "This build failed! ${env.BUILD_TAG}",
           body: "Check the failure ${env.BUILD_URL}")
           sh 'docker stop express-server test-server'
           sh 'docker system prune -f'
        }
      }
    }
// Performing Software Tests
    stage('TEST') {
// Doing tests in parallel
      parallel {
        stage('Mocha Tests') {
          steps {
            sh 'docker run --name express-server --network="bridge" -d \
            -p 9000:9000 damasosanoja/express-server:latest'
            sh 'docker run --name test-server -v $PWD:/JUnit --network="bridge" \
            --link=express-server -d -p 9001:9000 \
            damasosanoja/test-server:latest'
          }
        }
        stage('Quality Tests') {
          steps {
            echo 'Here will be a docker push'
          }
        }
      }
      post {
        success {
            mail(from: "jenkins-bot@example.com",
             to: "QA-testing@example.com",
             subject: "New test image available ${env.BUILD_TAG}",
             body: "Please review")
        }
        unstable {
            mail(from: "jenkins-bot@example.com",
             to: "QA-testing@example.com",
             subject: "Unstable Test Results ${env.BUILD_TAG}",
             body: "The ${env.JOB_NAME} Project had an unstable test result \
              ${env.BUILD_URL} Branch: ${env.GIT_BRANCH} Commit: ${env.GIT_COMMIT}")
        }
        failure {
            mail(from: "jenkins-bot@example.com",
             to: "devops@example.com",
             subject: "Test Stage failed! ${env.BUILD_TAG}",
             body: "Check the failure ${env.BUILD_URL}")
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
      when {
       branch 'master'  //only run these steps on the master branch
      }
      steps {
        echo 'This is deploy stage'
        sh 'docker login --username $DOCKER_USR --password $DOCKER_PSW'
      }
    }
  }
}
