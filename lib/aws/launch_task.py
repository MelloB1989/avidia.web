import boto3
import json

def lambda_handler(event, context):
    # Check if 'task_definition' exists in the request
    body = json.loads(event["body"])
    if 'task_definition' not in body:
        return {
            'statusCode': 400,
            'body': 'Missing task_definition in the request'
        }

    task_definition = body['task_definition']

    # Replace 'your_cluster_name' and 'your_subnet_id' with the actual values
    cluster_name = 'Respawn'
    subnet_id = 'subnet-0f27b805f581005c0'

    ecs = boto3.client('ecs',
    aws_access_key_id='',
    aws_secret_access_key='',
    region_name='ap-south-2')

    try:
        # Run the ECS task
        response = ecs.run_task(
            cluster=cluster_name,
            taskDefinition=task_definition,
            launchType='FARGATE',
            networkConfiguration={
                'awsvpcConfiguration': {
                    'subnets': [subnet_id],
                    'assignPublicIp': 'ENABLED'
                }
            }
        )

        # Get the task ARN from the response
        task_arn = response['tasks'][0]['taskArn']

        return {
            'statusCode': 200,
            'body': f'{task_arn}'
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Error starting the task: {str(e)}'
        }
