const sensorChart = new Chart(document.getElementById('sensorChart').getContext('2d'), {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Acceleration X',
          borderColor: 'rgba(75, 192, 192, 1)',
          data: [],
        },
        {
          label: 'Acceleration Y',
          borderColor: 'rgba(255, 99, 132, 1)',
          data: [],
        },
        {
          label: 'Acceleration Z',
          borderColor: 'rgba(54, 162, 235, 1)',
          data: [],
        },
      ],
    },
    options: {
      responsive: false,
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
const sensorChart1 = new Chart(document.getElementById('sensorChart1').getContext('2d'), {
type: 'line',
data: {
    labels: [],
    datasets: [
    {
        label: 'Acceleration X',
        borderColor: 'rgba(75, 192, 192, 1)',
        data: [],
    },
    {
        label: 'Acceleration Y',
        borderColor: 'rgba(255, 99, 132, 1)',
        data: [],
    },
    {
        label: 'Acceleration Z',
        borderColor: 'rgba(54, 162, 235, 1)',
        data: [],
    },
    ],
},
options: {
    responsive: false,
    scales: {
    x: {
        type: 'linear',
        position: 'bottom',
    },
    y: {
        beginAtZero: true,
    },
    },
},
});
const sensorChart2 = new Chart(document.getElementById('sensorChart2').getContext('2d'), {
type: 'line',
data: {
    labels: [],
    datasets: [
    {
        label: 'Acceleration X',
        borderColor: 'rgba(75, 192, 192, 1)',
        data: [],
    },
    {
        label: 'Acceleration Y',
        borderColor: 'rgba(255, 99, 132, 1)',
        data: [],
    },
    {
        label: 'Acceleration Z',
        borderColor: 'rgba(54, 162, 235, 1)',
        data: [],
    },
    ],
},
options: {
    responsive: false,
    scales: {
    x: {
        type: 'linear',
        position: 'bottom',
    },
    y: {
        beginAtZero: true,
    },
    },
},
});
const sensorChart3 = new Chart(document.getElementById('sensorChart3').getContext('2d'), {
type: 'line',
data: {
    labels: [],
    datasets: [
    {
        label: 'Acceleration X',
        borderColor: 'rgba(75, 192, 192, 1)',
        data: [],
    },
    {
        label: 'Acceleration Y',
        borderColor: 'rgba(255, 99, 132, 1)',
        data: [],
    },
    {
        label: 'Acceleration Z',
        borderColor: 'rgba(54, 162, 235, 1)',
        data: [],
    },
    ],
},
options: {
    responsive: false,
    scales: {
    x: {
        type: 'linear',
        position: 'bottom',
    },
    y: {
        beginAtZero: true,
    },
    },
},
});
  
  // Function to update the chart with new sensor data
  function updateChart(timestamp, x, y, z) {
    sensorChart.data.labels.push(timestamp);
    sensorChart.data.datasets[0].data.push(x);
    sensorChart.data.datasets[1].data.push(y);
    sensorChart.data.datasets[2].data.push(z);
    // if(sensorChart.data.labels.length >1000)
    //     sensorChart.data.labels.shift()
    //     sensorChart.data.datasets[0].data.shift();
    //     sensorChart.data.datasets[1].data.shift();
    //     sensorChart.data.datasets[2].data.shift();
    sensorChart.update();
  }
  function updateChart1(timestamp, x, y, z) {
    sensorChart1.data.labels.push(timestamp);
    sensorChart1.data.datasets[0].data.push(x);
    sensorChart1.data.datasets[1].data.push(y);
    sensorChart1.data.datasets[2].data.push(z);
    // if(sensorChart1.data.labels.length >1000)
    //     sensorChart1.data.labels.shift()
    //     sensorChart1.data.datasets[0].data.shift();
    //     sensorChart1.data.datasets[1].data.shift();
    //     sensorChart1.data.datasets[2].data.shift();
    sensorChart1.update();
  }
  function updateChart2(timestamp, x, y, z) {
    sensorChart2.data.labels.push(timestamp);
    sensorChart2.data.datasets[0].data.push(x);
    sensorChart2.data.datasets[1].data.push(y);
    sensorChart2.data.datasets[2].data.push(z);
    // if(sensorChart2.data.labels.length >1000)
    //     sensorChart2.data.labels.shift()
    //     sensorChart2.data.datasets[0].data.shift();
    //     sensorChart2.data.datasets[1].data.shift();
    //     sensorChart2.data.datasets[2].data.shift();
    sensorChart2.update();
  }
  function updateChart3(timestamp, x, y, z) {
    sensorChart3.data.labels.push(timestamp);
    sensorChart3.data.datasets[0].data.push(x);
    sensorChart3.data.datasets[1].data.push(y);
    sensorChart3.data.datasets[2].data.push(z);
    // if(sensorChart3.data.labels.length >1000)
    //     sensorChart3.data.labels.shift()
    //     sensorChart3.data.datasets[0].data.shift();
    //     sensorChart3.data.datasets[1].data.shift();
    //     sensorChart3.data.datasets[2].data.shift();

    sensorChart3.update();
  }

let startTime = null;
let prevTimestamp = null;
let velocity = { x: 0, y: 0, z: 0 };
let position = { x: 0, y: 0, z: 0 };

window.addEventListener('devicemotion', (event) => {
  const timestamp = event.timeStamp;

  if (!startTime) {
    startTime = timestamp;
    prevTimestamp = timestamp;
    return;
  }

  const deltaTime = (timestamp - prevTimestamp) / 1000; // Convert to seconds

  // Integrate acceleration to estimate velocity
  velocity.x += event.accelerationIncludingGravity.x * deltaTime;
  velocity.y += event.accelerationIncludingGravity.y * deltaTime;
  velocity.z += event.accelerationIncludingGravity.z * deltaTime;

  // Integrate velocity to estimate position
  let x = velocity.x * deltaTime;
  let y = velocity.y * deltaTime;
  let z = velocity.z * deltaTime;
  position.x += x;
  position.y += y;
  position.z += z;

  prevTimestamp = timestamp;
  updateChart(timestamp, event.accelerationIncludingGravity.x, event.accelerationIncludingGravity.y, event.accelerationIncludingGravity.z);
  updateChart1(timestamp, event.acceleration.x, event.acceleration.y, event.acceleration.z);
//   updateChart2(timestamp, velocity.x, velocity.y, velocity.z);
//   updateChart3(timestamp, x, y, z);
  
  // Calculate and display estimated distance
  const distance = Math.sqrt(position.x ** 2 + position.y ** 2 + position.z ** 2);
  console.log(`Estimated distance: ${distance} meters`);
});