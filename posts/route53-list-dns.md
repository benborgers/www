---
title: How to list DNS records using the Route53 Node.js API
slug: route53-list-dns
date: 2020-12-30T17:45:16.432Z
tags:
  - programming
  - aws
draft: false
---
Recently, I had a project where I wanted to get all the DNS records for my domain. The DNS was being handled on AWS Route53. 

First, I created an IAM User for my code to use. It's like an API key for AWS. 

1. Open the the [IAM Users](https://console.aws.amazon.com/iam/home#/users) page in the AWS dashboard. 
2. Click "Add User", gave it a name, and selected "programmatic access". 
3. Select "Attach existing policies directly" and searched for `AmazonRoute53ReadOnlyAccess`. This means that this key will only be able to _read_ Route53 resources, not modify them or access anything else. 
4. Go through the rest of the steps and note the access key ID and secret access keys generated. 

In your project, create a JSON file (I called mine `aws.json`) with your keys in it: 

```json
{
    "accessKeyId": "AKIA5POZ6AJXFCGJPE4H",
    "secretAccessKey": "n1YrVagQ8/Cz3nwLMoiK4OlSudzbKFCbVzMRZhjI",
    "region": "us-east-1"
}
```

Next, open up your [Hosted zones](https://console.aws.amazon.com/route53/v2/hostedzones#) on Route53 and open the domain whose DNS records you want to read. Copy down the ID at the end of the URL bar — it'll usually start with a `Z`. 

Now, you're ready to use the AWS API: 

```javascript
const AWS = require('aws-sdk')

AWS.config.loadFromPath('./aws.json')
const route53 = new AWS.Route53()

route53.listResourceRecordSets({
        HostedZoneId: 'Z...', // hosted zone ID from earlier
        MaxItems: '300'
    }, (err, data) => {
        console.log(data)
    })
```

And that's it! You can look at the logged `data` to see the DNS records for this domain. 