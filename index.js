import core from '@actions/core';
import github from '@actions/github';
import fetch from 'node-fetch'

async function sendRequest (){
  try {

    const changedFiles = core.getInput('changed-files');
    const token = core.getInput('token');
    const url = core.getInput('url');

    const parsedFiles = JSON.parse(changedFiles.replace(/\\/g, ''));
    console.log('Changed Files: ', parsedFiles);

    const request  = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({changedFiles: parsedFiles})
    });

    if (!request.ok) {
        throw new Error(`HTTP error! status: ${request.status}`);
    }

    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

sendRequest();
