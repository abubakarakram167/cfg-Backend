#!/usr/bin/bash

# Move the files you created in /tmp into the desired directories. 
sudo aws s3 sync s3://cfg-media/ /var/app/current/static
