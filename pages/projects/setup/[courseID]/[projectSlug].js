import { useState, useEffect, useContext } from "react";
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import querygen from '@querygen';
import Layout from '@/components/lms_components/layout/protected';
import axios from 'axios';
import { ChakraProvider } from '@chakra-ui/react';
import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Input,
    Box
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import {UserContext} from '@/components/lms_components/layout/UserContext';
import get_jwt from "@/lib/frontend_functions/get_jwt";
import { Spinner } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'

const m = `# Creating SSH Keys for GitLab

Follow these steps to create an SSH Key pair and add the public key to your GitLab account for secure SSH access.

## Step 1: Check for Existing SSH Keys

First, check if you already have SSH keys on your machine.

'''bash
ls -al ~/.ssh
'''

Look for files named either 'id_rsa.pub' or 'id_ed25519.pub'. If you see such files, you can use these keys instead of creating new ones.

## Step 2: Generate a New SSH Key Pair

If you need to generate a new SSH key pair, use the following command. You can replace '"your_email@example.com"' with your email address.

'''bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
'''

When prompted to "Enter a file in which to save the key," press Enter to use the default location.

## Step 3: Start the SSH Agent in the Background

'''bash
eval "$(ssh-agent -s)"
'''

## Step 4: Add Your SSH Private Key to the SSH Agent

'''bash
ssh-add ~/.ssh/id_rsa
'''

If you generated a different key type (e.g., ECDSA or Ed25519), replace 'id_rsa' with the appropriate key name.

## Step 5: Add Your SSH Public Key to Your GitLab Account

1. Copy your SSH public key to the clipboard. If you're using Git Bash on Windows, you can use 'clip' command:

'''bash
cat ~/.ssh/id_rsa.pub | clip
'''

On macOS:

'''bash
pbcopy < ~/.ssh/id_rsa.pub
'''

On Linux (you might need to install 'xclip' or similar):

'''bash
xclip -sel clip < ~/.ssh/id_rsa.pub
'''

2. Go to GitLab and log in to your account.
3. Click on your avatar in the upper right corner and select **Settings**.
4. Navigate to **SSH Keys** and paste your SSH key into the "Key" field.
5. Add a title, choose an expiry date if you want, and click **Add key**.

## Step 6: Test Your SSH Connection

To test your SSH connection to GitLab:

'''bash
ssh -T git@gitlab.com
'''

You should receive a welcome message from GitLab.

Now, you're all set to use SSH for your GitLab operations without needing to provide your username and password each time you push or pull.`

const steps = [
    { title: 'Create Git account', description: 'Contact Info' },
    { title: 'Create project repository', description: 'Date & Time' },
    { title: 'Create SSH Keys', description: 'Select Rooms' },
];

