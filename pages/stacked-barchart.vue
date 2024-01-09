<!-- MyChart.vue -->
<template>
    <div>
        <div id="weeklyContainer" class="chart p-2 color-secondary my-auto w-50">
            <canvas ref="myChart"></canvas>
        </div>
    </div>
</template>
  
  <script>
  import Chart from 'chart.js/auto';
  
  export default {
    data() {
      return {
        chart: null,
      };
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        const ctx = this.$refs.myChart.getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'],
            datasets: [
              {
                label: 'Ahed', // First dataset label
                data: [35, 25, 10, 35, 15, 50], // Example data points for Dataset 1
                backgroundColor: 'rgba(0, 0, 128)', // Example color, customize as needed
                borderColor: 'rgba(75, 192, 192, 1)', // Example color, customize as needed
                borderWidth: 1,
              },
              {
                label: 'Behind', // Second dataset label
                data: [20, 15, 40, 25, 45, 15], // Example data points for Dataset 2
                backgroundColor: 'rgba(115,79,150)', // Example color, customize as needed
                borderColor: 'rgba(255, 99, 132, 1)', // Example color, customize as needed
                borderWidth: 1,
              },
              {
                label: 'Rly Behind', // Third dataset label
                data: [20, 15, 45, 25, 45, 10], // Example data points for Dataset 3
                backgroundColor: 'rgba(243, 58, 106)', // Example color, customize as needed
                borderColor: 'rgba(255, 205, 86, 1)', // Example color, customize as needed
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
                beginAtZero: true,
                stepSize: 20,      // Set step size to 20
                max: 120,   
              },
            },
          },
        });
      },
    },
  };
  </script>
  