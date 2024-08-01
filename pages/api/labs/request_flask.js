import axios from 'axios';
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_KEY;
import {CODER_BASE_URL, CODER_SERVER_KEY, CODER_ORG} from '@/config';
import { GraphQL_endpoint, GraphQL_API_KEY, CODER_PRICING, CRON_SERVER_API, CRON_SERVER_API_KEY } from '@/config';
import querygen from '@querygen';
import { gql, GraphQLClient } from 'graphql-request';

export default async function get_flask_details(req, res){
    const {token, email, flask_template_id, flask_given_name, plan, hours, username, nbspid} = req.body;
    let user_coder_id = "";
    let machine_type = "";
    let avc = 0;
    const user = jwt.verify(token, secretKey);
    
    const client = new GraphQLClient(GraphQL_endpoint, {
        headers: {
          "x-api-key": GraphQL_API_KEY,
        },
    });
    
    if(user !== null){
        
        const userContext = await client.request(querygen("getUserCoderD", user.userId));
        
        if((userContext.getUser?.coderlabUID === null || userContext.getUser?.coderlabUID === '') && userContext.getUser?.AVC_balance === null){ 
            console.log("LABBSBS",userContext.getUser?.coderlabUID)
            avc = 20;
            const cu = await axios.post(`${CODER_BASE_URL}/users?coder_session_token=${CODER_SERVER_KEY}`,{
                "disable_login" : false,
                "email" : email,
                "login_type" : "password",
                "organization_id" : CODER_ORG,
                "password" : "MDsdAvidia@190ewqw@#$",
                "username" : username
            },{
                headers: {
                      'Content-Type': 'application/json',
                      'Coder-Sesion-Token': CODER_SERVER_KEY
                },
            });
            user_coder_id = cu.data.id;
            console.log(cu);
        }
        else if((userContext.getUser?.coderlabUID === null || userContext.getUser?.coderlabUID === '') && userContext.getUser?.AVC_balance !== null){ 
            avc = parseFloat(userContext.getUser?.AVC_balance);
            console.log("AAAVVCC", avc)
            try{
                const cu = await axios.post(`${CODER_BASE_URL}/users?coder_session_token=${CODER_SERVER_KEY}`,{
                    "disable_login" : false,
                    "email" : email,
                    "login_type" : "password",
                    "organization_id" : CODER_ORG,
                    "password" : "MDsdAvidia@190ewqw@#$",
                    "username" : username
                },{
                    headers: {
                          'Content-Type': 'application/json',
                          'Coder-Sesion-Token': CODER_SERVER_KEY
                    },
                });
                user_coder_id = cu.data.id;
                console.log(cu.data);
            } catch (e){
                console.log("ERORORO",e);
            }
        }
        else{ 
            avc = parseFloat(userContext.getUser?.AVC_balance);
            user_coder_id = userContext.getUser?.coderlabUID;
        }
        
        //Check plan
        if(plan === "begineer") machine_type = "t3.micro";
        else if(plan === "basic") machine_type = "t3.small";
        else if(plan === "nerd") machine_type = "t3.medium";
        else if(plan === "pro") machine_type = "t3.large";
        else if(plan === "ultra") machine_type = "t3.xlarge";
        console.log(plan, machine_type);
        //Check AVC
        if(avc<(CODER_PRICING[plan]*hours)) res.status(401).json({error: "Insufficient AVC balance"});
        
        else{
            avc = avc - (CODER_PRICING[plan]*hours);
            const r = await axios.post(`${CODER_BASE_URL}/organizations/${CODER_ORG}/members/${user_coder_id}/workspaces?coder_session_token=${CODER_SERVER_KEY}`, {
                  "automatic_updates": "always",
                  "name": flask_given_name,
                  "rich_parameter_values": [
                    {
                      "name": "region",
                      "value": "ap-south-1"
                    },
                    {
                        "name": "instance_type",
                        "value": machine_type
                    }
                  ],
                  "template_version_id": flask_template_id
                    } , {
                    headers: {
                      'Content-Type': 'application/json',
                      'Coder-Sesion-Token': CODER_SERVER_KEY
                    },
              });
              const q = gql`mutation MyMutation {
  updateUser(input: {nbspID: \"${nbspid}\", coderlabUID: \"${user_coder_id}\", AVC_balance: \"${avc}\"}){
      id
  }
}`;
              client.request(q);
              
              //Set a scheduled self-kill
              const p = await axios.post(CRON_SERVER_API, {
                  "url": `https://cohort.avidia.in/api/labs/break_flask?fid=${r.data.id}&cuid=${user_coder_id}`, 
                  "hours": parseInt(hours, 10), 
                  "apiKey": CRON_SERVER_API_KEY
              }, {
                  headers: {
                      'Content-Type': 'application/json'
                    },
              });
              console.log(p);
              res.status(200).json({data: r.data.id});
        }
    }
}