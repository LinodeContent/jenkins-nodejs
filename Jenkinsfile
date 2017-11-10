pipeline {
  agent any


  stages {
    stage('Express Server Build') {
        steps { sh 'docker build -f express-server/Dockerfile -t damasosanoja/express-server:latest .' }
    }
    stage('Test Server Build') {
        steps {
            sh 'docker build -f test-server/Dockerfile -t damasosanoja/test-server:latest .'
        }
    }
    stage('Test webapp') {
            steps {
            sh 'docker run --name express-server --network="bridge" -d -p 9000:9000 damasosanoja/express-server:latest'
            sh 'docker run --name test-server -v $PWD:/JUnit --network="bridge" --link=express-server -d -p 9001:9000 damasosanoja/test-server:latest'
            }
    }
    stage('Clean-up Containers and Images') {
            steps {
            sh 'docker stop express-server test-server'
            sh 'docker system prune -f'
            }
    }
  }
  }
  environment {
    npm_config_cache = 'npm-cache'
    HOME = '.'
    }
