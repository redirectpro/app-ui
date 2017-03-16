export S3_FILE_PATH=app-ui/`date +"%Y-%m"`
export S3_FILE_NAME=commit-${CIRCLE_SHA1:0:7}.zip
export S3_BUCKET=redirectpro-eb
export EB_ENVIRONMENT=app-ui-development
export EB_VERSION=commit-${CIRCLE_SHA1:0:7}
export EB_APPLICATION=redirectpro-app-ui
#
# Setting commit revision
sed -ie 's/LOCAL/'${CIRCLE_SHA1:0:7}'/g' package.json
#
# Converting to ES5
# npm run prestart
#
# Compressing and uploading file to S3
zip -r -9 --exclude=node_modules/* $S3_FILE_NAME *
aws s3 cp $S3_FILE_NAME s3://$S3_BUCKET/$S3_FILE_PATH/
#
# Creating EB Version
aws elasticbeanstalk create-application-version \
   --application-name $EB_APPLICATION \
	--version-label $EB_VERSION \
	--source-bundle S3Bucket="$S3_BUCKET",S3Key="$S3_FILE_PATH/$S3_FILE_NAME"
#
# Deploying EB Version
aws elasticbeanstalk update-environment \
	--environment-name $EB_ENVIRONMENT \
	--version-label $EB_VERSION
    