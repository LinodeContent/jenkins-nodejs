pipeline {
  agent {
    docker {
      image 'node:6-alpine'
      args '-p 9000:9000'
    }

  }
  stages {
    stage('Express Server Build') {
        steps {
            sh 'docker build -f express-server/Dockerfile -t damasosanoja/express-server:latest .'
        }
    }
    stage('Test Server Build') {
        steps {
            sh 'cd /test'
            sh 'docker build -t damasosanoja/test-server:latest .'
        }
    stage('Test webapp') {
            steps {
            sh 'docker run -d -p 9000:9000 -v `pwd`:/app damasosanoja/express-server:latest node app.js'
            sh 'docker run -d -p 9000:9000 damasosanoja/test-server:latest'
            }
    }
    }
  }
  environment {
    npm_config_cache = 'npm-cache'
    HOME = '.'
    }
}