export default function Setup() {
    const toast = useToast();
    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    });
    const { userData } = useContext(UserContext);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [gitID, setGitID] = useState('');
    const [projects, setprojects] = useState();
    const router = useRouter();
    const { courseID, projectSlug } = router.query;
    const { loading: pl, error, data } = useQuery(querygen("getCourseProjectsBySlug", projectSlug ? projectSlug : ""));

    useEffect(()=>{
        if(data) setprojects(data.getAvidiaProjectDetails);
      }, [data]);

    useEffect(()=>{
        console.log(courseID, projectSlug)
        const g = async () => {
            const d = await axios.post('/api/git/get_acc', {
                token: get_jwt()
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(d.data.data.git_uid){
                setActiveStep(1);
                setGitID(d.data.data.git_uid);
            }
        }
        g();
    }, [router.query])

    const create_git_account = async() => {
        try{
            const { data } = await axios.post('/api/git/create_acc',{
                token: get_jwt(),
                email: userData.email,
                name: userData.first_name + " " + userData.last_name,
                username: userData.username,
                password: password
            },{
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(data.success){
                toast({
                    title: `Account created successfully`,
                    status: 'success',
                    isClosable: true,
                  });
                setActiveStep(1);
            } else {
                toast({
                    title: `Account creation failed`,
                    status: 'error',
                    isClosable: true,
                  });
            }
        } catch(e){
            console.log(e);
            toast({
                title: `Account creation failed`,
                status: 'error',
                isClosable: true,
              });
        }
    }

    const create_project = async() => {
        setLoading(true);
        try{
            const { data } = await axios.post('/api/git/create_project',{
                token: get_jwt(),
                project_slug: projectSlug,
                git_id: gitID,
                courseID: courseID,
                import_url: projects.template_url
            },{
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(data.success){
                toast({
                    title: `Project created successfully`,
                    status: 'success',
                    isClosable: true,
                  });
                setActiveStep(2);
            } else if(data.error) {
                toast({
                    title: `Project already exists!`,
                    status: 'success',
                    isClosable: true,
                  });
                setActiveStep(2);
            } else {
                toast({
                    title: `Project creation failed`,
                    status: 'error',
                    isClosable: true,
                  });
                setLoading(false);
            }
        } catch(e){
            console.log(e);
            toast({
                title: `Project creation failed`,
                status: 'error',
                isClosable: true,
              });
            setLoading(false);
        }
    }

    return (
        <ChakraProvider>
        <Layout title="Setup Gitlab">
            <a className="close_side_menu" href="javascript:void(0);" />
            <div className="rbt-page-banner-wrapper">
                {/* Start Banner BG Image  */}
                <div className="rbt-banner-image" />
                {/* End Banner BG Image  */}
            </div>
            {/* Start Card Style */}
            <div className="rbt-dashboard-area rbt-section-overlayping-top rbt-section-gapBottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row g-5">
                                <div className="col-lg-3">
                                    {/* Start Dashboard Sidebar  */}

                                    {/* End Dashboard Sidebar  */}
                                </div>
                                <div className="col-lg-9">
                                    <div className="rbt-dashboard-content bg-color-white rbt-shadow-box mb--60">
                                        <div className="content">
                                            <div className="section-title">
                                                <h4 className="rbt-title-style-3">Git setup</h4>
                                            </div>

                                            <Stepper size='xl' colorScheme='green' index={activeStep}>
                                                {steps.map((step, index) => (
                                                    <Step key={index}>
                                                        <StepIndicator>
                                                            <StepStatus complete={`✅`} incomplete={`⏳`} active={`📍`} />
                                                        </StepIndicator>

                                                        <Box flexShrink='0'>
                                                            <StepTitle>{step.title}</StepTitle>
                                                            <StepDescription></StepDescription>
                                                        </Box>

                                                        <StepSeparator />
                                                    </Step>
                                                ))}
                                            </Stepper>
                                            <br/><br/>
                                            {activeStep === 0 ? (
                                                <>
                                                    <ReactMarkdown>{`### Create [Noobsverse GIT](https://git.noobsverse.com) account`}</ReactMarkdown>
                                                    <Input type='password' placeholder="Gitlab Password" size='sm' onChange={(e)=>setPassword(e.target.value)} />
                                                    <br/><br/>
                                                    <Button colorScheme='teal' size='lg' variant='solid' onClick={()=>{
                                                        create_git_account();
                                                    }}>
                                                        Create my GIT account
                                                    </Button>
                                                </>
                                            ) : activeStep === 1 ? (
                                                <>
                                                <ReactMarkdown>{`### Create project repository
                                                 https://git.noobsverse.com/${userData?.username}/${projectSlug}`}</ReactMarkdown>
                                                 {!loading ? (<></>) : (<Spinner size='xl'/>)}<br/><br/>
                                                 <Button colorScheme='teal' size='lg' variant='solid' onClick={()=>{
                                                    create_project();
                                                }} isDisabled={loading}>
                                                    Create project repository
                                                </Button>
                                                </>
                                            ) : activeStep === 2 ? (
                                                <ReactMarkdown>{m}</ReactMarkdown>
                                            ) : <ReactMarkdown>{`# Setup complete 🥳
                                            - You can now go back to projects`}</ReactMarkdown>}
                                            <br/><br/>
                                            <Button colorScheme='teal' size='lg' variant='outline' onClick={()=>{
                                                setActiveStep(activeStep + 1);
                                            }}>
                                                Next step
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
        </ChakraProvider>
    );
}