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
        data : [
                { Behind: 1, falling: 0, ahead: 1 },
                { Behind: 0, falling: 1, ahead: 2 },
                { Behind: 1, falling: 1, ahead: 0 }
              ],
      };
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        const behindArray = this.data.map(item => item.Behind);
        const fallingArray = this.data.map(item => item.falling);
        const aheadArray = this.data.map(item => item.ahead);

        console.log("Behind Array:", behindArray);
        console.log("Falling Array:", fallingArray);
        console.log("Ahead Array:", aheadArray);

        const ctx = this.$refs.myChart.getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'],
            datasets: [
              {
                label: 'Ahed', // First dataset label
                data: aheadArray, // Example data points for Dataset 1
                backgroundColor: 'rgb(22, 91, 170)', // Example color, customize as needed
                borderColor: 'rgb(109, 152, 201)', // Example color, customize as needed
                borderWidth: 1,
              },
              {
                label: 'Behind', // Second dataset label
                data: fallingArray, // Example data points for Dataset 2
                backgroundColor: 'rgb(161, 85, 185)', // Example color, customize as needed
                borderColor: 'rgb(109, 152, 201)', // Example color, customize as needed
                borderWidth: 1,
              },
              {
                label: 'Rly Behind', // Third dataset label
                data: behindArray, // Example data points for Dataset 3
                backgroundColor: 'rgb(247, 101, 163)', // Example color, customize as needed
                borderColor: 'rgb(109, 152, 201)', // Example color, customize as needed
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
  