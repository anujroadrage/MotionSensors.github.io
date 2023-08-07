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
  
  // Function to update the chart with new sensor data
  function updateChart(timestamp, x, y, z) {
    sensorChart.data.labels.push(timestamp);
    sensorChart.data.datasets[0].data.push(x);
    sensorChart.data.datasets[1].data.push(y);
    sensorChart.data.datasets[2].data.push(z);
    sensorChart.update();
  }
  
  // Simulate updating the chart with random data (replace with actual sensor data)
  setInterval(() => {
    const timestamp = new Date().getTime();
    const x = Math.random() * 10; // Replace with actual sensor data
    const y = Math.random() * 10; // Replace with actual sensor data
    const z = Math.random() * 10; // Replace with actual sensor data
  
    // updateChart(timestamp, x, y, z);
  }, 1000); // Update every 1 second

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
  updateChart(timestamp, x, y, z);
  // Calculate and display estimated distance
  const distance = Math.sqrt(position.x ** 2 + position.y ** 2 + position.z ** 2);
  console.log(`Estimated distance: ${distance} meters`);
});