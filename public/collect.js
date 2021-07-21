// alert('collect.js is here');

async function getResponseTime () {
      const response = await fetch('/api', { method: 'POST'});
      console.log(response.headers.get('X-Response-Time'));

      const data = await response.json();
      console.log(data)

      const contentElement = document.getElementById('content');
      const responseElement = document.createElement('p');
      const timeElement = document.createElement('p');
      const tokyoElement = document.createElement('p');
      // const londonElement = document.createElement('p');

      // const timeElement = document.getElementById('time');
      // const responseElement = document.getElementById('responseTime');

      responseElement.innerHTML = 'Response Time: '  + response.headers.get('X-Response-Time');
      tokyoElement.innerHTML = 'Response from London: ' + data.tokyo;
      // londonElement.innerHTML = 'London: '  + data.london;
      timeElement.innerHTML = 'Time: '  + data.time;
      contentElement.append(responseElement, timeElement, tokyoElement);


  }