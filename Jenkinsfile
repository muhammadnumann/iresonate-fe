pipeline {
//  agent {label 'java-jnlp'}
  agent {label 'master'}
  tools {nodejs "node1"}
  parameters {
    gitParameter branchFilter: 'origin/(.*)', defaultValue: 'master', name: 'Branch', type: 'PT_BRANCH'
  }

stages {
    stage('Preparation'){
        steps {
        sh 'rm -rf *'
    } }
    stage('Cloning the Project') {
        steps {
            script {
        try{
            def cause = currentBuild.getBuildCauses('hudson.model.Cause$UserIdCause')
            slackSend (color: '#FFFF00', message: "Cloning the Project stage started - gify STARTED-Branch-${Branch}: Job '${env.JOB_NAME} ${cause.userName} [${env.BUILD_NUMBER}]' " , channel: "jenkins" )
            git branch: "${params.Branch}", credentialsId: '78100a27-6595-4639-85fb-7a9eaabc2f84', url: 'https://gitlab.com/webelight/gify/gify-web.git'
            sh 'hostname'
            echo "flag BRANCH: ${params.Branch}"
            echo "flag SERVER: ${params.Server}"
    }
        catch(Exception e) {
             echo "FAILED ${e}"
             slackSend (color: '#FF0000', message: "Failed at Cloning the Project stage - gify-web: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' @devops-team" , channel: "jenkins" )  
             currentBuild.result = 'FAILURE'
             throw e
            } }

} }


//     stage('Sonarqube Analysis'){
//            steps {
//                script{
//                    sh 'zip -r ../gify.dev.webelight.co.in.zip . -x ../gify.dev.webelight.co.in/node_modules/*'
//                    sh 'zip -r ../iresonate-web.zip . -x ../iresonate-web/node_modules/*'
//                    sh 'npm install --global yarn'
//                   sh 'yarn add typescript'
//                def scannerHome = tool 'sonarqube';
//                withSonarQubeEnv("sonarqube") {
//                sh " ${scannerHome}/bin/sonar-scanner\
//                -Dsonar.projectKey=gify-web\
//                -Dsonar.exclusions=node_modules/**,**/*.java \
//                -Dsonar.ts.coverage.lcovReportPath=coverage/raze/lcov.info \
//                -Dsonar.sources=/home/jenkins/workspace/Gify/gify-web\
//                -Dsonar.host.url=https://sonar.webelight.co.in  \
//                -Dsonar.login=74fe9061c6a85cdccaf7376d1f41998c5430839a "
//                }
//    }
//    }
//  }


    stage("Removing the Old Code") {
        steps {
            script {
        try {
            slackSend (color: '#FFFF00', message: "Removing the Old Code started - gify : Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' " , channel: "jenkins" )
            if ("${params.Server}" == 'live') {
             sh '''  
                cat <<EOF | ssh -o StrictHostKeyChecking=no ubuntu@18.116.229.196 'cat - > /var/www/iresonate-web/before_update.sh'
                #!/bin/bash
                if [ -d "/var/www/iresonate-web" ]; then
                cd /var/www/iresonate-web
                rm -rf *
                echo "Removed"
                else
                echo "Failed to find the path to delete contents inside the folder"
                exit 1
                fi
EOF
ssh -o StrictHostKeyChecking=no ubuntu@18.116.229.196 bash /var/www/iresonate-web/before_update.sh
            '''
        }
        else if("${params.Server}" == 'development') {
            sh '''  
                cat <<EOF | ssh -o StrictHostKeyChecking=no devops@109.169.37.51 'cat - > /var/www/gify.dev.webelight.co.in/before_update.sh'
                #!/bin/bash
                if [ -d "/var/www/gify.dev.webelight.co.in" ]; then
                cd /var/www/gify.dev.webelight.co.in
                rm -rf *
                echo "Removed"
                else
                echo "Failed to find the path to delete contents inside the folder"
                exit 1
                fi
EOF
ssh -o StrictHostKeyChecking=no devops@109.169.37.51 bash /var/www/gify.dev.webelight.co.in/before_update.sh
            ''' 
        }
        }
        catch(Exception e) {
             echo "FAILED ${e}"
             slackSend (color: '#FF0000', message: "Failed at Removing the Old Code stage - gify: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' @devops-team" , channel: "jenkins" )  
             currentBuild.result = 'FAILURE'
             throw e
            } }

} }


    stage("Transferring the code") {
        steps {
            script {
        try{
            slackSend (color: '#FFFF00', message: "Transferring the code stage started - gify : Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' " , channel: "jenkins" )
                echo "flag: ${params.Server}"
                if ("${params.Server}" == 'live') {
                sh 'tar -czf - ./ | ssh ubuntu@ec2-18-116-229-196.us-east-2.compute.amazonaws.com "tar -C /var/www/iresonate-web/ -xzf -"'
                sh ''' ls -l ../
                 curl -uadmin:8g4k2NjMSKuqQbbe -T ../iresonate-web.zip https://artifactory.webelight.co.in/artifactory/gify-web/gify-api-live-$BUILD_NUMBER'''
                }
                else if("${params.Server}" == 'development') {
                    sh 'tar -czf - ./ | ssh -o StrictHostKeyChecking=no devops@109.169.37.51 "tar -C /var/www/gify.dev.webelight.co.in/ -xzf -"'
                    sh '''ls -l ../
                 curl -uadmin:8g4k2NjMSKuqQbbe -T ../gify.dev.webelight.co.in.zip https://artifactory.webelight.co.in/artifactory/gify-web/gify-api-develop-$BUILD_NUMBER '''
                }
        }
        catch(Exception e) {
             echo "FAILED ${e}"
             slackSend (color: '#FF0000', message: "Failed at Transferring the code stage - gify: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' @devops-team" , channel: "jenkins" )  
             currentBuild.result = 'FAILURE'
             throw e
            } }

} }
 
    stage("Restarting Application") {
        steps {
            script {
        try{
            slackSend (color: '#FFFF00', message: "Restarting Application stage started - gify : Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' " , channel: "jenkins" )
                if ("${params.Server}" == 'live') {
                 sh '''
                  cat <<EOF | ssh ubuntu@ec2-18-116-229-196.us-east-2.compute.amazonaws.com 'cat - > /var/www/iresonate-web/after_update.sh'
                    #!/bin/bash
                    cd /var/www/iresonate-web
                    source /home/ubuntu/.nvm/nvm.sh
                    rm -rf .env .env.development
                    mv .env.production .env
                    yarn install
                    yarn next build
                    yarn add typescript
                    pm2 delete iresonate
                    pm2 start ecosystem.prod.config.js --env production
EOF
ssh ubuntu@ec2-18-116-229-196.us-east-2.compute.amazonaws.com bash /var/www/iresonate-web/after_update.sh 
'''
                  echo 'One way or another, I have finished'
                  slackSend (color: '#00FF00', message: "SUCCESSFUL-deployed at www.iresonate.co")

                }
                else if("${params.Server}" == 'development') {
                    sh '''
                  cat <<EOF | ssh devops@109.169.37.51 'cat - > /var/www/gify.dev.webelight.co.in/after_update.sh'
                    #!/bin/bash
                    cd /var/www/gify.dev.webelight.co.in
                    source /home/devops/.nvm/nvm.sh
                    rm -rf .env .env.production
                    mv .env.development .env
                    yarn install
                    yarn next build
                    yarn add typescript
                    pm2 delete gify
                    pm2 start ecosystem.dev.config.js --env development
EOF
ssh devops@109.169.37.51 bash /var/www/gify.dev.webelight.co.in/after_update.sh 
'''
                  echo 'One way or another, I have finished'
                  slackSend (color: '#00FF00', message: "SUCCESSFUL-deployed at gify-dev.webelight.co.in")
                }
    }
        catch(Exception e) {
             echo "FAILED ${e}"
             slackSend (color: '#FF0000', message: "Failed at Restarting Application stage - gify-webi: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' @devops-team" , channel: "jenkins" )  
             currentBuild.result = 'FAILURE'
             throw e
            } }
} }

}
}
